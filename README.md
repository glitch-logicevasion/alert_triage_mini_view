# Alert Triage Mini-View

A small Next.js + TypeScript alert triage mini-view using bundled local mock security alerts.

Demo video: [https://youtu.be/GySug0A6ccY]

## Run And Validate

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Features

- Local JSON fixture with 200 mock alerts
- Filter by severity, status, and source
- Free-text search and sortable alert table
- Persistent detail panel with in-memory status updates
- Priority queue summary cards for Open Critical/High, Unassigned, In Progress, Stale Open Alerts, and Total Visible
- Docs-only SQL/C# production artifacts in `docs/status-update.sql` and `docs/status-update-endpoint.cs`

## Key Decisions

- Used bundled local JSON instead of backend fetching to keep the assessment focused and runnable.
- Kept status updates in memory because the assignment does not require a working backend.
- Added SQL and C# docs-only sketches showing how persisted production updates could work.
- Used CSS Modules and native controls instead of UI libraries to keep the app lightweight.
- Used derived React state and `useMemo` for filter/search/sort/summary calculations.
- Avoided pagination/virtualization because the fixture is only 200 alerts.

## SOC UX Improvement

Chosen improvement: priority queue summary cards.

SOC analysts need quick queue-level context so they can prioritize high-risk unresolved alerts before drilling into individual details.

## AI Coding Agent Usage

I used ChatGPT to plan the phased implementation, refine requirements, review Codex output, and generate phase prompts. I used Codex to implement the app phase by phase, including scaffolding, components, mock data generation, filter/search/sort utilities, detail/status workflow, summary cards, and backend artifact drafts.

Human review included running the app, manually testing behavior, running `npm run lint` and `npm run build`, checking scope boundaries, and committing each phase manually. I constrained or overrode AI output where needed: keeping status updates frontend-only, backend artifacts docs-only, avoiding extra dependencies/UI libraries, keeping summary cards informational only, keeping this README concise, and not using Codex for Git operations.

## Production Notes

In production, I would add a real backend API, database persistence, authentication, RBAC, tenant-scoped access, audit logging/status history, optimistic concurrency, server-side validation, structured API errors, pagination or virtualization for large queues, real SIEM/SOAR integrations, and observability/logging.

The included SQL and C# files under `docs/` sketch the status-update persistence approach and are not called by the current frontend.
