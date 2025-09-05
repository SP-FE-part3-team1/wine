import styles from './WineSummaryCard.module.css'
import Tag from '../../../../../components/Tag/Tag'

type WineSummaryCardProps = {
    imageUrl: string;
    name: string;
    origin: string;
    price: string;
}


const WineSummaryCard = ({imageUrl, name, origin, price}: WineSummaryCardProps) => {
  return(
    <div className={styles.card}>
      <img src={imageUrl} alt={`${name} wine bottle`} className={styles.wineImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.origin}>{origin}</p>
        <Tag>{price}</Tag>
      </div>
    </div>
  );
};

export default WineSummaryCard