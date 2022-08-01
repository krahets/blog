import type { NavbarConfig } from "vuepress-theme-gungnir";
import { version } from "../meta";

export const en: NavbarConfig = [
  {
    text: "Home",
    link: "/",
    icon: "fa-fort-awesome"
  },
  {
    text: "Tags",
    link: "/tags/",
    icon: "fa-tag"
  },
  {
    text: "Links",
    link: "/links/",
    icon: "fa-satellite-dish"
  }
];
