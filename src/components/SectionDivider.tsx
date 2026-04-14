export default function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-2 px-6 overflow-hidden">
      {/* Full-width hairline */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(200,169,106,0.12) 20%, rgba(200,169,106,0.25) 50%, rgba(200,169,106,0.12) 80%, transparent 100%)",
        }}
      />
      {/* Center ornament */}
      <div
        className="relative flex items-center gap-2.5 px-4"
        style={{ background: "inherit" }}
      >
        <span
          className="h-px w-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.45))" }}
        />
        <span
          className="block h-1 w-1 rotate-45"
          style={{ background: "#C8A96A", opacity: 0.55 }}
        />
        <span
          className="block h-1.5 w-1.5 rotate-45"
          style={{ background: "#C8A96A", opacity: 0.75 }}
        />
        <span
          className="block h-1 w-1 rotate-45"
          style={{ background: "#C8A96A", opacity: 0.55 }}
        />
        <span
          className="h-px w-8"
          style={{ background: "linear-gradient(90deg, rgba(200,169,106,0.45), transparent)" }}
        />
      </div>
    </div>
  );
}
