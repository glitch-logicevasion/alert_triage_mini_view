# PROJECT_STATE.md

## Project: Alert Triage Mini-View

## Current Phase

**Ready for final review / submission**

Phase 7 is complete.

The remaining manual submission task is:

```text
Record the screen demo and replace the README demo video placeholder if applicable.
```

## Completed Implementation Phases

* Phase 0 — Repo/bootstrap and scaffold
* Phase 1 — Mock alert data and TypeScript model
* Phase 2 — Core layout and alert table
* Phase 3 — Filter/search/sort logic
* Phase 4 — Detail panel and in-memory status update
* Phase 5 — SOC UX improvement
* Phase 6 — SQL + C# production artifacts
* Phase 7 — README, screen recording readiness, polish

## Known Working Features

* Basic Next.js app scaffold exists.
* TypeScript is configured with strict settings.
* Modern App Router structure is present under `src/app`.
* CSS Modules are available and used by dashboard and table components.
* Alert TypeScript model exists in `src/types/alert.ts`.
* Bundled local mock alert data exists in `src/data/mock-alerts.json`.
* Development-only validation utility exists in `src/lib/alertValidation.ts`.
* Mock data contains exactly 200 alerts with IDs from `ALRT-0001` through `ALRT-0200`.
* Mock data uses only the fixed severity, status, and source values from the spec.
* Mock data includes unassigned alerts using `assignee: null`.
* Mock alert timestamps are valid ISO strings spanning recent days from 2026-06-12 through 2026-06-19.
* `AlertDashboard` renders the main SOC-style dashboard shell.
* Local mock data is imported and validated in development before use.
* Alerts are ordered newest-first by `createdAt` before rendering.
* Static alert table displays all 200 bundled alerts.
* Table columns display ID, Severity, Status, Title, Source, Created, and Assignee.
* Alert IDs are styled subtly.
* Severity and status badges render consistently.
* Created time displays as compact relative age.
* `assignee: null` displays as `Unassigned`.
* Table content scrolls inside the table panel.
* `AlertDashboard` owns filter, search query, and sort state.
* `AlertFilters` provides search plus severity, status, and source filters.
* `filterAlerts()` applies filters with AND logic and combines them with search.
* `sortAlerts()` applies deterministic client-side sorting without mutating input arrays.
* Search is case-insensitive and matches ID, title, severity, status, source, assignee, and `Unassigned`.
* Table headers support interactive sorting for Severity, Status, Title, Source, Created, and Assignee.
* Severity sorting uses `Critical > High > Medium > Low`.
* Status sorting uses `Open > In Progress > Resolved > False Positive`.
* Visible count displays matching alerts out of the full local fixture.
* Empty state displays when no alerts match current filters/search.
* Alerts are initialized into React state from the validated local fixture.
* `AlertDashboard` stores selected alert ID state.
* Selected alert is derived from full alert state, not from the visible table.
* Persistent right-side detail panel appears alongside the table on desktop and stacks below on smaller screens.
* Detail panel shows the required initial empty state when no alert is selected.
* Table row selection is available through a native button in the title cell.
* Selected row styling is visually obvious and restrained.
* Detail view shows alert ID, title, severity, status, source, full timestamp, relative age, and assignee.
* Detail panel shows a stale indicator for Open alerts older than 24 hours.
* Status updates happen immediately in memory from the detail panel.
* Table rows, detail panel, visible count, filters, search, and sorting derive from updated alert state.
* Chosen SOC UX improvement is priority queue summary cards.
* `SummaryCards` renders under the page header and above the main table/detail grid.
* `getAlertSummary()` calculates summary counts from visible alerts.
* Summary cards derive from `visibleAlerts`, not the full alert fixture.
* Summary cards show Open Critical/High, Unassigned, In Progress, Stale Open Alerts, and Total Visible counts.
* Summary counts update after filters, search, and status changes.
* Summary cards are informational only and not clickable.
* Existing filter/search/sort/detail/status behavior is preserved.
* Docs-only SQL artifact exists at `docs/status-update.sql`.
* Docs-only C# endpoint artifact exists at `docs/status-update-endpoint.cs`.
* SQL artifact includes an `alerts` table sketch.
* SQL artifact includes an `alert_status_history` table sketch for auditability.
* SQL artifact includes a parameterized optimistic-concurrency status update query.
* SQL artifact includes a status history insert query.
* C# artifact sketches `PATCH /api/alerts/{id}/status`.
* C# artifact includes `UpdateAlertStatusRequest` and `AlertStatusResponse` DTOs.
* C# artifact includes server-side status validation for backend enum values.
* C# artifact includes RBAC, tenant scope, audit logging, and optimistic concurrency placeholders.
* Backend artifacts are documentation only and are not called by the running frontend.
* README has been finalized as a concise reviewer-facing submission document.
* README includes the demo video placeholder, run/validation commands, feature summary, key tradeoffs, AI usage, and production notes.
* Sortable table headers include `aria-sort` metadata for screen reader clarity.

