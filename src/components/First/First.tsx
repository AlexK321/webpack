import styles from  "./First.module.scss";
import image from  "@/assets/image.jpg";
import Svg from  "@/assets/svg.svg";

export const First = () => {
  console.log("Hello World");

  return (
    <div className={styles.container}>
      <h1>Webpack</h1>
      <img src={image} alt="" />
      <Svg fill='dark-grey' width={50} height={50}/>
      {__BROWSER_SUPPORTS_HTML5 && "Это текст отрисовывается исходя их принципа tree shaking"}
    </div>
  );
};
