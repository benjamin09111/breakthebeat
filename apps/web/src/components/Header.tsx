"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import navbarData from "@/data/navbar.json";

interface NavbarData {
  logo: string;
  links: { label: string; href: string }[];
  rightLinks: { label: string; href: string; dropdown?: boolean }[];
}

const data = navbarData as NavbarData;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 text-3xl font-black tracking-tighter text-white z-50 relative">
            <img src="/logo.jpeg" alt="Logo" className="w-10 h-10 object-cover rounded-full" />
            {data.logo}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {data.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white text-sm font-bold tracking-widest uppercase hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-8">
            {data.rightLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-1">
                <Link
                  href={link.href}
                  className="text-white text-sm font-semibold tracking-wide hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
                {link.dropdown && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white mt-[2px]"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </div>
            ))}
            {/* <a
              href="/portafolio.pdf"
              download="portafolio.pdf"
              className="bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500 text-cyan-400 px-5 py-2.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
            >
              Descargar portafolio en PDF
            </a> */}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[6px] w-[24px]">
              <span
                className={`h-[2px] w-full bg-white transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                  }`}
              />
              <span
                className={`h-[2px] w-full bg-white transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`h-[2px] w-full bg-white transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-opacity duration-500 lg:hidden ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center text-white">
          {data.links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-2xl font-black uppercase tracking-widest hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px w-24 bg-white/20 my-4" />
          {data.rightLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-lg font-medium opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* <a
            href="/portafolio.pdf"
            download="portafolio.pdf"
            className="mt-6 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Descargar portafolio en PDF
          </a> */}
        </nav>
      </div>
    </>
  );
}
