import type { Meta, StoryObj } from "@storybook/react-vite";
import WineCarousel from "@/app/wines/WineCarousel";
import { components } from "@/types/types";

type WineListType = components["schemas"]["WineListType"];

const meta: Meta<typeof WineCarousel> = {
  title: "Wines/WineCarousel",
  component: WineCarousel,
};

export default meta;
type Story = StoryObj<typeof WineCarousel>;

const mockWines: WineListType[] = [
  {
    id: 1,
    name: "Sentinel Cabernet Sauvignon 2016",
    region: "Napa Valley",
    image: "/assets/images/wine/wine1.png",
    price: 45000,
    type: "RED",
    avgRating: 4.8,
    reviewCount: 12,
    recentReview: null,
    userId: 1,
  },
  {
    id: 2,
    name: "Chateau Margaux 2015",
    region: "Bordeaux",
    image: "/assets/images/wine/wine2.png",
    price: 150000,
    type: "RED",
    avgRating: 4.6,
    reviewCount: 20,
    recentReview: null,
    userId: 1,
  },
  {
    id: 3,
    name: "Dom Pérignon Vintage 2012",
    region: "Champagne",
    image: "/assets/images/wine/wine3.png",
    price: 220000,
    type: "SPARKLING",
    avgRating: 1.3,
    reviewCount: 30,
    recentReview: null,
    userId: 2,
  },
  {
    id: 4,
    name: "Sentinel Cabernet Sauvignon 2016",
    region: "Napa Valley",
    image: "/assets/images/wine/wine1.png",
    price: 45000,
    type: "RED",
    avgRating: 4.8,
    reviewCount: 12,
    recentReview: null,
    userId: 1,
  },
  {
    id: 5,
    name: "Chateau Margaux 2015",
    region: "Bordeaux",
    image: "/assets/images/wine/wine2.png",
    price: 150000,
    type: "RED",
    avgRating: 4.6,
    reviewCount: 20,
    recentReview: null,
    userId: 1,
  },
  {
    id: 6,
    name: "Dom Pérignon Vintage 2012",
    region: "Champagne",
    image: "/assets/images/wine/wine3.png",
    price: 220000,
    type: "SPARKLING",
    avgRating: 3.5,
    reviewCount: 30,
    recentReview: null,
    userId: 2,
  },

  {
    id: 7,
    name: "Sentinel Cabernet Sauvignon 2016",
    region: "Napa Valley",
    image: "/assets/images/wine/wine1.png",
    price: 45000,
    type: "RED",
    avgRating: 4.8,
    reviewCount: 12,
    recentReview: null,
    userId: 1,
  },
  {
    id: 8,
    name: "Chateau Margaux 2015",
    region: "Bordeaux",
    image: "/assets/images/wine/wine2.png",
    price: 150000,
    type: "RED",
    avgRating: 4.6,
    reviewCount: 20,
    recentReview: null,
    userId: 1,
  },
  {
    id: 9,
    name: "Dom Pérignon Vintage 2012",
    region: "Champagne",
    image: "/assets/images/wine/wine3.png",
    price: 220000,
    type: "SPARKLING",
    avgRating: 4.9,
    reviewCount: 30,
    recentReview: null,
    userId: 2,
  },

  {
    id: 10,
    name: "Dom Pérignon Vintage 2012",
    region: "Champagne",
    image: "/assets/images/wine/wine3.png",
    price: 220000,
    type: "SPARKLING",
    avgRating: 4.9,
    reviewCount: 30,
    recentReview: null,
    userId: 2,
  },

  {
    id: 11,
    name: "Dom Pérignon Vintage 2012",
    region: "Champagne",
    image: "/assets/images/wine/wine3.png",
    price: 220000,
    type: "SPARKLING",
    avgRating: 4.9,
    reviewCount: 30,
    recentReview: null,
    userId: 2,
  },
];

export const Default: Story = {
  args: {
    wines: mockWines,
    onClickWine: (id: number) => alert(`Wine ${id} clicked`),
  },
};
