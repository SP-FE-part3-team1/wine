import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';

const meta: Meta<typeof ConfirmationModal> = {
  title: 'Components/ConfirmationModal',
  component: ConfirmationModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자의 확인이 필요한 작업에 사용되는 확인 모달입니다. 삭제, 취소 등의 중요한 액션을 수행하기 전에 사용합니다.'
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
    onConfirm: {
      description: '확인 버튼 클릭 시 호출되는 함수',
      action: 'confirm'
    },
    title: {
      description: '모달 제목',
      control: { type: 'text' }
    },
    message: {
      description: '확인 메시지',
      control: { type: 'text' }
    },
    confirmText: {
      description: '확인 버튼 텍스트',
      control: { type: 'text' }
    },
    cancelText: {
      description: '취소 버튼 텍스트',
      control: { type: 'text' }
    },
    variant: {
      description: '모달 스타일 변형',
      control: { type: 'radio' },
      options: ['default', 'destructive']
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 확인 모달
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          확인 모달 열기
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('확인되었습니다');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '작업을 계속하시겠습니까?',
    message: '이 작업을 수행하면 변경사항이 적용됩니다.',
    confirmText: '확인',
    cancelText: '취소',
    variant: 'default'
  }
};

// 삭제 확인 모달 (위험한 작업)
export const DeleteConfirmation: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: '#DC2626',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          와인 삭제하기
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('삭제되었습니다');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '정말 삭제하시겠습니까?',
    message: '이 와인을 삭제하면 복구할 수 없습니다. 정말로 삭제하시겠습니까?',
    confirmText: '삭제하기',
    cancelText: '취소',
    variant: 'destructive'
  }
};

// 리뷰 삭제 확인
export const DeleteReview: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          리뷰 삭제
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('리뷰가 삭제되었습니다');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '리뷰를 삭제하시겠습니까?',
    message: '작성하신 리뷰가 영구적으로 삭제됩니다.',
    confirmText: '삭제',
    cancelText: '취소',
    variant: 'destructive'
  }
};

// 로그아웃 확인
export const LogoutConfirmation: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          로그아웃
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('로그아웃되었습니다');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '로그아웃 하시겠습니까?',
    message: '현재 세션에서 로그아웃됩니다.',
    confirmText: '로그아웃',
    cancelText: '취소',
    variant: 'default'
  }
};

// 변경사항 저장 확인
export const SaveChanges: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: '#6B46C1',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          변경사항 저장
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('변경사항이 저장되었습니다');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '변경사항을 저장하시겠습니까?',
    message: '입력하신 정보가 저장됩니다.',
    confirmText: '저장',
    cancelText: '취소',
    variant: 'default'
  }
};

// 긴 메시지가 있는 확인 모달
export const LongMessage: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <button onClick={() => setIsOpen(true)}>
          긴 메시지 모달 열기
        </button>
        <ConfirmationModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            console.log('확인되었습니다');
            setIsOpen(false);
          }}
        />
      </>
    );
  },
  args: {
    title: '데이터를 영구적으로 삭제하시겠습니까?',
    message: '이 작업을 수행하면 모든 와인 정보, 리뷰, 평점이 영구적으로 삭제되며 복구할 수 없습니다. 삭제된 데이터는 백업에서도 제거되므로 신중하게 결정해 주세요.',
    confirmText: '영구 삭제',
    cancelText: '취소',
    variant: 'destructive'
  }
};