import { NextResponse } from "next/server";
import { google } from "googleapis";

type LeadPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  locale?: string;
  page?: string;
  userAgent?: string;
};

function env(name: string) {
  const v = process.env[name];
  return v && v.trim().length ? v : undefined;
}

function parseServiceAccount() {
  // Preferred: full JSON blob
  const rawJson = env("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (rawJson) {
    const json = JSON.parse(rawJson);
    if (json.private_key && typeof json.private_key === "string") {
      json.private_key = json.private_key.replace(/\\n/g, "\n");
    }
    return json;
  }

  // Fallback: split vars (your current .env.local style)
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

  // ✅ No-op mode (so dev/build doesn't crash)
  if (!spreadsheetId || !creds) {
    console.warn(
      "Lead received, but Sheets env vars are missing. Skipping Google Sheets logging."
    );
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const now = new Date().toISOString();

  const values = [
    [
      now,
      payload.name || "",
      payload.email || "",
      payload.subject || "",
      payload.message || "",
      payload.locale || "",
      payload.page || "",
      payload.userAgent || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tabName}!A:H`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;

    // Basic validation
    if (!body?.email || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: email, message" },
        { status: 400 }
      );
    }

    // Limit lengths to prevent abuse
    const payload: LeadPayload = {
      name: String(body.name || "").slice(0, 120),
      email: String(body.email || "").slice(0, 200),
      subject: String(body.subject || "").slice(0, 200),
      message: String(body.message || "").slice(0, 4000),
      locale: String(body.locale || "").slice(0, 20),
      page: String(body.page || "").slice(0, 500),
      userAgent: String(body.userAgent || "").slice(0, 300),
    };

    // ✅ Always accept the lead, Sheets logging is best-effort
    try {
      await appendToSheet(payload);
    } catch (e) {
      console.error("Sheets append failed (lead still accepted):", e);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Lead API error:", err);

    // Even if something unexpected happens, don't hard-fail the user experience
    // (you can change this to 500 later if you prefer strict behavior)
    return NextResponse.json({ ok: true, warning: "Processed with warnings" });
  }
}
