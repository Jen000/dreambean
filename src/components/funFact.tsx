'use client';

import { useState } from 'react';

export default function FunFactToggle() {
 const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div>
      {!showExplanation && (
        <button
          onClick={() => setShowExplanation(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Wait, is that right?
        </button>
      )}

      {showExplanation && (
        <section className="mt-8 max-w-md bg-indigo-50 bg-opacity-30 rounded-xl p-4 text-indigo-900 shadow-inner">
          <p>
            Fun fact – we always thought we met on the 6th, but it looks like
            we didn’t actually meet until after midnight!
          </p>

          <button
            onClick={() => setShowExplanation(false)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Checks out
          </button>
        </section>
      )}
    </div>
  );
}