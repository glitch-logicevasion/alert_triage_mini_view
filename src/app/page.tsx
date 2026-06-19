import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="page-title">
        <p className={styles.eyebrow}>SOC queue scaffold</p>
        <h1 className={styles.title} id="page-title">
          Alert Triage Mini-View
        </h1>
        <p className={styles.status}>Phase 0 scaffold ready.</p>
      </section>
    </main>
  );
}
