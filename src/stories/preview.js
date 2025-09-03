import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
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
  },
};
