import React, { type ReactNode, useEffect } from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type { WrapperProps } from '@docusaurus/types';
import { useLocation } from '@docusaurus/router';
import {
  checkPermission,
  getCurrentUserRole,
  LOGIN_STORAGE_KEY,
  getLatestMeetingRecordPath,
} from '@site/src/utils/auth';

type Props = WrapperProps<typeof LayoutType>;

// 公開路徑白名單（不需要登入即可訪問）
const PUBLIC_PATHS = [
  '/login',
  '/', // 首頁（如果需要公開）
  // 可以在這裡加入其他公開路徑，例如：
  // '/docs/public-doc',
];

// 需要登入的路徑前綴（以這些開頭的路徑都需要登入）
const PROTECTED_PATH_PREFIXES = [
  '/docs/', // 所有文檔頁面都需要登入
  '/protected/', // 受保護的頁面路徑
];

export default function LayoutWrapper(props: Props): ReactNode {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // 檢查是否在公開路徑白名單中
    if (PUBLIC_PATHS.includes(currentPath)) {
      return;
    }

    // 檢查是否是需要保護的路徑前綴
    const isProtectedPath = PROTECTED_PATH_PREFIXES.some((prefix) =>
      currentPath.startsWith(prefix)
    );

    // 如果不在公開路徑中，且是需要保護的路徑，則檢查登入狀態和權限
    if (isProtectedPath) {
      const isLoggedIn = localStorage.getItem(LOGIN_STORAGE_KEY) === 'true';
      if (!isLoggedIn) {
        // 儲存原本要訪問的路徑，登入後可以導向回來
        sessionStorage.setItem('redirectAfterLogin', currentPath);
        window.location.href = '/login';
        return;
      }

      // 檢查權限
      const userRole = getCurrentUserRole();
      if (!checkPermission(currentPath, userRole)) {
        // 沒有權限訪問此頁面，導向首頁或允許的頁面
        if (userRole === 'tailormed') {
          // tailormed 用戶導向到最新的會議記錄頁面
          window.location.href = getLatestMeetingRecordPath();
        } else {
          window.location.href = '/';
        }
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Layout {...props} />
    </>
  );
}
