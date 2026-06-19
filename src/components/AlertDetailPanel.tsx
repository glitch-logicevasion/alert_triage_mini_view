import { ALERT_STATUSES, type Alert, type AlertStatus } from "../types/alert";
import { isStaleOpenAlert } from "../lib/alertSummary";
import { formatFullTimestamp, formatRelativeTime } from "../lib/dateFormat";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";
import styles from "./AlertDetailPanel.module.css";

type AlertDetailPanelProps = {
  alert: Alert | null;
  onStatusChange: (alertId: string, nextStatus: AlertStatus) => void;
};

export function AlertDetailPanel({
  alert,
  onStatusChange,
}: AlertDetailPanelProps) {
  if (alert === null) {
    return (
      <aside className={styles.panel} aria-label="Alert details">
        <div className={styles.emptyState}>
          Select an alert to review details and update status.
        </div>
      </aside>
    );
  }

  const isStale = isStaleOpenAlert(alert);

  return (
    <aside className={styles.panel} aria-labelledby="detail-title">
      <div className={styles.header}>
        <p className={styles.alertId}>{alert.id}</p>
        <h2 className={styles.title} id="detail-title">
          {alert.title}
        </h2>
        <div className={styles.badges}>
          <SeverityBadge severity={alert.severity} />
          <StatusBadge status={alert.status} />
          {isStale ? <span className={styles.staleBadge}>Stale open</span> : null}
        </div>
      </div>

      <dl className={styles.details}>
        <div className={styles.detailItem}>
          <dt>Source</dt>
          <dd>{alert.source}</dd>
        </div>
        <div className={styles.detailItem}>
          <dt>Created</dt>
          <dd>
            {formatFullTimestamp(alert.createdAt)}
            <span className={styles.relativeAge}>
              {formatRelativeTime(alert.createdAt)}
            </span>
          </dd>
        </div>
        <div className={styles.detailItem}>
          <dt>Assignee</dt>
          <dd className={alert.assignee === null ? styles.unassigned : ""}>
            {alert.assignee ?? "Unassigned"}
          </dd>
        </div>
      </dl>

      <div className={styles.statusControl}>
        <label className={styles.label} htmlFor="detail-status">
          Update status
        </label>
        <select
          className={styles.select}
          id="detail-status"
          onChange={(event) =>
            onStatusChange(alert.id, event.target.value as AlertStatus)
          }
          value={alert.status}
        >
          {ALERT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
