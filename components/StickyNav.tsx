"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#hero", label: "トップ" },
  { href: "#message", label: "メッセージ" },
  { href: "#achievements", label: "実績" },
  { href: "#profile", label: "プロフィール" },
  { href: "#contact", label: "お問い合わせ" },
];

const sectionIds = ["hero", "message", "achievements", "profile", "contact"];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      aria-label="メインナビゲーション"
      className={`fixed top-0 left-0 right-0 z-50 bg-navy transition-all duration-200 ${
        scrolled ? "shadow-lg shadow-navy/30" : "border-b border-white/10"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        {/* Brand */}
        <a
          href="#hero"
          onClick={handleLinkClick}
          className="flex flex-col leading-tight"
        >
          <span className="text-sm font-light tracking-widest text-gold/80">
            徳島市議会議員
          </span>
          <span className="text-base font-semibold tracking-[0.1em] text-white">
            森本さとこ
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm tracking-wider transition-colors duration-150 pb-0.5 ${
                    isActive
                      ? "text-gold border-b-2 border-gold font-medium"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          aria-label="ナビゲーションメニューを開く"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          className="border-t border-white/10 bg-navy-dark md:hidden"
        >
          <ul role="menu">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    onClick={handleLinkClick}
                    className={`flex h-12 items-center px-6 text-sm tracking-wider transition-colors duration-150 ${
                      isActive
                        ? "border-l-4 border-gold text-gold bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
