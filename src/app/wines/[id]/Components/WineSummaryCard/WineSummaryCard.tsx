'use client';
import { useEffect, useState } from 'react';
import styles from './WineSummaryCard.module.css'
import Tag from '../../../../../components/Tag/Tag'
import Image from 'next/image';

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

  // imgSrc가 유효한 URL 형태인지(문자열이면서 '/' 또는 'http'로 시작하는지) 직접 확인
  const isValidSrc = typeof imgSrc === 'string' && (imgSrc.startsWith('/') || imgSrc.startsWith('http'));

  return(
    <div className={styles.card}>
      <div className={styles.wineImagePositioner}>
        <div className={styles.wineImageContainer}>
          <Image 
          src={isValidSrc ? imgSrc : fallbackImage} 
          alt={`${name} wine bottle`} 
          fill
          sizes='5.8rem'
          style={{ objectFit: 'contain' }}
          onError={(e) => {
            setImgSrc(fallbackImage);
          }}
          />
        </div>
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