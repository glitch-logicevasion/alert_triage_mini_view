# APP_SPEC.md

## Project: Alert Triage Mini-View

## Assignment Summary

Build a small **Next.js + TypeScript** single-page application that loads a bundled local JSON file containing approximately 200 mock security alerts.

The app should help a SOC analyst triage alerts through:

* a sortable and filterable alert list
* filters by severity, status, and source
* free-text search
* a persistent right-side detail panel when an alert is selected
* in-memory status updates with no backend required
* one SOC analyst UX improvement with a one-line rationale
* minimal production backend artifacts as documentation only:

  * SQL schema/status update sketch
  * C# ASP.NET endpoint sketch

The frontend app must not call the SQL or C# artifacts. Status updates remain in frontend memory.

## User Workflow

The analyst opens a single-page alert queue and uses queue-level context, filters, search, and sorting to prioritize alerts.

Primary workflow:

1. Analyst opens the dashboard.
2. Analyst reviews priority queue summary cards.
3. Analyst narrows the queue using severity, status, and source filters.
4. Analyst searches by alert ID, title, source, status, severity, or assignee.
5. Analyst sorts the table by relevant fields such as severity or created time.
6. Analyst selects an alert row.
7. The right-side detail panel displays alert metadata.
8. Analyst updates the alert status from the detail panel.
9. The table, selected detail panel, and summary cards update immediately from frontend state.

No alert should be selected by default. The detail panel should show an empty state until the analyst selects an alert.

## Required Features

### Alert List

Display alerts in a SOC-style table with the following default columns:

* ID, shown subtly
* Severity
* Status
* Title
* Source
* Created
* Assignee

The table should support row selection. The selected row should be visually distinguishable.

### Filters

Provide filter controls for:

* severity
* status
* source

Each filter should include an `All` option.

Filters combine with AND logic.

### Free-Text Search

Provide a search input that filters alerts case-insensitively.

Search should match:

* `id`
* `title`
* `severity`
* `status`
* `source`
* `assignee`

For unassigned alerts, search should also match the display text `Unassigned`.

No debounce, fuzzy search, regex search, or backend search is required.

### Sorting

Support sorting for:

* severity
* status
* title
* source
* createdAt
* assignee

Default sort:

* `createdAt` descending

Sort behavior:

* clicking the active sort column toggles ascending/descending
* clicking a new sort column changes the active sort field
* new `createdAt`, `severity`, and `status` sorts should default to descending
* new text-field sorts should default to ascending

Severity sorting should use priority order rather than alphabetical order:

```text
Critical > High > Medium > Low
```

Status sorting should use operational order rather than alphabetical order:

```text
Open > In Progress > Resolved > False Positive
```

### Detail Panel

Use a persistent right-side detail panel, not an overlay drawer or modal.

When no alert is selected, show an empty state:

```text
Select an alert to review details and update status.
```

When an alert is selected, show:

* alert ID
* title
* severity
* status
* source
* created time
* relative age
* assignee
* stale indicator, if applicable
* status update control

Status updates should only be available from the detail panel, not inline in the table.

### Status Update Behavior

Allowed statuses:

* `Open`
* `In Progress`
* `Resolved`
* `False Positive`

Changing an alert status should:

* update the alert in React state
* update the selected detail panel
* update the table row
* update summary card counts
* remain in frontend memory only

The app should not:

* persist updates to localStorage
* call an API route
* call the SQL or C# artifact
* create a backend
* modify the source JSON file

## Alert Data Model

Use exactly the assignment-required fields.

```ts
export type AlertSeverity = "Critical" | "High" | "Medium" | "Low";

export type AlertStatus = "Open" | "In Progress" | "Resolved" | "False Positive";

export type AlertSource =
  | "SIEM"
  | "EDR"
  | "Email Security"
  | "Cloud"
  | "Identity"
  | "Network";

export type Alert = {
  id: string;
  title: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: AlertSource;
  createdAt: string;
  assignee: string | null;
};
```

Example alert:

```json
{
  "id": "ALRT-0001",
  "title": "Suspicious PowerShell execution detected",
  "severity": "High",
  "status": "Open",
  "source": "EDR",
  "createdAt": "2026-06-18T14:32:00.000Z",
  "assignee": "Maya Chen"
}
```

## Mock Data Strategy

The app should load a pre-bundled local JSON file from the project structure, for example:

```text
src/data/mock-alerts.json
```

The dataset should contain exactly 200 mock alerts.

The data should be committed to the repo, not uploaded by the user at runtime.

Recommended data characteristics:

* created times span the last 1–7 days
* some alerts are older than 24 hours
* some alerts are unassigned using `assignee: null`
* severity distribution should include enough Critical and High alerts for triage to matter
* status distribution should include a meaningful number of Open and In Progress alerts
* titles should be security-relevant but should not require extra fields beyond the required model

User-uploaded JSON is intentionally out of scope. The assessment focuses on triage workflow, not alert ingestion.

## Development-Only Data Sanity Check

Include a small dev-only sanity check for the local JSON fixture.

The sanity check should verify that:

* the imported data is an array
* each alert has the required fields
* severity values are recognized
* status values are recognized
* source values are recognized
* `createdAt` is present as a string
* `assignee` is either a string or `null`

Do not add a validation dependency such as Zod for this project.

The sanity check exists only to show care around data shape. It is not a full runtime schema validation system.

