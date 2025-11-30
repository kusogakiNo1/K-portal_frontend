import { NewsCard } from "../pages/News";

export const categories = [
  { id: 0, name: "すべて", filter: () => true },
  {
    id: 1,
    name: "お知らせ",
  },
  {
    id: 2,
    name: "イベント",
  },
  {
    id: 3,
    name: "ニュース",
  },
  {
    id: 4,
    name: "その他",
  },
];

export const categoryLabels = {
  news: "ニュース",
  announcement: "お知らせ",
  event: "イベント",
  other: "その他",
};
