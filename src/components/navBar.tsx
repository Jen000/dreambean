'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_THEMES: Record<
  string,
  { bg: string; button: string; buttonHover: string }
> = {
  '/': {
    bg: '#79a8a9',
    button: '#5a3e2b',
    buttonHover: '#4a3223',
  },
  '/apod': {
    bg: '#0b1d2d',        // deep space blue
    button: '#1f4fd8',
    buttonHover: '#163bb0',
  },
  '/comics': {
    bg: '#79a8a9',        // cosmic purple
    button: '#5a3e2b',
    buttonHover: '#37261b',
  },
};

export default function NavBar() {
  const pathname = usePathname();

  // fallback if route isn't defined
  const theme =
    NAV_THEMES[pathname] ?? NAV_THEMES['/'];

  return (
    <nav
      className="sticky top-0 z-50 shadow-md transition-colors duration-300"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="max-w-4xl mx-auto p-4 flex items-center">
        <Link href="/">
          <button
            type="button"
            className="px-4 py-2 rounded-lg shadow transition-colors duration-200 text-white hover:bg-[#4a3223] cursor-pointer"
            style={{
              backgroundColor: theme.button,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                theme.buttonHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                theme.button)
            }
          >
            ← Back to Home
          </button>
        </Link>
      </div>
    </nav>
  );
}
