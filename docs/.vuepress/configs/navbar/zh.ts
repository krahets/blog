import type { NavbarConfig } from "vuepress-theme-gungnir";
import { version } from "../meta";

export const zh: NavbarConfig = [
  {
    text: "首页",
    link: "/",
    icon: "fa-fort-awesome"
  },
  {
    text: "标签",
    link: "/tags/",
    icon: "fa-tag"
  },
  {
    text: "链接",
    link: "/links/",
    icon: "fa-satellite-dish"
  }
];
