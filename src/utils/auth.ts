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
    permissions: ['tailormed'], // 可看 TailorMed 全部，Billing Info 例外
  },
} as const;

export type UserRole = 'admin' | 'tailormed';

// 權限檢查
export function checkPermission(path: string, role: UserRole | null): boolean {
  if (!role) return false;

  const account = Object.values(ACCOUNTS).find((acc) => acc.role === role);
  if (!account) return false;

  // admin 有完整權限
  if (account.permissions.includes('all')) {
    return true;
  }

  // tailormed 可看 TailorMed 全部內容，但不可訪問 Billing Info
  if (role === 'tailormed') {
    // 允許首頁
    if (path === '/') {
      return true;
    }

    // 不允許訪問 intro
    if (path.includes('intro')) {
      return false;
    }

    const pathLower = path.toLowerCase();
    const decodedPath = decodeURIComponent(pathLower);

    // 明確禁止訪問 Billing Info（含編碼與空白變形）
    if (
      (pathLower.includes('billing') || decodedPath.includes('billing')) &&
      (
        pathLower.includes('info') ||
        decodedPath.includes('info') ||
        pathLower.includes('billing%20info') ||
        decodedPath.includes('billing info')
      )
    ) {
      return false;
    }

    // 允許訪問 TailorMed 底下所有內容
    return pathLower.includes('tailormed') || decodedPath.includes('tailormed');
  }

  return false;
}

// 驗證登入
export function validateLogin(
  username: string,
  password: string
): UserRole | null {
  const account = Object.values(ACCOUNTS).find(
    (acc) => acc.username === username && acc.password === password
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

// 會議記錄列表（按日期排序，最新的在前）
// 當有新的會議記錄時，請在此列表的最前面添加
const MEETING_RECORDS = [
  'MM-260109', // 2026-01-09
  'MM-260108', // 2026-01-08
  'MM-260103', // 2026-01-03
] as const;

// 取得最新的會議記錄路徑
export function getLatestMeetingRecordPath(): string {
  if (MEETING_RECORDS.length === 0) {
    // 如果沒有會議記錄，返回會議記錄目錄
    return '/docs/TailorMed/會議記錄';
  }
  // 返回最新的會議記錄路徑
  return `/docs/TailorMed/會議記錄/${MEETING_RECORDS[0]}`;
}
