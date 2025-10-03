import EventList from "@/components/EventList";
import CalendarMonth from "@/components/CalendarMonth";

export default function ActivitiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Activities & Events</h1>
      <p className="mb-4 text-gray-700">Our upcoming cruises, meets, and community activities.</p>
      <EventList />

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Calendar</h2>
        <p className="text-sm text-gray-700 mb-3">Click a day to see its events. Use Prev/Next to navigate months.</p>
        <div className="rounded-xl overflow-hidden"><CalendarMonth /></div>
      </div>
    </div>
  );
}
