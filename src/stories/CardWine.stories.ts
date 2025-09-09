import type { Meta, StoryObj } from "@storybook/react-vite";
import CardWine from "@/app/wines/Components/CardWine/CardWine";
import "@/app/reset.css";

const meta: Meta<typeof CardWine> = {
  title: "Wines/CardWine",
  component: CardWine,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof CardWine>;

export const Default: Story = {
  args: {
    imageUrl: "/assets/images/wine/wine1.png",
    infoTitle: "Sentinel Cabernet Sauvignon 2016",
    infoDescription: "Western Cape, South Africa",
    tagLabel: "₩ 64,990",
    rating: 4.8,
    reviewState: "47개의 후기",
    detailTitle: "최신 후기",
    detailDescription:
      "Cherry, cocoa, vanilla and clove - beautiful red fruit driven Amarone. Low acidity and medium tannins. Nice...",
  },
};
