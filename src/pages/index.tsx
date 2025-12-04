import type { ReactNode } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SearchBar from '@theme/SearchBar';
import MainCards from '@site/src/components/MainCards';

import styles from './index.module.css';

// 快速導航單元定義
const quickNavSections = [
  {
    title: '關於我們',
    description: '了解公司資訊、差異化優勢與常見問題',
    link: '/docs/Website/2025/About us/about',
    icon: '📋',
    items: [
      { label: '關於我們', link: '/docs/Website/2025/About us/about' },
      { label: '我們的優勢', link: '/docs/Website/2025/About us/difference' },
      { label: '常見問題', link: '/docs/Website/2025/About us/faq' },
    ],
  },
  {
    title: '解決方案',
    description: '探索我們的專業服務與解決方案',
    link: '/docs/Website/2025/Solutions/Bio-Samples',
    icon: '💡',
    items: [
      { label: '生物樣本', link: '/docs/Website/2025/Solutions/Bio-Samples' },
      {
        label: '細胞與基因治療',
        link: '/docs/Website/2025/Solutions/Cell & Gene Therapy',
      },
      {
        label: '臨床試驗',
        link: '/docs/Website/2025/Solutions/Clinical Trial',
      },
      {
        label: '倉儲與配送',
        link: '/docs/Website/2025/Solutions/Depot & Distribution',
      },
      {
        label: '體外受精',
        link: '/docs/Website/2025/Solutions/In Vitro Fertilization',
      },
      { label: '製藥', link: '/docs/Website/2025/Solutions/Pharmaceuticals' },
      { label: '疫苗', link: '/docs/Website/2025/Solutions/Vaccine' },
    ],
  },
  {
    title: '參考資料',
    description: '查看詞彙表、組織結構與服務概覽',
    link: '/docs/Website/2025/參考/overview',
    icon: '📚',
    items: [
      { label: '概覽', link: '/docs/Website/2025/參考/overview' },
      { label: '服務', link: '/docs/Website/2025/參考/services' },
      { label: '組織結構', link: '/docs/Website/2025/參考/org-structure' },
      { label: '詞彙表', link: '/docs/Website/2025/參考/glossary' },
    ],
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  // 在首頁添加 class 來隱藏 navbar 的搜尋欄
  useEffect(() => {
    document.body.classList.add('homepage');
    document.body.setAttribute('data-path', '/');

    return () => {
      document.body.classList.remove('homepage');
      document.body.removeAttribute('data-path');
    };
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.searchContainer}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

function QuickNavCard({ section }: { section: (typeof quickNavSections)[0] }) {
  return (
    <div className={styles.quickNavCard}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{section.icon}</span>
        <Heading as="h3" className={styles.cardTitle}>
          {section.title}
        </Heading>
      </div>
      <p className={styles.cardDescription}>{section.description}</p>
      <div className={styles.cardLinks}>
        {section.items.map((item, idx) => (
          <Link key={idx} className={styles.cardLink} to={item.link}>
            {item.label}
          </Link>
        ))}
      </div>
      <Link className="button button--primary button--sm" to={section.link}>
        查看全部 →
      </Link>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      {/* 三張卡片組件 */}
      <MainCards />
      {/* 快速導航區塊已隱藏 */}
      {/* <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.quickNavSection}>
            <Heading as="h2" className={styles.sectionTitle}>
              快速導航
            </Heading>
            <p className={styles.sectionSubtitle}>
              選擇您想要查看的文檔單元
            </p>
            <div className={styles.quickNavGrid}>
              {quickNavSections.map((section, idx) => (
                <QuickNavCard key={idx} section={section} />
              ))}
            </div>
          </div>
        </div>
      </main> */}
    </Layout>
  );
}
