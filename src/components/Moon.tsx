'use client';

type MoonProps = {
  size?: number;      // px
  hue?: number;       // 0-360 (tints the moon slightly)
  offsetX?: number;   // px relative to planet container
  offsetY?: number;   // px relative to planet container
};

export default function Moon({
  size = 18,
  hue = 210,
  offsetX = 10,
  offsetY = 8,
}: MoonProps) {
  return (
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        right: offsetX,
        top: offsetY,
        background: `
          radial-gradient(circle at 30% 30%,
            hsla(${hue}, 25%, 92%, 0.95) 0%,
            hsla(${hue}, 15%, 78%, 0.92) 55%,
            hsla(${hue}, 10%, 55%, 0.95) 100%
          )
        `,
        boxShadow: '0 10px 18px rgba(0,0,0,0.25)',
      }}
    >
      {/* tiny crater specks */}
      <div className="absolute left-[55%] top-[30%] h-[4px] w-[4px] rounded-full bg-black/10" />
      <div className="absolute left-[35%] top-[55%] h-[3px] w-[3px] rounded-full bg-black/8" />
      <div className="absolute left-[62%] top-[58%] h-[2px] w-[2px] rounded-full bg-white/20" />
    </div>
  );
}
