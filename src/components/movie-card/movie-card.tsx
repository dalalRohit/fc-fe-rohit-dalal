import Image from "next/image";
import styles from "./card.module.css";

type CardProps = {
  original_title: string;
  poster_path: string;
  vote_average: number;
};

const Card = (props: CardProps) => {
  const { original_title, poster_path, vote_average } = props;
  return (
    <div className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/w300${poster_path}`}
        alt={original_title}
        width={200}
        height={300}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "#242424",
        }}
      />
      <div className={styles.meta}>
        <p>{original_title}</p>
        <span>{vote_average}</span>
      </div>
    </div>
  );
};

export default Card;
