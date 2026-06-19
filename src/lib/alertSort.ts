import type { Alert, AlertSeverity, AlertStatus } from "../types/alert";

export type AlertSortField =
  | "severity"
  | "status"
  | "title"
  | "source"
  | "createdAt"
  | "assignee";

export type SortDirection = "asc" | "desc";

export type AlertSortState = {
  field: AlertSortField;
  direction: SortDirection;
};

export const defaultSort: AlertSortState = {
  field: "createdAt",
  direction: "desc",
};

const severityRank: Record<AlertSeverity, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

const statusRank: Record<AlertStatus, number> = {
  Open: 4,
  "In Progress": 3,
  Resolved: 2,
  "False Positive": 1,
};

const descendingDefaultFields = new Set<AlertSortField>([
  "createdAt",
  "severity",
  "status",
]);

export function getDefaultDirectionForSortField(
  field: AlertSortField,
): SortDirection {
  return descendingDefaultFields.has(field) ? "desc" : "asc";
}

function compareText(left: string, right: string) {
  return left.localeCompare(right, undefined, {
    sensitivity: "base",
    numeric: true,
  });
}

function compareAlerts(left: Alert, right: Alert, field: AlertSortField) {
  switch (field) {
    case "severity":
      return severityRank[left.severity] - severityRank[right.severity];
    case "status":
      return statusRank[left.status] - statusRank[right.status];
    case "createdAt":
      return Date.parse(left.createdAt) - Date.parse(right.createdAt);
    case "assignee":
      return compareText(left.assignee ?? "Unassigned", right.assignee ?? "Unassigned");
    case "title":
      return compareText(left.title, right.title);
    case "source":
      return compareText(left.source, right.source);
  }
}

export function sortAlerts(alerts: Alert[], sort: AlertSortState) {
  const directionMultiplier = sort.direction === "asc" ? 1 : -1;

  return [...alerts].sort((left, right) => {
    const fieldComparison = compareAlerts(left, right, sort.field);

    if (fieldComparison !== 0) {
      return fieldComparison * directionMultiplier;
    }

    return compareText(left.id, right.id);
  });
}
