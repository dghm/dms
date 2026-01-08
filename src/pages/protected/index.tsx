import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function ProtectedPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="受保護的頁面" description="這是一個需要登入才能訪問的頁面">
      <div className={styles.container}>
        <div className={styles.content}>
          <Heading as="h1" className={styles.title}>
            🔒 受保護的頁面
          </Heading>
          <p className={styles.description}>
            這是一個需要登入才能訪問的頁面範例。
          </p>
          <div className={styles.infoBox}>
            <h2>如何建立受保護的頁面？</h2>
            <ol>
              <li>在 <code>src/pages/protected/</code> 目錄下建立頁面</li>
              <li>或在 <code>docs/</code> 目錄下的文檔會自動受到保護</li>
              <li>路徑以 <code>/protected/</code> 或 <code>/docs/</code> 開頭的頁面都需要登入</li>
            </ol>
          </div>
          <div className={styles.infoBox}>
            <h2>目前的保護機制</h2>
            <ul>
              <li>✅ 所有 <code>/docs/*</code> 路徑需要登入</li>
              <li>✅ 所有 <code>/protected/*</code> 路徑需要登入</li>
              <li>✅ 登入頁 <code>/login</code> 公開訪問</li>
              <li>✅ 首頁 <code>/</code> 公開訪問（可在配置中修改）</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}



















