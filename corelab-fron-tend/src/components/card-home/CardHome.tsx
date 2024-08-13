import styles from './cardHome.module.scss';

interface ICardHomePrimaryProps {
  image: string;
  title: string;
  description: string;
}

export function CardHome({ image, description, title }: ICardHomePrimaryProps) {
  return (
    <div
      className={styles.card__component}
      style={{
        backgroundImage: ` url(${image})`,
      }}
    >
      <div className={styles.card__component__text}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
