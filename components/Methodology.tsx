"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  CreditCard,
  Gauge,
  LayoutTemplate,
  MessageSquareText,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";

interface MethodologyStep {
  title: string;
  eyebrow: string;
  description: string;
  details: string[];
  milestone: string;
  icon: LucideIcon;
}

const steps: MethodologyStep[] = [
  {
    title: "Reunião de alinhamento",
    eyebrow: "Imersão",
    description:
      "Entendemos o negócio, o público e o resultado que o novo site precisa gerar.",
    details: ["Objetivos e prioridades", "Referências visuais", "Escopo e integrações"],
    milestone: "Briefing e direção do projeto definidos",
    icon: MessageSquareText,
  },
  {
    title: "Design do site",
    eyebrow: "Experiência",
    description:
      "Transformamos a estratégia em uma interface clara, responsiva e alinhada à marca.",
    details: ["Arquitetura das páginas", "Layout de alta fidelidade", "Rodada de aprovação"],
    milestone: "Design aprovado antes do desenvolvimento",
    icon: LayoutTemplate,
  },
  {
    title: "Entrada de 50%",
    eyebrow: "Confirmação",
    description:
      "Com o visual aprovado, a entrada formaliza o início da etapa de desenvolvimento.",
    details: ["Escopo validado", "Cronograma confirmado", "Início da implementação"],
    milestone: "Projeto liberado para produção",
    icon: CreditCard,
  },
  {
    title: "Criação do site",
    eyebrow: "Desenvolvimento",
    description:
      "Construímos o projeto com código limpo, responsividade e atenção aos detalhes.",
    details: ["Implementação responsiva", "Integrações necessárias", "SEO técnico essencial"],
    milestone: "Versão completa disponível para revisão",
    icon: Code2,
  },
  {
    title: "Testes e validação",
    eyebrow: "Qualidade",
    description:
      "Antes da entrega, validamos desempenho, segurança e funcionamento em diferentes telas.",
    details: ["Velocidade e Core Web Vitals", "Dispositivos e navegadores", "Checklist de segurança"],
    milestone: "Site homologado e pronto para publicar",
    icon: Gauge,
  },
  {
    title: "Pagamento final",
    eyebrow: "Aprovação",
    description:
      "Após a homologação, concluímos o saldo para preparar a publicação definitiva.",
    details: ["Aprovação final", "Saldo de 50%", "Preparação da entrega"],
    milestone: "Publicação autorizada",
    icon: ShieldCheck,
  },
  {
    title: "Lançamento do site",
    eyebrow: "Go live",
    description:
      "Colocamos o projeto no ar e conferimos toda a experiência no ambiente definitivo.",
    details: ["Domínio e hospedagem", "Analytics e indexação", "Verificação pós-lançamento"],
    milestone: "Seu novo site pronto para gerar oportunidades",
    icon: Rocket,
  },
];

export default function Methodology() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeStep = steps[activeIndex];
  const ActiveIcon = activeStep.icon;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasEntered(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-5% 0px -8% 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), steps.length - 1));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
  };

  return (
    <section
      ref={sectionRef}
      id="metodologia"
      className="relative -mt-px overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="methodology-title"
      onKeyDown={handleKeyDown}
    >
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-3xl" />

      <div
        className={cn(
          "methodology-section-reveal relative mx-auto max-w-6xl",
          hasEntered && "methodology-section-visible",
        )}
      >
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">
            Nossa metodologia
          </span>
          <h2
            id="methodology-title"
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
          >
            Do primeiro briefing ao lançamento
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-7 text-slate-600 sm:text-base">
            Um processo transparente, dividido em etapas claras. Você acompanha, aprova e sabe exatamente o que acontece a seguir.
          </p>
        </header>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Etapas do projeto">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Abrir etapa ${index + 1}: ${step.title}`}
              aria-pressed={index === activeIndex}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
                index === activeIndex
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-500 hover:border-blue-200 hover:text-slate-800",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[18rem_1fr] lg:gap-10">
          <nav className="hidden lg:block" aria-label="Etapas da metodologia">
            <ol className="space-y-1">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === activeIndex;

                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
                        isActive
                          ? "border-blue-200 bg-blue-50 text-slate-950"
                          : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <span className={cn("text-xs tabular-nums", isActive && "text-blue-600")}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <StepIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium">{step.title}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div
            className="min-w-0"
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const distance = event.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(distance) > 50) goTo(activeIndex + (distance < 0 ? 1 : -1));
              touchStartX.current = null;
            }}
          >
            <article
              key={activeIndex}
              className="methodology-card-enter relative min-h-[27rem] overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-950/[0.07] sm:p-10 lg:min-h-[30rem]"
              aria-live="polite"
            >
              <div className="absolute right-5 top-4 font-mono text-6xl font-semibold text-blue-950/[0.04] sm:right-8 sm:top-5 sm:text-8xl">
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              <div className="relative flex h-full flex-col">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-600">
                  <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">
                  {activeStep.eyebrow}
                </span>
                <h3 className="mt-3 max-w-xl text-2xl font-semibold text-slate-950 sm:text-4xl">
                  {activeStep.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  {activeStep.description}
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {activeStep.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span className="font-medium text-slate-900">Marco da etapa:</span>{" "}
                    {activeStep.milestone}
                  </div>
                </div>
              </div>
            </article>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {activeIndex + 1} de {steps.length}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  neon={false}
                  onClick={() => goTo(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label="Etapa anterior"
                  className="flex h-10 w-10 items-center justify-center p-0"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  neon={false}
                  onClick={() => goTo(activeIndex + 1)}
                  disabled={activeIndex === steps.length - 1}
                  aria-label="Próxima etapa"
                  className="flex h-10 items-center gap-2 px-4"
                >
                  Próxima
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
