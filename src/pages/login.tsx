import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  validateLogin,
  LOGIN_STORAGE_KEY,
  USER_ROLE_STORAGE_KEY,
  getLatestMeetingRecordPath,
} from '@site/src/utils/auth';
import styles from './login.module.css';

export default function Login(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 檢查是否已登入，如果已登入則導向首頁
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(LOGIN_STORAGE_KEY) === 'true';
    if (isLoggedIn) {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 簡單的延遲以模擬登入過程
    setTimeout(() => {
      const role = validateLogin(username, password);

      if (role) {
        // 登入成功，儲存狀態和角色
        localStorage.setItem(LOGIN_STORAGE_KEY, 'true');
        localStorage.setItem(USER_ROLE_STORAGE_KEY, role);

        // 檢查是否有原本要訪問的路徑
        const redirectPath = sessionStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          sessionStorage.removeItem('redirectAfterLogin');
          window.location.href = redirectPath;
        } else {
          // 根據角色導向不同頁面
          if (role === 'tailormed') {
            // tailormed 用戶導向到最新的會議記錄頁面
            window.location.href = getLatestMeetingRecordPath();
          } else {
            window.location.href = '/';
          }
        }
      } else {
        setError('使用者名稱或密碼錯誤');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <Layout title="登入" description="DMS 登入頁面">
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>{siteConfig.title}</h1>
            <p className={styles.loginSubtitle}>請登入以繼續</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.label}>
                使用者名稱
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                placeholder="請輸入使用者名稱"
                required
                autoFocus
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                密碼
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="請輸入密碼"
                required
              />
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? '登入中...' : '登入'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
