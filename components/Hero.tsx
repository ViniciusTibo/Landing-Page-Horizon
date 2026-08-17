"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import { buttonVariants } from "@/components/ui/neon-button";
import { WHATSAPP_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

const TITLE_PREFIX = "Um Horizonte de";
const TITLE_SUFFIX = "Oportunidades";
const FULL_TITLE = `${TITLE_PREFIX} ${TITLE_SUFFIX}`;

export default function Hero() {
  const [characterCount, setCharacterCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const typedText = FULL_TITLE.slice(0, characterCount);
  const typedPrefix = typedText.slice(0, TITLE_PREFIX.length);
  const typedSuffix = typedText.slice(TITLE_PREFIX.length).trimStart();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCharacterCount(FULL_TITLE.length);
      setIsComplete(true);
      return;
    }

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const typingTimer = window.setInterval(() => {
      setCharacterCount((current) => {
        const next = Math.min(current + 1, FULL_TITLE.length);
        if (next === FULL_TITLE.length) {
          window.clearInterval(typingTimer);
          revealTimer = setTimeout(() => setIsComplete(true), 250);
        }
        return next;
      });
    }, 58);

    return () => {
      window.clearInterval(typingTimer);
      if (revealTimer) clearTimeout(revealTimer);
    };
  }, []);

  return (
    <section id="inicio" className="relative flex h-[100svh] min-h-[40rem] w-full scroll-mt-20 items-start justify-center overflow-hidden bg-white px-5 pb-16 pt-[18svh] sm:items-center sm:py-20">
      <CosmicParallaxBg loop />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-36 bg-gradient-to-b from-transparent via-white/70 to-white sm:h-48"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-5 text-center sm:-translate-y-4 sm:gap-7">
        <h1
          className="min-h-[2.05em] max-w-4xl font-sans text-[2.05rem] font-extrabold uppercase leading-[1.02] tracking-[0.01em] text-slate-950 text-shadow-glow min-[390px]:text-[2.2rem] sm:text-[clamp(2.75rem,7vw,5rem)] sm:tracking-[0.025em]"
          aria-label={FULL_TITLE}
        >
          <span className="block" aria-hidden="true">
            {typedPrefix}
            {!typedSuffix && <span className="typewriter-caret" />}
          </span>
          <span className="block min-h-[1.02em] text-blue-600" aria-hidden="true">
            {typedSuffix}
            {typedSuffix && !isComplete && <span className="typewriter-caret" />}
          </span>
        </h1>

        <div
          className={cn(
            "hero-supporting-content flex w-full flex-col items-center",
            isComplete && "hero-supporting-content-visible",
          )}
        >
          <div className="flex w-full max-w-[19rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
            <a
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "group mx-0 flex w-full justify-center sm:w-auto",
              )}
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar orçamento sem compromisso pelo WhatsApp"
            >
              <span className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium tracking-wide sm:text-base">
                <MessageCircle className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                Quero fazer meu orçamento
              </span>
            </a>
            <a
              href="#metodologia"
              className={cn(
                buttonVariants({ variant: "solid", size: "lg" }),
                "group mx-0 flex w-full items-center justify-center gap-2 sm:w-auto",
              )}
            >
              <span className="whitespace-nowrap text-sm font-medium tracking-wide sm:text-base">Saiba mais</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
