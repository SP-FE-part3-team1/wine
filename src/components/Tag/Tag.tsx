import type { TagProps } from './types';
import styles from './Tag.module.css';

function Tag({ icon, children }: TagProps) {

  return (
    <div className={`${styles.tag}`}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      {children}
    </div>
  );
}

export default Tag;