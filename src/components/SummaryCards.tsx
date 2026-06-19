import type { AlertSummary } from "../lib/alertSummary";
import styles from "./SummaryCards.module.css";

type SummaryCardsProps = {
  summary: AlertSummary;
};

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      label: "Open Critical/High",
      value: summary.openCriticalHigh,
      tone: styles.highRisk,
    },
    {
      label: "Unassigned",
      value: summary.unassigned,
      tone: styles.neutral,
    },
    {
      label: "In Progress",
      value: summary.inProgress,
      tone: styles.inProgress,
    },
    {
      label: "Stale Open Alerts",
      value: summary.staleOpen,
      tone: styles.stale,
    },
    {
      label: "Total Visible",
      value: summary.totalVisible,
      tone: styles.total,
    },
  ];

  return (
    <section className={styles.summaryGrid} aria-label="Visible alert summary">
      {cards.map((card) => (
        <div className={`${styles.card} ${card.tone}`} key={card.label}>
          <p className={styles.label}>{card.label}</p>
          <p className={styles.value}>{card.value}</p>
        </div>
      ))}
    </section>
  );
}
