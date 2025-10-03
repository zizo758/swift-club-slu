import GalleryCategoryList from "@/components/GalleryCategoryList";

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>
      <p className="text-gray-700 mb-6">Explore photos from our meets, cruises, and community events.</p>
      <GalleryCategoryList />
    </div>
  );
}
