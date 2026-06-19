import {
  ALERT_SEVERITIES,
  ALERT_SOURCES,
  ALERT_STATUSES,
  type AlertSeverity,
  type AlertSource,
  type AlertStatus,
} from "../types/alert";
import type { AlertFilterState } from "../lib/alertFilters";
import styles from "./AlertFilters.module.css";

type AlertFiltersProps = {
  filters: AlertFilterState;
  searchQuery: string;
  onFiltersChange: (filters: AlertFilterState) => void;
  onSearchQueryChange: (searchQuery: string) => void;
  onReset: () => void;
};

export function AlertFilters({
  filters,
  searchQuery,
  onFiltersChange,
  onSearchQueryChange,
  onReset,
}: AlertFiltersProps) {
  return (
    <form className={styles.filters} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.searchField}>
        <label className={styles.label} htmlFor="alert-search">
          Search alerts
        </label>
        <input
          className={styles.input}
          id="alert-search"
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="ID, title, source, assignee..."
          type="search"
          value={searchQuery}
        />
      </div>

      <div className={styles.filterField}>
        <label className={styles.label} htmlFor="severity-filter">
          Severity
        </label>
        <select
          className={styles.select}
          id="severity-filter"
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              severity: event.target.value as AlertSeverity | "All",
            })
          }
          value={filters.severity}
        >
          <option value="All">All</option>
          {ALERT_SEVERITIES.map((severity) => (
            <option key={severity} value={severity}>
              {severity}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterField}>
        <label className={styles.label} htmlFor="status-filter">
          Status
        </label>
        <select
          className={styles.select}
          id="status-filter"
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              status: event.target.value as AlertStatus | "All",
            })
          }
          value={filters.status}
        >
          <option value="All">All</option>
          {ALERT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterField}>
        <label className={styles.label} htmlFor="source-filter">
          Source
        </label>
        <select
          className={styles.select}
          id="source-filter"
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              source: event.target.value as AlertSource | "All",
            })
          }
          value={filters.source}
        >
          <option value="All">All</option>
          {ALERT_SOURCES.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <button className={styles.resetButton} type="button" onClick={onReset}>
        Reset
      </button>
    </form>
  );
}
