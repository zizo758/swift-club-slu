import Link from "next/link";
import gallery from "@/content/gallery.json";

export default function GalleryCategoryList() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {gallery.categories.map(cat => {
        const count = cat.albums?.length ?? 0;
        return (
          <Link key={cat.slug} href={`/gallery/${cat.slug}`} className="block border rounded-lg p-5 bg-white hover:shadow">
            <h3 className="text-lg font-semibold">{cat.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{cat.description}</p>
            <p className="text-xs text-gray-500 mt-3">{count} album{count === 1 ? "" : "s"}</p>
          </Link>
        );
      })}
    </div>
  );
}
