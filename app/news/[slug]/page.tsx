import news from "@/content/news.json";
import { notFound } from "next/navigation";

export default function PostPage({ params }: { params: { slug: string }}) {
  const post = news.find(p => p.id === params.slug);
  if (!post) return notFound();
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
      <h1 className="text-3xl font-bold mt-1">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg border my-6" />
      <p className="text-lg text-gray-800 leading-7">{post.content}</p>
    </div>
  );
}
