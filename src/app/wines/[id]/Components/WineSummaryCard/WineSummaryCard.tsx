'use client';

import styles from './WineSummaryCard.module.css'
import Tag from '../../../../../components/Tag/Tag'
import Image from 'next/image';
import WineImage from '../WineImage';

type WineSummaryCardProps = {
    imageUrl: string;
    name: string;
    origin: string;
    price: string;
}


const WineSummaryCard = ({imageUrl, name, origin, price}: WineSummaryCardProps) => {
  return(
    <div className={styles.card}>
      <div className={styles.wineImageContainer}>
      <Image 
      src={imageUrl} 
      alt={`${name} wine bottle`} 
      fill
      style={{ objectFit: 'cover' }}
      />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.origin}>{origin}</p>
        <Tag>{price}</Tag>
      </div>
    </div>
  );
};

export default WineSummaryCard