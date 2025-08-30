import type { Meta, StoryObj } from "@storybook/react";
import Profile from "@/components/Profile/Profile";
import "@/app/globals.css";

const meta: Meta<typeof Profile> = {
  title: "Components/Profile",
  component: Profile,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Small: Story = {
  args: {
    src: "/assets/images/profile/profile.png",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    src: "/assets/images/profile/profile.png",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    src: "/assets/images/profile/profile.png",
    size: "lg",
  },
};
