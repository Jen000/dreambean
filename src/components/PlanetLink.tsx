'use client';

import Link from 'next/link';
import Moon from './Moon';

type PlanetLinkProps = {
  href: string;
  label: string;
  subtitle?: string;

  // Optional: override size (defaults responsive)
  sizePx?: number;

  hue?: number; // 0-360

  showMoon?: boolean;
};

export default function PlanetLink({
  href,
  label,
  subtitle,
  sizePx,
  hue = 220,
  showMoon = false,
}: PlanetLinkProps) {
  // Responsive size by default
  // - small phones: ~110px
  // - typical: ~140px
  // - desktop: up to ~170px
  const size = sizePx
    ? `${sizePx}px`
    : 'clamp(110px, 22vw, 170px)';

    const styleVars = {
    '--planet': size,
    '--hue': hue,
    } as React.CSSProperties;

  return (

    
    <Link
      href={href}
      aria-label={label}
      className="group relative flex flex-col items-center gap-3 outline-none select-none"
      style={styleVars}
    >
      <div
        className="
          relative
          transition-transform duration-200 ease-out
          group-hover:scale-[1.04]
          group-active:scale-[0.98]
          group-focus-visible:scale-[1.04]
        "
        style={{
          width: 'var(--planet)',
          height: 'var(--planet)',
        }}
      >
        {/* Planet body */}
        <div
          className="relative h-full w-full rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 28% 26%,
                hsla(var(--hue), 95%, 82%, 0.98) 0%,
                hsla(var(--hue), 88%, 64%, 0.96) 36%,
                hsla(var(--hue), 78%, 44%, 0.98) 72%,
                hsla(var(--hue), 82%, 28%, 1) 100%
              )
            `,
            boxShadow: `
              0 14px 34px rgba(0,0,0,0.40),
              0 0 34px hsla(var(--hue), 95%, 70%, 0.18)
            `,
          }}
        >
          {/* subtle texture bands (lighter + more natural) */}
          <div
            className="pointer-events-none absolute left-[-12%] top-[58%] w-[125%] rounded-full blur-[1px]"
            style={{
              height: 'calc(var(--planet) * 0.12)',
              background: 'rgba(255,255,255,0.10)',
              transform: 'rotate(-10deg)',
            }}
          />
          <div
            className="pointer-events-none absolute left-[-10%] top-[72%] w-[120%] rounded-full blur-[1px]"
            style={{
              height: 'calc(var(--planet) * 0.09)',
              background: 'rgba(0,0,0,0.10)',
              transform: 'rotate(8deg)',
            }}
          />

          {/* highlight */}
          <div
            className="pointer-events-none absolute rounded-full blur-[1px]"
            style={{
              left: '16%',
              top: '16%',
              width: '36%',
              height: '36%',
              background: 'rgba(255,255,255,0.22)',
            }}
          />

          {/* terminator shadow — softer than before */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 35%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.22) 78%, rgba(0,0,0,0.40) 100%)',
            }}
          />

          {/* atmosphere glow */}
          <div
            className="pointer-events-none absolute inset-[-10px] rounded-full"
            style={{
              boxShadow: '0 0 40px hsla(var(--hue), 95%, 70%, 0.10)',
            }}
          />
        </div>

        {/* Moon (static, scales + positions relative to planet) */}
        {showMoon && <Moon />}

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
