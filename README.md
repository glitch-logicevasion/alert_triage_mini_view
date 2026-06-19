# Alert Triage Mini-View

A small **Next.js + TypeScript** take-home assessment project for triaging mock security alerts in a restrained SOC-dashboard interface.

The app loads 200 bundled mock alerts from a local JSON file and lets an analyst filter, search, sort, inspect, and update alert status in frontend memory.

**Demo video:** [link to be added]

## Run locally

```bash
npm install
npm run dev
```

Optional validation:

```bash
npm run lint
npm run build
```

## Features

* SOC-style alert table with severity, status, title, source, created time, assignee, and subtle alert ID
* Filters for severity, status, and source
* Case-insensitive free-text search across alert fields
* Sortable table columns with custom severity/status ordering
* Persistent right-side alert detail panel
* In-memory status update from the detail panel
* Priority queue summary cards:

  * Open Critical/High
  * Unassigned
  * In Progress
  * Stale Open Alerts
  * Total Visible

## Key decisions and tradeoffs

This project intentionally uses a minimal stack: **Next.js, TypeScript, React state, `useMemo`, CSS Modules, and local JSON data**.

Status updates are kept in frontend memory because the assignment does not require a runnable backend. I avoided API routes, databases, auth, UI libraries, chart libraries, external state management, and Docker to keep the implementation focused and easy to review.

The mock data is bundled in the repo instead of uploaded by the user at runtime. A small development-only sanity check is included to verify the expected alert shape without adding a validation dependency.

## UX improvement rationale

The chosen SOC analyst UX improvement is **priority queue summary cards**.

SOC analysts need quick queue-level context so they can prioritize high-risk unresolved alerts before drilling into individual details.

The cards update based on the currently visible filtered/searched alert set.

## Development approach

This project uses a small spec-driven scaffold:

* `APP_SPEC.md` — product behavior and scope
* `BUILD_PLAN.md` — phased implementation plan
* `AGENTS.md` — AI coding-agent operating rules
* `PROJECT_STATE.md` — current project state and progress

## AI coding agent usage

I used AI coding agents to help scaffold components, utility logic, mock data, and documentation. I delegated repetitive implementation work while reviewing the output for scope control, TypeScript correctness, filter/sort behavior, status update behavior, and alignment with the assignment.

Where AI output added unnecessary complexity or drifted from the spec, I reviewed and adjusted it back toward the intended minimal implementation.

## Production backend notes

The running app does not use a backend. Production persistence is represented as documentation-only artifacts:

* `docs/status-update.sql`
* `docs/status-update-endpoint.cs`

These show how alert status updates could be backed by a real system with validation, RBAC, tenant scoping, audit history, optimistic concurrency, and parameterized SQL.

## What I would improve for production

For production, I would add authenticated user context, RBAC and tenant checks, backend persistence, audit logging, optimistic concurrency, server-side validation, API error handling, pagination or virtualization for larger queues, and integration with real alert sources.

