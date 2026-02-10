import React, {useState, useEffect} from 'react';
import Content from '@theme-original/Navbar/Content';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

const LOGIN_STORAGE_KEY = 'dms_login_status';

export default function NavbarContentWrapper(props: WrapperProps<typeof Content>): JSX.Element {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 檢查登入狀態
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem(LOGIN_STORAGE_KEY) === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    // 監聽 storage 變化（當其他標籤頁登入/登出時）
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    // 清除登入狀態
    localStorage.removeItem(LOGIN_STORAGE_KEY);
    // 導向登入頁
    window.location.href = '/login';
  };

  const isLoginPage = location.pathname === '/login';
  const shouldShowLogout = !isLoginPage && isLoggedIn;

  return (
    <>
      <Content {...props} />
      {shouldShowLogout && (
        <div className={styles.logoutButtonContainer}>
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
            title="登出"
            aria-label="登出"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={styles.logoutIcon}
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className={styles.logoutText}>登出</span>
          </button>
        </div>
      )}
    </>
  );
}

