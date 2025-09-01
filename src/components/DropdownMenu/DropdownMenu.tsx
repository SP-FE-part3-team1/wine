import type { DropdownMenuItem, DropdownMenuProps } from './types';
import { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

function DropdownMenu({ children, items, size = 'M' }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  //size 프롭에 따라 적용할 클래스 이름.
  const menuSizeClass = size === 'S' ? styles.menuS : styles.menuM;
  const menuItemSizeClass = size === 'S' ? styles.menuItemS : styles.menuItemM;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownMenuItem) => {
    item.onClick();
    setIsOpen(false); // 아이템 클릭 후 메뉴 닫기
  };

// 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.trigger} onClick={handleToggle}>
        {children}
      </div>

      {isOpen && (
        //공통 클래스와 사이즈 클래스를 함께 적용
        <ul className={`${styles.menu} ${menuSizeClass}`}>
          {items.map((item) => (
            <li
              key={item.label}
              className={`${styles.menuItem} ${menuItemSizeClass}`}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;