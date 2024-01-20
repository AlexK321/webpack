import styles from  "./App.module.scss";

export const App = () => {
  console.log("Hello World");
  return (
    <div className={styles.container}>
      <h1>Webpack</h1>
    </div>
  );
};
