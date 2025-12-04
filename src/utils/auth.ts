/**
 * 認證與權限管理工具
 */

export const LOGIN_STORAGE_KEY = 'dms_login_status';
export const USER_ROLE_STORAGE_KEY = 'dms_user_role';

// 帳號配置
export const ACCOUNTS = {
  admin: {
    username: 'abcdefgh',
    password: '12345678',
    role: 'admin',
    permissions: ['all'], // 完整權限
  },
  aries: {
    username: 'aries',
    password: '805149',
    role: 'admin',
    permissions: ['all'], // 完整權限
  },
  tailormed: {
    username: 'tailormed',
    password: '93585598',
    role: 'tailormed',
    permissions: ['tailormed/website'], // 只能看到 TailorMed/Website
  },
} as const;

export type UserRole = 'admin' | 'tailormed';

// 權限檢查
export function checkPermission(path: string, role: UserRole | null): boolean {
  if (!role) return false;

  const account = Object.values(ACCOUNTS).find(acc => acc.role === role);
  if (!account) return false;

  // admin 有完整權限
  if (account.permissions.includes('all')) {
    return true;
  }

  // tailormed 只能看到 TailorMed/Website/2026/網站改版/WF說明/ 下的內容
  if (role === 'tailormed') {
    // 只允許首頁，不允許 intro（DGHM 文件管理系統）
    if (path === '/') {
      return true;
    }
    
    // 不允許訪問 intro
    if (path.includes('intro')) {
      return false;
    }
    
    // 只允許訪問 TailorMed/Website/2026/網站改版/WF說明/ 下的路徑
    const pathLower = path.toLowerCase();
    
    // 必需的路徑段
    const requiredPathSegments = [
      'tailormed',
      'website',
      '2026',
      '網站改版',
      'wf說明'
    ];
    
    // 檢查路徑是否包含所有必需的段落
    const hasAllSegments = requiredPathSegments.every(segment => {
      return pathLower.includes(segment.toLowerCase());
    });
    
    return hasAllSegments;
  }

  return false;
}

// 驗證登入
export function validateLogin(username: string, password: string): UserRole | null {
  const account = Object.values(ACCOUNTS).find(
    acc => acc.username === username && acc.password === password
  );
  return account ? account.role : null;
}

// 取得當前使用者角色
export function getCurrentUserRole(): UserRole | null {
  if (typeof window === 'undefined') return null;
  const role = localStorage.getItem(USER_ROLE_STORAGE_KEY);
  return role as UserRole | null;
}

// 檢查是否已登入
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(LOGIN_STORAGE_KEY) === 'true';
}

