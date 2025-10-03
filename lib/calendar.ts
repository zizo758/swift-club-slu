export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO with timezone offset, e.g., 2025-10-12T14:00:00-04:00
  location?: string;
  details?: string;
};

function pad(n: number) { return String(n).padStart(2, "0"); }

/** Convert a date to Google’s UTC format: YYYYMMDDTHHMMSSZ */
export function toGoogleUtc(date: Date): string {
  const y = date.getUTCFullYear();
  const m = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const mm = pad(date.getUTCMinutes());
  const ss = pad(date.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

/** Build a Google Calendar URL (default duration 2h) */
export function googleCalendarUrl(ev: CalendarEvent, durationMinutes = 120): string {
  const start = new Date(ev.date);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const dates = `${toGoogleUtc(start)}/${toGoogleUtc(end)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates,
    details: ev.details || "",
    location: ev.location || "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
