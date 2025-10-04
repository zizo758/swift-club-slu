"use client";
import { useEffect, useMemo, useState } from "react";
import events from "@/content/events.json";
import { googleCalendarUrl } from "@/lib/calendar";

const TZ = "America/St_Lucia";

function getNextEvent() {
  const now = new Date();
  const upcoming = events
    .map(e => ({...e, dateObj: new Date(e.date)}))
    .filter(e => e.dateObj >= now)
    .sort((a, b) => +a.dateObj - +b.dateObj);
  return upcoming[0] || null;
}

function useCountdown(targetDate: Date | null) {
  const [diff, setDiff] = useState<number>(0);
  useEffect(() => {
    if (!targetDate) return;
    const update = () => setDiff(targetDate.getTime() - Date.now());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  if (!targetDate || diff <= 0) return null;
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

export default function NextMeetCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const next = useMemo(() => getNextEvent(), []);
  const countdown = useCountdown(mounted && next ? new Date(next.date) : null);

  if (!next) return null;

  const formatted = new Date(next.date).toLocaleString(undefined, {
    timeZone: TZ,
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <section id="next-meet" className="max-w-6xl mx-auto px-4 my-10">
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="grid md:grid-cols-[2fr,1fr]">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Next Meet</h2>
            <p className="mt-2 text-lg">{next.title}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span className="odometer-badge" suppressHydrationWarning>{formatted}</span>
              <span className="odometer-badge">{next.location}</span>
              <a href={next.mapUrl} target="_blank" rel="noreferrer" className="odometer-badge underline">Map</a>
            </div>
            <p className="mt-4 text-gray-700">{next.details}</p>
            <div className="mt-4 flex items-center gap-2">
  <a className="odometer-badge underline" href={googleCalendarUrl(next as any)} target="_blank" rel="noreferrer">
    Add to Google
  </a>
  <a className="odometer-badge underline" href={`/api/ics/${next.id}`} target="_blank" rel="noreferrer">
    Download .ics
  </a>
</div>
<div className="mt-3 text-xs italic text-gray-500">
  Dates & times are subject to change. Check our Instagram for last-minute updates.
</div>


            {mounted && countdown && (
              <div className="mt-6 flex flex-wrap gap-3" suppressHydrationWarning>
                <div className="odometer-badge">{countdown.days}d</div>
                <div className="odometer-badge">{countdown.hours}h</div>
                <div className="odometer-badge">{countdown.minutes}m</div>
                <div className="odometer-badge">{countdown.seconds}s</div>
              </div>
            )}
          </div>
          <div className="h-56 md:h-full border-l">
            <img src={next.image || "/hero.jpg"} alt={next.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
