import type { Meta, StoryObj } from "@storybook/react";
import CardMonthly from "@/app/wines/CardMonthly";

const meta: Meta<typeof CardMonthly> = {
  title: "Wines/CardMonthly",
  component: CardMonthly,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
      },
      defaultViewport: "desktop",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardMonthly>;

export const Default: Story = {
  args: {
    imageUrl: "/assets/images/wine/wine1.png",
    rating: 4.8,
    description: "Ciel du Cheval Vineyard Collaboration Series II 2012",
  },
};

export const LowerRating: Story = {
  args: {
    imageUrl: "/assets/images/wine/wine2.png",
    rating: 3.2,
    description: "Sentinel Carbernet Sauvignon 2016",
  },
};
