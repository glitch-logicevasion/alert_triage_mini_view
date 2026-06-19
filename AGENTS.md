# AGENTS.md

## Project: Alert Triage Mini-View

This file defines operating rules for AI coding agents working on this project.

The goal is to build a clean, reviewer-friendly **Next.js + TypeScript** alert triage mini app without unnecessary architecture or scope creep.

## Source-of-Truth Order

When making implementation decisions, follow the project documents in this order:

1. `APP_SPEC.md` — product behavior, scope, data model, UX, and non-goals
2. `BUILD_PLAN.md` — phase order, likely files, and acceptance criteria
3. `PROJECT_STATE.md` — current progress, known issues, and next actions
4. `README.md` — final reviewer-facing summary, mainly updated during Phase 7

If `APP_SPEC.md` and `BUILD_PLAN.md` conflict, treat `APP_SPEC.md` as higher priority.

## Development Mode

Implement **one phase at a time**.

After completing a phase:

1. update `PROJECT_STATE.md`
2. run validation when practical
3. summarize the work completed
4. list manual test steps
5. list known issues
6. identify the next phase
7. stop and wait for review

Do not continue into the next phase without explicit instruction.

## Scope Rules

Do not overengineer.

Build the smallest clean implementation that satisfies the assignment and `APP_SPEC.md`.

Do not add features, dependencies, architecture, or workflows that are not already specified unless explicitly approved.

Small implementation judgment calls are allowed when they preserve the existing scope and improve clarity, maintainability, or correctness.

Stop and ask for review before adding anything outside the agreed scope.

## Required Technical Constraints

Use:

* Next.js
* TypeScript
* React state
* `useMemo` for derived queue state
* CSS Modules
* bundled local JSON alert data
* plain TypeScript utility functions

Do not add unless explicitly approved:

* Tailwind
* shadcn/ui
* UI libraries
* chart libraries
* Redux
* Zustand
* React Query
* external state management
* API routes
* server actions
* database connections
* ORM
* Docker
* authentication
* authorization implementation
* localStorage persistence
* testing framework setup

Manual testing steps are expected. Do not add a testing framework unless explicitly requested.

## Styling Rules

Use CSS Modules.

The UI should use a restrained dark SOC-dashboard style.

Prioritize:

* readability
* clear table layout
* accessible contrast
* consistent badges
* obvious selected row state
* simple spacing
* useful visual hierarchy

Avoid:

* flashy visuals
* unnecessary animation
* marketing-dashboard styling
* visual clutter
* hard-to-read low-contrast colors

## Data Rules

The app uses a pre-bundled local JSON file:

```text
src/data/mock-alerts.json
```

The app must not include a user JSON upload flow.

The app must not fetch alert data from an API.

The app must not modify the source JSON file at runtime.

A temporary one-off script may be used during Phase 1 to generate mock alert data if helpful, but the final repo should not keep the generator script. Remove temporary generation files before completing the phase.

## Alert State Rules

Status updates are frontend in-memory only.

Do not persist status updates to:

* backend API
* localStorage
* database
* source JSON file

The main dashboard container should own the interactive state:

* alerts
* selected alert ID
* filters
* search query
* sort state

Store the selected alert by ID, not by object.

Use derived state for:

* visible alerts
* selected alert
* summary card counts
* available filter values, if needed

## Backend Artifact Rules

The SQL and C# files are documentation/design artifacts only.

Expected files:

```text
docs/status-update.sql
docs/status-update-endpoint.cs
```

Do not wire these files into the frontend.

Do not create a runnable backend project.

Do not add API routes for these artifacts.

Do not add database connection code.

These artifacts exist only to show how the in-memory status update could map to production persistence.

## Accessibility and HTML Rules

Prefer simple semantic HTML.

Use appropriate elements where practical:

* `button`
* `input`
* `select`
* `label`
* `table`
* `thead`
* `tbody`
* `th`
* `tr`
* `td`

Interactive controls should have clear labels.

Sortable table headers should be understandable from the UI.

Do not create custom div-based controls when native HTML controls are sufficient.

## Code Quality Rules

Prefer clear, boring code.

Keep component responsibilities small and obvious.

Use plain TypeScript utility functions for:

* filtering/search
* sorting
* summary calculations
* dev-only alert data sanity checks

Use comments sparingly.

Good comments explain non-obvious logic, such as:

* severity priority sorting
* status operational sorting
* stale alert calculation
* development-only JSON sanity validation

Avoid comments that restate obvious React or TypeScript behavior.

## Refactor Rules

Do not perform broad refactors unless required for the current phase.

When refactoring is necessary:

* keep the change small
* preserve existing behavior
* explain why the refactor was needed
* include manual test steps for affected behavior

Do not rewrite working code just for style preference.

## Validation Rules

Run validation when practical:

```bash
npm run lint
npm run build
```

If either script does not exist or cannot be run, state that clearly.

Do not invent scripts.

Manual validation should include relevant user flows for the completed phase.

Examples:

* app renders
* mock alerts display
* filters work
* search works
* sorting works
* row selection works
* status updates update the table/detail panel
* summary cards update from visible alerts

## Git Rules

Do not perform Git operations unless explicitly instructed.

Do not:

* create branches
* create commits
* amend commits
* push
* pull
* tag releases
* configure remotes
* open pull requests

The user handles repository and GitHub actions manually.

## README Rules

Do not substantially update `README.md` before Phase 7 unless a phase explicitly requires a temporary placeholder update.

During Phase 7, update `README.md` into a concise reviewer-facing submission document.

The final README should remain short and cover:

* project summary
* demo video link placeholder
* how to run locally
* features
* key decisions and tradeoffs
* UX improvement rationale
* AI coding agent usage
* production backend notes
* what would be improved in production

## Required Phase Completion Report

At the end of each phase, provide a concise report with:

```text
Phase completed:
Changed files:
What changed:
Validation run:
Manual test steps:
Known issues:
Next phase:
Stopping point:
```

`Stopping point` must explicitly say that the agent is stopping and waiting for review.

## PROJECT_STATE.md Update Requirement

After each phase, update `PROJECT_STATE.md`.

The update should include:

* current phase
* completed phases
* known working features
* known issues
* decisions made
* next actions
* AI usage notes

If a phase partially fails, still update `PROJECT_STATE.md` with:

* what was completed
* what failed
* validation errors
* suspected cause, if known
* recommended next action

Do not hide failed validation.

## Final Goal

The final project should be:

* complete
* easy to run
* easy to review
* cleanly structured
* useful for SOC alert triage
* intentionally scoped
* production-aware without being overbuilt

The project should not look like an oversized SOC platform. It should look like a focused, maintainable take-home assessment solution.