## Chosen SOC UX Improvement

Priority queue summary cards.

Rationale:

```text
SOC analysts need quick queue-level context so they can prioritize high-risk unresolved alerts before drilling into individual details.
```

## Validation Results

Phase 7 final validation completed:

```bash
npm run lint
npm run build
```

Both commands completed successfully.

Manual Phase 7 verification checklist:

* README is concise and reviewer-facing.
* README includes demo placeholder.
* README includes run/validation commands.
* README covers key decisions and trade-offs.
* README covers AI coding agent usage, delegated work, human review, and scope constraints.
* README covers production improvements.
* README mentions docs-only SQL/C# artifacts.
* App still runs with `npm run dev`.
* Dashboard still shows summary cards, filters, table, and detail panel.
* Status update still works in memory.
* No backend/API/localStorage/dependencies were added.
* Final lint/build pass completed.

Manual Phase 6 verification checklist:

* `docs/status-update.sql` exists.
* `docs/status-update-endpoint.cs` exists.
* SQL file includes `alerts` table sketch.
* SQL file includes `alert_status_history` table sketch.
* SQL file includes parameterized optimistic-concurrency status update query.
* SQL file includes audit/history insert.
* SQL notes mention parameterization, RBAC, tenant scope, auditability, and optimistic concurrency.
* C# file sketches `PATCH /api/alerts/{id}/status`.
* C# file includes `UpdateAlertStatusRequest`.
* C# file includes `AlertStatusResponse`.
* C# file includes status validation.
* C# file includes authenticated user, tenant scope, RBAC, audit logging, and optimistic concurrency placeholders.
* Docs clearly say these are production sketches and are not called by the current frontend.
* Frontend behavior was not changed.
* README was not updated.

Manual Phase 5 verification checklist:

* App runs with `npm run dev`.
* Summary cards appear under the page header and above the table/detail grid.
* Cards display Open Critical/High, Unassigned, In Progress, Stale Open Alerts, and Total Visible.
* Cards summarize the visible filtered/searched result set, not the full dataset.
* Changing filters updates summary card counts.
* Changing search updates summary card counts.
* Changing status from the detail panel updates summary card counts.
* `Total Visible` matches the existing `Showing X of 200 alerts` visible count.
* Summary cards are informational only and not clickable.
* Detail panel and status updates still work.
* Filter/search/sort/reset behavior still works.
* Backend/API/localStorage and README updates were not added.

Manual Phase 4 verification checklist:

* App runs with `npm run dev`.
* No alert is selected by default.
* Detail panel empty state appears initially.
* Selecting an alert from the table opens its details.
* Selected row styling appears.
* Detail panel shows ID, title, severity, status, source, full timestamp, relative age, assignee, and stale indicator when applicable.
* Status select shows the selected alert current status.
* Changing status updates the alert in memory immediately.
* Table row status and detail panel status update after status change.
* Visible count updates when a status change affects active filters.
* A selected alert remains visible in the detail panel even if a status-filter change removes it from the table.
* Filters/search/sort still work after status updates.
* Reset still clears filters/search only and preserves sort.
* Summary cards, backend/API calls, and localStorage were not added.

Manual Phase 3 verification checklist:

* Search filters alerts by title, ID, severity, status, source, assignee, and `Unassigned`.
* Severity, status, and source filters work independently and combine with AND logic.
* Search combines with active filters.
* Reset clears filters and search without resetting the current sort.
* Sortable headers toggle direction when active and apply default direction when changing fields.
* Active sort direction indicator displays in the sorted column header.
* Created sorting uses date order.
* Visible count updates as filters/search change.
* Empty state appears when no alerts match.
* Detail panel, status updates, summary cards, API routes, and localStorage were not added.

Manual Phase 2 verification completed:

* Static dashboard shell renders through `src/app/page.tsx`.
* The local alert fixture contains 200 alerts.
* Newest-first ordering starts with `ALRT-0001` from `2026-06-19T10:00:00.000Z`.
* The oldest rendered alert is from `2026-06-12T18:53:00.000Z`.
* 40 alerts are unassigned and render through the table fallback as `Unassigned`.
* Filters, search, interactive sorting, detail panel, status updates, and summary cards were not added.

Manual data verification completed:

