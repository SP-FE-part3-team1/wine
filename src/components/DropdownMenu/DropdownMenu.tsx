import type { DropdownMenuItem, DropdownMenuProps } from './types';
import { useState, useRef, useEffect } from 'react';
import styles from './DropdownMenu.module.css';

function DropdownMenu({ children, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownMenuItem) => {
    item.onClick();
    setIsOpen(false); // 아이템 클릭 후 메뉴 닫기
  };

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
      {/* children으로 받은 트리거를 렌더링하고, 클릭 시 메뉴를 토글합니다. */}
      <div className={styles.trigger} onClick={handleToggle}>
        {children}
      </div>

      {isOpen && (
        <ul className={styles.menu}>
          {items.map((item) => (
            <li
              key={item.label}
              className={styles.menuItem}
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