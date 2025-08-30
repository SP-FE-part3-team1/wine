// components/DropdownMenu/DropdownMenu.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      // 👇 align-items: 'flex-start' 를 추가하여 수직으로 늘어나는 것을 방지
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2em', minHeight: '200px', alignItems: 'flex-start' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ... (나머지 스토리 코드는 동일) ...
const sampleItems = [
  { label: '마이페이지', onClick: () => alert('마이페이지 클릭!') },
  { label: '로그아웃', onClick: () => alert('로그아웃 클릭!') },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    children: (
      <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc' }}>
        메뉴 열기
      </button>
    ),
  },
};