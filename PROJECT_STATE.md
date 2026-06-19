# PROJECT_STATE.md

## Project: Alert Triage Mini-View

## Current Phase

**Planning / Pre-implementation**

Implementation has not started yet.

The immediate next action is:

```text
Begin Phase 0 — Repo/bootstrap and scaffold
```

## Completed Implementation Phases

None yet.

## Known Working Features

None yet.

No application implementation has started, so no runtime behavior has been validated.

## Known Issues

* No code scaffold has been validated yet.
* No local build or lint command has been run yet.
* No mock alert data exists yet.
* No UI components exist yet.
* No backend production artifacts exist yet.

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

