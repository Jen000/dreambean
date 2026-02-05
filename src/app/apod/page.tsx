'use client';

import { useEffect, useMemo, useState } from 'react';
import NavBar from '~/components/navBar';

type ApodResponse = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  copyright?: string;
  service_version?: string;
};

const DEFAULT_DATE = '2025-06-06';

export default function ApodPage() {
  const [date, setDate] = useState(DEFAULT_DATE);
  const [data, setData] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const apiKey = useMemo(
    () => process.env.NEXT_PUBLIC_NASA_API_KEY || 'DEMO_KEY',
    []
  );

  function toISODate(d: Date) {
    // Uses the user's local timezone (fine for “today”)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


    useEffect(() => {
    const controller = new AbortController();

    async function load() {
        setLoading(true);
        setErr(null);

        try {
        const params = new URLSearchParams({ api_key: apiKey, date });
        const res = await fetch(
            `https://api.nasa.gov/planetary/apod?${params.toString()}`,
            { signal: controller.signal, cache: 'no-store' }
        );

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`NASA API error (${res.status}): ${text}`);
        }

        const json = (await res.json()) as ApodResponse;
        setData(json);
        } catch (e: unknown) {
        // Ignore abort errors (happen on navigation/unmount)
        if (e instanceof DOMException && e.name === 'AbortError') return;

        const message =
            e instanceof Error ? e.message : 'Something went wrong fetching APOD.';
        setErr(message);
        } finally {
        // IMPORTANT: always clear loading
        setLoading(false);
        }
    }

    load();
    return () => controller.abort();
    }, [apiKey, date]);

    const today = toISODate(new Date());
    const isToday = date === today;


  return (
    <>
    <NavBar />
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">NASA Picture of the Day</h1>
          <p className="text-white/70">APOD (Astronomy Picture of the Day)</p>
        </div>

        <label className="flex flex-col gap-1 text-sm text-white/80">
          Pick a date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-[190px] rounded-md bg-white/10 px-3 py-2 text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-white/35"
          />
        </label>

        <button
            type="button"
            onClick={() => setDate(today)}
            disabled={isToday}
            className="rounded-md bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/15 transition hover:bg-white/15 disabled:opacity-50 disabled:hover:bg-white/10"
            >
            Jump to Today
        </button>

      </div>

      <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
        {loading && <p className="text-white/80">Loading…</p>}
        {err && (
          <p className="text-red-200">
            {err}
          </p>
        )}

        {!loading && !err && data && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">{data.title}</h2>
              <p className="text-white/70">{data.date}</p>
            </div>

            <div className="mb-6 overflow-hidden rounded-xl bg-black/30">
              {data.media_type === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.hdurl || data.url}
                  alt={data.title}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={data.url}
                    title={data.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Explanation</h3>
                <p className="whitespace-pre-line text-white/85 leading-relaxed">
                  {data.explanation}
                </p>
              </div>

              <div className="text-sm text-white/70">
                <div>
                  <span className="font-semibold text-white/80">Copyright:</span>{' '}
                  {data.copyright ? data.copyright : 'Not provided'}
                </div>
                <div>
                  <span className="font-semibold text-white/80">Source URL:</span>{' '}
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-white/30 hover:decoration-white"
                  >
                    Open media
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </main>
    </>
  );
}
