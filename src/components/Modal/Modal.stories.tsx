import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '기본 모달 컴포넌트입니다. Portal을 사용하여 렌더링되며, 접근성과 키보드 네비게이션을 지원합니다.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description: '모달 열림/닫힘 상태',
      control: { type: 'boolean' }
    },
    onClose: {
      description: '모달 닫기 함수',
      action: 'close'
    },
    title: {
      description: '모달 제목',
      control: { type: 'text' }
    },
    size: {
      description: '모달 크기',
      control: { type: 'radio' },
      options: ['small', 'medium', 'large']
    },
    className: {
      description: '추가 CSS 클래스',
      control: { type: 'text' }
    },
    children: {
      description: '모달 콘텐츠',
      control: { type: 'text' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 모달
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div>
            <p>이것은 기본 모달입니다.</p>
            <p>ESC 키를 누르거나 배경을 클릭하여 닫을 수 있습니다.</p>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: '기본 모달',
    size: 'medium'
  }
};

// 제목 없는 모달
export const WithoutTitle: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          제목 없는 모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>사용자 정의 제목</h3>
            <p>제목이 없는 모달에서는 콘텐츠 영역에서 직접 제목을 관리할 수 있습니다.</p>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    size: 'medium'
  }
};

// 작은 모달
export const SmallModal: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          작은 모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div>
            <p>작은 크기의 모달입니다.</p>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: '작은 모달',
    size: 'small'
  }
};

// 큰 모달
export const LargeModal: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          큰 모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div>
            <h4>큰 모달 콘텐츠</h4>
            <p>이것은 큰 크기의 모달입니다. 더 많은 콘텐츠를 담을 수 있습니다.</p>
            <div style={{ height: '200px', border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
              <span>추가 콘텐츠 영역</span>
            </div>
            <p>스크롤이 필요한 경우 콘텐츠 영역에서만 스크롤됩니다.</p>
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: '큰 모달',
    size: 'large'
  }
};

// 긴 콘텐츠가 있는 모달 (스크롤)
export const ScrollableContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          스크롤 가능한 모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div>
            <p>이 모달은 긴 콘텐츠를 포함하여 스크롤이 가능합니다.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                콘텐츠 라인 {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
  args: {
    title: '스크롤 가능한 모달',
    size: 'medium'
  }
};

// 폼이 있는 모달
export const WithForm: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          폼 모달 열기
        </button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '4px' }}>이름</label>
              <input 
                id="name"
                type="text" 
                placeholder="이름을 입력하세요" 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>이메일</label>
              <input 
                id="email"
                type="email" 
                placeholder="이메일을 입력하세요" 
                style={{ 
                  width: '100%', 
                  padding: '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
              <button 
                type="submit"
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  background: '#6B46C1',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                저장
              </button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
  args: {
    title: '사용자 정보 입력',
    size: 'medium'
  }
};