"use client";

import { useMemo } from "react";
import mockAlerts from "../data/mock-alerts.json";
import { validateMockAlerts } from "../lib/alertValidation";
import type { Alert } from "../types/alert";
import { AlertTable } from "./AlertTable";
import styles from "./AlertDashboard.module.css";

if (process.env.NODE_ENV !== "production") {
  validateMockAlerts(mockAlerts);
}

const alerts = mockAlerts as Alert[];

export function AlertDashboard() {
  const orderedAlerts = useMemo(
    () =>
      [...alerts].sort(
        (left, right) =>
          new Date(right.createdAt).getTime() -
          new Date(left.createdAt).getTime(),
      ),
    [],
  );

  return (
    <main className={styles.page}>
      <section className={styles.header} aria-labelledby="dashboard-title">
        <div>
          <p className={styles.eyebrow}>Security operations queue</p>
          <h1 className={styles.title} id="dashboard-title">
            Alert Triage Mini-View
          </h1>
          <p className={styles.subtitle}>
            Static local alert feed for reviewing severity, status, source, and
            ownership context.
          </p>
        </div>
      </section>

      <section className={styles.tablePanel} aria-labelledby="table-title">
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.panelTitle} id="table-title">
              Alert queue
            </h2>
            <p className={styles.panelSubtitle}>
              Showing local mock alerts ordered by newest created time.
            </p>
          </div>
        </div>
        <AlertTable alerts={orderedAlerts} />
      </section>
    </main>
  );
}
