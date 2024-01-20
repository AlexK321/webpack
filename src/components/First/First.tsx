import styles from  "./First.module.scss";

export const First = () => {
  console.log("Hello World");
  return (
    <div className={styles.container}>
      <h1>Webpack</h1>
    </div>
  );
};
