import styles from "./loader.module.css";
import Skeleton from "react-loading-skeleton";

const baseColor = "#121212";
const highlightColor = "#242424";

const CategoryLoader = () => {
  return (
    <div className={styles.cat_loader}>
      <Skeleton
        baseColor={baseColor}
        highlightColor={highlightColor}
        className={styles.title}
        count={1}
      />
      <div className={styles.cards}>
        {Array.from({ length: 5 }).map((_, id) => {
          return (
            <Skeleton
              baseColor={baseColor}
              highlightColor={highlightColor}
              key={id}
              count={1}
              className={styles.card}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryLoader;
