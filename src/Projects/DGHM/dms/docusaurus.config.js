import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config = {
  title: 'DGHM Documents Center',
  tagline: 'DGHM 專案文檔中心',
  favicon: 'img/dghm-logo.webp', // DGHM Logo

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // 自訂域名：dms.dghm.tw
  url: 'https://dms.dghm.tw',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tailormed', // Usually your GitHub org/user name.
  projectName: 'tm-docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Markdown 配置
  markdown: {
    mermaid: true,
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  // 國際化設定（i18n）- 支援繁體中文和英文
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    localeConfigs: {
      'zh-TW': {
        label: '繁體中文',
        direction: 'ltr',
        htmlLang: 'zh-TW',
        calendar: 'gregory',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  // 客戶端模組 - 用於動態修改 mermaid 顏色和過濾 sidebar
  // 注意：登出按鈕已通過 Navbar/Content wrapper 實現，不需要客戶端模組
  clientModules: [
    './src/clientModules/mermaid-theme.ts',
    './src/clientModules/sidebar-filter.tsx',
  ],

  // 本地搜尋主題配置（必須放在 themes 中，不是 plugins）
  themes: [
    [
      '@docusaurus/theme-mermaid',
      {
        mermaid: {
          theme: { light: 'default', dark: 'dark' },
        },
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // 是否啟用雜湊檔名
        hashed: true,
        // 語言設定（支援中文和英文）
        language: ['en', 'zh'],
        // 索引設定
        indexDocs: true, // 索引文檔
        indexBlog: false, // 不索引部落格
        indexPages: true, // 索引頁面
        // 文檔路徑
        docsRouteBasePath: '/docs',
        // 在目標頁面高亮搜尋關鍵字
        highlightSearchTermsOnTargetPage: true,
        // 明確的搜尋結果路徑
        explicitSearchResultPath: true,
        // 在開發模式下也建立索引（需要先執行一次 build）
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  themeConfig: {
    // Open Graph 圖片（用於社交媒體分享，如 Line、Facebook 等）
    // 建議尺寸：1200x630 像素
    // 圖片應放在 static/img/ 目錄下
    image: 'img/dghm-og-image.jpg', // 自訂 OG 圖片
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '文件管理系統(DMS)',
      logo: {
        alt: 'DGHM Logo',
        src: 'img/dghm-logo.webp', // DGHM Logo
        width: 40, // 可選：設定寬度（像素）
        height: 40, // 可選：設定高度（像素）
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '文件',
        },
        // 翻譯連結已隱藏
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        // 搜尋框會自動出現在導航列右側
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} DGHM.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
