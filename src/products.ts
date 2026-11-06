import type { ProductText } from "./i18n/it";

export type ProductId = "estratto-secco" | "olio" | "pellet";

export type ProductBase = {
  id: ProductId;
  path: string;
  image: string;
  pageImage: string;
  accent: string;
};

export type Product = ProductBase & ProductText;

export const productBases: ProductBase[] = [
  { id: "estratto-secco", path: "/estratto-secco", image: "/img/extract-petri.webp", pageImage: "/img/extract-page.webp", accent: "#57992D" },
  { id: "olio", path: "/olio", image: "/img/oil.webp", pageImage: "/img/oil-page.webp", accent: "#684330" },
  { id: "pellet", path: "/pellet", image: "/img/pellet.webp", pageImage: "/img/pellet-page.webp", accent: "#DE7C5A" },
];

export const findProductIdByPath = (path: string) => productBases.find((p) => p.path === path)?.id;
