import type { ReactNode } from "react";
import styles from "./grid.module.css";

type MovieGridProps = {
  children: ReactNode;
  year: string;
};

const MovieGrid = ({ children, year }: MovieGridProps) => {
  return (
    <div className={styles.grid}>
      <h1 className={styles.title}>{year}</h1>
      <div className={styles.cards}>{children}</div>
    </div>
  );
};

export default MovieGrid;
