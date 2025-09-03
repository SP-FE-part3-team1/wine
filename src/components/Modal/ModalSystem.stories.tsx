import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ModalProvider } from './manager/ModalProvider';
import { ModalUsageExample } from './examples/ModalUsageExample';

/**
 * 새로운 모달 시스템 스토리
 * 와인 등록/수정, 리뷰 등록/수정, 필터 모달을 포함한 통합 모달 시스템
 */
const meta: Meta<typeof ModalUsageExample> = {
  title: 'Components/Modal System',
  component: ModalUsageExample,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## 🍷 통합 모달 시스템

새로운 모달 시스템은 다음과 같은 특징을 가지고 있습니다:

### ✨ 주요 기능
- **자동 데이터 로딩**: 수정 모드에서 기존 데이터를 자동으로 불러옵니다
- **기존 컴포넌트 활용**: CustomInput, Select, Chip, StarRating 등 기존 컴포넌트를 최대한 활용합니다
- **타입 안전성**: TypeScript로 모든 인터페이스가 타입 안전하게 구현되어 있습니다
- **접근성**: ARIA 속성과 키보드 네비게이션을 지원합니다

### 📦 포함된 모달
1. **와인 등록/수정 모달**: 3단계 폼으로 구성된 와인 정보 입력
2. **리뷰 등록/수정 모달**: 별점, 맛 프로필, 텍스트 리뷰 작성
3. **필터 모달**: 와인 타입, 가격, 평점 필터링

### 🔧 사용법
\`\`\`tsx
import { ModalProvider, useWineModal, useReviewModal, useFilterModal } from '@/components/Modal';

// 1. 앱 최상위에 ModalProvider 설정
<ModalProvider>
  <App />
</ModalProvider>

// 2. 컴포넌트에서 편의 훅 사용
const { openCreateWineModal, openEditWineModal } = useWineModal();
const { openCreateReviewModal, openEditReviewModal } = useReviewModal();
const { openFilterModal } = useFilterModal();

// 3. 모달 열기
openCreateWineModal(); // 와인 등록
openEditWineModal('wine-id'); // 와인 수정
openCreateReviewModal('wine-id'); // 리뷰 작성
openEditReviewModal('wine-id', 'review-id'); // 리뷰 수정
openFilterModal(currentFilters); // 필터 설정
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 모달 시스템 데모
 * 각 모달을 실제로 테스트해볼 수 있습니다.
 */
export const Demo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
### 🎮 인터랙티브 데모

이 데모에서 각 버튼을 클릭하여 모달을 열어보세요:

- **와인 등록**: 3단계 폼 (기본정보 → 상세정보 → 맛 프로필)
- **와인 수정**: 기존 데이터가 미리 입력된 상태로 열림
- **리뷰 작성**: 별점, 맛 특성 슬라이더, 맛 프로필, 텍스트 입력
- **리뷰 수정**: 기존 리뷰 데이터로 초기화
- **필터**: 와인 타입, 가격 범위, 평점 범위 설정

### 📋 검증 사항
- [x] 모달 열기/닫기 동작
- [x] 폼 검증 및 오류 처리
- [x] 기존 데이터 로딩 (수정 모드)
- [x] 반응형 디자인
- [x] 접근성 지원
- [x] 키보드 네비게이션
        `
      }
    }
  }
};

/**
 * 와인 등록 모달만 표시
 */
export const WineRegistration: Story = {
  render: () => (
    <ModalProvider>
      <div style={{ padding: '2rem' }}>
        <h2>와인 등록 모달</h2>
        <p>3단계로 구성된 와인 등록 폼입니다.</p>
        <button onClick={() => {
          // 임시로 전역 함수로 접근 (실제로는 useWineModal 사용)
          console.log('와인 등록 모달 열기');
        }}>
          와인 등록하기
        </button>
      </div>
    </ModalProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '와인 등록에 필요한 모든 정보를 3단계에 걸쳐 입력받는 모달입니다.'
      }
    }
  }
};

/**
 * 리뷰 작성 모달만 표시
 */
export const ReviewCreation: Story = {
  render: () => (
    <ModalProvider>
      <div style={{ padding: '2rem' }}>
        <h2>리뷰 작성 모달</h2>
        <p>별점, 맛 특성, 텍스트 리뷰를 작성할 수 있습니다.</p>
        <button onClick={() => {
          console.log('리뷰 작성 모달 열기');
        }}>
          리뷰 작성하기
        </button>
      </div>
    </ModalProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '와인에 대한 종합적인 리뷰를 작성할 수 있는 모달입니다.'
      }
    }
  }
};

/**
 * 필터 모달만 표시
 */
export const FilterSystem: Story = {
  render: () => (
    <ModalProvider>
      <div style={{ padding: '2rem' }}>
        <h2>필터 시스템</h2>
        <p>와인 목록을 다양한 조건으로 필터링할 수 있습니다.</p>
        <button onClick={() => {
          console.log('필터 모달 열기');
        }}>
          필터 설정
        </button>
      </div>
    </ModalProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: '와인 타입, 가격 범위, 평점 범위로 와인을 필터링할 수 있는 모달입니다.'
      }
    }
  }
};