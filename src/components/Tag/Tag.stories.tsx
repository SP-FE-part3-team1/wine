import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
decorators: [
  (Story) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <Story />
    </div>
  ),
],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  name: '텍스트만 있는 태그 (가격)',
  args: {
    children: '₩ 64,990',
  },
};

export const WithIcon: Story = {
  name: '아이콘과 텍스트가 함께 있는 태그 (별점)',
  args: {
    // SVG 아이콘 컴포넌트나, 텍스트(⭐️) 또는 img 태그를 넣을 수 있습니다.
    icon: '★',
    children: '5.0',
  },
};