## State Model

Use a single stateful dashboard container component.

Recommended source-of-truth state:

```ts
const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState("");
const [filters, setFilters] = useState<AlertFilterState>(defaultFilters);
const [sort, setSort] = useState<AlertSortState>({
  field: "createdAt",
  direction: "desc",
});
```

Store the selected alert by ID, not by object, so the detail panel always reflects the latest alert state after status updates.

Use `useMemo` for derived values:

* visible alerts
* selected alert
* summary card counts
* available source values, if needed

Do not use:

* Redux
* Zustand
* Context
* React Query
* reducers unless clearly necessary
* URL query state
* localStorage persistence

## Filtering, Search, and Sorting Behavior

The derived visible alert list should be calculated from the current alert state:

```text
alerts state
→ apply filters
→ apply search
→ apply sort
→ visibleAlerts
→ summary cards
```

Summary cards should calculate from `visibleAlerts`, not the full unfiltered alert list.

Reset behavior:

* reset clears severity/status/source filters
* reset clears search query
* reset does not reset sort
* reset does not clear selected alert

If no alerts match the current filters/search, show a simple empty table state:

```text
No alerts match the current filters.
```

## Chosen SOC UX Improvement

Primary UX improvement:

```text
Priority queue summary cards
```

Cards:

* Open Critical/High
* Unassigned
* In Progress
* Stale Open Alerts
* Total Visible

One-line rationale:

```text
SOC analysts need quick queue-level context so they can prioritize high-risk unresolved alerts before drilling into individual details.
```

Summary cards should update based on the currently visible filtered/searched alert set.

Cards are informational only for the core implementation. They should not become clickable filters.

A small stale badge may appear in the table/detail panel as secondary polish, but the primary UX improvement is the summary card row.

## Stale Alert Definition

A stale alert is:

```text
status is Open
AND createdAt is older than 24 hours
```

Only Open alerts can be stale.

Display may include:

* a small stale badge in the table
* stale status in the detail panel
* count in the Stale Open Alerts summary card

Do not implement a full SLA system.

## UI Direction

Use a restrained dark SOC-dashboard style.

The UI should feel like a clean internal security queue, not a flashy marketing dashboard.

Use:

* CSS Modules
* readable table layout
* clear badges for severity and status
* accessible contrast
* simple spacing
* focused visual hierarchy

Avoid:

* Tailwind
* shadcn/ui
* UI libraries
* chart libraries
* excessive animation
* unnecessary visual noise

## Component Direction

Recommended structure:

```text
src/
├── app/
│   ├── page.tsx
│   └── page.module.css
│
├── components/
│   ├── AlertDashboard.tsx
│   ├── AlertDashboard.module.css
│   ├── SummaryCards.tsx
│   ├── SummaryCards.module.css
│   ├── AlertFilters.tsx
│   ├── AlertFilters.module.css
│   ├── AlertTable.tsx
│   ├── AlertTable.module.css
│   ├── AlertDetailPanel.tsx
│   ├── AlertDetailPanel.module.css
│   ├── SeverityBadge.tsx
│   └── StatusBadge.tsx
│
├── data/
│   └── mock-alerts.json
│
├── lib/
│   ├── alertFilters.ts
│   ├── alertSort.ts
│   ├── alertSummary.ts
│   └── alertValidation.ts
│
└── types/
    └── alert.ts
```

`AlertDashboard` should own state and pass props/callbacks down.

`SummaryCards` should receive computed values as props. It should not calculate counts internally.

`AlertTable` should receive already-filtered and sorted alerts.

`AlertDetailPanel` should receive the selected alert and status update callback.

## Backend Artifact Requirement

The project should include backend production-design artifacts only under `/docs`:

```text
docs/status-update.sql
docs/status-update-endpoint.cs
```

These files are not part of a runnable backend and must not be imported into the frontend.

### SQL Artifact Should Include

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

### C# Artifact Should Include

A minimal ASP.NET endpoint sketch for:

```text
PATCH /api/alerts/{id}/status
```

The sketch should include:

* request DTO
* status validation
* placeholder authorization/RBAC/tenant checks
* repository/service call
* audit logging comment
* response shape

Do not turn this into a full backend project.

## Production-Readiness Considerations

In production, this app would need:

* backend persistence for alert status updates
* authenticated user context
* RBAC and tenant scoping
* audit logging for status changes
* optimistic concurrency to avoid overwriting analyst updates
* server-side validation of allowed status transitions
* parameterized SQL queries
* API error handling
* pagination or virtualization for large alert volumes
* durable alert history/activity timeline
* monitoring and logging
* integration with real alert sources

These are intentionally out of scope for the working mini app.

## Non-Goals

Do not implement:

* user JSON upload
* runtime alert ingestion UI
* API routes
* database connection
* runnable backend
* authentication
* authorization
* tenant switching
* localStorage persistence
* bulk triage
* analyst notes
* full activity log
* alert assignment editing
* deleting or creating alerts
* AI-generated analysis
* alert enrichment
* charts
* Docker
* ORM
* external state management
* unnecessary testing framework setup

## Success Criteria

The project is successful if a reviewer can quickly see that it is:

* complete
* easy to run
* easy to review
* cleanly structured
* useful for a SOC alert triage workflow
* implemented with good TypeScript discipline
* intentionally scoped
* production-aware without being overbuilt

