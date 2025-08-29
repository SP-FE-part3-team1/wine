import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { WineTypeChip } from './WineTypeChip';
import { WineType } from '../../types/component-types';

const meta: Meta<typeof WineTypeChip> = {
  title: 'Components/WineTypeChip',
  component: WineTypeChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '와인 타입을 선택할 수 있는 다중 선택 칩 컴포넌트입니다. 필터링에 사용됩니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    types: {
      description: '표시할 와인 타입 목록',
      control: { type: 'object' }
    },
    selectedTypes: {
      description: '현재 선택된 와인 타입 목록',
      control: { type: 'object' }
    },
    onTypesChange: {
      description: '와인 타입 선택 변경 시 호출되는 함수',
      action: 'types changed'
    },
    disabled: {
      description: '컴포넌트 비활성화 여부',
      control: { type: 'boolean' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const [selectedTypes, setSelectedTypes] = useState<WineType[]>([]);
    
    return (
      <WineTypeChip
        {...args}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
      />
    );
  },
  args: {
    types: ['RED', 'WHITE', 'SPARKLING'],
    disabled: false
  }
};

// 일부 선택된 상태
export const WithSelectedTypes: Story = {
  render: (args) => {
    const [selectedTypes, setSelectedTypes] = useState<WineType[]>(['RED', 'WHITE']);
    
    return (
      <WineTypeChip
        {...args}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
      />
    );
  },
  args: {
    types: ['RED', 'WHITE', 'SPARKLING'],
    disabled: false
  }
};

// 모두 선택된 상태
export const AllSelected: Story = {
  render: (args) => {
    const [selectedTypes, setSelectedTypes] = useState<WineType[]>(['RED', 'WHITE', 'SPARKLING']);
    
    return (
      <WineTypeChip
        {...args}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
      />
    );
  },
  args: {
    types: ['RED', 'WHITE', 'SPARKLING'],
    disabled: false
  }
};

// 비활성화 상태
export const Disabled: Story = {
  render: (args) => {
    const [selectedTypes, setSelectedTypes] = useState<WineType[]>(['RED']);
    
    return (
      <WineTypeChip
        {...args}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
      />
    );
  },
  args: {
    types: ['RED', 'WHITE', 'SPARKLING'],
    disabled: true
  }
};

// 제한된 타입만 표시
export const LimitedTypes: Story = {
  render: (args) => {
    const [selectedTypes, setSelectedTypes] = useState<WineType[]>([]);
    
    return (
      <WineTypeChip
        {...args}
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
      />
    );
  },
  args: {
    types: ['RED', 'WHITE'],
    disabled: false
  }
};