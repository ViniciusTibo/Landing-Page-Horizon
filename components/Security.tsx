"use client";

import { CheckCircle2, FileCheck2, Gauge, LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const safeguards = [
  {
    icon: ShieldCheck,
    title: "Proteção desde o código",
    description: "Boas práticas de desenvolvimento, HTTPS, controle de acessos e configurações seguras desde a primeira linha.",
  },
  {
    icon: Gauge,
    title: "Testes antes do lançamento",
    description: "Validamos desempenho, formulários, responsividade, dependências e pontos críticos antes de publicar.",
  },
  {
    icon: FileCheck2,
    title: "Privacidade e LGPD",
    description: "Aplicamos minimização de dados, transparência e recursos de consentimento conforme a necessidade do projeto.",
  },
] as const;

export default function Security() {
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHasEntered(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "-5% 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="seguranca"
      className="relative -mt-px overflow-hidden bg-[linear-gradient(to_bottom,#f8fafc_0%,#eff6ff_12rem,#ffffff_100%)] px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="security-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.10),transparent_65%)]" />

      <div className={cn("security-section-reveal relative mx-auto max-w-7xl", hasEntered && "security-section-visible")}>
        <div className="overflow-hidden rounded-[2rem] bg-[#07142e] shadow-2xl shadow-blue-950/15">
          <div className="relative grid gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(96,165,250,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.10)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
            <div className="pointer-events-none absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px]" />

            <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
              <span className="security-lock-orbit absolute inset-0 rounded-full border border-blue-400/15" />
              <span className="security-lock-orbit-reverse absolute inset-8 rounded-full border border-dashed border-cyan-300/20" />
              <span className="absolute inset-16 rounded-full bg-blue-500/15 blur-xl" />
              <div className="security-lock-core relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-blue-300/30 bg-gradient-to-br from-blue-500/30 to-indigo-600/20 shadow-[0_0_70px_rgba(59,130,246,.38)] backdrop-blur-xl sm:h-40 sm:w-40">
                <LockKeyhole className="h-14 w-14 text-blue-100 sm:h-16 sm:w-16" strokeWidth={1.5} aria-hidden="true" />
                <span className="absolute inset-x-7 bottom-4 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
              </div>
              <span className="absolute right-5 top-14 flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-emerald-200 backdrop-blur-md sm:right-1 sm:top-20">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Validado
              </span>
            </div>

            <div className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
                Segurança como diferencial
              </span>
              <h2 id="security-title" className="mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Seu site protegido antes mesmo de entrar no ar
              </h2>
              <p className="mt-6 max-w-2xl text-pretty text-sm leading-7 text-blue-100/75 sm:text-base">
                Segurança não é um ajuste de última hora. Cada projeto passa por uma etapa dedicada de testes e validações antes da publicação, com práticas alinhadas aos princípios da LGPD.
              </p>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {safeguards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-blue-300/30 hover:bg-blue-400/10">
                      <Icon className="h-5 w-5 text-blue-300" aria-hidden="true" />
                      <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-blue-100/65">{item.description}</p>
                    </article>
                  );
                })}
              </div>

              <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-blue-100/55">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
                A adequação completa à LGPD também considera os processos internos e o tratamento de dados realizado pela sua empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
