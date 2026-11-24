"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

interface HeaderProps {
  logoUrl?: string | null;
  logoAlt?: string;
  siteName?: string;
}

const Header = ({
  logoUrl,
  logoAlt,
  siteName = "TechNova Solutions",
}: HeaderProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200
      bg-white/95 backdrop-blur dark:border-gray-800
      dark:bg-gray-950/95"
    >
      <div
        className="mx-auto flex h-16 max-w-7xl items-center
        justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight
            text-blue-700 dark:text-blue-400"
        >
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={logoAlt || siteName}
              width={180}
              height={48}
              unoptimized={logoUrl.endsWith(".svg")}
              className="h-10 w-auto object-contain"
              loading="eager"
            />
          )}
          <span>{siteName}</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm font-medium transition ${
                isActive(item.href)
                  ? "text-blue-700 dark:text-blue-400"
                  : "text-gray-600 hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            type="button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center
              rounded-lg text-gray-700 hover:bg-gray-100
              dark:text-gray-200 dark:hover:bg-gray-800 md:hidden"
          >
            {isMenuOpen ? (
              <span aria-hidden="true" className="text-2xl">
                ×
              </span>
            ) : (
              <span aria-hidden="true" className="text-2xl">
                ☰
              </span>
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-gray-200 bg-white px-4 py-4
            dark:border-gray-800 dark:bg-gray-950 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
