export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">About Swift Club SLU</h1>
      <p className="text-gray-800 leading-7">
        We are a community of Suzuki Swift owners and enthusiasts in Saint Lucia.
        We stand for safe driving, respect for fellow road users, and uplifting our local car culture.
      </p>
      <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-800">
        <li>Regular meets and scenic cruises</li>
        <li>Sharing knowledge on maintenance and tasteful mods</li>
        <li>Community involvement and charity runs</li>
      </ul>
      <div className="mt-8 p-4 border rounded bg-gray-50">
        <h2 className="font-semibold">Club Rules / Code of Conduct</h2>
        <p className="text-sm text-gray-700 mt-1">
          Placeholder — add your official rules here later.
        </p>
      </div>
    </div>
  );
}
