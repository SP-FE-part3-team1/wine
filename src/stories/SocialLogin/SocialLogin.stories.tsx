import type { Meta, StoryObj } from "@storybook/react-vite";
import SocialLogin from "@/components/SocialLogin/SocialLogin";
import "@/app/globals.css";
import "@/app/fonts.module.css";

const meta: Meta<typeof SocialLogin> = {
  title: "Components/SocialLogin",
  component: SocialLogin,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SocialLogin>;

export const GoogleSmall: Story = {
  args: {
    logoSrc: "/assets/images/icon/google.svg",
    children: "Google로 시작하기",
    size: "sm",
  },
};

export const GoogleMedium: Story = {
  args: {
    logoSrc: "/assets/images/icon/google.svg",
    children: "Google로 시작하기",
    size: "md",
  },
};

export const KakaoSmall: Story = {
  args: {
    logoSrc: "/assets/images/icon/kakao.svg",
    children: "Kakao로 시작하기",
    size: "sm",
  },
};

export const KakaoMedium: Story = {
  args: {
    logoSrc: "/assets/images/icon/kakao.svg",
    children: "Kakao로 시작하기",
    size: "md",
  },
};
