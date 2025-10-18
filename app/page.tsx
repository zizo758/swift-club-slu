import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import NextMeetCard from "@/components/NextMeetCard";
import PostList from "@/components/PostList";
import EventList from "@/components/EventList";

export default function HomePage() {
  return (
    <div>
      <HeroSlideshow
        intervalMs={5000}
        maxImages={18}
        overlay={
          <div className="max-w-xl text-white">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow">Swift Club SLU</h1>
            <p className="mt-2 text-sm md:text-base opacity-95">
              Drive, community, pride. A club dedicated to Suzuki Swift owners and enthusiasts in Saint Lucia.
            </p>
            <div className="mt-4 flex gap-2">
              <Link href="/activities" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-light">Next Meet</Link>
              <Link href="/news" className="px-4 py-2 rounded-md border border-white/70 bg-white/10 backdrop-blur hover:bg-white/20">Latest News</Link>
            </div>
          </div>
        }
      />

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