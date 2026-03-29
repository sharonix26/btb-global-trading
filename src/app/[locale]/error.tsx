"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-black px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(12,31,63,0.25), transparent 60%)",
        }}
      />

      <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4">
        Something went wrong
      </p>

      <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
        Unexpected Error
      </h1>

      <p className="text-white/55 max-w-md mb-10">
        We encountered an unexpected issue. Please try again or contact us if the
        problem persists.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={reset}
          className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-black overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(197,146,42,1), rgba(12,31,63,1), rgba(21,45,86,1))",
          }}
        >
          Try Again
        </button>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:border-white/40 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
