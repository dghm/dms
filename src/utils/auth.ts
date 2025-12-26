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
    permissions: [
      'tailormed/website',
      'tailormed/airtable/data',
      'tailormed/airtable/interface',
    ], // 可以看到 TailorMed/Website、TailorMed/Airtable/Data 和 TailorMed/Airtable/Interface，但不能看到 Billing Info
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

  // tailormed 只能看到以下路徑的內容：
  // 1. TailorMed/Website/2026/供應商稽核數位化方案/
  // 2. TailorMed/Airtable/Data/
  // 3. TailorMed/Airtable/Interface/CRM/
  // 4. TailorMed/Airtable/Interface/FIN/SoA/
  // 注意：tailormed 不能訪問 TailorMed/Airtable/Billing Info/
  if (role === 'tailormed') {
    // 只允許首頁，不允許 intro（DGHM 文件管理系統）
    if (path === '/') {
      return true;
    }

    // 不允許訪問 intro
    if (path.includes('intro')) {
      return false;
    }

    const pathLower = path.toLowerCase();
    const decodedPath = decodeURIComponent(pathLower);

    // 明確禁止訪問 Billing Info
    if (
      pathLower.includes('billing') &&
      (pathLower.includes('info') || decodedPath.includes('billing info'))
    ) {
      return false;
    }

    // 檢查路徑 1: TailorMed/Website/2026/供應商稽核數位化方案/
    const websitePathSegments = [
      'tailormed',
      'website',
      '2026',
      '供應商稽核數位化方案',
    ];

    const hasWebsitePath = websitePathSegments.every((segment) => {
      const segmentLower = segment.toLowerCase();
      return (
        pathLower.includes(segmentLower) ||
        pathLower.includes(segmentLower.replace(' ', '')) ||
        decodedPath.includes(segmentLower)
      );
    });

    if (hasWebsitePath) {
      return true;
    }

    // 檢查路徑 2: TailorMed/Airtable/Data/
    const airtableDataPathSegments = ['tailormed', 'airtable', 'data'];

    const hasAirtableDataPath = airtableDataPathSegments.every((segment) => {
      const segmentLower = segment.toLowerCase();
      return (
        pathLower.includes(segmentLower) || decodedPath.includes(segmentLower)
      );
    });

    if (hasAirtableDataPath) {
      return true;
    }

    // 檢查路徑 3: TailorMed/Airtable/Interface/CRM/
    const airtableInterfaceCrmPathSegments = [
      'tailormed',
      'airtable',
      'interface',
      'crm',
    ];

    const hasAirtableInterfaceCrmPath = airtableInterfaceCrmPathSegments.every(
      (segment) => {
        const segmentLower = segment.toLowerCase();
        return (
          pathLower.includes(segmentLower) || decodedPath.includes(segmentLower)
        );
      }
    );

    if (hasAirtableInterfaceCrmPath) {
      return true;
    }

    // 檢查路徑 4: TailorMed/Airtable/Interface/FIN/SoA/
    const airtableInterfaceFinSoaPathSegments = [
      'tailormed',
      'airtable',
      'interface',
      'fin',
      'soa',
    ];

    const hasAirtableInterfaceFinSoaPath =
      airtableInterfaceFinSoaPathSegments.every((segment) => {
        const segmentLower = segment.toLowerCase();
        return (
          pathLower.includes(segmentLower) || decodedPath.includes(segmentLower)
        );
      });

    return hasAirtableInterfaceFinSoaPath;
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
