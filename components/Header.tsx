"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Portfólio", href: "#trabalhos" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-200/40 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-8",
          isScrolled ? "h-16" : "h-20",
        )}
      >
        <a href="#inicio" className="group flex items-center gap-2" aria-label="Horizon — início">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-sm font-semibold text-blue-600 shadow-sm transition-transform group-hover:scale-105">
            H
          </span>
          <span className="text-sm font-semibold tracking-[0.2em] text-slate-950">HORIZON</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-700"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Orçamento
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 shadow-sm md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-slate-200/70 bg-white transition-[grid-template-rows,opacity] duration-300 md:hidden",
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <nav className="min-h-0" aria-label="Navegação mobile">
          <div className="space-y-1 px-5 py-4">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Pedir orçamento
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
