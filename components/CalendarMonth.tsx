"use client";
import { useEffect, useMemo, useState } from "react";
import events from "@/content/events.json";
import { googleCalendarUrl } from "@/lib/calendar";

const TZ = "America/St_Lucia";

type Ev = {
  id: string;
  title: string;
  date: string;
  location?: string;
  mapUrl?: string;
  image?: string;
  details?: string;
};

function ymdInTZ(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const y = parts.find(p => p.type === "year")?.value || "";
  const m = parts.find(p => p.type === "month")?.value || "";
  const d = parts.find(p => p.type === "day")?.value || "";
  return `${y}-${m}-${d}`;
}

function startOfMonth(d: Date) { return new Date(d.getFullYear(), d.getMonth(), 1); }
function addMonths(d: Date, n: number) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }

export default function CalendarMonth() {
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState<Date>(() => new Date());
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  // Build event map keyed by YYYY-MM-DD in TZ
  const { map, upcomingKey } = useMemo(() => {
    const m = new Map<string, Ev[]>();
    const now = new Date();
    let upcoming: string | null = null;
    [...events].forEach((e: any) => {
      const d = new Date(e.date);
      const key = ymdInTZ(d);
      const arr = m.get(key) || [];
      arr.push(e as Ev);
      m.set(key, arr);
      if (d >= now && !upcoming) upcoming = key;
    });
    for (const [k, arr] of m.entries()) {
      arr.sort((a, b) => (new Date(a.date)).getTime() - (new Date(b.date)).getTime());
      m.set(k, arr);
    }
    return { map: m, upcomingKey: upcoming };
  }, []);

  const monthStart = startOfMonth(cursor);
  const firstDayIndex = monthStart.getDay(); // 0=Sun
  const gridStart = new Date(monthStart);
  gridStart.setDate(gridStart.getDate() - firstDayIndex);
  const days: { date: Date; key: string; inMonth: boolean; isToday: boolean; }[] = [];

  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const key = ymdInTZ(d);
    const inMonth = d.getMonth() === monthStart.getMonth();
    const todayKey = ymdInTZ(new Date());
    const isToday = key === todayKey;
    days.push({ date: d, key, inMonth, isToday });
  }

  const monthLabel = new Intl.DateTimeFormat(undefined, { timeZone: TZ, month: "long", year: "numeric" }).format(monthStart);

  if (!mounted) return <div className="border rounded-lg p-4 bg-white text-sm text-gray-600">Loading calendar…</div>;

  return (
    <div className="border rounded-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
        <div className="text-lg font-semibold" suppressHydrationWarning>{monthLabel}</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setCursor(addMonths(cursor, -1))}>Prev</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setCursor(new Date())}>Today</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => setCursor(addMonths(cursor, 1))}>Next</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-xs text-gray-600 border-b">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="px-2 py-2 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {days.map((d) => {
          const eventsForDay = map.get(d.key) || [];
          const isUpcoming = d.key === upcomingKey;
          return (
            <button
              key={d.key}
              onClick={() => setSelected(d.key)}
              className={[
                "h-24 p-2 text-left border",
                d.inMonth ? "bg-white" : "bg-gray-50 text-gray-400",
                selected === d.key ? "ring-2 ring-primary" : "",
                isUpcoming ? "ring-1 ring-accent-gold" : ""
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className={["text-sm font-medium", d.isToday ? "text-primary" : ""].join(" ")}>
                  {new Intl.DateTimeFormat(undefined, { timeZone: TZ, day: "numeric" }).format(d.date)}
                </span>
                {eventsForDay.length > 0 && <span className="h-2 w-2 rounded-full bg-primary" />}
              </div>
              <div className="mt-1 space-y-1">
                {eventsForDay.slice(0, 2).map(ev => (
                  <div key={ev.id} className="text-[11px] truncate px-1 py-0.5 rounded bg-gray-100">{ev.title}</div>
                ))}
                {eventsForDay.length > 2 && <div className="text-[11px] text-gray-500">+{eventsForDay.length - 2} more</div>}
              </div>
            </button>
          );
        })}
      </div>

      <DayDetail selectedKey={selected || upcomingKey || undefined} map={map} />
    </div>
  );
}

type MapType = Map<string, Ev[]>;

function DayDetail({ selectedKey, map }: { selectedKey?: string; map: MapType }) {
  if (!selectedKey) return null;
  const items = map.get(selectedKey) || [];
  if (items.length === 0) return null;

  const label = new Date(items[0].date);
  const header = new Intl.DateTimeFormat(undefined, { timeZone: TZ, dateStyle: "full" }).format(label);

  return (
    <div className="border-t p-4">
      <h3 className="font-semibold">{header}</h3>
      <p className="mt-1 text-xs italic text-gray-500">
  Dates & times are subject to change.
</p>
      <div className="mt-2 space-y-3">
        {items.map(ev => (
          <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg">
            <div>
              <div className="font-medium">{ev.title}</div>
              <div className="text-sm text-gray-600">
                {new Intl.DateTimeFormat(undefined, { timeZone: TZ, timeStyle: "short" }).format(new Date(ev.date))}
                {ev.location ? ` • ${ev.location}` : ""}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {ev.mapUrl && <a className="text-sm underline" href={ev.mapUrl} target="_blank" rel="noreferrer">Map</a>}
            </div>
            <a className="text-sm underline" href={googleCalendarUrl(ev)} target="_blank" rel="noreferrer">
  Add to Calendar
</a>
<a className="text-sm underline" href={`/api/ics/${ev.id}`} target="_blank" rel="noreferrer">
  .ics
</a>
          </div>
        ))}
      </div>
    </div>
  );
}
