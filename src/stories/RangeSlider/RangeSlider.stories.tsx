import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RangeSlider from "@/components/RangeSlider/RangeSlider";
import "@/app/globals.css";

const meta: Meta<typeof RangeSlider> = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof RangeSlider>;

/** 1) 와인 속성(단일 값, 버블 숨김) */
export const SingleAttribute: Story = {
  render: () => {
    const [val, setVal] = useState(50);
    return (
      <div style={{ width: 320 }}>
        <label style={{ display: "block", marginBottom: 40 }}>바디감</label>
        <RangeSlider
          type="single"
          min={0}
          max={100}
          value={val}
          onChange={setVal}
        />
      </div>
    );
  },
};

/** 2) 가격 범위 (값 버블 표시) */
export const PriceRangeKRW: Story = {
  render: () => {
    const [range, setRange] = useState<[number, number]>([50000, 90000]);
    return (
      <div style={{ width: 320 }}>
        <label style={{ display: "block", marginBottom: 40 }}>가격 범위</label>
        <RangeSlider
          type="range"
          min={0}
          max={100000}
          step={1000}
          value={range}
          onChange={setRange}
          showValue
        />
      </div>
    );
  },
};
