# BUILD_PLAN.md

## Project: Alert Triage Mini-View

This build plan breaks the project into small implementation phases for spec-driven development.

Codex should complete **one phase at a time**, update `PROJECT_STATE.md`, summarize what changed, list validation/manual test steps, and then **stop and wait for review** before continuing.

The primary source of truth is `APP_SPEC.md`.

## Global Implementation Rules

* Follow `APP_SPEC.md`.
* Implement one phase at a time.
* Do not overengineer.
* Do not add dependencies unless clearly justified.
* Use CSS Modules for styling.
* Keep alert status updates in frontend memory only.
* Do not create a runnable backend.
* Do not add API routes.
* Do not wire SQL/C# artifacts into the frontend.
* Do not add Tailwind, shadcn/ui, UI libraries, chart libraries, ORM, Docker, or external state management.
* Do not add a testing framework unless explicitly requested.
* Manual testing steps are expected after each phase.
* Run `npm run lint` and `npm run build` when available and practical.
* If validation scripts are missing or unavailable, say so rather than inventing them.
* Preserve existing behavior when adding new features.
* Update `PROJECT_STATE.md` after each phase.
* Stop and wait for review after each phase.

## Phase 0 — Repo/bootstrap and scaffold

### Goal

Prepare the base Next.js + TypeScript project structure around the manually added planning scaffold.

The repository and GitHub actions are handled manually outside Codex. At minimum, the markdown scaffold files should already exist or be added manually:

* `AGENTS.md`
* `APP_SPEC.md`
* `BUILD_PLAN.md`
* `PROJECT_STATE.md`
* `README.md`

Codex may create or adjust the application scaffold as needed, but should not handle GitHub repo creation, commits, remotes, or other Git operations.

### Files likely touched

* `package.json`
* `tsconfig.json`
* `next.config.ts` or `next.config.js`
* `src/app/page.tsx`
* `src/app/page.module.css`
* `src/app/layout.tsx`
* `src/app/globals.css`
* `PROJECT_STATE.md`

### Acceptance criteria

* Next.js app structure exists using TypeScript.
* Modern App Router structure is used with `src/app/page.tsx`.
* App can render a minimal placeholder page.
* CSS Modules are available and used for page-level styling where appropriate.
* No unnecessary dependencies are added.
* No dashboard functionality is required yet.
* `PROJECT_STATE.md` is updated to mark Phase 0 complete and Phase 1 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 1 — Mock alert data and TypeScript model

### Goal

Add the alert data model, local JSON alert fixture, and small development-only sanity check.

The app should use a pre-bundled local JSON file, not a user upload flow.

### Files likely touched

* `src/types/alert.ts`
* `src/data/mock-alerts.json`
* `src/lib/alertValidation.ts`
* `.gitignore`, only if needed for a temporary generation script or temporary output
* `PROJECT_STATE.md`

### Implementation notes

* `mock-alerts.json` should contain exactly 200 alerts.
* Use only the required assignment fields:

  * `id`
  * `title`
  * `severity`
  * `status`
  * `source`
  * `createdAt`
  * `assignee`
* `assignee` should be `string | null`.
* `null` represents unassigned alerts.
* Alert dates should span the last 1–7 days.
* Include enough Open alerts older than 24 hours to make stale-alert logic meaningful.
* Include a realistic mix of severities, statuses, sources, and assignees.
* Alert titles should be security-relevant but should not require extra fields.

A temporary one-off script may be used to generate the JSON if helpful, but the final repo should only keep `src/data/mock-alerts.json`, not the generator script. If a temporary script path is used during development, ensure it is removed before completing the phase. `.gitignore` may be updated only if there is a clear temporary artifact that should not be committed.

### Acceptance criteria

* `Alert`, `AlertSeverity`, `AlertStatus`, and `AlertSource` types are defined.
* `mock-alerts.json` contains exactly 200 valid alerts.
* Severity values are limited to:

  * `Critical`
  * `High`
  * `Medium`
  * `Low`
* Status values are limited to:

  * `Open`
  * `In Progress`
  * `Resolved`
  * `False Positive`
* Source values are limited to:

  * `SIEM`
  * `EDR`
  * `Email Security`
  * `Cloud`
  * `Identity`
  * `Network`
* A small dev-only sanity check exists without adding a validation dependency.
* No JSON upload flow is added.
* No backend/API loading is added.
* Temporary generation files are not kept in the final repo.
* `PROJECT_STATE.md` is updated to mark Phase 1 complete and Phase 2 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 2 — Core layout and alert table

### Goal

Render the basic SOC dashboard shell and alert table using the local mock alert data.

This phase should make the app visually recognizable as a restrained SOC alert queue, but should not yet implement the full filter/search/sort workflow.

### Files likely touched

* `src/app/page.tsx`
* `src/app/page.module.css`
* `src/components/AlertDashboard.tsx`
* `src/components/AlertDashboard.module.css`
* `src/components/AlertTable.tsx`
* `src/components/AlertTable.module.css`
* `src/components/SeverityBadge.tsx`
* `src/components/StatusBadge.tsx`
* `PROJECT_STATE.md`

### Implementation notes

