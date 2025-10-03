import Hero from "@/components/Hero";
import NextMeetCard from "@/components/NextMeetCard";
import PostList from "@/components/PostList";
import EventList from "@/components/EventList";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <NextMeetCard />
      <section className="max-w-6xl mx-auto px-4 my-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link href="/news" className="text-sm underline">View all</Link>
        </div>
        <PostList limit={3} />
      </section>
      <section className="max-w-6xl mx-auto px-4 my-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Upcoming Activities</h2>
          <Link href="/activities" className="text-sm underline">View all</Link>
        </div>
        <EventList />
      </section>
    </div>
  );
}
