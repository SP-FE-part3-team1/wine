# 🍷 Wine Platform Modal System

Wine Platform의 통합 모달 시스템입니다. Hook 기반 모달 매니저를 통해 와인 등록/수정, 리뷰 등록/수정, 필터 기능을 제공합니다.

## 🚀 주요 특징

- **자동 데이터 로딩**: 수정 모드에서 기존 데이터를 자동으로 불러옵니다
- **기존 컴포넌트 활용**: CustomInput, Select, Chip, StarRating 등을 재사용합니다
- **타입 안전성**: TypeScript로 완전한 타입 안전성을 보장합니다
- **접근성 지원**: ARIA 속성과 키보드 네비게이션을 완벽 지원합니다
- **반응형 디자인**: 모바일부터 데스크톱까지 모든 화면 크기에 최적화됩니다

## 📦 포함된 모달

### 1. 와인 등록/수정 모달 (WineFormModal)
- **3단계 폼 구조**
  - 1단계: 기본 정보 (이름, 타입, 원산지, 빈티지)
  - 2단계: 상세 정보 (가격, 알코올 도수, 용량)
  - 3단계: 맛 프로필 (21가지 맛 태그 선택)
- **폼 검증**: 각 단계별 필수 필드 검증
- **API 연동**: RESTful API와 자동 연동

### 2. 리뷰 등록/수정 모달 (ReviewFormModal)
- **별점 평가**: StarRating 컴포넌트 활용
- **맛 특성 슬라이더**: 4가지 맛 특성 (라이트↔진한, 부드러운↔떫은 등)
- **맛 프로필 태그**: 21가지 맛 태그 다중 선택
- **텍스트 리뷰**: 자유로운 리뷰 작성 (500자 제한)

### 3. 필터 모달 (FilterModal)
- **와인 타입 필터**: RED, WHITE, SPARKLING 다중 선택
- **가격 범위**: 슬라이더 + 직접 입력
- **평점 범위**: 최소/최대 평점 설정
- **실시간 필터 개수**: 현재 활성화된 필터 개수 표시

## 🛠️ 설치 및 설정

### 1. ModalProvider 설정

앱의 최상위에 `ModalProvider`를 설정해야 합니다:

```tsx
// app/layout.tsx
import { ModalProvider } from '@/components/Modal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
```

## 📖 사용법

### 기본 사용법

```tsx
import { useWineModal, useReviewModal, useFilterModal } from '@/components/Modal';

function MyComponent() {
  // 각 모달별 편의 함수들
  const { openCreateWineModal, openEditWineModal } = useWineModal();
  const { openCreateReviewModal, openEditReviewModal } = useReviewModal();
  const { openFilterModal } = useFilterModal();

  // 현재 필터 상태 (부모 컴포넌트에서 관리)
  const [filters, setFilters] = useState({
    wineTypes: [],
    priceRange: [0, 1000000],
    ratingRange: [0, 5]
  });

  return (
    <div>
      {/* 와인 관리 */}
      <button onClick={openCreateWineModal}>
        와인 등록
      </button>
      <button onClick={() => openEditWineModal('wine-id-123')}>
        와인 수정
      </button>

      {/* 리뷰 관리 */}
      <button onClick={() => openCreateReviewModal('wine-id-123')}>
        리뷰 작성
      </button>
      <button onClick={() => openEditReviewModal('wine-id-123', 'review-id-456')}>
        리뷰 수정
      </button>

      {/* 필터 */}
      <button onClick={() => openFilterModal(filters)}>
        필터 설정
      </button>
    </div>
  );
}
```

### 고급 사용법 - 직접 useModalManager 사용

```tsx
import { useModalManager } from '@/components/Modal';

function AdvancedComponent() {
  const { openWineModal, openReviewModal, modalState } = useModalManager();

  // 성공 콜백과 함께 모달 열기
  const handleCreateWine = async () => {
    await openWineModal('create');
    // 모달이 성공적으로 완료되면 자동으로 닫힘
    console.log('와인이 등록되었습니다!');
  };

  return (
    <div>
      {/* 로딩 상태 표시 */}
      {modalState.isLoading && <p>데이터를 불러오는 중...</p>}
      
      <button onClick={handleCreateWine}>
        고급 와인 등록
      </button>
    </div>
  );
}
```

