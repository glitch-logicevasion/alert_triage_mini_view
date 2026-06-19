import type { Alert } from "../types/alert";
import { formatRelativeTime } from "../lib/dateFormat";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";
import styles from "./AlertTable.module.css";

type AlertTableProps = {
  alerts: Alert[];
};

export function AlertTable({ alerts }: AlertTableProps) {
  if (alerts.length === 0) {
    return <p className={styles.emptyState}>No alerts available.</p>;
  }

  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Severity</th>
            <th scope="col">Status</th>
            <th scope="col">Title</th>
            <th scope="col">Source</th>
            <th scope="col">Created</th>
            <th scope="col">Assignee</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td className={styles.alertId}>{alert.id}</td>
              <td>
                <SeverityBadge severity={alert.severity} />
              </td>
              <td>
                <StatusBadge status={alert.status} />
              </td>
              <td className={styles.titleCell}>{alert.title}</td>
              <td>{alert.source}</td>
              <td>{formatRelativeTime(alert.createdAt)}</td>
              <td className={alert.assignee === null ? styles.unassigned : ""}>
                {alert.assignee ?? "Unassigned"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