* `src/data/mock-alerts.json` exists.
* The fixture contains exactly 200 alerts.
* IDs run from `ALRT-0001` to `ALRT-0200`.
* Only allowed severity/status/source values are used.
* 40 alerts have `assignee: null`.
* Timestamps parse as valid ISO strings and span recent days.
* 82 Open alerts are older than 24 hours for future stale-alert logic.
* Temporary generation files were removed.

## Known Issues

* Demo video link is still a placeholder until the screen recording is available.
* Existing npm dependency audit findings remain unchanged. No audit fix was run because dependency changes are outside Phase 7 scope.

## AI Usage Notes

* Codex implemented Phase 0 manually because the repo was non-empty and `create-next-app` could risk overwriting existing planning files.
* Codex preserved existing planning markdown files and only updated `PROJECT_STATE.md`.
* Codex added a minimal Next.js, TypeScript, App Router, CSS Modules, and ESLint scaffold without dashboard functionality.
* Codex implemented Phase 1 as a data/model-only foundation with no UI rendering.
* Codex used and removed a temporary deterministic generator to create the committed JSON fixture.
* Codex added a plain TypeScript throwing validation utility without adding dependencies.
* Codex implemented Phase 2 as a static dashboard/table layer only, without adding Phase 3 interactions.
* Codex wired the Phase 1 validator into the dashboard in development mode.
* Codex kept data loading local to the bundled JSON fixture and did not add API routes or new dependencies.
* Codex implemented Phase 3 filtering, search, and sorting as plain TypeScript utilities plus React state in `AlertDashboard`.
* Codex kept alerts as imported static data and did not convert alert data to React state.
* Codex kept `AlertTable` presentational by passing visible alerts, sort state, and sort callbacks from the dashboard.
* Codex did not add row selection, detail panel behavior, status updates, summary cards, new dependencies, or README changes.
* Codex implemented Phase 4 by initializing alerts into React state and storing selected alert by ID.
* Codex derived selected alert from full alert state so the detail panel remains current after status updates and active filters.
* Codex added the persistent detail panel and stale Open alert helper without adding summary card calculations.
* Codex kept status updates frontend-only and did not add API routes, localStorage, backend code, new dependencies, or README changes.
* Codex implemented Phase 5 as an additive summary-card layer above the existing table/detail grid.
* Codex expanded `alertSummary.ts` to calculate visible-set summary counts and reused `isStaleOpenAlert()`.
* Codex kept summary cards informational only and did not add clickable card filters or chart dependencies.
* Codex did not change README, add backend/API/localStorage, or continue into Phase 6.
* Codex implemented Phase 6 as documentation-only backend production sketches.
* Codex created exactly the requested SQL and C# artifact files under `docs/`.
* Codex did not wire the artifacts into the frontend or add backend project files, API routes, dependencies, Docker, localStorage, or README changes.
* Codex finalized the README for reviewer-facing submission during Phase 7.
* Codex kept final UI polish limited to small sortable-header accessibility metadata.
* Codex did not add features, dependencies, backend wiring, localStorage, tests, Docker, or Git operations during Phase 7.

## Planning Decisions Made

### App Scope

* Build a single-page **Next.js + TypeScript** SOC alert triage mini app.
* Use the modern App Router structure with `src/app/page.tsx`.
* Prioritize correctness, clarity, maintainability, and SOC workflow usefulness.
* Avoid unnecessary features, dependencies, and architecture.

### Data Loading

* Alerts will be loaded from a pre-bundled local JSON file.
* Planned location:

```text
src/data/mock-alerts.json
```

* The JSON file should contain exactly 200 mock alerts.
* No user JSON upload flow will be implemented.
* No backend data fetch will be implemented.

### Alert Data Model

Alerts use only the required assignment fields:

* `id`
* `title`
* `severity`
* `status`
* `source`
* `createdAt`
* `assignee`

`assignee` should be `string | null`, where `null` is displayed as `Unassigned`.

### Allowed Values

Severity values:

* `Critical`
* `High`
* `Medium`
* `Low`

Status values:

* `Open`
* `In Progress`
* `Resolved`
* `False Positive`

Source values:

* `SIEM`
* `EDR`
* `Email Security`
* `Cloud`
* `Identity`
* `Network`

### Data Validation

* Include a small development-only sanity check for the bundled JSON data.
* Do not add a validation library such as Zod.
* The sanity check should verify required fields and allowed severity/status/source values.

### UI Direction

* Use a restrained dark SOC-dashboard style.
* The app should feel like a clean internal security queue, not a flashy dashboard.
* Use CSS Modules.
* Do not use Tailwind, shadcn/ui, or UI libraries.

### Default Table Columns

The alert table should show:

* ID, displayed subtly
* Severity
* Status
* Title
* Source
* Created
* Assignee

### Created Time Display

