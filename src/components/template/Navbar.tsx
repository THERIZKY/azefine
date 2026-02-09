'use client'

import { BookOpen, Briefcase, Hexagon, Home, LogOut, Menu, Moon, ShieldCheck, ShoppingBag, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/components/AuthUserProvider";
import ThemeToggle from "./ThemeToggle";


const AzefineLogo = () => (
  <div className="flex items-center gap-2.5 group cursor-pointer">
    <div className="w-11 h-11 bg-brand-gradient  rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 transition-transform duration-300 group-hover:rotate-6">
      <Hexagon strokeWidth={2.5} size={28} className="fill-black/10" />
    </div>
    <div className="flex flex-col justify-center">
      <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
        Azefine
      </span>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const user = useCurrentUser();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Tentang', path: '/about', icon: <ShieldCheck size={18} /> },
    { name: 'Layanan', path: '/services', icon: <Briefcase size={18} /> },
    { name: 'Toko', path: '/store', icon: <ShoppingBag size={18} /> },
    { name: 'Blog', path: '/blog', icon: <BookOpen size={18} /> },
  ];

  // const isActive = navLinks.some((link) => pathname === link.path)
  const isActive = (path: string) => pathname === path;


  // Logout
  const handleLogout = () => {
    setIsOpen(false);
    signOut({ callbackUrl: "/login" });
  };



  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b  ${scrolled
      ? 'bg-white/10 dark:bg-black/50 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 shadow-sm py-2'
      : 'bg-white dark:bg-black/80 border-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <AzefineLogo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-semibold transition-all duration-200 relative group py-2 ${isActive(link.path)
                  ? 'text-brand dark:text-brand-light underline underline-offset-4 decoration-[3px] decoration-brand'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {link.name}
                {/* Hover Underline Animation */}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand rounded-full transform transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link href="/user-dashboard" className="text-sm font-bold text-slate-700 dark:text-white hover:text-brand flex items-center gap-2 group">
                  <div className="w-9 h-9 rounded-full bg-brand-gradient text-white flex items-center justify-center text-xs ring-2 ring-transparent group-hover:ring-brand/30 transition-all">
                    {(user.name ?? "U").charAt(0)}
                  </div>
                  <span className="hidden xl:inline">{user.name ?? "Member"}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="default" className="!py-2.5 !px-6 text-sm !rounded-full shadow-brand/20">
                  <Link href="/login">Masuk</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 dark:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-darkbg border-t border-slate-100 dark:border-slate-800 shadow-xl p-4 animate-in slide-in-from-top-5">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${isActive(link.path)
                  ? 'bg-brand/10 text-brand'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-2">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient text-white flex items-center justify-center text-sm font-bold">
                      {(user.name ?? "U").charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{user.name ?? "Member"}</span>
                      <span className="text-xs text-slate-500">{user.email ?? "—"}</span>
                    </div>
                  </div>
                  <Button asChild variant="default" className="w-full">
                    <Link href="/user-dashboard" onClick={() => setIsOpen(false)}>Dashboard Member</Link>
                  </Button>
                  {user.role === 'admin' && (
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/admin" onClick={() => setIsOpen(false)}>Admin Panel</Link>
                    </Button>
                  )}
                  <button onClick={handleLogout} className="w-full py-3 text-red-500 font-bold flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Button asChild variant="default" className="w-full">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Masuk Akun</Link>
                  </Button>
                  <p className="text-center text-xs text-slate-400">Belum punya akun? Daftar gratis sekarang.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar
