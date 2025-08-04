import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: '#79a8a9' }}
        >
      <div className="max-w-4xl mx-auto p-4 flex items-center">
        <Link href="/">
          <button
            type="button"
            className="px-4 py-2 bg-[#5a3e2b] text-white rounded-lg shadow hover:bg-[#4a3223] transition"

          >
            ← Back to Home
          </button>
        </Link>
      </div>
    </nav>
  );
}
