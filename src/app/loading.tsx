export default function Loading() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="text-center">
        <div
          className="mx-auto mb-4 size-10 rounded-full border-[3px]"
          style={{
            borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
            borderTopColor: "var(--primary)",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Loading</div>
      </div>
    </div>
  );
}
