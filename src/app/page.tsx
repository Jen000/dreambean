'use client';

import { useEffect, useMemo, useState } from 'react';
import StarsBackground from '~/components/starsBackground';
import PlanetLink from '~/components/PlanetLink';
import SupernovaTakeover from "~/components/SupernovaTakeover";



export default function Home() {

  const [showNova, setShowNova] = useState(false);

  const startDate = useMemo(() => new Date(2025, 5, 6), []);

  const [timePassed, setTimePassed] = useState(() => getTimeSince(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(getTimeSince(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  useEffect(() => {
  if (isMonthlyAnniversaryDay(startDate)) {
    const t = setTimeout(() => setShowNova(true), 500);
    return () => clearTimeout(t);
  }
}, [startDate]);

  return (
    <>
      <SupernovaTakeover
        active={showNova}
        onDone={() => setShowNova(false)}
      />
    <div className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Hi Sam 💕</h1>

        <p className="text-lg md:text-xl text-white mb-8">It’s been...</p>


          <div className="relative z-10 text-2xl md:text-3xl font-medium text-indigo-800 bg-white bg-opacity-50 px-6 py-4 rounded-xl shadow-md">
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
    </>
  );
}

function isMonthlyAnniversaryDay(start: Date, now = new Date()) {
  return now.getDate() === start.getDate();
}

function todayKey(now = new Date()) {
  // local date key like 2026-02-05
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}


function getTimeSince(start: Date) {
  const now = new Date();

  // Normalize both to local midnight for month/day math
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (nowDay < startDay) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };

  // Total months between the two dates (calendar-based)
  let totalMonths =
    (nowDay.getFullYear() - startDay.getFullYear()) * 12 +
    (nowDay.getMonth() - startDay.getMonth());

  // If we haven't reached the start "day-of-month" yet this month, borrow one month
  if (nowDay.getDate() < startDay.getDate()) {
    totalMonths -= 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Anchor date = start date plus those whole months/years (at midnight)
  const anchor = new Date(startDay);
  anchor.setMonth(anchor.getMonth() + totalMonths);

  // Remaining days since the monthly anniversary date (midnight-to-midnight)
  const msSinceAnchorDay = nowDay.getTime() - anchor.getTime();
  const days = Math.floor(msSinceAnchorDay / (1000 * 60 * 60 * 24));

  // And time since today's midnight (nice + intuitive now that months flip at midnight)
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return { years, months, days, hours, minutes, seconds };
}
