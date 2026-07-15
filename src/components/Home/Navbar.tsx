"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, Menu, X, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoggedIn = !isPending && !!session?.user;

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/events/add", label: "Add Event" },
    { href: "/events/manage", label: "Manage Events" },
    { href: "/about", label: "About" },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-violet-700 font-bold text-lg">
            <Calendar size={22} />
            EventHub
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-violet-700 bg-violet-50"
                    : "text-slate-600 hover:text-violet-700 hover:bg-violet-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <>
                <Link href="/signin" className="text-sm font-medium text-slate-600 hover:text-violet-700">
                  Sign In
                </Link>
                <Link href="/signup">
                  <Button className="!px-4 !py-2 !text-sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                  pathname === link.href
                    ? "text-violet-700 bg-violet-50"
                    : "text-slate-600 hover:bg-violet-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2 pt-2 border-t border-slate-100">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-red-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-2 px-3">
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-slate-600 py-1.5"
                  >
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <Button fullWidth className="!text-sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}