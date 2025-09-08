import type { MyWine } from "../_components/MyWineCard";

export const mockWines: MyWine[] = [
  {
    id: "w1",
    title: "Sentinel Cabernet Sauvignon 2016", // ← Sentinel / Cabernet
    region: "Western Cape, South Africa",
    price: 64990,
    imageSrc: "/assets/images/wine/wine1.png",
  },
  {
    id: "w2",
    title: "Château Example Rouge 2018",
    region: "Bordeaux, France",
    price: 52900,
    imageSrc: "/assets/images/wine/wine2.png",
  },
];
