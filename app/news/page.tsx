import PostList from "@/components/PostList";

export default function NewsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">News</h1>
      <PostList />
    </div>
  );
}
