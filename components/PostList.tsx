import Link from "next/link";
import news from "@/content/news.json";

export default function PostList({ limit }: { limit?: number }) {
  const posts = [...news].sort((a, b) => a.date < b.date ? 1 : -1);
  const list = typeof limit === "number" ? posts.slice(0, limit) : posts;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map(post => (
        <article key={post.id} className="border rounded-lg overflow-hidden bg-white">
          <img src={post.image} alt={post.title} className="h-40 w-full object-cover" />
          <div className="p-4">
            <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
            <h3 className="text-lg font-semibold mt-1">
              <Link href={`/news/${post.id}`} className="hover:underline">{post.title}</Link>
            </h3>
            <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