* Use a restrained dark SOC-dashboard style.
* Avoid flashy visuals and unnecessary animation.
* Show the required default table columns:

  * ID, displayed subtly
  * Severity
  * Status
  * Title
  * Source
  * Created
  * Assignee
* Created time in the table should display as relative age, such as `3h ago` or `2d ago`.
* Render `assignee: null` as `Unassigned`.
* Use severity/status badges for readability.
* No alert should be selected by default.
* Basic responsive behavior should be included where practical, but detailed polish can wait until Phase 7.

### Acceptance criteria

* Dashboard shell renders.
* Local mock alerts render in a table.
* Table displays all default columns.
* ID is visible but visually subtle.
* Severity and status badges are displayed consistently.
* Created time displays as relative age.
* Unassigned alerts display as `Unassigned`.
* No alert is selected by default.
* Basic layout works on normal desktop widths and does not completely break on narrower screens.
* No filter/search/sort controls are required yet unless trivial.
* No detail panel functionality is required yet.
* No summary cards are required yet.
* `PROJECT_STATE.md` is updated to mark Phase 2 complete and Phase 3 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 3 — Filter/search/sort logic

### Goal

Add deterministic client-side filtering, search, and sorting over the local alert array.

### Files likely touched

* `src/components/AlertDashboard.tsx`
* `src/components/AlertTable.tsx`
* `src/components/AlertFilters.tsx`
* `src/components/AlertFilters.module.css`
* `src/lib/alertFilters.ts`
* `src/lib/alertSort.ts`
* `PROJECT_STATE.md`

### Implementation notes

Filters:

* severity
* status
* source

Each filter should include an `All` option.

Search should be case-insensitive and match:

* `id`
* `title`
* `severity`
* `status`
* `source`
* `assignee`
* `Unassigned` for alerts where `assignee` is `null`

Sorting should support:

* severity
* status
* title
* source
* createdAt
* assignee

Default sort:

* `createdAt` descending

Use custom sort ranking for severity:

```text
Critical > High > Medium > Low
```

Use custom sort ranking for status:

```text
Open > In Progress > Resolved > False Positive
```

Reset behavior:

* reset clears filters
* reset clears search
* reset does not reset sort
* reset does not clear selected alert

Use `useMemo` for visible alert derivation.

### Acceptance criteria

* Severity, status, and source filters work.
* Filters combine with AND logic.
* Search works and combines with filters.
* Search matches `Unassigned` for null assignees.
* Sortable table headers work.
* Clicking the active sort column toggles direction.
* Clicking a new sort column changes the active sort field.
* New `createdAt`, `severity`, and `status` sorts default to descending.
* New text-field sorts default to ascending.
* Severity sorting uses priority order.
* Status sorting uses operational order.
* Empty result state appears when no alerts match current filters/search.
* Reset clears filters/search only.
* Visible alerts are derived with `useMemo`.
* No backend/API/localStorage is added.
* `PROJECT_STATE.md` is updated to mark Phase 3 complete and Phase 4 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 4 — Detail panel and in-memory status update

### Goal

Add alert selection, persistent right-side detail panel, and in-memory status updates.

### Files likely touched

* `src/components/AlertDashboard.tsx`
* `src/components/AlertTable.tsx`
* `src/components/AlertDetailPanel.tsx`
* `src/components/AlertDetailPanel.module.css`
* `src/lib/alertSummary.ts`, if stale helper is introduced here
* `PROJECT_STATE.md`

### Implementation notes

* No alert should be selected by default.
* The detail panel should be persistent on the right side of the dashboard layout.
* Use an empty state when no alert is selected.
* Selecting a row opens that alert in the detail panel.
* Store selected alert by ID, not by object.
* Status updates should be made only from the detail panel.
* Status updates should update React state immutably.
* Status updates should not be persisted to localStorage.
* Status updates should not call an API.
* The source JSON file should not be modified.
* The detail panel should show full created timestamp plus relative age.

### Acceptance criteria

* Empty detail panel state appears on initial load.
* Selecting a table row shows alert details.
* Selected row is visually highlighted.
* Detail panel shows:

  * alert ID
  * title
  * severity
  * status
  * source
  * full created timestamp
  * relative age
  * assignee
  * stale indicator, if applicable
  * status update control
* Status dropdown supports:

  * `Open`
  * `In Progress`
  * `Resolved`
  * `False Positive`
* Changing status updates the selected alert in memory.
* Table row updates after status change.
* Detail panel updates after status change.
* Filter/search/sort behavior remains intact.
* No inline table status update is added.
* No backend/API/localStorage is added.
* `PROJECT_STATE.md` is updated to mark Phase 4 complete and Phase 5 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 5 — SOC UX improvement

### Goal

Add the chosen SOC analyst UX improvement: priority queue summary cards.

### Files likely touched

* `src/components/AlertDashboard.tsx`
* `src/components/SummaryCards.tsx`
* `src/components/SummaryCards.module.css`
* `src/lib/alertSummary.ts`
* `src/components/AlertTable.tsx`, if adding small stale badge polish
* `src/components/AlertDetailPanel.tsx`, if adding stale status polish
* `PROJECT_STATE.md`

