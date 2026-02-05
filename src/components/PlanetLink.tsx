'use client';

import Link from 'next/link';
import Moon from './Moon';

type PlanetLinkProps = {
  href: string;
  label: string;
  subtitle?: string;

  // planet look
  size?: number; // px
  hue?: number;  // 0-360

  // moon options
  showMoon?: boolean;
  moonSize?: number;
  moonHue?: number;
  moonOffsetX?: number;
  moonOffsetY?: number;
};

export default function PlanetLink({
  href,
  label,
  subtitle,
  size = 150,
  hue = 220,

  showMoon = false,
  moonSize = 18,
  moonHue = 210,
  moonOffsetX = 10,
  moonOffsetY = 10,
}: PlanetLinkProps) {
  const planetStyle: React.CSSProperties = {
    width: size,
    height: size,
    background: `
      radial-gradient(circle at 28% 26%,
        hsla(${hue}, 95%, 82%, 0.98) 0%,
        hsla(${hue}, 88%, 64%, 0.96) 35%,
        hsla(${hue}, 78%, 44%, 0.98) 70%,
        hsla(${hue}, 82%, 28%, 1) 100%
      )
    `,
    boxShadow: `
      0 16px 40px rgba(0,0,0,0.40),
      0 0 44px hsla(${hue}, 95%, 70%, 0.20)
    `,
  };

  return (
    <Link
      href={href}
      aria-label={label}
      className="group relative flex flex-col items-center gap-3 outline-none"
    >
      <div
        className="
          relative
          transition-transform duration-200 ease-out
          group-hover:scale-[1.04]
          group-active:scale-[0.98]
          group-focus-visible:scale-[1.04]
        "
        style={{ width: size, height: size }}
      >
        {/* Planet */}
        <div className="relative h-full w-full rounded-full overflow-hidden" style={planetStyle}>
          {/* subtle surface bands */}
          <div className="pointer-events-none absolute left-[-8%] top-[58%] h-[12%] w-[120%] rotate-[-10deg] rounded-full bg-white/12 blur-[1px]" />
          <div className="pointer-events-none absolute left-[-6%] top-[70%] h-[9%] w-[116%] rotate-[8deg] rounded-full bg-black/14 blur-[1px]" />

          {/* highlight + shadow for depth */}
          <div className="pointer-events-none absolute left-[16%] top-[16%] h-[34%] w-[34%] rounded-full bg-white/30 blur-[1px]" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-black/0 via-black/0 to-black/35" />
        </div>

        {/* Optional moon (static) */}
        {showMoon && (
          <Moon
            size={moonSize}
            hue={moonHue}
            offsetX={moonOffsetX}
            offsetY={moonOffsetY}
          />
        )}

        {/* focus ring */}
        <div className="absolute inset-[-6px] rounded-full ring-0 ring-white/45 transition group-focus-visible:ring-2" />
      </div>

      <div className="text-center">
        <div className="text-lg font-semibold text-white drop-shadow">{label}</div>
        {subtitle && <div className="text-sm text-white/75">{subtitle}</div>}
      </div>
    </Link>
  );
}
