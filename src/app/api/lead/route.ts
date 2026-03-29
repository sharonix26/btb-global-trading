import { NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

/* ─── Rate limiter (in-memory, per IP) ─────────────────────────── */
const rateStore = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;        // max requests
const RATE_WINDOW = 60_000;  // per 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateStore.get(ip);

  if (!entry || now > entry.reset) {
    rateStore.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

// Periodically clear stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateStore) {
    if (now > val.reset) rateStore.delete(key);
  }
}, 5 * 60_000);

/* ─── Validation schema ─────────────────────────────────────────── */
const leadSchema = z.object({
  name: z.string().max(120).optional().default(""),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional().default(""),
  message: z.string().min(1).max(4000),
  locale: z.string().max(20).optional().default(""),
  page: z.string().max(500).optional().default(""),
  userAgent: z.string().max(300).optional().default(""),
  // Honeypot: must be empty — bots fill it, humans don't see it
  website: z.string().max(0).optional().default(""),
});

type LeadPayload = z.infer<typeof leadSchema>;

/* ─── Helpers ───────────────────────────────────────────────────── */
function env(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v : undefined;
}

function parseServiceAccount() {
  const rawJson = env("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (rawJson) {
    const json = JSON.parse(rawJson);
    if (json.private_key && typeof json.private_key === "string") {
      json.private_key = json.private_key.replace(/\\n/g, "\n");
    }
    return json;
  }

  const client_email = env("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const private_key = env("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY");

  if (!client_email || !private_key) return null;

  return {
    client_email,
    private_key: private_key.replace(/\\n/g, "\n"),
  };
}

async function appendToSheet(payload: LeadPayload) {
  const spreadsheetId = env("GOOGLE_SHEETS_SPREADSHEET_ID");
  const tabName = env("GOOGLE_SHEETS_TAB_NAME") || "Leads";
  const creds = parseServiceAccount();

  if (!spreadsheetId || !creds) {
    console.warn("Lead received, but Sheets env vars are missing. Skipping Google Sheets logging.");
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const now = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A:H`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        now,
        payload.name || "",
        payload.email || "",
        payload.subject || "",
        payload.message || "",
        payload.locale || "",
        payload.page || "",
        payload.userAgent || "",
      ]],
    },
  });
}

/* ─── Route handler ─────────────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    const result = leadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    // Honeypot check — silently accept but don't log bots
    if (result.data.website && result.data.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const payload: LeadPayload = result.data;

    try {
      await appendToSheet(payload);
    } catch (e) {
      console.error("Sheets append failed (lead still accepted):", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
