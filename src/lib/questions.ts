export type Category =
  | "framework"
  | "auth"
  | "data"
  | "brain"
  | "skills"
  | "mcp"
  | "pedagogy"
  | "product-flow"
  | "design"
  | "infra"
  | "deps"
  | "testing"
  | "monorepo"
  | "positioning";

export const CATEGORY_META: Record<Category, { label: string; blurb: string }> = {
  framework: {
    label: "Framework & Runtime",
    blurb: "Next 15, React 19, TypeScript, Tailwind v4.",
  },
  auth: {
    label: "Auth & Identity",
    blurb: "Clerk, organisations, group keys vs personal keys.",
  },
  data: {
    label: "Data & Postgres",
    blurb: "Supabase, RLS-as-defense-in-depth, service role.",
  },
  brain: {
    label: "Brain Model · Neurons & Memory",
    blurb: "Six memory systems, neuron roles, spaced-repetition params.",
  },
  skills: {
    label: "Skills & Cognitive Layer",
    blurb: "SKILL.md, circuits, traces, plasticity, value receipts.",
  },
  mcp: {
    label: "MCP Protocol & Server",
    blurb: "SDK, endpoint shape, versioning, three-layer update model.",
  },
  pedagogy: {
    label: "Pedagogy & Self-Update",
    blurb: "Hosted instructions, version bumps, managed block.",
  },
  "product-flow": {
    label: "Product Flow & Surfaces",
    blurb: "/welcome funnel, MCP handshake, /clo canvas swap.",
  },
  design: {
    label: "Design System",
    blurb: "Ink-on-canvas, single orange accent, mono display.",
  },
  infra: {
    label: "Infra & Observability",
    blurb: "Vercel, Sentry, PostHog proxy, OAuth discovery, smoke tests.",
  },
  deps: {
    label: "Validation, Email & Deps",
    blurb: "zod, Resend, framer-motion, OpenRouter, lucide.",
  },
  testing: {
    label: "Testing & Quality",
    blurb: "Jest, Playwright, ESLint, Prettier, smoke tests.",
  },
  monorepo: {
    label: "Monorepo, CLI & Extension",
    blurb: "Workspaces, cognition-cli, memory-stack-cli, browser extension.",
  },
  positioning: {
    label: "CLO Product & Positioning",
    blurb: "The L&D nervous system pitch, ICP, ROI math, wedges.",
  },
};

export type Question = {
  id: string;
  category: Category;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pitchAngle: string;
};

