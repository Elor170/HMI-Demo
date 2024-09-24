import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>HMI Demo App</h1>
      <p>Please select a route from the top app bar</p>
    </div>
  );
}
