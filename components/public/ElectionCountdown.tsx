"use client";

import { useSyncExternalStore } from "react";

interface ElectionCountdownProps {
  endDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EMPTY_TIME: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function calculateTimeLeft(endDate: string, now: number): TimeLeft {
  const difference = new Date(endDate).getTime() - now;

  if (now === 0 || difference <= 0) {
    return EMPTY_TIME;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

let currentTime = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(callback: () => void) {
  listeners.add(callback);

  if (!timer) {
    currentTime = Date.now();
    callback();

    timer = setInterval(() => {
      currentTime = Date.now();
      listeners.forEach((listener) => listener());
    }, 1000);
  }

  return () => {
    listeners.delete(callback);

    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

function getCurrentTime() {
  return currentTime;
}

function getServerTime() {
  return 0;
}

export default function ElectionCountdown({
  endDate,
}: ElectionCountdownProps) {
  const now = useSyncExternalStore(
    subscribe,
    getCurrentTime,
    getServerTime,
  );

  const timeLeft = calculateTimeLeft(endDate, now);

  const cardClass =
    "rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-center backdrop-blur";

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Voting Ends In</h2>

        <p className="mt-2 text-slate-400">
          Cast your vote before the election closes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className={cardClass}>
          <p className="text-5xl font-black text-cyan-400">
            {timeLeft.days}
          </p>
          <p className="mt-3 text-slate-400">Days</p>
        </div>

        <div className={cardClass}>
          <p className="text-5xl font-black text-cyan-400">
            {timeLeft.hours}
          </p>
          <p className="mt-3 text-slate-400">Hours</p>
        </div>

        <div className={cardClass}>
          <p className="text-5xl font-black text-cyan-400">
            {timeLeft.minutes}
          </p>
          <p className="mt-3 text-slate-400">Minutes</p>
        </div>

        <div className={cardClass}>
          <p className="text-5xl font-black text-cyan-400">
            {timeLeft.seconds}
          </p>
          <p className="mt-3 text-slate-400">Seconds</p>
        </div>
      </div>
    </section>
  );
}
