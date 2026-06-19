"use client";

import { useMemo, useState } from "react";
import mockAlerts from "../data/mock-alerts.json";
import { defaultFilters, filterAlerts } from "../lib/alertFilters";
import {
  defaultSort,
  getDefaultDirectionForSortField,
  sortAlerts,
  type AlertSortField,
  type AlertSortState,
} from "../lib/alertSort";
import { validateMockAlerts } from "../lib/alertValidation";
import type { Alert, AlertStatus } from "../types/alert";
import { AlertDetailPanel } from "./AlertDetailPanel";
import { AlertFilters } from "./AlertFilters";
import { AlertTable } from "./AlertTable";
import styles from "./AlertDashboard.module.css";

if (process.env.NODE_ENV !== "production") {
  validateMockAlerts(mockAlerts);
}

const initialAlerts = mockAlerts as Alert[];

export function AlertDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState<AlertSortState>(defaultSort);

  const visibleAlerts = useMemo(() => {
    const filteredAlerts = filterAlerts(alerts, filters, searchQuery);

    return sortAlerts(filteredAlerts, sort);
  }, [alerts, filters, searchQuery, sort]);

  const selectedAlert = useMemo(
    () => alerts.find((alert) => alert.id === selectedAlertId) ?? null,
    [alerts, selectedAlertId],
  );

  function handleSortChange(field: AlertSortField) {
    setSort((currentSort) => {
      if (currentSort.field === field) {
        return {
          field,
          direction: currentSort.direction === "asc" ? "desc" : "asc",
        };
      }

      return {
        field,
        direction: getDefaultDirectionForSortField(field),
      };
    });
  }

  function handleResetFilters() {
    setFilters(defaultFilters);
    setSearchQuery("");
  }

  function handleStatusChange(alertId: string, nextStatus: AlertStatus) {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: nextStatus } : alert,
      ),
    );
  }

  const emptyMessage =
    alerts.length === 0
      ? "No alerts available."
      : "No alerts match the current filters.";

  const visibleCountLabel = `Showing ${visibleAlerts.length} of ${alerts.length} alerts`;

  return (
    <main className={styles.page}>
      <section className={styles.header} aria-labelledby="dashboard-title">
        <div>
          <p className={styles.eyebrow}>Security operations queue</p>
          <h1 className={styles.title} id="dashboard-title">
            Alert Triage Mini-View
          </h1>
          <p className={styles.subtitle}>
            Local alert feed for filtering, searching, and sorting triage
            context.
          </p>
        </div>
      </section>

      <div className={styles.dashboardGrid}>
        <section className={styles.tablePanel} aria-labelledby="table-title">
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle} id="table-title">
                Alert queue
              </h2>
              <p className={styles.panelSubtitle}>
                Use the controls to narrow the local mock alert queue.
              </p>
            </div>
            <p className={styles.visibleCount}>{visibleCountLabel}</p>
          </div>

          <AlertFilters
            filters={filters}
            onFiltersChange={setFilters}
            onReset={handleResetFilters}
            onSearchQueryChange={setSearchQuery}
            searchQuery={searchQuery}
          />
          <AlertTable
            alerts={visibleAlerts}
            emptyMessage={emptyMessage}
            onSelectAlert={setSelectedAlertId}
            onSortChange={handleSortChange}
            selectedAlertId={selectedAlertId}
            sort={sort}
          />
        </section>

        <AlertDetailPanel
          alert={selectedAlert}
          onStatusChange={handleStatusChange}
        />
      </div>
    </main>
  );
}
