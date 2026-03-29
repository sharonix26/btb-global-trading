import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-black px-6 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(197,146,42,0.2), transparent 60%)",
        }}
      />

      <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4">
        404
      </p>

      <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">
        Page Not Found
      </h1>

      <p className="text-white/55 max-w-md mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/en"
        className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-black overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(197,146,42,1), rgba(12,31,63,1), rgba(21,45,86,1))",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
