export default function SectionDivider() {
  return (
    <section className="relative hidden md:block h-24 md:h-24">
      {/* soft fade from hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black" />

      {/* subtle ambient glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.12), transparent 60%)"
        }}
      />
    </section>
  );
}
