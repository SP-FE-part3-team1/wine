'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { ReviewCardProps } from './types';
import styles from './ReviewCard.module.css';

// 공용 컴포넌트
import Profile from '../../../../../components/Profile/Profile'
import Button from '../../../../../components/Button/Button';
import Tag from '../../../../../components/Tag/Tag';
import { Chip } from '../../../../../components/Chip/Chip';
import RangeSlider from '../../../../../components/RangeSlider/RangeSlider';
import StarIcon from '../StarIcon';
import DropdownMenu from '../../../../../components/DropdownMenu/DropdownMenu';

import { formatTimeAgo } from '@/utils/formatTime';


// Aroma enum 타입에 맞춰 모든 아로마 키와 한글 이름을 매핑
const AROMA_MAP: { [key: string]: string } = {
  CHERRY: '체리',
  BERRY: '베리',
  OAK: '오크',
  VANILLA: '바닐라',
  PEPPER: '후추',
  BAKING: '베이킹',
  GRASS: '풀',
  APPLE: '사과',
  PEACH: '복숭아',
  CITRUS: '시트러스',
  TROPICAL: '열대과일',
  MINERAL: '미네랄',
  FLOWER: '꽃',
  TOBACCO: '담배',
  EARTH: '흙',
  CHOCOLATE: '초콜릿',
  SPICE: '향신료',
  CARAMEL: '카라멜',
  LEATHER: '가죽',
};


function ReviewCard({ review, onLikeClick, onMoreClick, onDelete }: ReviewCardProps) {
  const {
    id,
    rating,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
    aroma,
    content,
    createdAt,
    user,
    isLiked,
  } = review;

  // 드롭다운 열림/ 닫힘 관리
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Chip 컴포넌트에 맞는 형태로 props를 변환
  const chipOptions = aroma.map((aromaKey) => ({
    value: aromaKey,
    label: AROMA_MAP[aromaKey] || aromaKey,
  }));

  // 별점tag에 넘겨줄 이미지 
  const starIcon = <StarIcon className={styles.starIcon} />;


  //드롭다운 메뉴에 표시될 옵션 정의
  const dropdownOptions = [
    {
      label: '수정하기',
      onClick: () => {
        console.log(`리뷰 ${id} 수정`);
        onMoreClick?.(id); 
        setIsDropdownOpen(false);
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        onDelete(id);
        console.log(`리뷰 ${id} 삭제`);
        setIsDropdownOpen(false);
      },
    },
  ];

  return (
    <div className={styles.card}>
      {/* --- 카드 헤더 --- */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <Profile src={user.image || '/assets/images/profile/profile.png'} alt={`${user.nickname}님의 프로필`} size="sm" />
          <div className={styles.userMeta}>
            <span className={styles.nickname}>{user.nickname}</span>
            <span className={styles.timeAgo}>{formatTimeAgo(createdAt)}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="icon" ariaLabel="좋아요" onClick={() => onLikeClick?.(id)} className={styles.iconButton}>
            <Image
              src={review.isLiked ? "/assets/images/icon/liked.svg" : "/assets/images/icon/like.svg"}
              alt="좋아요 아이콘"
              fill={true}
              style={{ objectFit: 'cover' }} 
            />
          </Button>
              <DropdownMenu items={dropdownOptions} size='M'>
            <Button variant="icon" ariaLabel="더보기" className={styles.iconButton}>
              <Image
                src="/assets/images/icon/menu.svg"
                alt="더보기 아이콘"
                fill={true}
                style={{ objectFit: 'cover' }}
              />
            </Button>
          </DropdownMenu>
        </div>
      </div>

      {/* --- 아로마 칩 & 별점 태그 --- */}
      <div className={styles.tagsWrapper}>
        <Chip
          options={chipOptions}
          selectedValues={[]}
          onSelectionChange={() => {}}
          readonly={true}
          disabled={false}
        />
        <div className={styles.ratingTag}>
        <Tag icon={starIcon}>
          {rating.toFixed(1)}
        </Tag>
        </div>
      </div>

      {/* --- 리뷰 본문 --- */}
      <p className={styles.contentText}>{content}</p>

      {/* --- 와인 맛 슬라이더 --- */}
      <div className={styles.tasteSliders}>
        <div className={styles.sliderItem}>
          <span className={styles.sliderTag}>바디감</span>
            <span className={styles.sliderLabel}>가벼워요</span>
          <RangeSlider type="single" min={0} max={100} value={lightBold} onChange={() => {}} />
            <span className={styles.sliderLabel}>진해요</span>
        </div>
        <div className={styles.sliderItem}>
          <span className={styles.sliderTag}>타닌</span>
            <span className={styles.sliderLabel}>부드러워요</span>
          <RangeSlider type="single" min={0} max={100} value={smoothTannic} onChange={() => {}} />
            <span className={styles.sliderLabel}>떫어요</span>
        </div>
        <div className={styles.sliderItem}>
          <span className={styles.sliderTag}>당도</span>
            <span className={styles.sliderLabel}>드라이해요</span>
          <RangeSlider type="single" min={0} max={100} value={drySweet} onChange={() => {}} />
            <span className={styles.sliderLabel}>달아요</span>
        </div>
        <div className={styles.sliderItem}>
          <span className={styles.sliderTag}>산미</span>
            <span className={styles.sliderLabel}>안셔요</span>
          <RangeSlider type="single" min={0} max={100} value={softAcidic} onChange={() => {}} />
            <span className={styles.sliderLabel}>많이셔요</span>
        </div>
      </div>

      {/* --- 접기 버튼 --- */}
      <div className={styles.footer}>
        <Button variant='icon' ariaLabel='접기'>
          <Image src='/assets/images/icon/more.svg' alt='접기 아이콘' width={30} height={30} className={styles.foldIcon}/>
        </Button>
      </div>
    </div>
  );
}

export default ReviewCard;