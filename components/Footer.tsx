export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200">
      <div className="tire-divider h-2 w-full" />
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>&copy; {new Date().getFullYear()} Swift Club SLU. All rights reserved.</p>
        <p className="text-gray-500">Built with ❤️ in Saint Lucia.</p>
      </div>
    </footer>
  );
}
