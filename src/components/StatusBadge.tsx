import type { AlertStatus } from "../types/alert";
import styles from "./AlertTable.module.css";

type StatusBadgeProps = {
  status: AlertStatus;
};

const statusClassNames: Record<AlertStatus, string> = {
  Open: styles.statusOpen,
  "In Progress": styles.statusInProgress,
  Resolved: styles.statusResolved,
  "False Positive": styles.statusFalsePositive,
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${statusClassNames[status]}`}>
      {status}
    </span>
  );
}
