import type { Alert } from "../types/alert";
import { formatRelativeTime } from "../lib/dateFormat";
import type { AlertSortField, AlertSortState } from "../lib/alertSort";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";
import styles from "./AlertTable.module.css";

type AlertTableProps = {
  alerts: Alert[];
  emptyMessage?: string;
  sort: AlertSortState;
  onSortChange: (field: AlertSortField) => void;
};

const sortableHeaders: Array<{
  field: AlertSortField;
  label: string;
}> = [
  { field: "severity", label: "Severity" },
  { field: "status", label: "Status" },
  { field: "title", label: "Title" },
  { field: "source", label: "Source" },
  { field: "createdAt", label: "Created" },
  { field: "assignee", label: "Assignee" },
];

function getSortIndicator(field: AlertSortField, sort: AlertSortState) {
  if (sort.field !== field) {
    return null;
  }

  return sort.direction === "asc" ? "↑" : "↓";
}

export function AlertTable({
  alerts,
  emptyMessage = "No alerts available.",
  sort,
  onSortChange,
}: AlertTableProps) {
  if (alerts.length === 0) {
    return <p className={styles.emptyState}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.tableScroll}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            {sortableHeaders.map((header) => {
              const sortIndicator = getSortIndicator(header.field, sort);

              return (
                <th key={header.field} scope="col">
                  <button
                    className={styles.sortButton}
                    onClick={() => onSortChange(header.field)}
                    type="button"
                  >
                    <span>{header.label}</span>
                    <span className={styles.sortIndicator}>
                      {sortIndicator}
                    </span>
                  </button>
                </th>
              );
            })}
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
