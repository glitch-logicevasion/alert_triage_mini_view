import type { Alert } from "../types/alert";

const staleAlertThresholdMs = 24 * 60 * 60 * 1000;

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
