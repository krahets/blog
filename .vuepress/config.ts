import { viteBundler } from "@vuepress/bundler-vite";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { defineUserConfig } from "vuepress";
import { gungnirTheme, i18n } from "vuepress-theme-gungnir";
import { navbar, sidebar } from "./configs";

const isProd = process.env.NODE_ENV === "production";

export default defineUserConfig({
  base: "/",

  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: `/img/logo/favicon-16x16.png`
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: `/img/logo/favicon-32x32.png`
      }
    ],
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["meta", { name: "application-name", content: "Krahets Blog" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Krahets Blog" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    ["link", { rel: "apple-touch-icon", href: `/img/logo/apple-touch-icon.png` }],
    ["meta", { name: "theme-color", content: "#1e2124" }],
    ["meta", { name: "msapplication-TileColor", content: "#1e2124" }]
  ],

  // site-level locales config
  locales: {
    "/": {
      lang: "en-US",
      title: "Krahets Blog",
      description: "Krahets Blog"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Krahets Blog",
      description: "Krahets Blog"
    }
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === "webpack" ? webpackBundler() : viteBundler(),

  // configure default theme
  theme: gungnirTheme({
    repo: "krahets/github.krahets.io",
    // docsDir: "docs",

    hitokoto: "https://v1.hitokoto.cn?c=i", // enable hitokoto (一言) or not?

    // personal information
    personalInfo: {
      name: "Krahets",
      avatar: "/img/avatar.png",
      description: "from light comes darkness, from darkness be light",
      sns: {
        github: {
          icon: "bi-github",
          link: "https://github.com/krahets"
        },
        leetcode: {
          icon: "co-code",
          link: "https://leetcode.cn/u/jyd/"
        },
        // linkedin: "xiaohan-zou-55bba0160",
        // facebook: "renovamen.zou",
        // twitter: "renovamen_zxh",
        // zhihu: "chao-neng-gui-su",
        email: "krahets@163.com"
      }
    },

    // header images on home page
    homeHeaderImages: [
      {
        path: "/img/home-bg/1.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
      {
        path: "/img/home-bg/2.jpg",
        mask: "rgba(40, 57, 101, .4)"
      },
    ],

    // other pages
    pages: {
      tags: {
        subtitle: "Black Sheep Wall",
        bgImage: {
          path: "/img/pages/tags.jpg",
          mask: "rgba(211, 136, 37, .5)"
        }
      },
      links: {
        subtitle:
          "When you are looking at the stars, please put the brightest star shining night sky as my soul.",
        bgImage: {
          path: "/img/pages/links.jpg",
          mask: "rgba(64, 118, 190, 0.5)"
        }
      }
    },

    // theme-level locales config
    locales: {
      /**
       * English locale config
       * As the default locale is English, we don't need to set all of the locale fields
       */
      "/": {
        // navbar
        navbar: navbar.en,
        // sidebar
        sidebar: sidebar.en
      },

      /**
       * Chinese locale config
       */
      "/zh/": {
        // navbar
        navbar: navbar.zh,
        // sidebar
        sidebar: sidebar.zh,
        // i18n
        ...i18n.zh
      }
    },

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
      katex: true,
      mermaid: true,
      chartjs: true,
      giscus: {
        repo: "krahets/krahets-giscus",
        repoId: "R_kgDOHvc1AA",
        category: "Announcements",
        categoryId: "DIC_kwDOHvc1AM4CQhf-",
        lazyLoad: true
      },
      mdPlus: {
        all: true
      },
      // ga: "G-EE8M2S3MPB",
      // ba: "10b7bc420625758a319d6b23aed4700f",
      rss: {
        siteURL: "https://krahets.gihub.io",
        copyright: "Krahets 2020-2022"
      },
      pwa: true,
      readingTime: {
        wordsPerMinuteCN: 100,
        wordsPerMinuteEN: 50,
        excludeCodeBlock: true, 
        excludeTexBlock: true
      }
    },

    footer: `
      All the articles are licensed under a <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
      target="_blank">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>
      <br>
      &copy; <a href="https://github.com/krahets" target="_blank">Krahets</a> 2020-2022
    `
  }),

  markdown: {
    extractHeaders: {
      level: [2, 3]
    }
  },

  plugins: [
  ]
});