* Table should show relative age, such as `3h ago` or `2d ago`.
* Detail panel should show full timestamp plus relative age.

### Selection Behavior

* No alert is selected by default.
* Detail panel should show an empty state until an alert is selected.
* Selected alert should be stored by ID, not by object.

### Detail Panel

* Use a persistent right-side detail panel.
* Do not use an overlay drawer or modal.
* Status updates should only be available from the detail panel.
* Do not add inline table status updates.

### Status Updates

* Status updates remain in frontend memory only.
* Status updates should update:

  * alert state
  * selected detail panel
  * table row
  * summary cards

Do not persist status updates to:

* backend
* API route
* localStorage
* database
* source JSON file

### Filtering, Search, and Sorting

Filters:

* severity
* status
* source

Filter behavior:

* each filter has an `All` option
* filters combine with AND logic
* reset clears filters and search only
* reset does not reset sort
* reset does not clear selected alert

Search behavior:

* case-insensitive
* matches `id`, `title`, `severity`, `status`, `source`, and `assignee`
* also matches `Unassigned` for `assignee: null`

Sort behavior:

* default sort is `createdAt` descending
* sortable fields include severity, status, title, source, createdAt, and assignee
* severity uses custom priority order
* status uses custom operational order

Severity order:

```text
Critical > High > Medium > Low
```

Status order:

```text
Open > In Progress > Resolved > False Positive
```

### State Model

Use a single stateful dashboard container.

State should include:

* alerts
* selected alert ID
* filters
* search query
* sort state

Use `useMemo` for derived values:

* visible alerts
* selected alert
* summary card counts
* available filter values, if needed

Do not use external state management.

### SOC UX Improvement

Chosen UX improvement:

```text
Priority queue summary cards
```

Summary cards:

* Open Critical/High
* Unassigned
* In Progress
* Stale Open Alerts
* Total Visible

Rationale:

```text
SOC analysts need quick queue-level context so they can prioritize high-risk unresolved alerts before drilling into individual details.
```

Summary cards should calculate from currently visible filtered/searched alerts.

Cards are informational only and should not become clickable filters.

### Stale Alert Definition

A stale alert is:

```text
status is Open
AND createdAt is older than 24 hours
```

Only Open alerts can be stale.

A small stale badge may appear in the table/detail panel as secondary polish.

### Backend Production Artifacts

Backend artifacts are documentation-only and should live under:

```text
docs/status-update.sql
docs/status-update-endpoint.cs
```

These files should not be imported or called by the frontend.

The SQL artifact should include:

* `alerts` table
* `alert_status_history` table
* parameterized status update query
* production notes for validation, RBAC, tenant scope, auditability, optimistic concurrency, and parameterized queries

The C# artifact should include a minimal sketch for:

```text
PATCH /api/alerts/{id}/status
```

It should include:

* request DTO
* status validation
* placeholder authorization/RBAC/tenant checks
* repository/service call
* audit logging comment
* response shape

Do not create a runnable backend project.

## Manual Scaffold Notes

The user is manually creating and managing the markdown planning scaffold:

* `AGENTS.md`
* `APP_SPEC.md`
* `BUILD_PLAN.md`
* `PROJECT_STATE.md`
* `README.md`

Codex should not assume it needs to create these files from scratch during Phase 0 if they already exist.

The user is also manually handling:

* GitHub repository creation
* Git operations
* commits
* pushes
* pull requests, if any

Codex should not perform Git operations unless explicitly instructed.

## Phase Sequence

Immediate next action:

```text
Phase 0 — Repo/bootstrap and scaffold
```

Full planned sequence:

1. Phase 0 — Repo/bootstrap and scaffold
2. Phase 1 — Mock alert data and TypeScript model
3. Phase 2 — Core layout and alert table
4. Phase 3 — Filter/search/sort logic
5. Phase 4 — Detail panel and in-memory status update
6. Phase 5 — SOC UX improvement
7. Phase 6 — SQL + C# production artifacts
8. Phase 7 — README, screen recording readiness, and polish

## Next Actions

1. Start Phase 0.
2. Inspect the existing repo/scaffold.
3. Create or adjust the Next.js + TypeScript app structure as needed.
4. Render a minimal placeholder page.
5. Confirm CSS Modules are usable.
6. Update this file after Phase 0.
7. Stop and wait for review.

## AI Usage Notes

AI assistance has been used for:

* project planning
* scope control
* app specification drafting
* phased build planning
* coding-agent operating rules
* project state scaffold drafting

Implementation has not started yet.

Future AI coding-agent usage should be recorded after each phase, especially:

* what was delegated
* what changed
* what validation was run
* where output was reviewed or corrected
* known issues or follow-up actions