## 🎨 커스터마이징

### 스타일 커스터마이징

각 모달의 스타일은 CSS Module로 구현되어 있어 필요시 오버라이드 가능합니다:

```css
/* Custom.module.css */
.customWineModal {
  max-width: 70rem; /* 기본 60rem에서 변경 */
}

.customWineModal .stepIndicator {
  background-color: #custom-color;
}
```

### 검증 로직 추가

`modalConfigs.ts`에서 검증 로직을 추가할 수 있습니다:

```typescript
// 커스텀 검증 함수
export const validateWineData = (data: WineFormData): string[] => {
  const errors: string[] = [];
  
  if (data.year < 1800 || data.year > new Date().getFullYear()) {
    errors.push('올바른 빈티지를 입력해주세요');
  }
  
  return errors;
};
```

## 🧪 테스팅

### Storybook

Storybook에서 모든 모달을 테스트할 수 있습니다:

```bash
npm run storybook
```

`Components/Modal System` 섹션에서 각 모달의 동작을 확인할 수 있습니다.

### 단위 테스트 예제

```tsx
// WineFormModal.test.tsx
import { render, screen } from '@testing-library/react';
import { ModalProvider, WineFormModal } from '@/components/Modal';

test('와인 등록 모달이 올바르게 렌더링된다', () => {
  render(
    <ModalProvider>
      <WineFormModal
        mode="create"
        onClose={() => {}}
      />
    </ModalProvider>
  );

  expect(screen.getByText('와인 등록하기')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument(); // 1단계 표시
});
```

## 📁 폴더 구조

```
src/components/Modal/
├── base/                   # 기본 Modal 컴포넌트들
│   ├── Modal.tsx
│   ├── ConfirmationModal.tsx
│   └── useModal.tsx
├── forms/                  # 폼 모달들
│   ├── WineFormModal.tsx
│   ├── ReviewFormModal.tsx
│   ├── FilterModal.tsx
│   └── index.ts
├── manager/                # 모달 관리 시스템
│   ├── useModalManager.tsx
│   ├── ModalProvider.tsx
│   └── modalConfigs.ts
├── examples/               # 사용 예제
│   └── ModalUsageExample.tsx
├── ModalSystem.stories.tsx # Storybook 스토리
├── index.ts               # 메인 export
└── README.md              # 이 파일
```

## 🔗 API 연동

### 인증 헤더 추가

실제 프로덕션에서는 인증 헤더를 추가해야 합니다:

```typescript
// modalConfigs.ts 또는 별도 api client
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${getAccessToken()}`,
  'Content-Type': 'application/json'
});

// API 호출 시 사용
fetch(url, {
  method: 'POST',
  headers: getAuthHeaders(),
  body: JSON.stringify(data)
});
```

### 에러 처리

API 에러는 각 모달에서 개별적으로 처리됩니다:

```typescript
try {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
} catch (error) {
  // TODO: 토스트 메시지 또는 에러 모달 표시
  console.error('API 호출 실패:', error);
}
```

## 🐛 트러블슈팅

### 자주 발생하는 문제들

1. **모달이 열리지 않는 경우**
   - `ModalProvider`가 앱 최상위에 설정되어 있는지 확인
   - 올바른 훅을 사용하고 있는지 확인

2. **타입 에러가 발생하는 경우**
   - `component-types.ts`의 타입 정의 확인
   - Import 경로가 올바른지 확인

3. **스타일이 적용되지 않는 경우**
   - CSS Module이 올바르게 import되었는지 확인
   - CSS 변수가 정의되어 있는지 확인

### 디버깅

개발 모드에서는 콘솔에 모달 상태가 로그됩니다:

```typescript
console.log('모달 상태:', modalState);
console.log('API 응답:', response);
```

## 📞 지원

문제가 발생하거나 개선 사항이 있으면 팀 Slack 채널 또는 GitHub Issues에 문의해주세요.

---

**🎉 Happy Coding!** 🍷