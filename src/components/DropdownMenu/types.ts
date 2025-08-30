export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
}

export interface DropdownMenuProps {
  children: React.ReactNode; // trigger 요소
  items: DropdownMenuItem[]; // 드롭다운 메뉴 아이템들
}