### Implementation notes

Use a restrained dark SOC-dashboard visual style.

Summary cards:

* Open Critical/High
* Unassigned
* In Progress
* Stale Open Alerts
* Total Visible

Cards should calculate from the currently visible filtered/searched alert set.

The cards are informational only and should not act as clickable filters.

A stale alert is:

```text
status is Open
AND createdAt is older than 24 hours
```

Only Open alerts can be stale.

A small stale badge may appear in the table/detail panel as secondary polish, but do not expand this into a full SLA system.

### Acceptance criteria

* Summary cards render above the filter/table area.
* Cards show:

  * Open Critical/High
  * Unassigned
  * In Progress
  * Stale Open Alerts
  * Total Visible
* Summary values are computed outside the `SummaryCards` component and passed in as props.
* Summary cards update after filters change.
* Summary cards update after search changes.
* Summary cards update after status changes.
* Summary cards calculate from visible alerts, not all alerts.
* Stale Open Alerts uses the agreed stale definition.
* Cards are not clickable filters.
* UI remains restrained and uncluttered.
* Existing table, detail panel, filtering, searching, sorting, and status update behavior remain intact.
* `PROJECT_STATE.md` is updated to mark Phase 5 complete and Phase 6 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 6 — SQL + C# production artifacts

### Goal

Add documentation-only production backend artifacts showing how in-memory status updates could map to real persistence.

These artifacts are not part of a runnable backend.

### Files likely touched

* `docs/status-update.sql`
* `docs/status-update-endpoint.cs`
* `PROJECT_STATE.md`

### Implementation notes

The frontend must not import or call these files.

The SQL file should include:

* `alerts` table
* `alert_status_history` table
* parameterized status update query
* production notes for:

  * validation
  * RBAC
  * tenant scope
  * auditability
  * optimistic concurrency
  * parameterized queries

The C# file should include a minimal ASP.NET endpoint sketch for:

```text
PATCH /api/alerts/{id}/status
```

The C# sketch should include:

* request DTO
* status validation
* placeholder authorization/RBAC/tenant checks
* repository/service call
* audit logging comment
* response shape

Do not create a full backend project.

### Acceptance criteria

* `docs/status-update.sql` exists.
* `docs/status-update-endpoint.cs` exists.
* SQL artifact includes `alerts` schema.
* SQL artifact includes `alert_status_history` schema.
* SQL artifact includes a parameterized status update query.
* SQL artifact includes production notes for validation, RBAC, tenant scope, auditability, optimistic concurrency, and parameterized queries.
* C# artifact includes a minimal `PATCH /api/alerts/{id}/status` endpoint sketch.
* C# artifact includes request DTO, validation, auth/RBAC/tenant placeholders, service/repository call, audit logging comment, and response shape.
* No runnable backend project is created.
* No frontend code calls these artifacts.
* `PROJECT_STATE.md` is updated to mark Phase 6 complete and Phase 7 as next.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for review.

## Phase 7 — README, screen recording readiness, and polish

### Goal

Make the project submission-ready with concise documentation and final UI polish.

### Files likely touched

* `README.md`
* `PROJECT_STATE.md`
* component CSS modules, only for polish
* minor component files, only if needed for polish or correctness

### Implementation notes

Use a restrained dark SOC-dashboard visual style.

The README should be concise and suitable for a reviewer. It should stay short enough that the final README can remain under one page.

README should cover:

* project summary
* demo video link placeholder
* how to run locally
* features
* key decisions and tradeoffs
* UX improvement rationale
* AI coding agent usage
* production backend notes
* what would be improved in production

Polish should focus on:

* readability
* spacing
* consistent badges
* clear selected row state
* clear empty states
* responsive behavior
* no obvious rough edges

Do not add new major features during polish.

### Acceptance criteria

* README is concise and reviewer-friendly.
* README includes a demo video link placeholder.
* README includes local run instructions.
* README lists the main features.
* README explains key decisions and tradeoffs.
* README explains the priority summary cards UX improvement.
* README explains how AI coding agents were used.
* README explains what was delegated.
* README explains where AI output was reviewed/overridden.
* README summarizes production backend artifacts.
* README lists what would be improved in production.
* App remains scoped to the assignment.
* UI has no obvious rough edges.
* Basic responsive behavior is acceptable.
* `npm run lint` and `npm run build` are run when available/practical.
* `PROJECT_STATE.md` is updated to mark Phase 7 complete.
* Codex summarizes changed files, validation steps, and manual test steps.
* Codex stops and waits for final review.

## Final Completion Criteria

The project is complete when:

* The app runs locally.
* The app loads 200 bundled mock alerts.
* The app displays a SOC-style alert table.
* Severity/status/source filters work.
* Free-text search works.
* Sorting works with custom severity/status ordering.
* Selecting an alert opens the persistent right-side detail panel.
* Status updates work in frontend memory.
* Priority summary cards update from visible alerts.
* SQL and C# production artifacts exist under `/docs`.
* README is concise and complete.
* No unnecessary backend, dependency, or architecture has been added.
* `PROJECT_STATE.md` accurately reflects final project state.

