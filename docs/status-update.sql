/*
  Alert Triage Mini-View production persistence sketch.

  Purpose:
  - Shows how the app's frontend-only in-memory status update could map to
    persisted alert status changes in production.
  - This file is documentation only. The running Next.js frontend does not call
    this SQL and does not connect to a database.
*/

/*
  Minimal alert record sketch.
  Use CHECK constraints or lookup tables for severity/status/source in a real schema.
*/
CREATE TABLE alerts (
  id VARCHAR(32) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  severity VARCHAR(32) NOT NULL,
  status VARCHAR(32) NOT NULL,
  source VARCHAR(64) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  assignee VARCHAR(128) NULL,
  updated_at TIMESTAMP NOT NULL,
  version INTEGER NOT NULL DEFAULT 1
);

/*
  Status history supports auditability and incident review.
  The history insert should happen in the same transaction as the alert update.
*/
CREATE TABLE alert_status_history (
  id VARCHAR(64) PRIMARY KEY,
  alert_id VARCHAR(32) NOT NULL,
  previous_status VARCHAR(32) NOT NULL,
  new_status VARCHAR(32) NOT NULL,
  changed_by VARCHAR(128) NOT NULL,
  changed_at TIMESTAMP NOT NULL,
  change_reason VARCHAR(500) NULL,
  FOREIGN KEY (alert_id) REFERENCES alerts(id)
);

/*
  Parameterized optimistic-concurrency status update.

  The application should check affected row count:
  - 1 row updated means success.
  - 0 rows updated means the alert was missing or @ExpectedVersion was stale.
*/
UPDATE alerts
SET status = @NextStatus,
    updated_at = CURRENT_TIMESTAMP,
    version = version + 1
WHERE id = @AlertId
  AND version = @ExpectedVersion;

/*
  Audit/history insert.
  Run this in the same transaction as the update after confirming the update
  succeeded and after loading the previous status safely.
*/
INSERT INTO alert_status_history (
  id,
  alert_id,
  previous_status,
  new_status,
  changed_by,
  changed_at,
  change_reason
)
VALUES (
  @HistoryId,
  @AlertId,
  @PreviousStatus,
  @NextStatus,
  @ChangedBy,
  CURRENT_TIMESTAMP,
  @ChangeReason
);

/*
  Production notes:
  - Use parameterized queries; never concatenate frontend input into SQL.
  - Validate allowed statuses and status transitions server-side.
  - Enforce authenticated user context for @ChangedBy.
  - Enforce RBAC before allowing status changes.
  - Enforce tenant scope in reads and updates.
  - In a multi-tenant deployment, include tenant_id on alerts and scope all reads/updates by tenant_id.
  - Write alert update and audit history in the same transaction.
  - Use optimistic concurrency with version checks.
  - Check affected row count to detect not-found records or version conflicts.
  - Do not trust frontend-only validation for persistence decisions.
*/
