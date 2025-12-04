/**
 * Navbar 登出按鈕客戶端模組
 * 動態在 Navbar 右側添加登出按鈕
 */

const LOGIN_STORAGE_KEY = 'dms_login_status';
const USER_ROLE_STORAGE_KEY = 'dms_user_role';

// 只在瀏覽器環境中執行
if (typeof window !== 'undefined') {
  function createLogoutButton() {
    const isLoggedIn = localStorage.getItem(LOGIN_STORAGE_KEY) === 'true';
    const isLoginPage = window.location.pathname === '/login';

    if (isLoginPage || !isLoggedIn) {
      return null;
    }

    const button = document.createElement('button');
    button.setAttribute('data-logout-button', 'true');
    button.setAttribute('title', '登出');
    button.setAttribute('aria-label', '登出');
    button.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid var(--ifm-color-emphasis-300);
      border-radius: 6px;
      color: var(--ifm-navbar-link-color);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      margin-left: 0.75rem;
      white-space: nowrap;
      transition: all 0.2s;
      font-family: inherit;
    `;

    // SVG 圖示
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path1.setAttribute('d', 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4');
    
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '16 17 21 12 16 7');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '21');
    line.setAttribute('y1', '12');
    line.setAttribute('x2', '9');
    line.setAttribute('y2', '12');
    
    svg.appendChild(path1);
    svg.appendChild(polyline);
    svg.appendChild(line);

    // 文字
    const span = document.createElement('span');
    span.textContent = '登出';

    button.appendChild(svg);
    button.appendChild(span);

    // 滑鼠懸停效果
    button.addEventListener('mouseenter', () => {
      button.style.background = 'var(--ifm-color-emphasis-200)';
      button.style.borderColor = 'var(--ifm-color-emphasis-400)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.background = 'transparent';
      button.style.borderColor = 'var(--ifm-color-emphasis-300)';
    });

    // 點擊事件
    button.addEventListener('click', () => {
      localStorage.removeItem(LOGIN_STORAGE_KEY);
      localStorage.removeItem(USER_ROLE_STORAGE_KEY);
      window.location.href = '/login';
    });

    return button;
  }

  function addLogoutButton() {
    // 尋找 Navbar 右側的容器
    const navbarRight = document.querySelector('.navbar__items--right');
    if (!navbarRight) {
      return false;
    }

    // 檢查是否已經有登出按鈕
    if (navbarRight.querySelector('[data-logout-button]')) {
      return true;
    }

    const button = createLogoutButton();
    if (button) {
      navbarRight.appendChild(button);
      return true;
    }

    return false;
  }

  // 頁面載入時執行
  function init() {
    // 延遲執行以確保 DOM 已載入
    setTimeout(() => {
      addLogoutButton();
    }, 500);

    // 監聽 DOM 變化（Docusaurus 可能會動態更新 Navbar）
    const observer = new MutationObserver(() => {
      addLogoutButton();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 監聽路由變化
    let lastPath = window.location.pathname;
    const checkRouteChange = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;
        // 移除舊按鈕並重新添加
        const oldButton = document.querySelector('[data-logout-button]');
        if (oldButton) {
          oldButton.remove();
        }
        setTimeout(addLogoutButton, 300);
      }
    };

    // 監聽 popstate 事件
    window.addEventListener('popstate', checkRouteChange);

    // 攔截 pushState 和 replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      setTimeout(checkRouteChange, 100);
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      setTimeout(checkRouteChange, 100);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

