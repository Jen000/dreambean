'use client';

import { useEffect, useMemo, useState } from 'react';
import StarsBackground from '~/components/starsBackground';
import PlanetLink from '~/components/PlanetLink';

export default function Home() {
  // June 6, 2025 11:11pm in *local* time (America/New_York on your machine)
  const startDate = useMemo(() => new Date(2025, 5, 6, 23, 11, 0), []);

  const [timePassed, setTimePassed] = useState(() => getTimeSince(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(getTimeSince(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Hi Sam 💕</h1>

        <p className="text-lg md:text-xl text-white mb-8">It’s been...</p>

        <div className="text-2xl md:text-3xl font-medium text-indigo-800 bg-white bg-opacity-50 px-6 py-4 rounded-xl shadow-md mb-8">
          {[
            timePassed.years > 0 && `${timePassed.years} year${timePassed.years === 1 ? '' : 's'}`,
            timePassed.months > 0 && `${timePassed.months} month${timePassed.months === 1 ? '' : 's'}`,
            timePassed.days > 0 && `${timePassed.days} day${timePassed.days === 1 ? '' : 's'}`,
            timePassed.hours > 0 && `${timePassed.hours} hour${timePassed.hours === 1 ? '' : 's'}`,
            timePassed.minutes > 0 && `${timePassed.minutes} minute${timePassed.minutes === 1 ? '' : 's'}`,
            `${timePassed.seconds} second${timePassed.seconds === 1 ? '' : 's'}`,
          ]
            .filter(Boolean)
            .join(', ')}
        </div>

        <p className="text-lg md:text-xl text-white mb-8">Since the day we met 🌟</p>

        <section className="mt-10 grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-2">
          <div className="md:translate-y-6">
            <PlanetLink href="/comics" label="Comics" subtitle="our lil archive" hue={140} sizePx={80} showMoon />
          </div>

          <div className="md:-translate-y-2">
            <PlanetLink href="/apod" label="NASA APOD" subtitle="picture of the day" hue={200} sizePx={120} />
          </div>
        </section>
      </main>
    </div>
  );
}

function getTimeSince(start: Date) {
  const now = new Date();
  if (now < start) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  // 1) Years (calendar)
  let years = now.getFullYear() - start.getFullYear();
  let anchor = new Date(start);
  anchor.setFullYear(start.getFullYear() + years);
  if (now < anchor) {
    years -= 1;
    anchor = new Date(start);
    anchor.setFullYear(start.getFullYear() + years);
  }

  // 2) Months (calendar) from the "year-adjusted" anchor
  let months = now.getMonth() - anchor.getMonth();
  if (months < 0) months += 12;

  let anchor2 = new Date(anchor);
  anchor2.setMonth(anchor.getMonth() + months);

  // If we haven’t reached the same day/time-of-month yet, borrow one month
  if (now < anchor2) {
    months -= 1;
    anchor2 = new Date(anchor);
    anchor2.setMonth(anchor.getMonth() + months);
  }

  // 3) Remaining time as fixed units
  let diff = now.getTime() - anchor2.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  return { years, months, days, hours, minutes, seconds };
}