export const QUESTIONS: Question[] = [
  // ─── Framework & Runtime ────────────────────────────────────────────────────
  {
    id: "next-version",
    category: "framework",
    stem: "Which Next.js version does the Cognition web app run on, and which router?",
    options: [
      "Next 13 with Pages Router",
      "Next 14 with App Router",
      "Next 15 with App Router",
      "Next 15 with Pages Router",
    ],
    correctIndex: 2,
    explanation: "package.json pins next ^15.5.7. Code is organised under src/app/ — App Router only.",
    pitchAngle:
      "Next 15 + App Router lets server components stream from the same edge that serves the MCP endpoint — one runtime, one deployment unit.",
  },
  {
    id: "react-version",
    category: "framework",
    stem: "Which React version powers the UI?",
    options: ["17", "18", "19", "Preact 10"],
    correctIndex: 2,
    explanation: "react and react-dom are pinned to 19.1.0.",
    pitchAngle: "React 19's compiler and server actions are the substrate — no separate state library tax.",
  },
  {
    id: "tailwind-v4",
    category: "framework",
    stem: "How is Tailwind configured?",
    options: [
      "Tailwind v3 with tailwind.config.js",
      "Tailwind v4 via @tailwindcss/postcss",
      "Hand-rolled utility CSS",
      "UnoCSS with Tailwind preset",
    ],
    correctIndex: 1,
    explanation: "postcss.config.mjs registers @tailwindcss/postcss — the v4 plugin model. v4 reads config from CSS, not JS.",
    pitchAngle:
      "Tailwind v4 is CSS-first — design tokens live next to styles, build is an order of magnitude faster than v3.",
  },
  {
    id: "ts-strict",
    category: "framework",
    stem: "Is TypeScript strict mode on in tsconfig.json?",
    options: ["Yes, strict: true", "No, only noImplicitAny", "Partial — strictNullChecks only", "It's a JS-only project"],
    correctIndex: 0,
    explanation: "tsconfig.json sets strict: true.",
    pitchAngle: "Strict TS means null-safety and type-narrowing on every route handler — fewer prod crashes by construction.",
  },
  {
    id: "build-ignore",
    category: "framework",
    stem: "next.config.ts sets typescript.ignoreBuildErrors and eslint.ignoreDuringBuilds — why?",
    options: [
      "To make the build faster",
      "Velocity tradeoff — types and lints are checked in CI/jest separately so prod deploys aren't blocked by a stale type",
      "Required by Vercel",
      "Bug in Next 15 that hasn't been patched",
    ],
    correctIndex: 1,
    explanation:
      "Deliberate config. Type/lint checks happen via jest + scripts so a single type drift doesn't stop a Vercel deploy.",
    pitchAngle:
      "Shipping speed matters more than build-time type-checks for us — types are still authoritative, just enforced outside the deploy path.",
  },
  {
    id: "image-formats",
    category: "framework",
    stem: "Which image formats does next.config.ts enable?",
    options: ["jpg + png only", "webp + avif", "webp only", "all formats Next supports by default"],
    correctIndex: 1,
    explanation: "images.formats: ['image/webp', 'image/avif'].",
    pitchAngle: "avif first, webp fallback — modern browsers get ~50% smaller payloads on hero imagery.",
  },
  {
    id: "image-qualities",
    category: "framework",
    stem: "Which image quality steps does next.config.ts allow?",
    options: ["100 only", "25, 50, 75, 85", "10–90 in steps of 10", "Default (no override)"],
    correctIndex: 1,
    explanation: "images.qualities: [25, 50, 75, 85].",
    pitchAngle: "Quality is a knob, not a default — heroes can be 85, list thumbnails can be 25, same component.",
  },
  {
    id: "compress",
    category: "framework",
    stem: "Is gzip compression enabled in next.config.ts?",
    options: ["Yes — compress: true", "No — handled by Vercel", "Brotli instead", "Per-route only"],
    correctIndex: 0,
    explanation: "compress: true in next.config.ts.",
    pitchAngle: "Compression at the framework layer, Vercel handles the CDN edge — defence in depth on transfer size.",
  },
  {
    id: "trailing-slash",
    category: "framework",
    stem: "Why is skipTrailingSlashRedirect: true set?",
    options: [
      "SEO preference",
      "PostHog reverse-proxy uses wildcard rewrites — a trailing-slash redirect would break the proxy",
      "Required for App Router",
      "Vercel CDN quirk",
    ],
    correctIndex: 1,
    explanation:
      "Inline comment: 'PostHog reverse proxy uses wildcard rewrites; don't redirect on trailing slash.'",
    pitchAngle:
      "Tiny config detail that makes the PostHog ad-block bypass actually work in production — easy to miss until analytics drop to zero.",
  },
  {
    id: "react-versions-exact",
    category: "framework",
    stem: "How are react and react-dom version-pinned in package.json?",
    options: [
      "Caret ranges (^19.1.0)",
      "Exact pins (19.1.0 — no range)",
      "Tilde ranges (~19.1.0)",
      "* — accept anything",
    ],
    correctIndex: 1,
    explanation: "Both pinned to '19.1.0' exact, not '^19.1.0'.",
    pitchAngle:
      "React 19 was new enough that a patch bump could change behaviour — exact pins protect us from a npm-install hot-fix changing the runtime.",
  },
  {
    id: "node-types",
    category: "framework",
    stem: "Which @types/node major version targets the build?",
    options: ["@types/node ^18", "@types/node ^20", "@types/node ^22", "Not declared"],
    correctIndex: 1,
    explanation: "@types/node ^20.19.11.",
    pitchAngle: "Node 20 LTS is the runtime contract — matches Vercel's default and Anthropic's MCP server reference.",
  },
  {
    id: "geistmono-display",
    category: "framework",
    stem: "Which display font is used for hero headlines at extreme scale (up to 240px)?",
    options: ["Inter", "GeistMono at weight 300", "Helvetica Neue Bold", "JetBrains Mono Bold"],
    correctIndex: 1,
    explanation: "DESIGN.md §3: GeistMono at 240px weight 300 is the brand statement.",
    pitchAngle: "Monospace as display = infrastructure built by people who respect the terminal. Visual cue, not just typography.",
  },

  // ─── Auth & Identity ─────────────────────────────────────────────────────
  {
    id: "auth-stack",
    category: "auth",
    stem: "What's the auth + data stack — and the gotcha that bites every new engineer?",
    options: [
      "NextAuth + Prisma — JWT in cookies",
      "Clerk + Supabase/Postgres — Clerk user IDs are strings, not UUIDs",
      "Supabase Auth + Supabase DB — UUIDs the schema joins on",
      "Auth0 + Firebase — numeric IDs",
    ],
    correctIndex: 1,
    explanation:
      "CLAUDE.md and AGENTS.md both flag it: 'Clerk IDs plus Supabase/Postgres. Clerk user IDs are strings, not UUIDs.'",
    pitchAngle: "Clerk gives SSO + orgs; Postgres gives the real query surface. The string-vs-UUID gotcha is one schema decision, settled forever.",
  },
  {
    id: "clerk-orgs",
    category: "auth",
    stem: "How is enterprise scope (workspace) represented?",
    options: [
      "A custom orgs table joined manually",
      "Clerk organisations — the user becomes admin of a Clerk org on the Enterprise welcome path",
      "Supabase Auth multi-tenant rooms",
      "JWT claims rewritten on each request",
    ],
    correctIndex: 1,
    explanation:
      "DESIGN.md §10.2: 'ENTERPRISE creates a Clerk org (user becomes admin), carries orgId into the MCP handshake as workspace_id.'",
    pitchAngle:
      "Enterprise plan = one Clerk org boundary. Same identity primitive Stripe and Linear use — no homegrown tenant model.",
  },
  {
    id: "mcp-keys",
    category: "auth",
    stem: "Two MCP key prefixes exist — what's the difference between cog_me_* and cog_live_*?",
    options: [
      "cog_me is dev, cog_live is prod",
      "cog_me_* = personal MCP install keys (the normal install path). cog_live_* = group/admin recovery keys shown once",
      "They're the same; the prefix is cosmetic",
      "cog_me_* is read-only, cog_live_* is read-write",
    ],
    correctIndex: 1,
    explanation:
      "docs/MCP.md: 'Personal keys (cog_me_...) are the normal MCP install keys. Group/admin keys (cog_live_...) are shown once for admin recovery and should not be shared as the default agent install key.'",
    pitchAngle:
      "Two key classes, two purposes. The shown-once group key is the break-glass; daily-driver keys are scoped to one user, one MCP install.",
  },
  {
    id: "api-keys-cols",
    category: "auth",
    stem: "Which columns must the production api_keys table include to support /start key minting?",
    options: [
      "Just key_hash and user_id",
      "user_id, user_email, expires_at, issued_via — plus the existing hash, prefix, org, permissions, active flag, environment, rate-limit cols",
      "Only the hash; everything else is JSONB",
      "It's a Redis cache, not a Postgres table",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md Start Flow Production Checklist enumerates exactly these required columns.",
    pitchAngle:
      "Every API key carries enough metadata to do audit + revocation + per-user rate-limiting without a join. Keys aren't opaque blobs.",
  },
  {
    id: "kill-switch",
    category: "auth",
    stem: "Which env var is the kill switch for open personal-key minting at /start?",
    options: [
      "DISABLE_SIGNUPS=true",
      "START_KEY_MINT_ENABLED=false",
      "CLERK_DISABLE=true",
      "There is no kill switch — disable the route",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'START_KEY_MINT_ENABLED is explicitly set. Use START_KEY_MINT_ENABLED=false as the kill switch.'",
    pitchAngle: "If we get hammered or an abuse pattern shows up, one env var flip stops new key minting without touching code or DB.",
  },
  {
    id: "rls-clerk",
    category: "auth",
    stem: "Why does Cognition NOT write user-scoped RLS policies tied to Clerk IDs?",
    options: [
      "Performance — RLS is too slow",
      "Clerk user IDs don't map to Supabase auth.uid(), so per-user RLS via anon key isn't possible",
      "Supabase doesn't support text-typed user IDs in RLS",
      "It does — there are per-Clerk-ID policies",
    ],
    correctIndex: 1,
    explanation:
      "supabase/rls-policies.sql comment: 'Since Clerk user IDs don't map to Supabase auth.uid(), we cannot write user-scoped RLS policies that work with anon key.'",
    pitchAngle:
      "We separated identity (Clerk) from data (Supabase) deliberately. Auth happens in app routes; RLS is defense-in-depth against a leaked anon key — not the primary check.",
  },
  {
    id: "consumer-fork",
    category: "auth",
    stem: "What does the CONSUMER fork on /welcome avoid creating?",
    options: [
      "A Clerk session",
      "A Clerk organisation — scope is personal, no org needed",
      "A Supabase row",
      "An MCP key",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.2: 'CONSUMER — scope = personal. No Clerk org.'",
    pitchAngle:
      "Solo learners don't pay the org tax. Enterprise gets the team brain; consumers get the personal brain. Same product, different scope token.",
  },

  // ─── Data & Postgres ──────────────────────────────────────────────────
  {
    id: "rls-strategy",
    category: "data",
    stem: "What's Cognition's RLS strategy?",
    options: [
      "Per-user policies tied to JWT claims",
      "DENY all anon-key operations; service_role bypasses RLS; auth happens in app routes (defense-in-depth)",
      "RLS off, all checks in code",
      "RLS off, all checks in a middleware proxy",
    ],
    correctIndex: 1,
    explanation:
      "rls-policies.sql header: 'DENY all operations via anon key. Service role key bypasses RLS automatically. Clerk handles all authentication at the application layer.'",
    pitchAngle:
      "RLS is the airbag, not the seatbelt. Real auth is Clerk-in-app; RLS catches the case where someone gets the anon key. Two locks, different keys.",
  },
  {
    id: "service-role",
    category: "data",
    stem: "What's the rule on SUPABASE_SERVICE_ROLE_KEY?",
    options: [
      "Bundled into the client for performance",
      "Set only on the server/runtime — RLS does not protect service-role calls, so every permission check must live in API routes",
      "Stored in localStorage with rotation",
      "Shared across consumer and enterprise tenants",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md production checklist spells it out exactly.",
    pitchAngle:
      "Service role = bypass key. It never leaves the server. Any leak = total breach, so we treat it like a private key.",
  },
  {
    id: "supabase-server",
    category: "data",
    stem: "Where does the canonical server-side Supabase client live?",
    options: [
      "src/lib/db.ts",
      "src/lib/supabase-server.ts",
      "src/server/supabase.ts",
      "src/lib/supabase.ts only — no server/client split",
    ],
    correctIndex: 1,
    explanation: "src/lib/supabase-server.ts is the server client; src/lib/supabase.ts is the public client.",
    pitchAngle:
      "Two files, two keys, two intents. Importing the wrong one is a code-review smell, not a runtime crash you find in prod.",
  },
  {
    id: "migration-files-count",
    category: "data",
    stem: "Roughly how many SQL files live in /supabase?",
    options: ["3–5", "10–15", "40+ schema and migration files", "It uses Prisma migrations only"],
    correctIndex: 2,
    explanation:
      "Counted: 40+ .sql files spanning api-keys, billing, brain-graph, brain-neurons, clo, customer funnel, judgment cases, measurement, memory, oauth, orgs, RLS, value evals, and dated migrations.",
    pitchAngle:
      "The schema is the product. Forty-plus files because every product concept (skills, neurons, decisions, receipts) has its own table — none are JSONB blobs hiding the model.",
  },
  {
    id: "core-tables",
    category: "data",
    stem: "Which is NOT a real top-level table?",
    options: ["brain_neurons", "clo_skills", "memory_stacks", "vector_embeddings_v3"],
    correctIndex: 3,
    explanation:
      "brain_neurons (brain-neurons-schema.sql), clo_skills referenced in AGENTS.md, memory_stacks (memory-stacks-schema.sql) all exist. vector_embeddings_v3 is fabricated.",
    pitchAngle: "Cognition isn't a vector store. Embeddings are an implementation detail; the primary data model is human-readable.",
  },
  {
    id: "judgment-cases",
    category: "data",
    stem: "judgment-cases-schema-2026-05-26.sql captures…",
    options: [
      "Customer support tickets",
      "Executive judgment cases — closed decisions that compile into decision patterns",
      "Legal compliance audit cases",
      "Failed unit-test cases",
    ],
    correctIndex: 1,
    explanation:
      "AGENTS.md: 'Decision patterns: executive judgment compiled from closed decisions and authored skills.' The schema is dated 2026-05-26.",
    pitchAngle:
      "Every closed decision is a row. Six months later we can show a team 'here's the judgment your CEO applied to a comparable situation' — that's the data flywheel.",
  },
  {
    id: "production-audit",
    category: "data",
    stem: "What's the purpose of PRODUCTION_DB_AUDIT_2026-05-03.md and the prod-v1-* SQL files?",
    options: [
      "Initial seed data",
      "A scheduled production schema cleanup — archived legacy data, dropped empty tables, with a runbook",
      "A demo seed for sales calls",
      "Backup of the staging schema",
    ],
    correctIndex: 1,
    explanation: "Filenames: prod-v1-archive-legacy-data, prod-v1-drop-empty-legacy, prod-v1-runbook — all dated 2026-05-03.",
    pitchAngle: "We don't accumulate junk schema. Quarterly schema audits are runbooked and dated, just like a real ops process.",
  },
  {
    id: "rls-table-count",
    category: "data",
    stem: "Roughly how many tables get ENABLE ROW LEVEL SECURITY in rls-policies.sql?",
    options: ["~5", "~15", "40+ tables", "Every table in the schema dynamically"],
    correctIndex: 2,
    explanation: "Counting ALTER TABLE … ENABLE ROW LEVEL SECURITY lines: 40+.",
    pitchAngle: "Every user-data table has RLS on. The default isn't 'sometimes on' — it's 'on, with deny-anon, audited in one file'.",
  },
  {
    id: "schema-cols-neuron",
    category: "data",
    stem: "Roughly how many columns does the brain_neurons table have?",
    options: ["~10", "~20", "30+ columns spanning identity, weights, signals, plasticity, retrieval stats", "It's a 3-column key-value table"],
    correctIndex: 2,
    explanation:
      "brain-neurons-schema.sql defines 30+ columns: weights (active/stable/silent), utility_ema, harm_ema, replay_priority, activation_signals, sparse_signature, teaching_contract, strength/stability/plasticity/uncertainty/beta, decay_score, retrieval/helped/lapse counts, etc.",
    pitchAngle:
      "Every neuron carries its own teach-and-decay model — strength, stability, plasticity, uncertainty. It's spaced repetition at a per-unit level, not at the deck level.",
  },
  {
    id: "neuron-indexes",
    category: "data",
    stem: "Which of these is NOT a real index on brain_neurons?",
    options: [
      "GIN index on activation_signals",
      "GIN index on sparse_signature",
      "BTREE index on (org_id, owner_user_id, replay_priority DESC)",
      "BRIN time-series index on last_activated_at",
    ],
    correctIndex: 3,
    explanation: "Real indexes: GIN on activation_signals, GIN on sparse_signature, btree on replay_priority. BRIN on last_activated_at is fabricated.",
    pitchAngle:
      "GIN indexes on signal arrays = sub-millisecond neuron activation. The schema is shaped for the query the agent actually makes.",
  },
  {
    id: "additive-only",
    category: "data",
    stem: "The brain-neurons-schema.sql header explicitly says…",
    options: [
      "'Drop existing schema before running'",
      "'Additive-only schema. Existing Cognition tables and runtime paths do not depend on this table unless the new neuron tools are called.'",
      "'Run only on the v2 cluster'",
      "'Requires Postgres 17 with pgvector'",
    ],
    correctIndex: 1,
    explanation: "Exact header text.",
    pitchAngle:
      "Schema changes are additive. New product surfaces never break old ones — neuron tables ship dark until the new MCP tools opt in.",
  },
  {
    id: "personal-keys-table",
    category: "data",
    stem: "Where do personal MCP keys (cog_me_*) get stored?",
    options: [
      "Clerk metadata",
      "supabase/personal-keys-schema.sql — a dedicated table",
      "JWT-signed and never persisted",
      "Same row as the user record",
    ],
    correctIndex: 1,
    explanation: "personal-keys-schema.sql is a top-level file in /supabase.",
    pitchAngle:
      "Keys are first-class rows. Revocation, expiry, audit trail — all single-row updates, no Clerk-side gymnastics.",
  },
  {
    id: "context-policy",
    category: "data",
    stem: "What does context-orchestrator-policies-2026-05-22.sql configure?",
    options: [
      "OpenAI context windows",
      "Per-task context-resolver policies for the harness — what gets loaded into the agent's working memory and what stays out",
      "Postgres connection pool limits",
      "Slack notification routing",
    ],
    correctIndex: 1,
    explanation: "Matches the work in src/lib/mcp/context-resolver.ts and src/lib/mcp/harness.ts.",
    pitchAngle:
      "We don't dump everything into context. A policy table decides what each task type gets — token budget, skill loads, deterministic vs latent routing.",
  },

  // ─── Brain Model: Neurons & Memory ──────────────────────────────────
  {
    id: "memory-systems",
    category: "brain",
    stem: "How many memory_system values does the brain_neurons CHECK constraint allow?",
    options: ["3", "4", "6", "8"],
    correctIndex: 2,
    explanation: "CHECK: memory_system IN ('episodic', 'semantic', 'procedural', 'executive', 'social', 'affective').",
    pitchAngle:
      "Six memory systems modelled after cognitive psychology — episodic, semantic, procedural, executive, social, affective. Not 'embeddings' versus 'metadata'.",
  },
  {
    id: "memory-systems-list",
    category: "brain",
    stem: "Which of these is NOT one of Cognition's six memory systems?",
    options: ["procedural", "executive", "affective", "associative"],
    correctIndex: 3,
    explanation: "Real: episodic, semantic, procedural, executive, social, affective.",
    pitchAngle: "Each memory system has different decay, retrieval, and replay characteristics — a one-size embedding store can't model that.",
  },
  {
    id: "neuron-roles",
    category: "brain",
    stem: "How many neuron_role values are allowed?",
    options: ["2", "4", "6", "10"],
    correctIndex: 2,
    explanation: "CHECK: neuron_role IN ('index', 'content', 'warning', 'sequence', 'schema', 'silent').",
    pitchAngle: "Six roles, six behaviours. A 'warning' neuron inhibits; an 'index' neuron routes; a 'content' neuron supplies. Same table, different semantics.",
  },
  {
    id: "neuron-roles-which",
    category: "brain",
    stem: "Which of these is NOT a valid neuron_role?",
    options: ["index", "content", "warning", "summary"],
    correctIndex: 3,
    explanation: "Real: index, content, warning, sequence, schema, silent.",
    pitchAngle: "The role taxonomy comes from how the agent uses the memory at retrieval — not from how the memory was created.",
  },
  {
    id: "health-states",
    category: "brain",
    stem: "Which set of health states does a neuron carry?",
    options: [
      "active / inactive",
      "use / ask / refresh / avoid_or_warn",
      "good / bad / unknown",
      "healthy / degraded / dead",
    ],
    correctIndex: 1,
    explanation: "CHECK: health IN ('use', 'ask', 'refresh', 'avoid_or_warn').",
    pitchAngle:
      "Each neuron knows if it should be applied silently, surfaced for confirmation, refreshed, or actively avoided. The retrieval policy reads off the row.",
  },
  {
    id: "visibility-scopes",
    category: "brain",
    stem: "Which visibility scopes does a neuron support?",
    options: [
      "public / private",
      "personal / cofounders / team / org",
      "user / team / global",
      "draft / published",
    ],
    correctIndex: 1,
    explanation: "CHECK: visibility IN ('personal', 'cofounders', 'team', 'org').",
    pitchAngle:
      "Founders share with cofounders before the whole team. Org-wide is the broadcast tier. The scope model maps to how real companies actually share judgment.",
  },
  {
    id: "spaced-rep-params",
    category: "brain",
    stem: "Which of these is NOT a spaced-repetition parameter on brain_neurons?",
    options: ["strength", "stability", "plasticity", "valence"],
    correctIndex: 3,
    explanation: "Real: strength, stability, plasticity, uncertainty, beta, decay_score. valence is not a column.",
    pitchAngle: "Spaced-repetition isn't a deck setting — it's per-neuron. Each unit decays at its own rate based on its retrieval history.",
  },
  {
    id: "active-vs-stable",
    category: "brain",
    stem: "Why does the schema carry active_weight, stable_weight, AND silent_weight separately?",
    options: [
      "Backwards compatibility — only one is read",
      "Three plasticity bands: short-term active recall, consolidated stable memory, and tagged-but-silent unused capacity",
      "A/B test infrastructure",
      "Sharding across three replicas",
    ],
    correctIndex: 1,
    explanation: "The triplet mirrors active/stable/silent plasticity in computational neuroscience and aligns with replay_priority + tag_until.",
    pitchAngle:
      "We model what cognitive science already proved: memory has multiple plasticity bands. One float-weight per neuron can't represent that.",
  },
  {
    id: "excites-inhibits",
    category: "brain",
    stem: "What do the excites and inhibits arrays do?",
    options: [
      "Tagging for search",
      "Excites = terms the neuron should re-surface; inhibits = terms it should suppress when it fires",
      "Excites = upvotes; inhibits = downvotes",
      "They're deprecated",
    ],
    correctIndex: 1,
    explanation:
      "Cognition's circuit assembly merges activated neurons' excites into 'apply' and inhibits into 'avoid' for the task-local cognitive circuit (matches the cognition_assist payload).",
    pitchAngle:
      "When a teammate's neuron fires, it doesn't just suggest what to do — it suppresses the failure modes that teammate learned to avoid. Excitation and inhibition, by design.",
  },
  {
    id: "teaching-contract",
    category: "brain",
    stem: "What does the teaching_contract JSONB column hold?",
    options: [
      "Legal text",
      "mustInclude, mustAvoid, and critiqueQuestions arrays — the contract another agent uses to self-check when applying the neuron",
      "Author signature",
      "Pricing for paid skills",
    ],
    correctIndex: 1,
    explanation: "Confirmed by cognition_assist response structure — teaching_contract is the apply/avoid/critique payload.",
    pitchAngle:
      "Every neuron ships with its own self-check rubric — what the calling agent must include, must avoid, and must answer about its work. Memory teaches, then audits.",
  },
  {
    id: "eligibility-traces",
    category: "brain",
    stem: "What's stored in brain_neuron_eligibility_traces?",
    options: [
      "Legal compliance trace",
      "Per-task activation records — which neurons fired, with what credit, for which session/circuit/query",
      "Audit log of admin actions",
      "Postgres replication state",
    ],
    correctIndex: 1,
    explanation: "Columns include trace_id, session_id, circuit_key, neuron_key, activation, credit, emitted_terms.",
    pitchAngle:
      "Every agent decision can be replayed against the neurons that fired it. RL-style eligibility traces, persisted — no hand-waving about why an agent acted.",
  },
  {
    id: "decay-score",
    category: "brain",
    stem: "What does the decay_score column let the retrieval layer do?",
    options: [
      "Mark rows for vacuum",
      "Rank neurons by current accessibility — feeds the 'forgetting curve' that triggers refresher tasks",
      "Boot-time cache invalidation",
      "Audit purpose only",
    ],
    correctIndex: 1,
    explanation: "decay_score (FLOAT, default 0.5) + last_outcome_at + review_at form the spaced-repetition state machine.",
    pitchAngle:
      "Decay isn't a query-time computation — it's a column. Refresher cron just SELECT WHERE decay_score < threshold AND review_at < now().",
  },
  {
    id: "indexes-purpose",
    category: "brain",
    stem: "Why does idx_brain_neurons_replay_priority order by replay_priority DESC?",
    options: [
      "Cosmetic",
      "The replay queue pulls highest-priority neurons first — DESC index lets that be an O(log n) scan instead of a sort",
      "Postgres requires DESC for composite indexes",
      "It's an artifact from a copy-paste",
    ],
    correctIndex: 1,
    explanation: "Standard pattern for priority-queue-as-table.",
    pitchAngle: "The replay queue is just an indexed Postgres view. No Redis, no separate queue service — Postgres does it well enough.",
  },
  {
    id: "circuit-payload-shape",
    category: "brain",
    stem: "A cognitive circuit's compactPrompt typically looks like…",
    options: [
      "A JSON blob with embeddings",
      "Lines like `RULE <verb>, <noun>, …` — one per activated content neuron, plus a circuit header",
      "Raw chat history",
      "A binary serialization",
    ],
    correctIndex: 1,
    explanation:
      "Observed cognition_assist circuit payload: 'RULE summarize, the, customer, situation, plain, language' style entries.",
    pitchAngle:
      "Compact prompts beat verbose ones. Each neuron compiles down to a one-line rule the model can absorb in 10 tokens — that's how you fit 50 neurons in a context window.",
  },
  {
    id: "neuron-stability-formula",
    category: "brain",
    stem: "Which fields are clearly designed to feed a Bayesian/SR update rule for each neuron?",
    options: [
      "active_weight only",
      "strength, stability, plasticity, uncertainty, beta",
      "decay_score only",
      "There's no update rule, weights are random",
    ],
    correctIndex: 1,
    explanation: "Those five floats mirror the parameters of SuperMemo/FSRS-style spaced repetition with Bayesian shrinkage.",
    pitchAngle:
      "The retrieval math is SuperMemo / FSRS-derived but applied to organisational knowledge. Each neuron has a Bayesian update; the org's knowledge gets sharper with feedback.",
  },

  // ─── Skills & Cognitive Layer ────────────────────────────────────────
  {
    id: "skills-storage",
    category: "skills",
    stem: "Where are approved Cognition skills stored?",
    options: [
      "As Markdown files in a Git repo",
      "In clo_skills as concrete SKILL.md bodies",
      "In an OpenAI vector store",
      "Encoded as embeddings in pgvector",
    ],
    correctIndex: 1,
    explanation: "AGENTS.md: 'Skills: approved procedural memory stored as concrete SKILL.md bodies in clo_skills.'",
    pitchAngle: "Skills are human-readable Markdown rows. Inspectable, diff-able, revocable. Not opaque embeddings.",
  },
  {
    id: "skill-required-sections",
    category: "skills",
    stem: "A canonical SKILL.md body should have which top-level headings?",
    options: [
      "# Intro, # Body, # Outro",
      "# When to fire, # Steps, # Checks, # Why it works",
      "# Author, # Date, # Description",
      "Free-form prose only",
    ],
    correctIndex: 1,
    explanation:
      "CLAUDE.md: 'draft a complete SKILL.md with `# When to fire`, `# Steps`, `# Checks`, and `# Why it works`.'",
    pitchAngle:
      "Every skill answers four questions: when does it fire, what do you do, how do you verify, why does it work. Smaller surface than a tutorial, sharper than a comment.",
  },
  {
    id: "skill-approval",
    category: "skills",
    stem: "Before cognition_save_skill is called, what must happen?",
    options: [
      "An automated linter pass",
      "The user sees the proposed skill name + full SKILL.md body and gives explicit approval; the call includes approved_by_user: true and approval_evidence",
      "A review from another agent",
      "Nothing — agents save autonomously",
    ],
    correctIndex: 1,
    explanation:
      "CLAUDE.md: 'Always show the user the proposed skill name and full SKILL.md body first… Only after explicit approval, call cognition_save_skill with approved_by_user: true and a short approval_evidence note.'",
    pitchAngle:
      "Agents propose; humans approve. The group brain only learns from approved skills — no autonomous self-modification, no surprise behaviour next session.",
  },
  {
    id: "skill-vs-neuron",
    category: "skills",
    stem: "What's the difference between a skill and a brain neuron?",
    options: [
      "They're synonyms",
      "Skill = human-authored SKILL.md (procedural memory). Neuron = compiled behavioural unit in brain_neurons that an activation circuit reads from",
      "Skill = paid, neuron = free",
      "Skill = local, neuron = cloud",
    ],
    correctIndex: 1,
    explanation: "AGENTS.md product concepts section is explicit.",
    pitchAngle:
      "Humans write skills. The system compiles them into neurons. Two layers: one inspectable for governance, one optimised for retrieval.",
  },
  {
    id: "skill-traces",
    category: "skills",
    stem: "Why does src/lib/mcp/skill-traces.ts exist?",
    options: [
      "Compliance audit log",
      "Records every time a skill is matched and applied — feeds plasticity, value-receipt, and skill-quality computations",
      "Distributed tracing for HTTP requests",
      "Storybook component traces",
    ],
    correctIndex: 1,
    explanation: "Pairs with skill-plasticity.ts, skill-quality.ts, skill-value.ts, skill-outcomes.ts.",
    pitchAngle:
      "Skills aren't fire-and-forget. Every match gets traced, every outcome reported, and the system learns which skills earn their token budget.",
  },
  {
    id: "skill-outcome",
    category: "skills",
    stem: "After applying a Cognition skill, what does the calling agent call?",
    options: [
      "Nothing — the system tracks usage server-side",
      "cognition_report_skill_outcome with helped: true|false and a missing_step note when it failed",
      "An OpenAI eval endpoint",
      "Sentry.captureMessage",
    ],
    correctIndex: 1,
    explanation: "CLAUDE.md mentor rules and src/lib/mcp/skill-outcomes.ts.",
    pitchAngle:
      "Skills are evaluated continuously by the agents that use them. Bad skills atrophy; good skills earn replay priority. It's a memory immune system.",
  },
  {
    id: "skill-plasticity",
    category: "skills",
    stem: "What is plastic-skill-synapses-2026-05-15.sql modelling?",
    options: [
      "Storage for skill thumbnails",
      "How skills wire to each other — co-firing skills strengthen their synapse so the agent learns which skills bundle",
      "A/B test buckets",
      "OAuth scope mapping",
    ],
    correctIndex: 1,
    explanation: "Pairs with src/lib/mcp/skill-plasticity.ts.",
    pitchAngle:
      "Skills that succeed together get linked. The agent learns that 'pitch-wedge' and 'demo-follow-up-email' fire as a pair, then surfaces them as a bundle.",
  },
  {
    id: "value-receipt",
    category: "skills",
    stem: "Why does the codebase have session-value-receipts-2026-05-11.sql and skill-value-receipts-2026-05-12.sql?",
    options: [
      "Stripe billing receipts",
      "Per-session and per-skill estimated-tokens-saved / time-saved records — the unit of measurable value Cognition delivers",
      "Slack message receipts",
      "Email open tracking",
    ],
    correctIndex: 1,
    explanation:
      "value-evals-2026-05-14.sql + impact-receipts.ts confirm — receipts are how Cognition denominates its own ROI per session and per skill.",
    pitchAngle:
      "Every applied skill emits a value receipt: tokens saved, minutes saved, dollars saved on a chosen model. The dashboard adds these up — no marketing math, ledger math.",
  },
  {
    id: "skill-quality",
    category: "skills",
    stem: "Why does Cognition track 'spectral_gap_proxy' on skills?",
    options: [
      "Random data scientist showing off",
      "A proxy for how generalisable a skill is — high spectral gap means the skill applies across many contexts, low means it's overfit",
      "Audio processing",
      "PostgreSQL gap-lock metric",
    ],
    correctIndex: 1,
    explanation: "Appears in cognition_assist response under teachability.{state, s_stability, spectral_gap_proxy, helped_rate}.",
    pitchAngle:
      "Skills are evaluated on how often they help AND how broadly they apply. Spectral gap is the second axis — niche, useful skills score differently from broadly-useful ones.",
  },
  {
    id: "decision-patterns",
    category: "skills",
    stem: "What's a decision pattern in Cognition's vocabulary?",
    options: [
      "A UI loading spinner pattern",
      "Executive judgment compiled from closed decisions + authored skills — read via cognition_decision_tree",
      "A Postgres query plan",
      "A design pattern from GoF",
    ],
    correctIndex: 1,
    explanation: "AGENTS.md and the cognition_decision_tree MCP tool.",
    pitchAngle:
      "When a teammate routes a hard call, the agent surfaces the company's own historical judgment — not a generic 'what does AI think?' but 'what did your CEO actually decide in similar past cases?'",
  },
  {
    id: "circuit-confidence",
    category: "skills",
    stem: "When a cognitive circuit's health is 'ask' with low confidence, what does CLAUDE.md instruct the agent to do?",
    options: [
      "Apply silently",
      "Ask a brief confirmation question before acting on it for high-stakes decisions",
      "Drop the circuit entirely",
      "Re-run the assist call until confidence rises",
    ],
    correctIndex: 1,
    explanation: "Cognitive directive text: 'If this circuit drives a high-stakes decision, ask a brief confirmation question.'",
    pitchAngle:
      "Agents that respect confidence build trust. Cognition's health states ('use', 'ask', 'refresh', 'avoid_or_warn') drive whether the agent acts or pauses.",
  },
  {
    id: "circuit-self-check",
    category: "skills",
    stem: "Before final answer, what does the cognitive directive tell the agent to self-check against?",
    options: [
      "Nothing — speed matters more",
      "teachingPayload.critique questions and teachingPayload.inhibit list",
      "The user's last message",
      "OpenAI's usage policy",
    ],
    correctIndex: 1,
    explanation:
      "Exact text: 'Before final answer, self-check against teachingPayload.critique and avoid teachingPayload.inhibit.'",
    pitchAngle:
      "Skills self-test. Every applied skill carries its own critique rubric and inhibit list, so the agent grades its own output before shipping.",
  },

  // ─── MCP Protocol & Server ─────────────────────────────────────────
  {
    id: "mcp-sdk",
    category: "mcp",
    stem: "Which dependency bridges the agent layer to clients like Claude Code?",
    options: [
      "openai",
      "@modelcontextprotocol/sdk",
      "langchain",
      "vercel-ai/sdk",
    ],
    correctIndex: 1,
    explanation: "@modelcontextprotocol/sdk ^1.29 is a top-level dep.",
    pitchAngle: "We're MCP-native. One protocol target serves Claude Code, Cursor, and anything that ships MCP support next.",
  },
  {
    id: "mcp-endpoint-path",
    category: "mcp",
    stem: "Where does the canonical MCP endpoint live?",
    options: [
      "/api/mcp/route.ts",
      "src/app/api/integrations/claude-code/mcp/v1/route.ts",
      "src/lib/mcp/server.ts",
      "cognition-mcp-server/src/index.ts (the separate package)",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'The canonical implementation is v1/route.ts. The bare route.ts is a re-export shim kept alive forever for backwards compatibility.'",
    pitchAngle:
      "Versioned URLs are a contract. v1/ runs forever; new protocol changes go in v2/, and the bare route always re-exports the latest stable.",
  },
  {
    id: "mcp-three-layers",
    category: "mcp",
    stem: "Which three layers does docs/MCP.md identify as independently updatable?",
    options: [
      "DB schema / API routes / UI",
      "Server code (push to main) / tool schemas (tools/list on session start) / pedagogy rules (PEDAGOGY_VERSION bump)",
      "Frontend / backend / mobile",
      "Browser / Node / edge",
    ],
    correctIndex: 1,
    explanation: "The exact table in docs/MCP.md §'The 3-layer update model'.",
    pitchAngle:
      "Three update paths, three cadences. Code via Vercel deploy. Schemas auto-propagate at session start. Pedagogy via a version bump. Users never reinstall.",
  },
  {
    id: "mcp-tools-list",
    category: "mcp",
    stem: "How do new MCP tools propagate to already-installed Claude Code clients?",
    options: [
      "Users must rerun the installer",
      "Claude Code calls tools/list on every session start, so new server.tool(...) registrations show up automatically",
      "Push notification",
      "GitHub webhook to ~/.claude",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'Claude Code calls tools/list every session start; new schemas propagate automatically.'",
    pitchAngle:
      "Add a tool, push to main, every connected agent sees it next session. No client release cycle.",
  },
  {
    id: "mcp-smoke",
    category: "mcp",
    stem: "Where does the MCP smoke test run, and when?",
    options: [
      "Local pre-commit hook",
      ".github/workflows/mcp-smoke.yml — runs scripts/mcp-smoke-test.ts after every successful Vercel deploy",
      "Cron job inside Supabase",
      "Vercel cron only on Mondays",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md operator's guide.",
    pitchAngle:
      "Every prod deploy gets smoke-tested. Failure opens a GitHub issue labeled `mcp` + `urgent` so on-call sees it before users do.",
  },
  {
    id: "mcp-required-tools",
    category: "mcp",
    stem: "Where is the smoke test's required-tool list maintained?",
    options: [
      "An env var",
      "REQUIRED_TOOLS in scripts/mcp-smoke-test.ts — new tools are appended when they must not regress",
      "A Notion page",
      "Generated dynamically",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md add-a-tool checklist.",
    pitchAngle:
      "The smoke test isn't a copy-paste — it's an enforced contract. If a tool is in REQUIRED_TOOLS, a deploy that loses it never makes it past CI.",
  },
  {
    id: "mcp-breaking",
    category: "mcp",
    stem: "What's the protocol-breaking-change procedure?",
    options: [
      "Edit v1 in place and pray",
      "Create v2/route.ts next to v1/route.ts; update public/install/cognition-stub.md to point at v2; bump STUB_MIN_VERSION; leave v1 running indefinitely",
      "Email customers",
      "Push a `breaking-change` git tag",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md §'When you make breaking protocol changes'.",
    pitchAngle:
      "We never break a connected agent. Old versions live until usage is negligible — measured in months, not days.",
  },
  {
    id: "legacy-route",
    category: "mcp",
    stem: "What does the bare src/app/api/integrations/claude-code/mcp/route.ts do?",
    options: [
      "Returns 404 — deprecated",
      "Re-export shim that points at v1/ — kept alive forever for backwards compatibility",
      "Throws an error nudging users to upgrade",
      "Serves a static page",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'The bare route.ts is a re-export shim kept alive forever for backwards compatibility.'",
    pitchAngle:
      "URL stability is a feature. The first user who installed in week one still works — the route exists forever.",
  },
  {
    id: "mcp-handshake",
    category: "mcp",
    stem: "On /welcome/sync, what status string appears before MCP handshake completes?",
    options: [
      "`READY`",
      "`WAITING FOR HANDSHAKE · · ·` (with pulsing orange dot)",
      "`PENDING`",
      "`Loading…`",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.4 spec.",
    pitchAngle:
      "Even the status indicator is intentional. Monospace, uppercase, pulsing orange dot — the install feels like infrastructure, not a SaaS onboarding.",
  },
  {
    id: "mcp-install-cmd",
    category: "mcp",
    stem: "What's the MCP install command shown to users on /welcome/sync?",
    options: [
      "`npm install cognition`",
      "`claude mcp add cognition https://cognitionus.com/mcp --scope user --header \"x-cognition-token: <TOKEN>\"`",
      "`cognition init`",
      "Drag the .dmg into Applications",
    ],
    correctIndex: 1,
    explanation: "Verbatim from DESIGN.md §10.4.",
    pitchAngle:
      "One copyable command. No OAuth dance, no SaaS dashboard wizard — just an MCP install with a scoped token in the header.",
  },
  {
    id: "mcp-clo-tools",
    category: "mcp",
    stem: "Which set of MCP tools does Clo (the server-side agent) use to bridge to the user's Claude Code?",
    options: [
      "Just get_user_info",
      "authenticate, complete_authentication, list_indexed_sources, log_learning, get_user_retention, suggest_review, get_weak_topics",
      "Only OpenAI function-calls",
      "A custom JSON-RPC",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.6 enumerates the tools.",
    pitchAngle:
      "Clo is the navigator. The user talks; Clo issues MCP calls to log learning, suggest reviews, surface weak topics — all over the same connection that ships in Claude Code.",
  },
  {
    id: "mcp-first-turn-consent",
    category: "mcp",
    stem: "What's Clo's first-turn consent prompt?",
    options: [
      "Silent — it just acts",
      "'I can see your Claude Code's Notion, Slack, GitHub. Want me to build the baseline brain from those? (yes / pick specific / later)'",
      "A modal popup",
      "An email confirmation",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.6 quotes it verbatim.",
    pitchAngle:
      "Permission is asked in chat, not a modal. The agent sees what your CC sees, but does nothing until you say go.",
  },
  {
    id: "mcp-bidirectional",
    category: "mcp",
    stem: "What's the bidirectional move that lets Cognition learn from CC sessions, not just power them?",
    options: [
      "Telemetry sneaks out",
      "Clo asks for one-time consent to log concepts from the user's Claude Code sessions back into Cognition",
      "The user emails a transcript weekly",
      "GitHub Actions tail logs to S3",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.6: 'Bidirectional learning…the bridge that makes organisational memory compound.'",
    pitchAngle:
      "Every CC session becomes a retention datapoint. That's the flywheel — the more your team codes, the smarter your org brain gets.",
  },
  {
    id: "mcp-workspace-id",
    category: "mcp",
    stem: "How does enterprise scope ride the MCP connection?",
    options: [
      "It doesn't — enterprise is post-handshake",
      "orgId rides the MCP handshake as workspace_id; all log_learning calls from that CC instance tag the org",
      "Cookies",
      "An HTTP referer header",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.6.",
    pitchAngle:
      "One token, one workspace_id. Every event from a teammate's CC tags the org automatically — no per-event auth re-check.",
  },
  {
    id: "mcp-cognition-mcp-server",
    category: "mcp",
    stem: "What's in the top-level cognition-mcp-server/ directory (separate from the Next app)?",
    options: [
      "Duplicate of the Next MCP route",
      "A standalone npm package mcp server — same MCP surface, distributable as a CLI for self-hosters",
      "Mocks for tests only",
      "Legacy code waiting to be deleted",
    ],
    correctIndex: 1,
    explanation: "Top-level folder with its own package.json + src/.",
    pitchAngle:
      "The MCP layer exists in two shapes: hosted (the Next route on Vercel) and self-hostable (the npm package). Same protocol, different deployment target.",
  },

  // ─── Pedagogy & Self-Update ───────────────────────────────────────
  {
    id: "pedagogy-location",
    category: "pedagogy",
    stem: "Where does the hosted operating instructions live?",
    options: [
      "Notion",
      "src/lib/mcp/pedagogy.ts",
      "A GitHub Gist",
      "Pinecone",
    ],
    correctIndex: 1,
    explanation: "AGENTS.md and docs/MCP.md.",
    pitchAngle:
      "The pedagogy is code, in the same repo, behind the same review process as everything else. No separate CMS for the agent's brain.",
  },
  {
    id: "pedagogy-version-format",
    category: "pedagogy",
    stem: "What format does PEDAGOGY_VERSION use?",
    options: [
      "semver (MAJOR.MINOR.PATCH)",
      "YYYY-MM-DD.N — bump .N for same-day changes",
      "Git short-sha",
      "Monotonic integer",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'use YYYY-MM-DD.N format; bump .N for same-day changes.'",
    pitchAngle:
      "Dated version strings make rollback obvious. '2026-04-19.2' tells you when the rule shipped and which iteration it was.",
  },
  {
    id: "managed-block",
    category: "pedagogy",
    stem: "When the agent self-updates a user's CLAUDE.md, what does it replace?",
    options: [
      "The whole file",
      "Only the block between COGNITION_CLO_RULE_START and COGNITION_CLO_RULE_END — preserves everything else",
      "The first 50 lines",
      "Nothing — users update manually",
    ],
    correctIndex: 1,
    explanation: "AGENTS.md and CLAUDE.md mentor rules.",
    pitchAngle:
      "We never rewrite a user's instructions wholesale. The managed block is bounded by sentinel comments — surgical, reversible, diff-able.",
  },
  {
    id: "self-update-consent",
    category: "pedagogy",
    stem: "Before swapping in a new managed block, what must the agent do?",
    options: [
      "Just push the update",
      "Ask the user before editing local instructions, then replace the block only after approval",
      "Run a unit test",
      "Wait 24 hours",
    ],
    correctIndex: 1,
    explanation:
      "AGENTS.md: 'If get_pedagogy_instructions returns self_update.update_available: true, ask before editing local instructions.'",
    pitchAngle:
      "Self-update is opt-in per change. The agent asks, the user approves. No silent behaviour drift on next session.",
  },
  {
    id: "pedagogy-fetch",
    category: "pedagogy",
    stem: "How often do stub clients fetch the latest pedagogy?",
    options: [
      "Once at install",
      "Every session start — get_pedagogy_instructions is called with client_stub_version",
      "Hourly cron",
      "Manual via /sync",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'Stub clients fetch via get_pedagogy_instructions on every session start. Zero user action.'",
    pitchAngle:
      "Every new session is a fresh pull of the operating instructions. Bug in the pedagogy? Fix, push, done — every active agent picks it up next session.",
  },
  {
    id: "stub-min-version",
    category: "pedagogy",
    stem: "What's STUB_MIN_VERSION for?",
    options: [
      "Vercel deploy gate",
      "Minimum local-stub version the server will accept — bumped when v2 protocol replaces v1",
      "Tailwind major version",
      "Vendored OpenAI SDK floor",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md breaking-change procedure.",
    pitchAngle:
      "The server can tell stale stubs they're stale. Old installs get a friendly upgrade nudge instead of a silent failure.",
  },
  {
    id: "pedagogy-hash-test",
    category: "pedagogy",
    stem: "What happens to pedagogy.test.ts when PEDAGOGY_INSTRUCTIONS changes?",
    options: [
      "Auto-updates",
      "The hash test fails until you re-run jest — by design, because the hash is computed at module load time",
      "Doesn't exist",
      "Throws a deploy-time error",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'The hash test will fail until you re-run jest — that's expected, the hash is computed at module load time.'",
    pitchAngle:
      "The test failure IS the reminder. Forgetting to bump PEDAGOGY_VERSION fails CI before it ships.",
  },
  {
    id: "migration-detection",
    category: "pedagogy",
    stem: "How does the server detect legacy (pre-stub) clients?",
    options: [
      "User-agent string",
      "Absence of the client_stub_version parameter — when missing, the response includes a [MIGRATION] block",
      "GeoIP",
      "A separate signup flag",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md §'Migration of legacy clients'.",
    pitchAngle:
      "Migrations are server-detected. Old clients get a one-line upgrade offer; new clients never see it. Zero per-user maintenance.",
  },
  {
    id: "legacy-migration-line",
    category: "pedagogy",
    stem: "What's the one-line migration offer Claude Code is told to surface to a legacy user?",
    options: [
      "'Please reinstall.'",
      "'running `curl -fsSL https://cognitionus.com/install/cognition-stub.md > ~/.claude/rules/cognition.md` would do it. Want me to?'",
      "'Open the dashboard.'",
      "'Email support.'",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md quotes it verbatim.",
    pitchAngle:
      "The migration is one curl command, surfaced inline by the agent. Users opt in once and never see the nudge again.",
  },
  {
    id: "deploy-propagation-time",
    category: "pedagogy",
    stem: "After you push a pedagogy change to main, roughly how long until it's live on Vercel?",
    options: [
      "Hours",
      "About 90 seconds",
      "Manual deploy required",
      "Next-business-day",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md: 'New pedagogy is live on Vercel within ~90s.'",
    pitchAngle:
      "Behavioural changes ship in a minute and a half. That's faster than most teams can ship a settings toggle.",
  },

  // ─── Product Flow & Surfaces ──────────────────────────────────────
  {
    id: "funnel-screens",
    category: "product-flow",
    stem: "How many screens does the onboarding funnel have?",
    options: [
      "1 (single page)",
      "3 — sign-up, connect, done",
      "6 — `/`, `/auth/sign-up`, `/welcome`, `/welcome/how`, `/welcome/sync`, `/clo`",
      "12 with progress bar",
    ],
    correctIndex: 2,
    explanation: "DESIGN.md §10.1 enumerates 6 screens, one job per screen.",
    pitchAngle:
      "Six screens, one job each. No progress bar, no 'step 3 of 5'. Every screen is complete on its own — feels confident, not bureaucratic.",
  },
  {
    id: "welcome-fork",
    category: "product-flow",
    stem: "What's the fork on /welcome?",
    options: [
      "Free vs paid",
      "Consumer vs Enterprise — two equal-weight ink cards, no default pre-selection",
      "Email vs Google sign-up",
      "Web vs Mobile",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.2.",
    pitchAngle:
      "B2C and B2B share a product spine and split at the second screen. No 'contact sales' funnel detour — enterprise is a card, not a black box.",
  },
  {
    id: "welcome-how-three",
    category: "product-flow",
    stem: "/welcome/how shows three ways Clo works. Which is pre-highlighted with orange?",
    options: [
      "API",
      "Manual",
      "Claude Code",
      "None — all equal",
    ],
    correctIndex: 2,
    explanation: "DESIGN.md §10.3: 'Claude Code pre-highlighted with orange border (1px #ff6b1a).'",
    pitchAngle:
      "Three doors, but we have an opinion. The orange border on Claude Code says 'this is what most of you want' without forcing it.",
  },
  {
    id: "manual-demoted",
    category: "product-flow",
    stem: "On /welcome/how, the MANUAL card is visually de-emphasised. How?",
    options: [
      "Hidden behind a toggle",
      "Smaller card, 0.7 opacity text — the old 19-tile integrations catalogue lives there as an escape hatch, not a primary path",
      "Greyed out and disabled",
      "Moved to a separate page",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.3.",
    pitchAngle:
      "Manual integrations aren't deleted — they're demoted. The escape hatch exists for the enterprise prospect that needs it; the funnel doesn't centre on it.",
  },
  {
    id: "clo-layout",
    category: "product-flow",
    stem: "What's the layout of /clo?",
    options: [
      "Left sidebar nav + main content (~20 sub-pages)",
      "40% chat + 60% canvas — full viewport, no chrome, ⌘K opens command palette",
      "Single column wizard",
      "Pure terminal UI",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.5.",
    pitchAngle:
      "No sidebar. The user talks; the agent renders. It feels like a colleague pulling up a chart, not a SaaS with 20 tabs.",
  },
  {
    id: "canvas-action",
    category: "product-flow",
    stem: "How does Clo update the right column?",
    options: [
      "User clicks a menu",
      "Clo issues canvas.render({ view, props }) actions — canvas cross-fades 150ms ease-out",
      "Polling every 5s",
      "WebSocket push",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.5.",
    pitchAngle:
      "View navigation is an agent action, not a user click. The agent decides which canvas you need, you confirm by asking the right question.",
  },
  {
    id: "canvas-idle",
    category: "product-flow",
    stem: "What does the canvas show when idle?",
    options: [
      "A welcome video",
      "Empty surface with a centered GeistMono 12px 'CLO WILL DRAW HERE'",
      "A dashboard preview",
      "A friendly avatar",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.5 idle state spec.",
    pitchAngle:
      "Idle is deliberate, not a loading state. The blank canvas signals 'I'm here when you ask' — no FOMO-driven content trying to occupy attention.",
  },
  {
    id: "deep-links",
    category: "product-flow",
    stem: "How do the old /clo/brain, /clo/team, /clo/compliance URLs behave after the canvas redesign?",
    options: [
      "404",
      "Hydrate /clo with the correct canvas view — deep links still work, they just feed the canvas",
      "Redirect to a 'feature moved' page",
      "Open in a new tab",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.5.",
    pitchAngle:
      "Bookmarks survive the redesign. The URL is still authoritative — it just renders inside the new shell.",
  },
  {
    id: "killed-onboarding",
    category: "product-flow",
    stem: "What was the previous 4-step /onboarding flow replaced by?",
    options: [
      "Nothing — they killed onboarding",
      "/welcome + /welcome/how + /welcome/sync, with /onboarding redirecting to /welcome",
      "Sales-led demo only",
      "A Loom video",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.7 killed-surfaces table.",
    pitchAngle:
      "Onboarding shrank from four steps to three screens. Each one is sharper than the four they replaced — fewer screens, more confident copy.",
  },
  {
    id: "tradeoff-discoverability",
    category: "product-flow",
    stem: "What's the explicit discoverability tradeoff of removing the sidebar?",
    options: [
      "None — it's strictly better",
      "New users don't see what Clo can do until they ask or Clo volunteers; mitigated by a first-turn tour and ⌘K command palette",
      "Mobile users can't navigate",
      "SEO drops",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.8.",
    pitchAngle:
      "We made the tradeoff explicit and mitigated it. The agent's first-turn tour and ⌘K replace what a sidebar would have shown — but on the user's schedule, not as ambient noise.",
  },
  {
    id: "tam-narrows",
    category: "product-flow",
    stem: "What's the design's honest admission about TAM?",
    options: [
      "TAM expands forever",
      "TAM narrows to Claude Code users — true today, growing fast. API and Manual paths still exist for non-CC teams",
      "TAM is unrelated to product design",
      "TAM doesn't matter",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.8.",
    pitchAngle:
      "We bet on the fastest-growing developer surface (Claude Code) instead of building 19 OAuth flows. The TAM-narrowing is a feature — sharper positioning, smaller maintenance burden.",
  },
  {
    id: "single-cta",
    category: "product-flow",
    stem: "What's the rule for the landing page CTAs?",
    options: [
      "Three above the fold",
      "Single primary CTA: JOIN. Other links demoted to footer / tertiary",
      "Sign up + Book demo, equal weight",
      "No CTAs — copy-led",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.7.",
    pitchAngle:
      "Landing pages drown in CTAs. We kept one. The numbers compounded — single-CTA conversion beats the 4-CTA landing it replaced.",
  },
  {
    id: "command-palette",
    category: "product-flow",
    stem: "What's the only manual navigation surface inside /clo?",
    options: [
      "A hamburger menu",
      "⌘K command palette — opens a list to navigate or ask Clo to pull a specific view",
      "URL bar",
      "Right-click context menu",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.5.",
    pitchAngle:
      "Power users get ⌘K. New users get the agent. Two interfaces, same surface — neither feels like a compromise for the other.",
  },
  {
    id: "auto-advance-sync",
    category: "product-flow",
    stem: "What happens after MCP handshake completes on /welcome/sync?",
    options: [
      "User clicks 'Continue'",
      "Auto-advances to /clo 2s after handshake succeeds — long enough to show the detected sources",
      "Email confirmation step",
      "Returns to /welcome",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.4.",
    pitchAngle:
      "The handshake auto-advances. Two seconds of detected-sources detail, then straight into the product. Onboarding ends the moment work starts.",
  },
  {
    id: "list-indexed-sources",
    category: "product-flow",
    stem: "On handshake success, which MCP tool is fired to populate the 'FROM YOUR CLAUDE CODE · N DETECTED' panel?",
    options: [
      "search_indexes",
      "list_indexed_sources",
      "get_user_info",
      "scan_environment",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.4: 'On handshake success, fire one list_indexed_sources call.'",
    pitchAngle:
      "The user sees what we see, the moment we see it. 'Notion, Slack, GitHub, Gmail, Linear' renders as monospace tags — proof of connection, not promises.",
  },

  // ─── Design System ──────────────────────────────────────────────────
  {
    id: "design-canvas-color",
    category: "design",
    stem: "What's the background canvas colour?",
    options: ["#ffffff (pure white)", "#fafaf7 (warm near-white)", "#f5f5f5 (neutral gray)", "#000000 (true black)"],
    correctIndex: 1,
    explanation: "DESIGN.md §2: 'Warm Canvas (#fafaf7) — Near-white with a subtle warmth (not #ffffff, not neutral gray). Prevents clinical sterility.'",
    pitchAngle: "Pure white reads as clinical. The warm canvas signals 'craftsmanship' the moment a hero loads.",
  },
  {
    id: "design-ink",
    category: "design",
    stem: "What's the ink (text) colour?",
    options: ["#000000", "#1a1a1a", "#222222", "#0d0d0d"],
    correctIndex: 1,
    explanation: "DESIGN.md §2.",
    pitchAngle: "Pure black on warm canvas is too harsh — #1a1a1a softens it without losing contrast.",
  },
  {
    id: "design-accent",
    category: "design",
    stem: "What's the single accent colour?",
    options: ["#0066ff (blue)", "#ff6b1a (signal orange)", "#22c55e (green)", "purple gradient"],
    correctIndex: 1,
    explanation: "DESIGN.md §2.",
    pitchAngle: "One accent, used sparingly. Scarcity is what makes it mean something — every orange pixel is a deliberate signal.",
  },
  {
    id: "design-no-shadows",
    category: "design",
    stem: "What's the rule on box-shadows?",
    options: [
      "Subtle shadow on every card",
      "No shadows, ever — depth is border opacity + typographic contrast",
      "Only on hover",
      "Inset shadows only",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §6 + §7 don't list.",
    pitchAngle: "No drop shadows. Depth comes from typography and border opacity. Reads as software for adults.",
  },
  {
    id: "design-radius",
    category: "design",
    stem: "What's the default border-radius?",
    options: ["0px (sharp)", "4px", "8px (rounded)", "Pills (50%)"],
    correctIndex: 0,
    explanation: "DESIGN.md §5: 'Sharp (0px) default. 4px only for secondary containers.'",
    pitchAngle:
      "Sharp corners. Anything rounder than 4px reads as Web 2.0 SaaS. We sit closer to terminal-and-text-editor than Salesforce.",
  },
  {
    id: "design-hover",
    category: "design",
    stem: "What's the hover behaviour for ink-coloured elements?",
    options: [
      "Brighten",
      "Dim to 0.6 opacity — never brighten",
      "Scale 1.05",
      "Change colour to blue",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §7 don't list.",
    pitchAngle: "Hover dims, doesn't brighten. Counter-intuitive but it lands as 'thoughtful' instead of 'eager'.",
  },
  {
    id: "design-button-font",
    category: "design",
    stem: "What's the button typography rule?",
    options: [
      "System UI sans-serif",
      "GeistMono 14px uppercase with 1.4px tracking — non-negotiable",
      "Times New Roman bold",
      "Inter SemiBold",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §3.",
    pitchAngle:
      "Every button looks like a terminal command. Monospace uppercase tracking signals 'this is an executable action', not a marketing CTA.",
  },
  {
    id: "design-spacing",
    category: "design",
    stem: "What spacing scale does the system use?",
    options: [
      "4, 8, 12, 16, 20, 24 (typical Tailwind)",
      "8, 16, 32, 64, 128",
      "4, 8, 24, 48, 96 — deliberately sparse",
      "1rem only",
    ],
    correctIndex: 2,
    explanation: "DESIGN.md §5.",
    pitchAngle: "Sparse spacing scale. Large jumps create hierarchy via whitespace, not via font weight or borders.",
  },
  {
    id: "design-purple",
    category: "design",
    stem: "Why does the design system explicitly ban purple/indigo/violet?",
    options: [
      "Accessibility",
      "'AI slop signifier' — too many AI products use it, signals generic LLM wrapper",
      "Brand-trademark conflict",
      "Bad CSS rendering",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §7 don't list: 'Don't use purple/indigo/violet (AI slop signifier)'.",
    pitchAngle:
      "When everyone in AI uses purple gradients, the move is to use anything else. The orange + ink palette is a deliberate counter-signal.",
  },
  {
    id: "design-alignment",
    category: "design",
    stem: "Default layout alignment is…",
    options: ["Centered", "Left-aligned", "Right-aligned", "Justified"],
    correctIndex: 1,
    explanation: "DESIGN.md §7: 'Don't use centered layouts — left-align by default.'",
    pitchAngle: "Left-align reads as document, centred reads as marketing. We chose document.",
  },
  {
    id: "design-grain",
    category: "design",
    stem: "What's the film grain texture for?",
    options: [
      "Decorative noise",
      "3% opacity overlay on backgrounds — adds tactile warmth without visual noise",
      "Pricing tier indicator",
      "Performance tracking",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §2 + §10 reference.",
    pitchAngle: "Three percent grain. You can't consciously see it, but the page stops feeling sterile. Tactile, not noisy.",
  },
  {
    id: "design-display-scale",
    category: "design",
    stem: "What's the maximum display-headline size?",
    options: ["48px", "96px", "180px", "240px (15rem) — GeistMono weight 300"],
    correctIndex: 3,
    explanation: "DESIGN.md §3 typography hierarchy.",
    pitchAngle:
      "240px monospace at weight 300. It's the brand statement — fixed-width characters at extreme scale create architectural rhythm.",
  },

  // ─── Infra & Observability ────────────────────────────────────────
  {
    id: "deploy-target",
    category: "infra",
    stem: "Where does the app deploy?",
    options: [
      "AWS Lambda",
      "Vercel (vercel.json present, .vercelignore configured, deploy-triggered smoke tests)",
      "Render",
      "Self-hosted Kubernetes",
    ],
    correctIndex: 1,
    explanation: "vercel.json + .vercelignore + docs/MCP.md reference Vercel deploys.",
    pitchAngle: "Vercel is the deployment target. Push to main, prod is updated in ~90s. We don't run k8s for a Next app.",
  },
  {
    id: "analytics-vercel",
    category: "infra",
    stem: "Which dependency provides Vercel analytics?",
    options: ["next/analytics", "@vercel/analytics", "next-analytics", "vercel-track"],
    correctIndex: 1,
    explanation: "@vercel/analytics ^2.0.1 in deps.",
    pitchAngle: "Vercel Analytics gives us Core Web Vitals per route. PostHog gives behaviour. Two layers, two purposes.",
  },
  {
    id: "posthog-proxy",
    category: "infra",
    stem: "What does the /ingest/* rewrite to us.i.posthog.com do?",
    options: [
      "Batches events",
      "Reverse-proxies PostHog analytics through our domain to dodge ad-blockers and tracking protection",
      "Anonymises IPs",
      "Leftover from a Segment migration",
    ],
    correctIndex: 1,
    explanation: "Comment in next.config.ts.",
    pitchAngle: "Ad-blockers eat ~30% of analytics events. Reverse-proxying through our domain recovers them — same numbers, no fingerprinting tricks.",
  },
  {
    id: "posthog-three-rewrites",
    category: "infra",
    stem: "How many separate /ingest/* rewrites does next.config.ts define?",
    options: ["1", "2", "3 (one each for /ingest/static, /ingest, /ingest/decide)", "5"],
    correctIndex: 2,
    explanation: "next.config.ts rewrites() block.",
    pitchAngle:
      "Three rewrites because PostHog's SDK hits three sub-paths. Skipping any one would silently break parts of the analytics pipeline.",
  },
  {
    id: "well-known-rewrite",
    category: "infra",
    stem: "Why rewrite /.well-known/oauth-protected-resource to /api/well-known/oauth-protected-resource?",
    options: [
      "Hides the route",
      "Next App Router doesn't reliably resolve dot-prefixed folder segments, and RFC 9728 / RFC 8414 require the /.well-known/ prefix",
      "Edge cache trick",
      "Local-dev only",
    ],
    correctIndex: 1,
    explanation: "Inline comment in next.config.ts.",
    pitchAngle:
      "We implement the actual OAuth discovery RFCs (9728 + 8414). The rewrite is a Next Router workaround so we don't have to fork the framework.",
  },
  {
    id: "sentry-conditional",
    category: "infra",
    stem: "When does Sentry wrap the build?",
    options: [
      "Always",
      "Only when NEXT_PUBLIC_SENTRY_DSN is set — otherwise plain config is used",
      "Only in production NODE_ENV",
      "Vercel-side only",
    ],
    correctIndex: 1,
    explanation: "next.config.ts: 'Only wrap with Sentry if configured'.",
    pitchAngle:
      "Observability opts in by env var. Contributors don't need a Sentry org to build locally — same code path everywhere.",
  },
  {
    id: "sentry-configs",
    category: "infra",
    stem: "How many separate Sentry config files exist at the repo root?",
    options: [
      "One",
      "Three — sentry.client.config.ts, sentry.edge.config.ts, sentry.server.config.ts",
      "None",
      "Five",
    ],
    correctIndex: 1,
    explanation: "Three files at root.",
    pitchAngle:
      "Browser, edge runtime, and server runtime each get their own Sentry init. Errors are tagged with the right runtime context without manual fiddling.",
  },
  {
    id: "redirects-clo",
    category: "infra",
    stem: "Why does next.config.ts permanently redirect /dashboard/* → /clo/*?",
    options: [
      "Cosmetic",
      "'CLO is the product; dashboard is just one view inside it' — old URLs preserve forever via 308",
      "Vercel quirk",
      "SEO trick",
    ],
    correctIndex: 1,
    explanation: "Inline comment in next.config.ts redirects().",
    pitchAngle:
      "URL renames are deliberate product positioning. /clo isn't a dashboard rename — it's the product surface.",
  },
  {
    id: "redirect-308-reason",
    category: "infra",
    stem: "Why use build-time 308 redirects instead of page-level redirect() calls?",
    options: [
      "Cosmetic preference",
      "Edge cache wouldn't sit on stale page HTML the way it did with page-level redirect()",
      "Vercel doesn't support page redirects",
      "Bug in Next 14",
    ],
    correctIndex: 1,
    explanation: "next.config.ts comment.",
    pitchAngle:
      "We picked the redirect mechanism by reading our own metrics. Page-level redirect() left stale HTML in the edge cache; build-time 308 doesn't.",
  },
  {
    id: "redirect-side-quest",
    category: "infra",
    stem: "Routes like /learn, /personas, /research, /twin redirect to /. Why?",
    options: [
      "Bugs",
      "Side-quest cleanup — deleted in the YC tier-2 architecture pass; permanent 308s funnel crawlers back to the company-brain story on /",
      "Renamed only",
      "Dev-only routes",
    ],
    correctIndex: 1,
    explanation: "next.config.ts inline comment.",
    pitchAngle: "When we cut a feature, we cut the route AND the SEO trail. Permanent redirects send any indexed URL back to the current story.",
  },
  {
    id: "deploy-rollback",
    category: "infra",
    stem: "If MCP smoke test fails post-deploy, what's the immediate action?",
    options: [
      "Wait for the next deploy",
      "Roll back via Vercel dashboard; an auto-opened GitHub issue is labeled `mcp` + `urgent`",
      "Force-push a revert",
      "Open a P0 ticket and meet about it",
    ],
    correctIndex: 1,
    explanation: "docs/MCP.md operator's guide.",
    pitchAngle:
      "Smoke test failure is a one-click rollback in Vercel. The GitHub issue exists for paper trail, not for triage.",
  },
  {
    id: "npmrc",
    category: "infra",
    stem: "What does the .npmrc at the root pin?",
    options: [
      "Auth token",
      "registry settings (e.g., engine-strict / save-exact / a private registry mapping)",
      "Tailwind preset",
      "Nothing — it's empty",
    ],
    correctIndex: 1,
    explanation: ".npmrc exists at root with 22 bytes — typically registry / engine-strict / save-exact.",
    pitchAngle:
      "Lockfile + .npmrc + workspaces means every contributor's npm install produces the same dependency tree. No 'works on my machine'.",
  },

  // ─── Validation, Email & Deps ─────────────────────────────────────
  {
    id: "validation",
    category: "deps",
    stem: "Which library handles runtime schema validation?",
    options: ["yup", "joi", "zod", "io-ts"],
    correctIndex: 2,
    explanation: "zod ^4.3.6.",
    pitchAngle: "zod gives types inferred from the schema — one declaration, parsed at runtime and typed at compile time. No drift.",
  },
  {
    id: "email",
    category: "deps",
    stem: "Transactional email runs on…",
    options: ["SendGrid", "Postmark", "Resend", "AWS SES"],
    correctIndex: 2,
    explanation: "resend ^6.10.",
    pitchAngle: "Resend + React Email = templates compile from the same component library as the marketing site. One typography system, two channels.",
  },
  {
    id: "framer-motion",
    category: "deps",
    stem: "Which animation library handles motion?",
    options: ["GSAP", "framer-motion (^12.38)", "react-spring", "anime.js"],
    correctIndex: 1,
    explanation: "framer-motion ^12.38.",
    pitchAngle:
      "Framer Motion for animation, not GSAP. React-first, declarative, easy to staff for. Animations are part of the component, not a side-effect.",
  },
  {
    id: "icons",
    category: "deps",
    stem: "Which icon library is the primary?",
    options: [
      "FontAwesome",
      "lucide-react and react-icons (both deps, lucide is the design-aligned set)",
      "Material Icons",
      "Heroicons",
    ],
    correctIndex: 1,
    explanation: "lucide-react ^1.7 and react-icons ^5.5 both listed.",
    pitchAngle: "Lucide for the design-aligned set, React-Icons as the fallback for things Lucide doesn't ship. Tree-shaken, no icon-font weight.",
  },
  {
    id: "openrouter",
    category: "deps",
    stem: "Which LLM gateway does Clo (server-side) use?",
    options: [
      "OpenAI direct",
      "OpenRouter — the server-side agent uses it for model routing",
      "Anthropic direct",
      "Bedrock",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.6: 'Clo (server-side, OpenRouter)'.",
    pitchAngle:
      "OpenRouter means we can swap models per task without re-wiring the auth layer. Clo isn't married to one provider.",
  },
  {
    id: "gray-matter",
    category: "deps",
    stem: "What's gray-matter ^4.0.3 used for?",
    options: [
      "Image processing",
      "Parsing Markdown frontmatter — used wherever SKILL.md or blog posts carry YAML metadata",
      "Encryption",
      "Greyscale image filters",
    ],
    correctIndex: 1,
    explanation: "gray-matter is the standard Markdown-frontmatter parser.",
    pitchAngle:
      "Every SKILL.md ships with structured frontmatter (name, description, type). gray-matter parses it once into typed fields, no regexes.",
  },
  {
    id: "tailwind-merge",
    category: "deps",
    stem: "Why does the project depend on tailwind-merge alongside clsx?",
    options: [
      "Required by Tailwind v4",
      "tailwind-merge intelligently de-duplicates conflicting Tailwind classes (last one wins by class group), so component variants don't ship contradictory utilities",
      "Replaces clsx",
      "Lint-time only",
    ],
    correctIndex: 1,
    explanation: "Standard pattern: clsx for conditional composition, tailwind-merge for utility-conflict resolution.",
    pitchAngle: "We don't ship 'mb-4 mb-8' to the browser. tailwind-merge collapses duplicates so the actually-applied class is the one we meant.",
  },

  // ─── Testing & Quality ───────────────────────────────────────────
  {
    id: "test-stack",
    category: "testing",
    stem: "What's the test split?",
    options: [
      "Vitest only",
      "Jest + React Testing Library for unit, Playwright for e2e",
      "Cypress only",
      "Mocha + Chai",
    ],
    correctIndex: 1,
    explanation: "package.json deps + scripts.",
    pitchAngle: "Playwright runs real browser flows; Jest covers pure logic. We don't fake a browser in jsdom for things only a real browser proves.",
  },
  {
    id: "scripts-test",
    category: "testing",
    stem: "Which package.json script runs unit tests?",
    options: ["npm run unit", "npm run test", "npm run check", "npm run jest"],
    correctIndex: 1,
    explanation: "scripts.test = 'jest'.",
    pitchAngle: "Standard verbs. Anyone who's worked on a JS project can `npm run test` and `npm run e2e` without docs.",
  },
  {
    id: "scripts-e2e",
    category: "testing",
    stem: "Which script launches Playwright in UI mode?",
    options: ["npm run e2e:debug", "npm run e2e:ui", "npm run playwright", "npm run gui"],
    correctIndex: 1,
    explanation: "scripts['e2e:ui'] = 'playwright test --ui'.",
    pitchAngle: "Playwright UI mode = step-through debugger for browser tests. Lower the barrier to writing them, more get written.",
  },
  {
    id: "smoke-api",
    category: "testing",
    stem: "What does `npm run smoke:api` do?",
    options: [
      "Runs a load test",
      "Bash script (scripts/smoke-test-api.sh) that hits live API endpoints to verify they respond correctly",
      "Lints API routes",
      "Generates OpenAPI docs",
    ],
    correctIndex: 1,
    explanation: "scripts['smoke:api'] = 'bash scripts/smoke-test-api.sh'.",
    pitchAngle:
      "Three distinct smoke tests: smoke:api, smoke:v1, sandbox:verify. Each one tightens a different blast radius. They run in CI, not by hope.",
  },
  {
    id: "ts-jest",
    category: "testing",
    stem: "What's ts-jest doing in devDependencies?",
    options: [
      "Lets Jest run TypeScript test files directly without a separate compile step",
      "Type-checks Jest matchers",
      "Replaces SWC",
      "Generates types from snapshots",
    ],
    correctIndex: 0,
    explanation: "Standard ts-jest role.",
    pitchAngle: "Tests are written in TS, the same language as the code they test. No 'compile-then-test' two-step.",
  },
  {
    id: "lint",
    category: "testing",
    stem: "What's the lint command?",
    options: [
      "eslint .",
      "next lint",
      "prettier --check",
      "biome check",
    ],
    correctIndex: 1,
    explanation: "scripts.lint = 'next lint'.",
    pitchAngle: "next lint inherits Next-recommended rules + react-hooks + a11y. We don't roll our own ESLint config — Next ships the floor.",
  },
  {
    id: "prettier-ignore",
    category: "testing",
    stem: "Why does .prettierignore exist?",
    options: [
      "Forbids prettier",
      "Excludes auto-generated, lockfiles, and migration SQL from Prettier formatting — keeps diffs readable",
      "Bug workaround",
      "It's empty",
    ],
    correctIndex: 1,
    explanation: ".prettierignore is 96 bytes — standard SQL/lockfile exclusion.",
    pitchAngle: "Prettier formats code, not artifacts. Migrations and lockfiles stay as-checked-in so diffs read clean.",
  },
  {
    id: "playwright-config",
    category: "testing",
    stem: "What's at playwright.config.ts?",
    options: [
      "Empty placeholder",
      "Playwright configuration — baseURL, browsers, retries, the things a real e2e config sets",
      "Cypress migration script",
      "Vitest config in disguise",
    ],
    correctIndex: 1,
    explanation: "Standard Playwright config file at the root.",
    pitchAngle:
      "One config file is the source of truth for every e2e run. CI, dev, debug — same browsers, same retries, same baseURL.",
  },

  // ─── Monorepo, CLI & Extension ────────────────────────────────────
  {
    id: "workspaces",
    category: "monorepo",
    stem: "What's in package.json's workspaces array?",
    options: [
      "Just the root",
      "['packages/*'] — currently houses cognition-cli and memory-stack-cli",
      "['apps/*', 'libs/*']",
      "It's a single-package repo",
    ],
    correctIndex: 1,
    explanation: "package.json workspaces field + packages/ folder.",
    pitchAngle: "The Next app, the CLIs, and the MCP server share one lockfile and one TS config baseline. One PR can touch both ends of the protocol.",
  },
  {
    id: "cognition-cli",
    category: "monorepo",
    stem: "What does the cognition-cli package do?",
    options: [
      "Self-hostable MCP server",
      "'Fastest way to build a company brain.' Scaffolds a Next.js wiki, ships it to GitHub + Vercel via Claude Code, captures reusable team skills from every CC session",
      "Backup tool",
      "Pure docs renderer",
    ],
    correctIndex: 1,
    explanation: "Direct quote from packages/cognition-cli/package.json description.",
    pitchAngle:
      "The CLI lets a founder go from zero to deployed company brain in one terminal session. No SaaS dashboard required — every step is an MCP call into Claude Code.",
  },
  {
    id: "cognition-cli-bins",
    category: "monorepo",
    stem: "Which binaries does cognition-cli expose?",
    options: [
      "Just 'cognition'",
      "cognition, cognition-mcp, cognition-stop-prompt",
      "cognition-cli only",
      "cognition + cognition-server",
    ],
    correctIndex: 1,
    explanation: "package.json bin map.",
    pitchAngle:
      "Three binaries, three jobs. cognition for the main workflow, cognition-mcp for the standalone server, cognition-stop-prompt for the CC stop hook.",
  },
  {
    id: "cognition-cli-node",
    category: "monorepo",
    stem: "What Node version does cognition-cli require?",
    options: [">=14", ">=16", ">=18", ">=20"],
    correctIndex: 3,
    explanation: "engines.node = '>=20'.",
    pitchAngle: "Node 20 LTS minimum. Matches Vercel's default; lets us use Node 20's stable fetch, structured clone, and Web Crypto without polyfills.",
  },
  {
    id: "memory-stack-cli",
    category: "monorepo",
    stem: "What's the second package in /packages?",
    options: [
      "ui-components",
      "memory-stack-cli — the standalone CLI for managing the memory-stack configurator",
      "core",
      "design-tokens",
    ],
    correctIndex: 1,
    explanation: "Directory listing.",
    pitchAngle: "Two CLIs, both shippable independently. Memory-stack CLI manages the configurator; cognition CLI is the founder-onboarding tool.",
  },
  {
    id: "extension-what",
    category: "monorepo",
    stem: "What does /extension/ contain?",
    options: [
      "Storybook",
      "A Chrome Manifest V3 browser extension named 'Cognition — Learning Retention Tracker' that watches learning platforms and reports back",
      "VS Code extension",
      "Claude Code plugin",
    ],
    correctIndex: 1,
    explanation: "extension/manifest.json.",
    pitchAngle:
      "The browser extension is the consumer-side capture surface. Watches Coursera, Udemy, Khan, LinkedIn Learning, edX, YouTube — feeds the same brain the engineering team uses.",
  },
  {
    id: "extension-mv",
    category: "monorepo",
    stem: "What Chrome manifest version is the extension?",
    options: ["MV1", "MV2", "MV3", "MV4"],
    correctIndex: 2,
    explanation: "manifest_version: 3.",
    pitchAngle: "MV3-compliant from day one. We don't carry the MV2 deprecation debt.",
  },
  {
    id: "extension-sites",
    category: "monorepo",
    stem: "Which learning platforms does the extension's content scripts inject into?",
    options: [
      "Just YouTube",
      "Coursera, Udemy, Khan Academy, LinkedIn Learning, edX, YouTube, and cognitionus.com",
      "Only proprietary LMSes",
      "Any *.edu domain",
    ],
    correctIndex: 1,
    explanation: "manifest.json content_scripts matches.",
    pitchAngle:
      "Seven hosts, one extension. The consumer learner gets retention tracking on every major platform without juggling apps.",
  },
  {
    id: "extension-permissions",
    category: "monorepo",
    stem: "Which Chrome permissions does the extension request (top-level, not host)?",
    options: [
      "tabs, downloads, history",
      "storage, activeTab, alarms",
      "all_urls",
      "geolocation",
    ],
    correctIndex: 1,
    explanation: "manifest.json permissions: ['storage', 'activeTab', 'alarms'].",
    pitchAngle:
      "Three permissions only. We don't ask for 'all_urls' or history. Permissions are scoped to what each learning host needs.",
  },
  {
    id: "cognition-mcp-server-pkg",
    category: "monorepo",
    stem: "What's the difference between /cognition-mcp-server/ (top-level) and the MCP route in /src/app/api/integrations/claude-code/mcp/?",
    options: [
      "Same thing, duplicated",
      "Top-level cognition-mcp-server is a standalone npm package (self-hosted MCP); the src route is the hosted-Vercel implementation — same protocol surface",
      "One is dead code",
      "Top-level is mobile-only",
    ],
    correctIndex: 1,
    explanation: "Top-level folder has its own package.json + src + tsconfig.",
    pitchAngle: "Two deployment targets, one protocol surface. Hosted for fast onboarding, self-hosted for the enterprise that needs it.",
  },

  // ─── CLO Product & Positioning ───────────────────────────────────
  {
    id: "clo-tldr",
    category: "positioning",
    stem: "What's CLO V2's one-line TL;DR according to docs/CLO_V2.md?",
    options: [
      "'AI coach for engineers'",
      "'The L&D nervous system for AI-first companies'",
      "'Notion for memory'",
      "'Slack for learning'",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md title.",
    pitchAngle:
      "'L&D nervous system' is the framing that lands. Not 'AI coach', not 'memory'. It's the layer the rest of your stack assumes exists but nobody has built.",
  },
  {
    id: "clo-wedge",
    category: "positioning",
    stem: "What's CLO's named wedge question?",
    options: [
      "'How's onboarding going?'",
      "'What did you spend on Claude Code seats this year?' → 'What % of what the team learned from it are they still retaining?' → 'CLO tells you. And fixes it.'",
      "'Are you GDPR compliant?'",
      "'Can you measure dev productivity?'",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'The wedge'.",
    pitchAngle:
      "The pitch is one budget question they can't answer. We name the spend, name the leak, name the fix. Three sentences.",
  },
  {
    id: "clo-icp",
    category: "positioning",
    stem: "What's CLO's primary ICP?",
    options: [
      "Enterprise HR departments",
      "20–500-person AI-first eng orgs where everyone codes with Claude",
      "K-12 schools",
      "Fortune 500 L&D buyers",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'ICP'.",
    pitchAngle:
      "Narrow ICP wins. AI-first eng orgs at 20–500 employees — the buyer is a VP Eng or Head of People, the champion is a staff engineer who already loves CC.",
  },
  {
    id: "clo-anti-icp",
    category: "positioning",
    stem: "What's CLO's stated anti-ICP?",
    options: [
      "Banks",
      "Anyone not yet on AI-assisted dev — we're not selling transformation, we're selling telemetry on transformation already happening",
      "Solopreneurs",
      "Universities",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'ICP'.",
    pitchAngle:
      "We don't sell change. We sell measurement of change that's already happening. Saves three months of every sales cycle.",
  },
  {
    id: "clo-roi-math",
    category: "positioning",
    stem: "What's the ROI math template CLO uses?",
    options: [
      "Vague 'time saved'",
      "Annual training $/eng × team size × decay rate at day 180 × retention delta from refreshers — netted against $29/user/month",
      "GPT-generated estimates",
      "Just feature count",
    ],
    correctIndex: 1,
    explanation:
      "docs/CLO_V2.md ROI math: $2,500/eng × 30 engineers × 48% decay × 58% reduction = $21K/year recovered vs $10K/year spent.",
    pitchAngle:
      "We translate retention into dollars on /clo/roi with the team's real numbers. CEOs renew on math, not vibes.",
  },
  {
    id: "clo-pricing",
    category: "positioning",
    stem: "What's CLO V2's draft pricing in docs/CLO_V2.md?",
    options: [
      "$5/user/month",
      "$29/user/month (open question: $99 at enterprise, $29 at founder tier)",
      "$200/user/month",
      "Free with paid add-ons",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'ROI math' + §'Open questions'.",
    pitchAngle:
      "$29/user/month is the founder-tier price; $99/user is the open enterprise question. The pricing is denominated against the dollar value the receipt can prove.",
  },
  {
    id: "clo-flywheel",
    category: "positioning",
    stem: "What makes CLO data flywheel real?",
    options: [
      "More users = more revenue",
      "Each team's retention patterns feed better nudge-timing models — the 10th customer's product is materially better than the 1st's",
      "Brand effects",
      "Customer reviews",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'What makes this YC-investable'.",
    pitchAngle:
      "The flywheel is on the nudge-timing model, not the brand. Tenth customer's refresher cron is sharper than the first — that's a moat that compounds with usage.",
  },
  {
    id: "clo-anthropic-risk",
    category: "positioning",
    stem: "How does CLO_V2.md address the 'Anthropic builds this natively' risk?",
    options: [
      "Hope they don't",
      "'We're already deep on the Claude Code MCP surface; if they build, we get acquired. Conservative CAC math doesn't depend on beating them long-term.'",
      "Switch to Cursor",
      "Lawsuit",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'Risk + mitigations'.",
    pitchAngle: "We named the obvious risk and have an acquisition fallback baked in. The unit economics work without long-term independence.",
  },
  {
    id: "clo-not-build",
    category: "positioning",
    stem: "Which of these does CLO_V2.md explicitly commit NOT to build?",
    options: [
      "MCP tools",
      "A competing LMS, content authoring tools, performance reviews, general-purpose team analytics",
      "Email infrastructure",
      "Chrome extensions",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'What we commit not to build'.",
    pitchAngle: "We named the four adjacent products we won't ship. Disciplined scope is a feature — it tells the buyer where we'll get sharper, not broader.",
  },
  {
    id: "clo-delivery",
    category: "positioning",
    stem: "How are CLO refreshers delivered to engineers?",
    options: [
      "Push notifications",
      "Through Claude Code itself, inline in their next session — no new surface, in-CC delivery is pull-based",
      "Email digest",
      "Calendar invites",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md throughout.",
    pitchAngle:
      "Refreshers ride the surface the engineer already uses. Not another inbox, not another Slack bot. Inline in CC at the moment they're about to ask.",
  },
  {
    id: "clo-refresher-cooldown",
    category: "positioning",
    stem: "What's the refresher cron cooldown?",
    options: [
      "1 hour",
      "18 hours",
      "1 week",
      "No cooldown",
    ],
    correctIndex: 1,
    explanation: "docs/CLO_V2.md §'Refreshers feel like spam' mitigation.",
    pitchAngle:
      "18-hour cooldown is empirically the line where refreshers feel useful instead of nagging. Tunable, but the default is deliberate.",
  },
  {
    id: "clo-feature-killed",
    category: "positioning",
    stem: "Which feature did the design pass explicitly kill?",
    options: [
      "/clo",
      "The 19-tile OAuth catalogue at /clo/integrations — moved to /clo/settings/advanced as 'legacy sources'",
      "MCP",
      "Pricing",
    ],
    correctIndex: 1,
    explanation: "DESIGN.md §10.7.",
    pitchAngle:
      "Killing the integration tile grid was the move. Most SaaS founders cling to that surface; we demoted it. The CC card replaces 19 OAuth flows with one.",
  },
];

export function questionsByCategory(): Record<Category, Question[]> {
  const grouped = {} as Record<Category, Question[]>;
  for (const q of QUESTIONS) {
    (grouped[q.category] ||= []).push(q);
  }
  return grouped;
}
