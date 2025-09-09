'use client';
import { useEffect, useState } from 'react';
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
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const fallbackImage = '/assets/images/wine/default-wine-placeholder.png';

  useEffect(() => {
    setImgSrc(imageUrl);
  }, [imageUrl]);

  return(
    <div className={styles.card}>
      <div className={styles.wineImageContainer}>
      <Image 
      src={imgSrc} 
      alt={`${name} wine bottle`} 
      fill
      style={{ objectFit: 'cover' }}
      onError={(e) => {
        setImgSrc(fallbackImage);
      }}
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