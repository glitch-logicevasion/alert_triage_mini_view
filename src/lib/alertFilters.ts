import type {
  Alert,
  AlertSeverity,
  AlertSource,
  AlertStatus,
} from "../types/alert";

export type AlertFilterState = {
  severity: AlertSeverity | "All";
  status: AlertStatus | "All";
  source: AlertSource | "All";
};

export const defaultFilters: AlertFilterState = {
  severity: "All",
  status: "All",
  source: "All",
};

function matchesSearch(alert: Alert, normalizedQuery: string) {
  if (normalizedQuery === "") {
    return true;
  }

  const assignee = alert.assignee ?? "Unassigned";
  const searchableValues = [
    alert.id,
    alert.title,
    alert.severity,
    alert.status,
    alert.source,
    assignee,
  ];

  return searchableValues.some((value) =>
    value.toLowerCase().includes(normalizedQuery),
  );
}

export function filterAlerts(
  alerts: Alert[],
  filters: AlertFilterState,
  searchQuery: string,
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return alerts.filter((alert) => {
    const matchesSeverity =
      filters.severity === "All" || alert.severity === filters.severity;
    const matchesStatus =
      filters.status === "All" || alert.status === filters.status;
    const matchesSource =
      filters.source === "All" || alert.source === filters.source;

    return (
      matchesSeverity &&
      matchesStatus &&
      matchesSource &&
      matchesSearch(alert, normalizedQuery)
    );
  });
}
