// 각 시간 단위의 타입 정의
type TimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';


const TIME_UNITS: { unit: TimeUnit; ms: number }[] = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2592000000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
  { unit: 'second', ms: 1000 },
];

export function formatTimeAgo(dateString: string): string {
  const targetDate = new Date(dateString).getTime();
  const now = new Date().getTime();
  const diff = now - targetDate;

//상대 시간 포맷터 생성
  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' });


// 각 시간 단위별로 차이를 계산하여 가장 큰 단위로 반환
  for (const { unit, ms } of TIME_UNITS) {
    const interval = Math.floor(diff / ms);
    if (interval >= 1) {
      return rtf.format(-interval, unit);
    }
  }

  return '방금 전';
}