import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Select from "./Select"; // 우리가 만든 Select 컴포넌트

// 스토리북에 표시할 메타 정보
const meta: Meta<typeof Select> = {
  title: "Components/Select", // 스토리북 UI에 표시될 이름
  component: Select,
  tags: ["autodocs"], // 컴포넌트 문서를 자동으로 생성
  argTypes: {
    // props를 스토리북에서 제어하는 방식 정의
    options: {
      control: "object",
      description: "선택 옵션 배열",
    },
    value: {
      control: "text",
      description: "현재 선택된 값",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    onChange: {
      action: "changed", // onChange 이벤트가 발생하면 Actions 탭에 로그 출력
      description: "값이 변경될 때 호출되는 함수",
    },
  },
};

export default meta;

// 스토리의 기본 타입 정의
type Story = StoryObj<typeof meta>;

// 재사용할 샘플 데이터
const sampleOptions = [
  { label: "리액트 (React)", value: "react" },
  { label: "뷰 (Vue)", value: "vue" },
  { label: "앵귤러 (Angular)", value: "angular" },
  { label: "스벨트 (Svelte)", value: "svelte" },
];

// 1. 기본 Select 컴포넌트 스토리
export const Default: Story = {
  // `render` 함수를 사용해 Storybook 내에서 상태(state)를 관리
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState(args.value || "");

    return (
      <Select
        {...args}
        value={selectedValue}
        onChange={(newValue) => {
          setSelectedValue(newValue); // 내부 상태 업데이트
          args.onChange(newValue); // 스토리북 Actions 탭에 로그 남기기
        }}
      />
    );
  },
  args: {
    fieldLabel: "프레임워크 선택",
    options: sampleOptions,
    placeholder: "프레임워크를 선택하세요",
    value: "", // 처음에는 아무것도 선택되지 않은 상태
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "300px", padding: "1em" }}>
        <Story />
      </div>
    ),
  ],
};

// 2. 특정 값이 이미 선택된 상태의 스토리
export const PreSelected: Story = {
  args: {
    options: sampleOptions,
    value: "vue", // '뷰'가 미리 선택된 상태로 렌더링
    placeholder: "프레임워크를 선택하세요",
  },
};
