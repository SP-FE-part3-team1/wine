import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { StarRating } from './StarRating';

const meta: Meta<typeof StarRating> = {
  title: 'Components/StarRating',
  component: StarRating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '별점을 표시하고 선택할 수 있는 컴포넌트입니다. 와인 평가 및 필터링에 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 별점 값',
      control: { type: 'number', min: 0, max: 5, step: 0.5 }
    },
    onChange: {
      description: '별점 변경 시 호출되는 함수',
      action: 'rating changed'
    },
    maxRating: {
      description: '최대 별점 수',
      control: { type: 'number', min: 3, max: 10 }
    },
    readOnly: {
      description: '읽기 전용 모드',
      control: { type: 'boolean' }
    },
    size: {
      description: '별점 크기',
      control: { type: 'radio' },
      options: ['small', 'medium', 'large']
    },
    disabled: {
      description: '비활성화 상태',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (인터랙티브)
export const Default: Story = {
  render: (args) => {
    const [rating, setRating] = useState(3);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 5,
    readOnly: false,
    size: "large",
    disabled: false,
    value: 3.5
  }
};

// 읽기 전용 (완전한 별점)
export const ReadOnlyFull: Story = {
  args: {
    value: 4,
    maxRating: 5,
    readOnly: true,
    size: 'medium',
    disabled: false
  }
};

// 읽기 전용 (반별 포함)
export const ReadOnlyHalf: Story = {
  args: {
    value: 3.5,
    maxRating: 5,
    readOnly: true,
    size: 'medium',
    disabled: false
  }
};

// 읽기 전용 (낮은 평점)
export const ReadOnlyLow: Story = {
  args: {
    value: 1.5,
    maxRating: 5,
    readOnly: true,
    size: 'medium',
    disabled: false
  }
};

// 작은 크기
export const SmallSize: Story = {
  render: (args) => {
    const [rating, setRating] = useState(2.5);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 5,
    readOnly: false,
    size: 'small',
    disabled: false
  }
};

// 큰 크기
export const LargeSize: Story = {
  render: (args) => {
    const [rating, setRating] = useState(4);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 5,
    readOnly: false,
    size: 'large',
    disabled: false
  }
};

// 비활성화 상태
export const Disabled: Story = {
  render: (args) => {
    const [rating, setRating] = useState(3);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 5,
    readOnly: false,
    size: 'medium',
    disabled: true
  }
};

// 10점 만점
export const TenStars: Story = {
  render: (args) => {
    const [rating, setRating] = useState(7);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 10,
    readOnly: false,
    size: 'medium',
    disabled: false
  }
};

// 3점 만점
export const ThreeStars: Story = {
  render: (args) => {
    const [rating, setRating] = useState(2);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 3,
    readOnly: false,
    size: 'medium',
    disabled: false
  }
};

// 빈 별점 (초기 상태)
export const Empty: Story = {
  render: (args) => {
    const [rating, setRating] = useState(0);
    
    return (
      <StarRating
        {...args}
        value={rating}
        onChange={setRating}
      />
    );
  },
  args: {
    maxRating: 5,
    readOnly: false,
    size: 'medium',
    disabled: false
  }
};

// 완벽한 평점
export const Perfect: Story = {
  args: {
    value: 5,
    maxRating: 5,
    readOnly: true,
    size: 'medium',
    disabled: false
  }
};

// 크기 비교
export const SizeComparison: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Small</p>
          <StarRating value={4} readOnly size="small" maxRating={5} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Medium</p>
          <StarRating value={4} readOnly size="medium" maxRating={5} />
        </div>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Large</p>
          <StarRating value={4} readOnly size="large" maxRating={5} />
        </div>
      </div>
    );
  }
};