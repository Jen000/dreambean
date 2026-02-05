'use client';

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type Props = {
  active: boolean;
  durationMs?: number;
  onDone?: () => void;
};

export default function SupernovaTakeover({ active, durationMs = 2200, onDone }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onDone?.(), durationMs);
    return () => clearTimeout(t);
  }, [active, durationMs, onDone]);

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },

      particles: {
        number: { value: 0 }, // emitted via bursts
        color: { value: ["#ffffff", "#c7d2fe", "#93c5fd", "#a5b4fc"] },
        shape: { type: "circle" },
        links: { enable: false },

        opacity: {
          value: { min: 0.25, max: 1 },
          animation: { enable: true, speed: 1.2, startValue: "max", destroy: "min" },
        },

        size: {
          value: { min: 1, max: 4 },
          animation: { enable: true, speed: 8, startValue: "min", destroy: "max" },
        },

        move: {
          enable: true,
          direction: "none",
          outModes: { default: "destroy" },
          straight: true,
          decay: 0.06,
          speed: { min: 14, max: 38 },
        },
      },

      emitters: [
        {
          position: { x: 50, y: 50 },
          life: { count: 1, duration: 0.2, delay: 0 },
          rate: { quantity: 0, delay: 0.1 },
          bursts: [
            { delay: 0, quantity: 320, position: { x: 50, y: 50 } },
          ],
        },
        {
          position: { x: 50, y: 50 },
          life: { count: 1, duration: 0.2, delay: 0.06 },
          rate: { quantity: 0, delay: 0.1 },
          bursts: [
            { delay: 0, quantity: 220, position: { x: 50, y: 50 } },
          ],
          particles: {
            move: { speed: { min: 8, max: 22 }, straight: true },
            opacity: { value: { min: 0.2, max: 0.9 } },
            size: { value: { min: 1, max: 3 } },
          },
        },
      ],
    }),
    []
  );

  // Don’t render anything unless active
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
    {/* Darken + soften the page briefly */}
    <div className="absolute inset-0 bg-black/55 backdrop-blur-sm nova-fade" />

    {/* Flash + shockwave (visual only) */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="nova-flash" />
    <div className="nova-ring nova-ring-1" />
    <div className="nova-ring nova-ring-2" />
    <div className="nova-ring nova-ring-3" />
    </div>

    {/* Particle debris (also visual only) */}
    {ready && (
    <div className="absolute inset-0 pointer-events-none">
        <Particles
        id="supernova"
        options={options}
        className="w-full h-full"
        />
    </div>
    )}

    {/* Message (still non-interactive) */}
    <div className="absolute inset-0 flex items-end justify-center pb-14 pointer-events-none">
    <div className="rounded-2xl bg-white/10 px-6 py-3 text-center text-white backdrop-blur">
        <div className="text-2xl font-bold">Happy anniversary 🪐</div>
        <div className="text-sm text-white/80">another orbit together ✨</div>
    </div>
    </div>
</div>
);
}
