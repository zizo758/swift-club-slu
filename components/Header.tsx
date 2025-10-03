"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/activities", label: "Activities" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <picture>
            <source srcSet="/logo.png" type="image/png" />
            <img src="/logo.svg" alt="Swift Club SLU" className="h-12 w-auto" />
          </picture>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://www.instagram.com/swiftsport_slu/"
            target="_blank"
            rel="noreferrer"
            className="text-sm px-3 py-2 border rounded-md hover:bg-gray-50"
          >
            IG
          </a>
          <a
            href="https://form.jotform.com/233574837581871"
            target="_blank"
            rel="noreferrer"
            className="text-sm px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-light"
          >
            Join
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md border"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="tire-divider h-2 w-full" />

      {/* Mobile panel */}
      {open && (
        <div className="sm:hidden border-t border-gray-200 bg-white shadow-md">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base ${
                  pathname === item.href ? "bg-gray-100 text-primary" : "text-gray-800 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center gap-2 pt-2 border-t">
              <a
                href="https://www.instagram.com/swiftsport_slu/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 border rounded-md"
              >
                IG
              </a>
              <a
                href="https://form.jotform.com/233574837581871"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-primary text-white rounded-md"
              >
                Join
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
