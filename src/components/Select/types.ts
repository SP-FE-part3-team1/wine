export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  fieldLabel?: string; 
  options: Option[]; // Option 객체들의 배열
  value?: string | null; // 선택된 값 (없을 수도 있음)
  onChange: (value: string) => void; // 값이 바뀌면 호출될 함수
  placeholder?: string; // 플레이스홀더 문자열 (선택적)
}
