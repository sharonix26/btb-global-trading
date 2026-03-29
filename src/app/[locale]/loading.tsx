export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-transparent animate-spin"
          style={{
            borderTopColor: "rgba(197,146,42,1)",
            borderRightColor: "rgba(12,31,63,0.5)",
          }}
        />
        <p className="text-sm text-white/40 tracking-widest uppercase">Loading</p>
      </div>
    </div>
  );
}
