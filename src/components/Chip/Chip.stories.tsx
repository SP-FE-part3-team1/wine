import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Chip } from './Chip';
import { ChipOption } from '../../types/component-types';

// 범용 Chip 컴포넌트 스토리 (메인)
const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
범용 선택 가능한 칩 컴포넌트입니다. 단일/다중 선택을 지원하며 다양한 용도로 사용할 수 있습니다.

**사용 예시:**
- 와인 타입 필터링 (RED, WHITE, SPARKLING)
- 리뷰 태그 선택 (과일향, 우디, 달콤함 등)
- 크기 선택 (Small, Medium, Large)
- 카테고리 필터링

**특징:**
- 단일/다중 선택 모드 지원
- 키보드 네비게이션 지원
- 접근성 준수 (ARIA)
- 반응형 디자인
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '표시할 옵션 목록',
      control: { type: 'object' }
    },
    selectedValues: {
      description: '현재 선택된 값 목록',
      control: { type: 'object' }
    },
    onSelectionChange: {
      description: '선택 변경 시 호출되는 함수',
      action: 'selection changed'
    },
    disabled: {
      description: '컴포넌트 비활성화 여부',
      control: { type: 'boolean' }
    },
    multiple: {
      description: '다중 선택 허용 여부',
      control: { type: 'boolean' }
    },
    ariaLabel: {
      description: '접근성을 위한 레이블',
      control: { type: 'text' }
    },
    readonly: {
      description: '읽기 전용 상태 (클릭 비활성화, 기본 스타일 유지)',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 다중 선택 칩
export const Default: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    return (
      <Chip
        {...args}
        selectedValues={selectedValues}
        onSelectionChange={setSelectedValues}
      />
    );
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    disabled: false,
    multiple: true,
    ariaLabel: '옵션 선택'
  }
};

// 단일 선택 모드
export const SingleSelect: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    return (
      <Chip
        {...args}
        selectedValues={selectedValues}
        onSelectionChange={setSelectedValues}
      />
    );
  },
  args: {
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' }
    ],
    disabled: false,
    multiple: false,
    ariaLabel: '크기 선택'
  }
};

// 와인 타입 필터링 예시
export const WineTypeFilter: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    return (
      <Chip
        {...args}
        selectedValues={selectedValues}
        onSelectionChange={setSelectedValues}
      />
    );
  },
  args: {
    options: [
      { value: 'RED', label: 'Red' },
      { value: 'WHITE', label: 'White' },
      { value: 'SPARKLING', label: 'Sparkling' }
    ],
    disabled: false,
    multiple: true,
    ariaLabel: '와인 타입 선택'
  }
};

// 리뷰 태그 선택 예시
export const ReviewTags: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    return (
      <Chip
        {...args}
        selectedValues={selectedValues}
        onSelectionChange={setSelectedValues}
      />
    );
  },
  args: {
    options: [
      { value: 'fruity', label: '과일향' },
      { value: 'woody', label: '우디' },
      { value: 'sweet', label: '달콤함' },
      { value: 'dry', label: '드라이' },
      { value: 'spicy', label: '스파이시' },
      { value: 'floral', label: '꽃향' },
      { value: 'citrus', label: '시트러스' },
      { value: 'mineral', label: '미네랄' }
    ],
    disabled: false,
    multiple: true,
    ariaLabel: '리뷰 태그 선택'
  }
};

// 일부 선택된 상태
export const WithPreselected: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['option1', 'option3']);
    
    return (
      <Chip
        {...args}
        selectedValues={selectedValues}
        onSelectionChange={setSelectedValues}
      />
    );
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' }
    ],
    disabled: false,
    multiple: true,
    ariaLabel: '옵션 선택'
  }
};

// 비활성화 상태
export const Disabled: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['option1']);
    
    return (
      <Chip
        {...args}
        selectedValues={selectedValues}
        onSelectionChange={setSelectedValues}
      />
    );
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    disabled: true,
    multiple: true,
    ariaLabel: '옵션 선택'
  }
};

// 많은 옵션 (스크롤 테스트)
export const ManyOptions: Story = {
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    
    return (
      <div style={{ maxWidth: '500px' }}>
        <Chip
          {...args}
          selectedValues={selectedValues}
          onSelectionChange={setSelectedValues}
        />
      </div>
    );
  },
  args: {
    options: Array.from({ length: 12 }, (_, i) => ({
      value: `tag${i + 1}`,
      label: `Tag ${i + 1}`
    })),
    disabled: false,
    multiple: true,
    ariaLabel: '태그 선택'
  }
};

// 읽기 전용 모드 (와인 상세페이지 카드용)
export const ReadonlyMode: Story = {
  args: {
    options: [
      { value: 'fruity', label: '과일향' },
      { value: 'woody', label: '우디' },
      { value: 'dry', label: '드라이' },
      { value: 'sweet', label: '달콤함' }
    ],
    selectedValues: ['fruity', 'dry'], // 미리 선택된 상태
    readonly: true, // 클릭 비활성화
    ariaLabel: '와인 특성'
  },
  parameters: {
    docs: {
      description: {
        story: `
**읽기 전용 모드** - 와인 상세페이지 카드에서 사용

- 클릭해도 상태가 변경되지 않음
- 기본 스타일 유지 (disabled와 다름)
- 호버 효과 제거
- 와인의 실제 특성을 표시하는 용도
        `
      }
    }
  }
};

// 읽기 전용 vs 비활성화 비교
export const ReadonlyVsDisabled: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ marginBottom: '10px' }}>읽기 전용 모드 (readonly)</h3>
          <Chip
            options={[
              { value: 'fruity', label: '과일향' },
              { value: 'woody', label: '우디' },
              { value: 'dry', label: '드라이' }
            ]}
            selectedValues={['fruity', 'dry']}
            readonly={true}
            ariaLabel='와인 특성'
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '10px' }}>비활성화 모드 (disabled)</h3>
          <Chip
            options={[
              { value: 'fruity', label: '과일향' },
              { value: 'woody', label: '우디' },
              { value: 'dry', label: '드라이' }
            ]}
            selectedValues={['fruity', 'dry']}
            disabled={true}
            ariaLabel='와인 특성'
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**readonly vs disabled 비교**

- **readonly**: 기본 스타일 유지, 클릭만 비활성화
- **disabled**: opacity 0.5, 회색톤으로 변경
        `
      }
    }
  }
};