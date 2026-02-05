'use client';

export default function Moon() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        // Place it just outside the top-right edge of the planet
        left: '70%',
        top: '8%',
        width: 'calc(var(--planet) * 0.16)',
        height: 'calc(var(--planet) * 0.16)',
      }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%,
              hsla(var(--hue), 18%, 92%, 0.95) 0%,
              hsla(var(--hue), 12%, 78%, 0.92) 58%,
              hsla(var(--hue), 10%, 56%, 0.95) 100%
            )
          `,
          boxShadow: '0 10px 18px rgba(0,0,0,0.25)',
        }}
      >
        {/* tiny craters */}
        <div className="absolute left-[55%] top-[30%] h-[18%] w-[18%] rounded-full bg-black/10" />
        <div className="absolute left-[32%] top-[58%] h-[14%] w-[14%] rounded-full bg-black/8" />
        <div className="absolute left-[64%] top-[62%] h-[10%] w-[10%] rounded-full bg-white/16" />
      </div>
    </div>
  );
}
