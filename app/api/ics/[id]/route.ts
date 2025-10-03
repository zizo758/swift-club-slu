import { NextResponse } from "next/server";
import events from "@/content/events.json";

function icsEscape(input: string) {
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/[,;]/g, (c) => `\\${c}`);
}

function pad(n: number) { return String(n).padStart(2, "0"); }
function toUtcZ(dt: Date) {
  const y = dt.getUTCFullYear();
  const m = pad(dt.getUTCMonth() + 1);
  const d = pad(dt.getUTCDate());
  const hh = pad(dt.getUTCHours());
  const mm = pad(dt.getUTCMinutes());
  const ss = pad(dt.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

export async function GET(_req: Request, { params }: { params: { id: string }}) {
  const ev = (events as any[]).find((e) => e.id === params.id);
  if (!ev) return new NextResponse("Event not found", { status: 404 });

  const start = new Date(ev.date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2h default
  const now = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Swift Club SLU//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${ev.id}@swiftclubslu`,
    `DTSTAMP:${toUtcZ(now)}`,
    `DTSTART:${toUtcZ(start)}`,
    `DTEND:${toUtcZ(end)}`,
    `SUMMARY:${icsEscape(ev.title)}`,
    ev.location ? `LOCATION:${icsEscape(ev.location)}` : "",
    ev.details ? `DESCRIPTION:${icsEscape(ev.details)}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
    ""
  ].filter(Boolean);

  const body = lines.join("\r\n");
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${ev.id}.ics"`,
    },
  });
}
