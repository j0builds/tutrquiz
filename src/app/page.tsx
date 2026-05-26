"use client";

import { useMemo, useState } from "react";
import {
  QUESTIONS,
  CATEGORY_META,
  questionsByCategory,
  type Category,
  type Question,
} from "@/lib/questions";

type Phase = "intro" | "playing" | "done";
type Filter = { kind: "all" } | { kind: "category"; category: Category } | { kind: "quick"; n: number };

function shuffle<T>(arr: T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function pickQuestions(filter: Filter): Question[] {
  if (filter.kind === "all") return shuffle(QUESTIONS);
  if (filter.kind === "category") {
    return shuffle(QUESTIONS.filter((q) => q.category === filter.category));
  }
  return shuffle(QUESTIONS).slice(0, filter.n);
}

export default function Page() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [order, setOrder] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState<Question[]>([]);

  const current = order[index];
  const total = order.length;
  const isLast = index === total - 1;

  const progressLabel = useMemo(
    () =>
      total > 0
        ? `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
        : "",
    [index, total],
  );

  function start(next: Filter) {
    setFilter(next);
    setOrder(pickQuestions(next));
    setIndex(0);
    setPicked(null);
    setScore(0);
    setMissed([]);
    setPhase("playing");
  }

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.correctIndex) setScore((s) => s + 1);
    else setMissed((m) => [...m, current]);
  }

  function next() {
    if (isLast) {
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  if (phase === "intro") return <Intro onStart={start} />;

  if (phase === "done") {
    return (
      <Done
        score={score}
        total={total}
        missed={missed}
        filter={filter}
        onRestart={() => start(filter)}
        onHome={() => setPhase("intro")}
      />
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-12 px-6 py-16 sm:px-12 sm:py-24">
      <header className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-6">
        <button
          onClick={() => setPhase("intro")}
          className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink)] hover:text-[var(--color-ink-50)]"
        >
          tutrquiz
        </button>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
          {progressLabel} · score {score}
        </span>
      </header>

      <section className="flex flex-col gap-8">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-orange)]">
          {CATEGORY_META[current.category].label}
        </span>
        <h1 className="font-mono text-2xl font-light leading-snug tracking-tight text-[var(--color-ink)] sm:text-3xl">
          {current.stem}
        </h1>

        <ul className="flex flex-col gap-3">
          {current.options.map((opt, i) => {
            const isPicked = picked === i;
            const isCorrect = i === current.correctIndex;
            const revealed = picked !== null;

            let stateClass =
              "border-[var(--color-border-strong)] hover:bg-[var(--color-surface-elevated)]";
            if (revealed && isCorrect) {
              stateClass = "border-[var(--color-orange)] bg-[var(--color-orange-soft)]";
            } else if (revealed && isPicked && !isCorrect) {
              stateClass =
                "border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] text-[var(--color-ink-50)] line-through";
            } else if (revealed) {
              stateClass = "border-[var(--color-border-default)] text-[var(--color-ink-50)]";
            }

            return (
              <li key={i}>
                <button
                  onClick={() => pick(i)}
                  disabled={revealed}
                  className={`flex w-full items-start gap-4 border px-5 py-4 text-left text-base transition-colors ${stateClass}`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {picked !== null && (
          <div className="flex flex-col gap-6 border border-[var(--color-border-default)] bg-[var(--color-surface-elevated)] p-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
                Why
              </span>
              <p className="text-base leading-relaxed">{current.explanation}</p>
            </div>
            <div className="flex flex-col gap-2 border-l-2 border-[var(--color-orange)] pl-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-orange)]">
                Pitch angle
              </span>
              <p className="text-base leading-relaxed text-[var(--color-ink)]">
                {current.pitchAngle}
              </p>
            </div>
            <button
              onClick={next}
              className="self-start bg-[var(--color-orange)] px-6 py-3 font-mono text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#ff8c42]"
            >
              {isLast ? "See results" : "Next →"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function Intro({ onStart }: { onStart: (f: Filter) => void }) {
  const grouped = useMemo(() => questionsByCategory(), []);
  const categories = Object.keys(CATEGORY_META) as Category[];

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-16 px-6 py-16 sm:px-12 sm:py-20">
      <header className="flex flex-col gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
          tutrquiz · {QUESTIONS.length} questions · {categories.length} sections
        </span>
        <h1 className="font-mono text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
          learn the
          <br />
          <span className="text-[var(--color-orange)]">cognition</span>
          <br />
          stack.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--color-ink-70)] sm:text-lg">
          Every question covers a real technical or product choice in the tutr / Cognition
          codebase. Each answer surfaces the <em>why</em> and a one-line pitch angle for a
          highly technical audience. Drill a section, hammer a quick 10, or run the full set.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
          Quick start
        </span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PrimaryButton onClick={() => onStart({ kind: "quick", n: 10 })}>
            Quick 10 →
          </PrimaryButton>
          <PrimaryButton onClick={() => onStart({ kind: "quick", n: 25 })}>
            Drill 25 →
          </PrimaryButton>
          <PrimaryButton onClick={() => onStart({ kind: "all" })}>
            Full {QUESTIONS.length} →
          </PrimaryButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
          Or pick a section
        </span>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat];
            const count = grouped[cat]?.length ?? 0;
            return (
              <li key={cat}>
                <button
                  onClick={() => onStart({ kind: "category", category: cat })}
                  className="flex w-full flex-col items-start gap-2 border border-[var(--color-border-default)] p-5 text-left transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-elevated)]"
                >
                  <div className="flex w-full items-baseline justify-between gap-4">
                    <span className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-ink)]">
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-ink-50)]">
                      {String(count).padStart(2, "0")} Q
                    </span>
                  </div>
                  <span className="text-sm leading-relaxed text-[var(--color-ink-70)]">
                    {meta.blurb}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

function Done({
  score,
  total,
  missed,
  filter,
  onRestart,
  onHome,
}: {
  score: number;
  total: number;
  missed: Question[];
  filter: Filter;
  onRestart: () => void;
  onHome: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const filterLabel =
    filter.kind === "all"
      ? "Full set"
      : filter.kind === "quick"
        ? `Quick ${filter.n}`
        : CATEGORY_META[filter.category].label;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-12 px-6 py-16 sm:px-12 sm:py-24">
      <header className="flex items-center justify-between border-b border-[var(--color-border-default)] pb-6">
        <button
          onClick={onHome}
          className="font-mono text-xs uppercase tracking-[0.14em] hover:text-[var(--color-ink-50)]"
        >
          ← tutrquiz
        </button>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
          done · {filterLabel}
        </span>
      </header>

      <section className="flex flex-col gap-6">
        <h1 className="font-mono text-6xl font-light leading-none tracking-tight sm:text-8xl">
          {score}
          <span className="text-[var(--color-ink-30)]">/{total}</span>
        </h1>
        <p className="text-lg text-[var(--color-ink-70)]">
          {pct}% — {labelFor(pct)}
        </p>
      </section>

      {missed.length > 0 && (
        <section className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-orange)]">
            Drill these · {missed.length}
          </span>
          <ul className="flex flex-col gap-6">
            {missed.map((q) => (
              <li
                key={q.id}
                className="flex flex-col gap-3 border border-[var(--color-border-default)] p-5"
              >
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-ink-50)]">
                  {CATEGORY_META[q.category].label}
                </span>
                <p className="font-mono text-base leading-snug">{q.stem}</p>
                <p className="text-sm leading-relaxed text-[var(--color-ink-70)]">
                  <strong className="text-[var(--color-ink)]">
                    {q.options[q.correctIndex]}
                  </strong>{" "}
                  — {q.explanation}
                </p>
                <p className="border-l-2 border-[var(--color-orange)] pl-3 text-sm leading-relaxed">
                  {q.pitchAngle}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRestart}
          className="bg-[var(--color-orange)] px-6 py-3 font-mono text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#ff8c42]"
        >
          Run it again →
        </button>
        <button
          onClick={onHome}
          className="border border-[var(--color-border-strong)] px-6 py-3 font-mono text-sm uppercase tracking-[0.14em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-surface-elevated)]"
        >
          Pick another section
        </button>
      </div>
    </main>
  );
}

function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--color-orange)] px-6 py-4 font-mono text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#ff8c42]"
    >
      {children}
    </button>
  );
}

function labelFor(pct: number): string {
  if (pct === 100) return "you can pitch this in your sleep.";
  if (pct >= 85) return "ready for a technical audience.";
  if (pct >= 65) return "solid — drill the missed ones below.";
  if (pct >= 40) return "halfway there. take another lap.";
  return "open the deck and run it again.";
}
