import type { TagProps } from './types';
import styles from './Tag.module.css';

function Tag({ icon, children, size = 'M' }: TagProps) {
  // size 값에 따라 CSS Module의 클래스('.S' 또는 '.M')를 선택
  const sizeClass = size === 'S' ? styles.S : styles.M;

  return (
    <div className={`${styles.tag} ${sizeClass}`}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </div>
  );
}

export default Tag;