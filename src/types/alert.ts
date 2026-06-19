export const ALERT_SEVERITIES = ["Critical", "High", "Medium", "Low"] as const;

export const ALERT_STATUSES = [
  "Open",
  "In Progress",
  "Resolved",
  "False Positive",
] as const;

export const ALERT_SOURCES = [
  "SIEM",
  "EDR",
  "Email Security",
  "Cloud",
  "Identity",
  "Network",
] as const;

export type AlertSeverity = (typeof ALERT_SEVERITIES)[number];

export type AlertStatus = (typeof ALERT_STATUSES)[number];

export type AlertSource = (typeof ALERT_SOURCES)[number];

export type Alert = {
  id: string;
  title: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: AlertSource;
  createdAt: string;
  assignee: string | null;
};
