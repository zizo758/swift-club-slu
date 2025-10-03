import { notFound } from "next/navigation";
import gallery from "@/content/gallery.json";
import GalleryLightbox from "@/components/GalleryLightbox";
import Link from "next/link";

export default function AlbumPage({ params }: { params: { category: string, album: string }}) {
  const cat = gallery.categories.find(c => c.slug === params.category);
  if (!cat) return notFound();
  const alb = (cat.albums || []).find(a => a.slug === params.album);
  if (!alb) return notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-600 mb-4">
        <Link href="/gallery" className="underline">Gallery</Link> <span>/</span> 
        <Link href={`/gallery/${cat.slug}`} className="underline">{cat.title}</Link> <span>/</span> 
        <span>{alb.title}</span>
      </nav>

      <h1 className="text-3xl font-bold">{alb.title}</h1>
      <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-2">
        {alb.date && <span className="odometer-badge">{new Date(alb.date).toLocaleDateString()}</span>}
        {alb.location && <span className="odometer-badge">{alb.location}</span>}
      </div>
      {alb.header && <p className="mt-4 text-gray-700">{alb.header}</p>}

      <div className="mt-6">
        <GalleryLightbox images={alb.images || []} />
      </div>
    </div>
  );
}
