import { notFound } from "next/navigation";
import gallery from "@/content/gallery.json";
import GalleryAlbumGrid from "@/components/GalleryAlbumGrid";
import Link from "next/link";

export default function CategoryPage({ params }: { params: { category: string }}) {
  const cat = gallery.categories.find(c => c.slug === params.category);
  if (!cat) return notFound();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-600 mb-4">
        <Link href="/gallery" className="underline">Gallery</Link> <span>/</span> <span>{cat.title}</span>
      </nav>
      <h1 className="text-3xl font-bold">{cat.title}</h1>
      {cat.description && <p className="text-gray-700 mt-2 mb-6">{cat.description}</p>}
      <GalleryAlbumGrid albums={cat.albums || []} categorySlug={cat.slug} />
    </div>
  );
}
