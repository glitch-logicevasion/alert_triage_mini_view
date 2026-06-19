import type { Alert } from "../types/alert";

const staleAlertThresholdMs = 24 * 60 * 60 * 1000;

export type AlertSummary = {
  openCriticalHigh: number;
  unassigned: number;
  inProgress: number;
  staleOpen: number;
  totalVisible: number;
};

export function isStaleOpenAlert(alert: Alert, now = new Date()) {
  if (alert.status !== "Open") {
    return false;
  }

  const createdAt = new Date(alert.createdAt);

  if (Number.isNaN(createdAt.getTime())) {
    return false;
  }

  return now.getTime() - createdAt.getTime() > staleAlertThresholdMs;
}

export function getAlertSummary(alerts: Alert[]): AlertSummary {
  return alerts.reduce<AlertSummary>(
    (summary, alert) => {
      const isOpenCriticalHigh =
        alert.status === "Open" &&
        (alert.severity === "Critical" || alert.severity === "High");

      return {
        openCriticalHigh: summary.openCriticalHigh + (isOpenCriticalHigh ? 1 : 0),
        unassigned: summary.unassigned + (alert.assignee === null ? 1 : 0),
        inProgress: summary.inProgress + (alert.status === "In Progress" ? 1 : 0),
        staleOpen: summary.staleOpen + (isStaleOpenAlert(alert) ? 1 : 0),
        totalVisible: summary.totalVisible + 1,
      };
    },
    {
      openCriticalHigh: 0,
      unassigned: 0,
      inProgress: 0,
      staleOpen: 0,
      totalVisible: 0,
    },
  );
}
