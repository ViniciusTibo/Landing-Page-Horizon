"use client";

import { ArrowUpRight, Monitor, ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type FocusEvent } from "react";

import { cn } from "@/lib/utils";

const projects = [
  {
    category: "Site institucional",
    title: "Presença que inspira confiança",
    description: "Uma experiência clara para apresentar sua marca, seus diferenciais e transformar visitas em novos contatos.",
    accent: "from-blue-600 to-cyan-400",
    icon: Monitor,
    layout: "institutional",
  },
  {
    category: "Landing page",
    title: "Campanhas feitas para converter",
    description: "Mensagem objetiva, navegação fluida e chamadas estratégicas para aproximar clientes da sua empresa.",
    accent: "from-indigo-600 to-blue-400",
    icon: Sparkles,
    layout: "landing",
  },
  {
    category: "E-commerce",
    title: "Produtos em uma vitrine memorável",
    description: "Uma jornada de compra rápida, responsiva e preparada para destacar o que você vende.",
    accent: "from-violet-600 to-blue-500",
    icon: ShoppingBag,
    layout: "commerce",
  },
] as const;

function ProjectPreview({ layout, accent }: { layout: string; accent: string }) {
  return (
    <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50 p-3 shadow-inner shadow-slate-950/[0.03]">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white bg-white shadow-lg shadow-blue-950/[0.08]">
        <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-slate-100 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          <span className="ml-2 h-1.5 w-16 rounded-full bg-slate-100" />
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 p-4">
          <div className="flex flex-col justify-center">
            <span className={cn("mb-3 h-1 w-10 rounded-full bg-gradient-to-r", accent)} />
            <span className="h-3 w-full rounded bg-slate-900" />
            <span className="mt-1.5 h-3 w-3/4 rounded bg-slate-900" />
            <span className="mt-3 h-1.5 w-full rounded bg-slate-200" />
            <span className="mt-1.5 h-1.5 w-4/5 rounded bg-slate-200" />
            <span className={cn("mt-4 h-6 w-20 rounded-full bg-gradient-to-r", accent)} />
          </div>

          <div className={cn("relative overflow-hidden rounded-lg bg-gradient-to-br", accent)}>
            <div className="absolute inset-3 rounded-md border border-white/30 bg-white/15 backdrop-blur-sm" />
            {layout === "commerce" ? (
              <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-2">
                <span className="h-10 rounded bg-white/80" />
                <span className="h-10 rounded bg-white/60" />
              </div>
            ) : null}
            {layout === "landing" ? (
              <span className="absolute bottom-5 left-5 right-5 h-1 rounded-full bg-white/70" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHasEntered(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "-5% 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocusedIndex(null);
  };

  return (
    <section
      ref={sectionRef}
      id="trabalhos"
      className="relative -mt-px scroll-mt-16 overflow-hidden bg-[linear-gradient(to_bottom,#ffffff_0%,#f8fafc_14rem,#f8fafc_100%)] px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="projects-title"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl" />

      <div className={cn("projects-section-reveal relative mx-auto max-w-7xl", hasEntered && "projects-section-visible")}>
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Projetos que ganham vida
          </span>
          <h2 id="projects-title" className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Seu site aparecerá aqui
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-7 text-slate-600 sm:text-base">
            Cada projeto nasce de uma estratégia única. Passe o mouse pelos cards e imagine sua empresa ocupando o próximo espaço.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-3" onMouseLeave={() => setFocusedIndex(null)}>
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isFocused = focusedIndex === index;
            const hasFocus = focusedIndex !== null;

            return (
              <article
                key={project.category}
                tabIndex={0}
                onMouseEnter={() => setFocusedIndex(index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={handleBlur}
                className={cn(
                  "group relative cursor-default overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-blue-950/[0.05] outline-none transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4",
                  isFocused && "z-10 -translate-y-2 scale-[1.025] border-blue-300 shadow-2xl shadow-blue-600/15",
                  hasFocus && !isFocused && "scale-[0.975] opacity-45 blur-[1.5px]",
                )}
              >
                <ProjectPreview layout={project.layout} accent={project.accent} />

                <div className="px-2 pb-3 pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {project.category}
                    </span>
                    <ArrowUpRight className={cn("h-5 w-5 text-slate-300 transition-all duration-300", isFocused && "-translate-y-0.5 translate-x-0.5 text-blue-600")} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500 md:hidden">
          Toque em um card para colocá-lo em foco.
        </p>
      </div>
    </section>
  );
}
