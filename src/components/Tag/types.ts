import type { ReactNode } from 'react';

export interface TagProps {
  /** 태그 왼쪽에 표시될 아이콘 (선택 사항) */
  icon?: ReactNode; // 태그
  /** 태그에 표시될 내용 */
  children: ReactNode;
  size: 'S' | 'M';
}