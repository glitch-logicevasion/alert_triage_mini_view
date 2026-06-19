import type { AlertSeverity } from "../types/alert";
import styles from "./AlertTable.module.css";

type SeverityBadgeProps = {
  severity: AlertSeverity;
};

const severityClassNames: Record<AlertSeverity, string> = {
  Critical: styles.severityCritical,
  High: styles.severityHigh,
  Medium: styles.severityMedium,
  Low: styles.severityLow,
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span className={`${styles.badge} ${severityClassNames[severity]}`}>
      {severity}
    </span>
  );
}
