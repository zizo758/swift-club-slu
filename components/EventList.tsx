import events from "@/content/events.json";

export default function EventList() {
  const items = [...events].sort((a, b) => a.date > b.date ? 1 : -1);
  return (
    <div className="space-y-4">
      {items.map(ev => (
        <div key={ev.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border rounded-lg p-4 bg-white">
          <div>
            <p className="text-xs text-gray-500">{new Date(ev.date).toLocaleString()}</p>
            <p className="font-semibold">{ev.title}</p>
            <p className="text-sm text-gray-700">{ev.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <a className="text-sm underline" href={ev.mapUrl} target="_blank" rel="noreferrer">Map</a>
          </div>
        </div>
      ))}
    </div>
  );
}
