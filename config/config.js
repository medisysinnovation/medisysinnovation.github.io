// import webpackPlugin from './plugin.config';
import { defineConfig } from 'dumi';

export default defineConfig({
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // ssr: {},
  // hash: true,
  title: 'Medisys Lab',
  mode: 'site',
  base: '/', // use it if deploy to sub site like /medisys
  publicPath: '/', // use it if deploy to sub site like /medisys
  // exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: true, // or 'css'
      },
    ],
  ],
  // locale: {
  //   // default zh-CN
  //   default: 'en-US',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: false,
  // },
  // mfsu: {},
  dynamicImport: {},
  locales: [
    ['en-US', 'English'],
    ['zh-CN', '中文'],
  ],
  menus: {
    '/guide': [
      {
        title: 'Introduction',
        children: [
          'guide/index',
          'guide/getting-started',
          'guide/authorization',
        ],
      },
      // {
      //   title: 'Authorization',
      //   children: ['authorization/index'],
      // },

      // {
      //   title: "Control and generate",
      //   children: [
      //     "guide/control-route-generate",
      //     "guide/control-menu-generate",
      //     "guide/control-nav-generate",
      //   ],
      // },
      // {
      //   title: "More usage",
      //   children: ["guide/mode", "guide/multi-language", "guide/seo"],
      // },
      // {
      //   title: "Others",
      //   children: ["guide/migration", "guide/faq"],
      // },
    ],
    '/component': [
      {
        title: 'General',
        children: [
          'component/button',
          'component/job-status-tag',
          'component/form',
          'component/data-source',
          'component/modal',
          'component/firebase',
        ],
      },
    ],
  },
  navs: {
    'en-US': [
      null,
      {
        title: 'GitHub',
        path:
          'https://github.com/medisysinnovation/medisysinnovation.github.io',
      },
      // { title: 'Changelog', path: 'https://github.com/medisysinnovation/medisysinnovation.github.io/releases' },
    ],
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path:
          'https://github.com/medisysinnovation/medisysinnovation.github.io',
      },
      // { title: '更新日志', path: 'https://github.com/medisysinnovation/medisysinnovation.github.io/releases' },
    ],
  },

  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: "css",
      },
    ],
  ],
  // scripts: ["https://v1.cnzz.com/z_stat.php?id=1278653578&web_id=1278653578"],
  // analytics: {
  //   ga: "UA-128069695-2",
  // },
  // styles: [`body { color: red; }`],
  // exportStatic: {},
  // chainWebpack: webpackPlugin,
  // more config: https://d.umijs.org/config
});
