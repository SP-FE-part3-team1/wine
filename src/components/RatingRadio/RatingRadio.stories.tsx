import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { RatingRadio } from './RatingRadio';
import { RatingOption } from '../../types/component-types';

const meta: Meta<typeof RatingRadio> = {
  title: 'Components/RatingRadio',
  component: RatingRadio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '평점 범위를 선택할 수 있는 라디오 버튼 컴포넌트입니다. 와인 필터링에 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 선택된 값',
      control: { type: 'text' }
    },
    onChange: {
      description: '값 변경 시 호출되는 함수',
      action: 'value changed'
    },
    options: {
      description: '선택 가능한 옵션 목록',
      control: { type: 'object' }
    },
    name: {
      description: '라디오 그룹 이름',
      control: { type: 'text' }
    },
    disabled: {
      description: '컴포넌트 비활성화 여부',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 평점 옵션
const defaultRatingOptions: RatingOption[] = [
  { label: '전체', value: 'all' },
  { label: '4.5점 이상', value: '4.5+' },
  { label: '4.0점 이상', value: '4.0+' },
  { label: '3.5점 이상', value: '3.5+' },
  { label: '3.0점 이상', value: '3.0+' }
];

// 가격 범위 옵션
const priceRangeOptions: RatingOption[] = [
  { label: '전체 가격', value: 'all' },
  { label: '10만원 이하', value: 'under-100k' },
  { label: '10-30만원', value: '100k-300k' },
  { label: '30-50만원', value: '300k-500k' },
  { label: '50만원 이상', value: 'over-500k' }
];

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('all');
    
    return (
      <RatingRadio
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: defaultRatingOptions,
    name: 'rating-filter',
    disabled: false
  }
};

// 선택된 상태
export const WithSelectedValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('4.0+');
    
    return (
      <RatingRadio
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: defaultRatingOptions,
    name: 'rating-filter-selected',
    disabled: false
  }
};

// 비활성화 상태
export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('3.5+');
    
    return (
      <RatingRadio
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: defaultRatingOptions,
    name: 'rating-filter-disabled',
    disabled: true
  }
};

// 가격 범위 필터
export const PriceRange: Story = {
  render: (args) => {
    const [value, setValue] = useState('100k-300k');
    
    return (
      <RatingRadio
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: priceRangeOptions,
    name: 'price-filter',
    disabled: false
  }
};

// 제한된 옵션
export const LimitedOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState('premium');
    
    return (
      <RatingRadio
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: [
      { label: '프리미엄 와인', value: 'premium' },
      { label: '스탠다드 와인', value: 'standard' }
    ],
    name: 'wine-grade',
    disabled: false
  }
};

// 긴 라벨
export const LongLabels: Story = {
  render: (args) => {
    const [value, setValue] = useState('organic');
    
    return (
      <RatingRadio
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    options: [
      { label: '유기농 인증 와인 (친환경 재배)', value: 'organic' },
      { label: '전통 양조법으로 제조된 와인', value: 'traditional' },
      { label: '소량 생산 부티크 와이너리 제품', value: 'boutique' }
    ],
    name: 'wine-type-long',
    disabled: false
  }
};