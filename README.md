# tutrquiz

A 160-question quiz on the Cognition (a.k.a. `tutr`) tech stack, split into 14 sections. Each question covers a real technical or product choice in the codebase and ends with a one-line pitch angle you can use when explaining the stack to a highly technical audience.

The quiz app mirrors the stack it's teaching — Next 15 App Router, React 19, TypeScript, Tailwind v4 — so the repo doubles as a working sample of the visual system and framework choices.

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Modes

- **Quick 10** — 10 random questions, ~3 min.
- **Drill 25** — 25 random questions, ~10 min.
- **Full set** — all 160, ~30–45 min.
- **By section** — pick any of the 14 sections to focus-drill.

Missed questions surface at the end with the answer, the explanation, and the pitch angle so you can run a focused review pass.

## Sections

| Section | Coverage |
|---|---|
| Framework & Runtime | Next 15, React 19, TypeScript, Tailwind v4, build config |
| Auth & Identity | Clerk, orgs, key prefixes (cog_me vs cog_live), kill switches |
| Data & Postgres | Supabase, RLS-as-defense-in-depth, service role, schema breadth |
| Brain Model · Neurons & Memory | Six memory systems, neuron roles, spaced-repetition params |
| Skills & Cognitive Layer | SKILL.md, circuits, traces, plasticity, value receipts |
| MCP Protocol & Server | SDK, endpoint shape, versioning, three-layer update model |
| Pedagogy & Self-Update | Hosted instructions, version bumps, managed block |
| Product Flow & Surfaces | `/welcome` funnel, MCP handshake, `/clo` canvas swap |
| Design System | Ink-on-canvas, single orange accent, mono display |
| Infra & Observability | Vercel, Sentry, PostHog proxy, OAuth discovery, smoke tests |
| Validation, Email & Deps | zod, Resend, framer-motion, OpenRouter, lucide |
| Testing & Quality | Jest, Playwright, ESLint, Prettier, smoke tests |
| Monorepo, CLI & Extension | Workspaces, `cognition-cli`, `memory-stack-cli`, browser extension |
| CLO Product & Positioning | The L&D nervous system pitch, ICP, ROI math, wedges |

## Add a question

Open `src/lib/questions.ts` and push another entry onto `QUESTIONS`. The shape is:

```ts
{
  id: "kebab-slug",
  category: "framework", // one of the 14 Category values
  stem: "Question text?",
  options: ["A", "B", "C", "D"],
  correctIndex: 0,
  explanation: "Why this is the answer — cite a file or doc.",
  pitchAngle: "One sentence you'd say to a technical audience.",
}
```

Keep the pitch angle to one sentence — that's the part you'll actually internalise.

## Files

```
src/
  app/
    layout.tsx       # root metadata + globals import
    page.tsx         # intro → playing → done; filter + state
    globals.css      # Tailwind v4 + Cognition design tokens
  lib/
    questions.ts     # CATEGORY_META + QUESTIONS bank
package.json         # Next 15, React 19, Tailwind v4 — same stack as tutr
```
