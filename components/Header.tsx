"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/activities", label: "Activities" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <picture>
            <source srcSet="/logo.png" type="image/png" />
            <img src="/logo.svg" alt="Swift Club SLU" className="h-12 w-auto" />
          </picture>
        </Link>
        <nav className="hidden sm:flex items-center gap-4">
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary ${pathname === item.href ? "text-primary" : "text-gray-700"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/swiftsport_slu/"
            target="_blank"
            rel="noreferrer"
            className="text-sm px-3 py-2 border rounded-md hover:bg-gray-50"
          >
            Our Instagram
          </a>
          <a
            href="https://form.jotform.com/233574837581871"
            target="_blank"
            rel="noreferrer"
            className="text-sm px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
          >
            Become a Member
          </a>
        </div>
      </div>
      <div className="tire-divider h-2 w-full" />
    </header>
  );
}
