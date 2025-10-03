export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="tire-divider h-full w-full" />
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-16 relative">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <div className="flex items-center gap-3">
              <picture>
                <source srcSet="/logo.png" type="image/png" />
                <img src="/logo.svg" alt="Swift Club SLU" className="h-20 w-auto" />
              </picture>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                Swift Club SLU
              </h1>
            </div>
            <p className="mt-4 text-lg text-gray-700 max-w-prose">
              Drive, community, pride. A club dedicated to Suzuki Swift owners and enthusiasts in Saint Lucia.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#next-meet" className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary-light">Next Meet</a>
              <a href="/news" className="px-5 py-3 border rounded-lg hover:bg-gray-50">Latest News</a>
            </div>
          </div>
          <div className="h-56 md:h-72 rounded-xl overflow-hidden border">
            <img src="/hero.jpg" alt="Swift lineup" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
