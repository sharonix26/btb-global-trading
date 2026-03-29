"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(197,146,42,1)",
              marginBottom: "1rem",
            }}
          >
            Critical Error
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "1rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={reset}
            style={{
              background:
                "linear-gradient(90deg, rgba(197,146,42,1), rgba(12,31,63,1))",
              border: "none",
              borderRadius: "9999px",
              padding: "0.75rem 1.5rem",
              color: "#000",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
