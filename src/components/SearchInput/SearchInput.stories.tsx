import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '와인을 검색할 수 있는 입력 필드 컴포넌트입니다. 검색 아이콘과 클리어 기능을 포함합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '입력 필드의 현재 값',
      control: { type: 'text' }
    },
    onChange: {
      description: '입력 값 변경 시 호출되는 함수',
      action: 'value changed'
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: { type: 'text' }
    },
    onSearch: {
      description: '검색 실행 시 호출되는 함수',
      action: 'search'
    },
    onClear: {
      description: '입력 값 클리어 시 호출되는 함수',
      action: 'clear'
    },
    disabled: {
      description: '컴포넌트 비활성화 여부',
      control: { type: 'boolean' }
    },
    maxLength: {
      description: '최대 입력 가능한 문자 수',
      control: { type: 'number' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        onSearch={(searchValue) => console.log('검색:', searchValue)}
        onClear={() => setValue('')}
      />
    );
  },
  args: {
    placeholder: '와인을 검색해 보세요',
    disabled: false,
    maxLength: 100
  }
};

// 값이 있는 상태
export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Sentinel');
    
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        onSearch={(searchValue) => console.log('검색:', searchValue)}
        onClear={() => setValue('')}
      />
    );
  },
  args: {
    placeholder: '와인을 검색해 보세요',
    disabled: false,
    maxLength: 100
  }
};

// 비활성화 상태
export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('검색할 수 없음');
    
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        onSearch={(searchValue) => console.log('검색:', searchValue)}
        onClear={() => setValue('')}
      />
    );
  },
  args: {
    placeholder: '와인을 검색해 보세요',
    disabled: true,
    maxLength: 100
  }
};

// 검색 기능 없음 (onChange만 사용)
export const OnlyInput: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    placeholder: '텍스트 입력만 가능',
    disabled: false,
    maxLength: 50
  }
};

// 클리어 기능 없음
export const WithoutClear: Story = {
  render: (args) => {
    const [value, setValue] = useState('클리어 불가능한 텍스트');
    
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        onSearch={(searchValue) => console.log('검색:', searchValue)}
      />
    );
  },
  args: {
    placeholder: '와인을 검색해 보세요',
    disabled: false,
    maxLength: 100
  }
};

// 커스텀 플레이스홀더
export const CustomPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <SearchInput
        {...args}
        value={value}
        onChange={setValue}
        onSearch={(searchValue) => console.log('검색:', searchValue)}
        onClear={() => setValue('')}
      />
    );
  },
  args: {
    placeholder: 'Ciel Du Jura를 찾아보세요',
    disabled: false,
    maxLength: 100
  }
};