import Link from "next/link";

type Album = {
  slug: string;
  title: string;
  date?: string;
  location?: string;
  cover?: string;
};

export default function GalleryAlbumGrid({ albums, categorySlug }: { albums: Album[]; categorySlug: string; }) {
  if (!albums || albums.length === 0) {
    return <p className="text-gray-600">No albums yet in this category.</p>;
  }
  const list = [...albums].sort((a, b) => (a.date || "") < (b.date || "") ? 1 : -1);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map(a => (
        <article key={a.slug} className="border rounded-lg overflow-hidden bg-white">
          <div className="h-40 w-full bg-gray-100 overflow-hidden">
            <img src={a.cover || "/hero.jpg"} alt={a.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500">{a.date ? new Date(a.date).toLocaleDateString() : ""}</p>
            <h3 className="text-lg font-semibold">
              <Link href={`/gallery/${categorySlug}/${a.slug}`} className="hover:underline">{a.title}</Link>
            </h3>
            {a.location && <p className="text-sm text-gray-700 mt-1">{a.location}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
