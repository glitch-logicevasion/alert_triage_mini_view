import {
  ALERT_SEVERITIES,
  ALERT_SOURCES,
  ALERT_STATUSES,
  type Alert,
  type AlertSeverity,
  type AlertSource,
  type AlertStatus,
} from "../types/alert";

const requiredFields = [
  "id",
  "title",
  "severity",
  "status",
  "source",
  "createdAt",
  "assignee",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertStringField(
  alert: Record<string, unknown>,
  fieldName: "id" | "title" | "createdAt",
  index: number,
) {
  if (typeof alert[fieldName] !== "string") {
    throw new Error(`Alert at index ${index} has invalid ${fieldName}.`);
  }
}

function assertAllowedValue<T extends string>(
  value: unknown,
  allowedValues: readonly T[],
  fieldName: string,
  index: number,
): asserts value is T {
  if (typeof value !== "string" || !allowedValues.includes(value as T)) {
    throw new Error(`Alert at index ${index} has invalid ${fieldName}.`);
  }
}

function assertAssignee(value: unknown, index: number) {
  if (value !== null && typeof value !== "string") {
    throw new Error(`Alert at index ${index} has invalid assignee.`);
  }
}

export function validateMockAlerts(alerts: unknown): asserts alerts is Alert[] {
  if (!Array.isArray(alerts)) {
    throw new Error("Mock alerts must be an array.");
  }

  alerts.forEach((alert, index) => {
    if (!isRecord(alert)) {
      throw new Error(`Alert at index ${index} must be an object.`);
    }

    for (const field of requiredFields) {
      if (!(field in alert)) {
        throw new Error(`Alert at index ${index} is missing ${field}.`);
      }
    }

    assertStringField(alert, "id", index);
    assertStringField(alert, "title", index);
    assertStringField(alert, "createdAt", index);
    assertAllowedValue<AlertSeverity>(
      alert.severity,
      ALERT_SEVERITIES,
      "severity",
      index,
    );
    assertAllowedValue<AlertStatus>(
      alert.status,
      ALERT_STATUSES,
      "status",
      index,
    );
    assertAllowedValue<AlertSource>(
      alert.source,
      ALERT_SOURCES,
      "source",
      index,
    );
    assertAssignee(alert.assignee, index);
  });
}
