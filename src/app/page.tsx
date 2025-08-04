'use client';

import { useEffect, useState } from 'react';
import FunFact from '~/components/funFact';
import StarsBackground from '~/components/starsBackground';


export default function Home() {
  const startDate = new Date('2025-06-06T23:11:00-04:00');
  const [timePassed, setTimePassed] = useState(getTimeSince(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(getTimeSince(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarsBackground />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-white">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Hi Sam 💕
      </h1>
      <p className="text-lg md:text-xl text-white mb-8">
        It’s been...
      </p>
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

      <FunFact />

      <nav className="flex flex-col space-y-2 mt-8">
        <a
        href="/comics"
        className="bg-white text-[#1a1a1a] px-6 py-2 rounded-md font-semibold shadow-md hover:bg-gray-200 transition duration-200 text-center"
        >
          Comics
        </a>
      </nav>
    </main>
    </div>
  );
}

function getTimeSince(start: Date) {
  const now = new Date();
  let diff = now.getTime() - start.getTime();

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  diff -= years * 1000 * 60 * 60 * 24 * 365.25;

  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
  diff -= months * 1000 * 60 * 60 * 24 * 30.44;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * 1000 * 60 * 60 * 24;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  return { years, months, days, hours, minutes, seconds };
}
