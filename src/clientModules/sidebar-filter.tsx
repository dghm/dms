/**
 * Sidebar 內容過濾客戶端模組
 * 根據使用者權限隱藏不符合權限的 sidebar 項目
 */

import { getCurrentUserRole, checkPermission } from '@site/src/utils/auth';

// 只在瀏覽器環境中執行
if (typeof window !== 'undefined') {
  function filterSidebarItems() {
    const userRole = getCurrentUserRole();

    // admin 可以看到所有內容，不需要過濾
    if (userRole === 'admin') {
      return;
    }

    // tailormed 只能看到以下路徑的內容：
    // 1. TailorMed/Website/2026/供應商稽核數位化方案/
    // 2. TailorMed/Airtable/Data/
    // 3. TailorMed/Airtable/Interface/CRM/
    // 4. TailorMed/Airtable/Interface/FIN/SoA/
    // 5. TailorMed/Airtable/Change-Log/
    // 注意：tailormed 不能看到 TailorMed/Airtable/Billing Info/
    if (userRole === 'tailormed') {
      console.log(
        '🔍 TailorMed 用戶登入，開始過濾 sidebar（顯示供應商稽核數位化方案、Airtable/Data、Airtable/Interface/CRM、Airtable/Interface/FIN/SoA 和 Airtable/Change-Log 目錄，不顯示 Billing Info）'
      );

      // 檢查 sidebar 是否存在
      const sidebar = document.querySelector('.theme-doc-sidebar-container');
      if (!sidebar) {
        console.log('⚠️ Sidebar 尚未載入');
        return;
      }

      console.log('✅ Sidebar 已找到');

      // 檢查路徑是否匹配允許的模式
      // 允許以下路徑：
      // 1. TailorMed/Website/2026/供應商稽核數位化方案/
      // 2. TailorMed/Airtable/Data/
      // 3. TailorMed/Airtable/Interface/CRM/
      // 4. TailorMed/Airtable/Interface/FIN/SoA/
      // 5. TailorMed/Airtable/Change-Log/
      // 注意：不允許 TailorMed/Airtable/Billing Info/
      function isPathAllowed(path: string): boolean {
        if (!path) return false;

        const pathLower = path.toLowerCase();
        const decodedPath = decodeURIComponent(pathLower);

        // tailormed 用戶不允許訪問 intro（DGHM 文件管理系統）
        // 只允許首頁
        if (path === '/') {
          return true;
        }

        // 不允許 intro 路徑
        if (path.includes('intro')) {
          return false;
        }

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

        const hasAirtableDataPath = airtableDataPathSegments.every(
          (segment) => {
            const segmentLower = segment.toLowerCase();
            return (
              pathLower.includes(segmentLower) ||
              decodedPath.includes(segmentLower)
            );
          }
        );

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

        const hasAirtableInterfaceCrmPath =
          airtableInterfaceCrmPathSegments.every((segment) => {
            const segmentLower = segment.toLowerCase();
            return (
              pathLower.includes(segmentLower) ||
              decodedPath.includes(segmentLower)
            );
          });

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
              pathLower.includes(segmentLower) ||
              decodedPath.includes(segmentLower)
            );
          });

        if (hasAirtableInterfaceFinSoaPath) {
          return true;
        }

        // 檢查路徑 5: TailorMed/Airtable/Change-Log/
        const airtableChangeLogPathSegments = [
          'tailormed',
          'airtable',
          'change-log',
        ];

        const hasAirtableChangeLogPath = airtableChangeLogPathSegments.every(
          (segment) => {
            const segmentLower = segment.toLowerCase();
            return (
              pathLower.includes(segmentLower) ||
              decodedPath.includes(segmentLower)
            );
          }
        );

        return hasAirtableChangeLogPath;
      }

      // 檢查文字是否屬於允許的分類
      // 允許 TailorMed、Website、2026、供應商稽核數位化方案、Airtable、Data、Interface、CRM、FIN、SoA、Change-Log 相關的分類
      // 注意：不允許 Billing Info
      function isCategoryAllowed(text: string): boolean {
        if (!text) return false;
        const textLower = text.toLowerCase();

        // 明確排除 Billing Info
        if (textLower.includes('billing') && textLower.includes('info')) {
          return false;
        }

        return (
          textLower.includes('tailormed') ||
          textLower.includes('website') ||
          textLower === '2026' ||
          textLower.includes('供應商稽核數位化方案') ||
          textLower.includes('airtable') ||
          textLower === 'data' ||
          textLower === 'interface' ||
          textLower === 'crm' ||
          textLower === 'fin' ||
          textLower === 'soa' ||
          textLower.includes('change-log') ||
          textLower.includes('changelog') ||
          textLower.includes('變更記錄') ||
          textLower.includes('介面設計總覽') ||
          textLower.includes('業務主管介面') ||
          textLower.includes('使用者角色') ||
          textLower.includes('dashboard') ||
          textLower.includes('區塊') ||
          textLower.includes('kpi') ||
          textLower.includes('風險') ||
          textLower.includes('警示') ||
          textLower.includes('介入') ||
          textLower.includes('主管') ||
          textLower.includes('在看') ||
          textLower.includes('overview') ||
          textLower.includes('sales-director') ||
          textLower.includes('user') ||
          textLower.includes('role') ||
          textLower.includes('基礎介紹') ||
          textLower.includes('interface') ||
          textLower.includes('元件說明') ||
          textLower.includes('資料結構') ||
          textLower.includes('automation') ||
          textLower.includes('設計說明')
        );
      }

      // 檢查特定分類下的子項目是否應該被允許
      // 這確保了只顯示正確的路徑層級
      function isSubCategoryAllowed(
        parentText: string,
        childText: string
      ): boolean {
        if (!parentText || !childText) return false;
        const parentLower = parentText.toLowerCase();
        const childLower = childText.toLowerCase();

        // TailorMed 下允許 Website 和 Airtable
        if (parentLower.includes('tailormed')) {
          return (
            childLower.includes('website') || childLower.includes('airtable')
          );
        }

        // Website 下只允許 2026
        if (parentLower.includes('website')) {
          return childLower === '2026';
        }

        // Airtable 下允許 Data、Interface 和 Change-Log，不允許 Billing Info
        if (parentLower.includes('airtable')) {
          return (
            childLower === 'data' ||
            childLower === 'interface' ||
            childLower.includes('change-log') ||
            childLower.includes('changelog') ||
            childLower.includes('變更記錄')
          );
        }

        // Interface 下允許 CRM 和 FIN
        if (parentLower.includes('interface')) {
          return childLower === 'crm' || childLower === 'fin';
        }

        // CRM 下允許所有子分類：介面設計總覽、業務主管介面、使用者角色
        if (parentLower === 'crm') {
          return (
            childLower.includes('介面設計總覽') ||
            childLower.includes('業務主管介面') ||
            childLower.includes('使用者角色') ||
            childLower.includes('overview') ||
            childLower.includes('sales-director') ||
            childLower.includes('user') ||
            childLower.includes('role')
          );
        }

        // FIN 下只允許 SoA
        if (parentLower === 'fin') {
          return childLower === 'soa';
        }

        // SoA 下允許所有子分類：基礎介紹、Interface 說明、資料結構說明、Automation 設計說明等
        if (parentLower === 'soa') {
          return (
            childLower.includes('基礎介紹') ||
            childLower.includes('intro') ||
            childLower.includes('interface') ||
            childLower.includes('元件說明') ||
            childLower.includes('資料結構') ||
            childLower.includes('automation') ||
            childLower.includes('設計說明')
          );
        }

        // 業務主管介面下允許所有子分類：Dashboard 區塊說明等
        if (
          parentLower.includes('業務主管介面') ||
          parentLower.includes('sales-director')
        ) {
          return (
            childLower.includes('dashboard') ||
            childLower.includes('區塊') ||
            childLower.includes('kpi') ||
            childLower.includes('風險') ||
            childLower.includes('警示') ||
            childLower.includes('介入') ||
            childLower.includes('主管') ||
            childLower.includes('在看')
          );
        }

        // 2026 下只允許"供應商稽核數位化方案"
        if (parentLower === '2026') {
          return childLower.includes('供應商稽核數位化方案');
        }

        // 其他情況使用預設檢查
        return isCategoryAllowed(childText);
      }

      // 先找出所有 sidebar 連結
      const allLinks = document.querySelectorAll(
        '.theme-doc-sidebar-container a.menu__link'
      );
      console.log(`📋 找到 ${allLinks.length} 個 sidebar 連結`);

      const allowedLinks = new Set<HTMLElement>();
      const allLinksInfo: Array<{
        text: string;
        href: string;
        fullPath: string;
      }> = [];

      allLinks.forEach((link) => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim() || '';

        if (!href || href === '#') {
          console.log('🔗 分類標題:', text, '(無 href)');
          // 對於分類標題，檢查其子項目是否符合權限
          const listItem = link.closest('li.menu__list-item');
          if (listItem) {
            // 檢查直接子項目（第一層）
            const directSubItems = listItem.querySelectorAll(
              ':scope > ul > li.menu__list-item'
            );
            let hasAllowedDirectSubItem = false;

            directSubItems.forEach((subItem) => {
              const subLink = subItem.querySelector('a.menu__link');
              const subHref = subLink?.getAttribute('href');
              const subText = subLink?.textContent?.trim() || '';
              const subTextLower = subText.toLowerCase();

              // 明確排除 Billing Info
              if (
                subTextLower.includes('billing') &&
                subTextLower.includes('info')
              ) {
                console.log('  🚫 排除 Billing Info 子項目:', subText);
                return;
              }

              // 檢查子分類是否應該被允許
              if (!subHref || subHref === '#') {
                // 這是子分類標題，使用 isSubCategoryAllowed 檢查
                if (isSubCategoryAllowed(text, subText)) {
                  hasAllowedDirectSubItem = true;
                  console.log(
                    '  ✅ 允許子分類:',
                    subText,
                    '(父分類:',
                    text,
                    ')'
                  );
                } else {
                  console.log(
                    '  ❌ 拒絕子分類:',
                    subText,
                    '(父分類:',
                    text,
                    ')'
                  );
                }
              } else {
                // 這是實際的連結，檢查路徑
                const subFullPath = subHref.startsWith('/')
                  ? subHref
                  : `/${subHref}`;

                // 檢查路徑是否包含 billing info
                const pathLower = subFullPath.toLowerCase();
                const decodedPath = decodeURIComponent(pathLower);
                if (
                  pathLower.includes('billing') &&
                  (pathLower.includes('info') ||
                    decodedPath.includes('billing info'))
                ) {
                  console.log(
                    '  🚫 排除 Billing Info 路徑:',
                    subText,
                    '→',
                    subFullPath
                  );
                  return;
                }

                if (isPathAllowed(subFullPath)) {
                  hasAllowedDirectSubItem = true;
                  console.log('  ✅ 允許子項目:', subText, '→', subFullPath);
                }
              }
            });

            // 只有當有允許的直接子項目時，才允許這個分類
            if (hasAllowedDirectSubItem) {
              allowedLinks.add(link as HTMLElement);
              console.log('✅ 分類有允許的子項目，加入:', text);
            } else {
              console.log('❌ 分類沒有允許的子項目，跳過:', text);
            }
          }
          return;
        }

        const fullPath = href.startsWith('/') ? href : `/${href}`;

        // 明確排除 Billing Info
        const textLower = text.toLowerCase();
        const pathLower = fullPath.toLowerCase();
        const decodedPath = decodeURIComponent(pathLower);

        if (
          (textLower.includes('billing') && textLower.includes('info')) ||
          (pathLower.includes('billing') &&
            (pathLower.includes('info') ||
              decodedPath.includes('billing info')))
        ) {
          console.log('🚫 排除 Billing Info:', text, '→', fullPath);
          return;
        }

        allLinksInfo.push({ text, href, fullPath });

        if (isPathAllowed(fullPath)) {
          allowedLinks.add(link as HTMLElement);
          console.log('✅ 允許:', text, '→', fullPath);
        } else {
          console.log('❌ 拒絕:', text, '→', fullPath);
        }
      });

      console.log(
        '📊 允許的連結數量:',
        allowedLinks.size,
        '/',
        allLinks.length
      );
      console.log('📋 所有連結列表:', allLinksInfo);

      // 如果沒有找到任何符合權限的連結，暫時不隱藏任何項目（調試用）
      if (allowedLinks.size === 0) {
        console.warn(
          '⚠️ 沒有找到符合權限的連結！暫時顯示所有項目以避免 sidebar 消失'
        );
        // 暫時返回，不進行過濾
        return;
      }

      // 找出所有需要顯示的 list items（包括符合權限的項目及其所有父分類）
      const itemsToShow = new Set<HTMLElement>();

      // 遞迴函數：向上查找所有父分類
      function addParentItems(listItem: HTMLElement) {
        if (!listItem) return;

        itemsToShow.add(listItem);
        const itemText =
          listItem.querySelector('a.menu__link')?.textContent?.trim() || '';
        console.log('  ✓ 加入白名單:', itemText || '分類');

        // 向上查找父分類
        let current = listItem.parentElement;
        while (current && current !== document.body) {
          // 查找包含 menu__list-item 的父元素
          if (current.classList.contains('menu__list-item')) {
            itemsToShow.add(current as HTMLElement);
            const parentText =
              current.querySelector('a.menu__link')?.textContent?.trim() || '';
            console.log('  ✓ 加入父分類:', parentText || '父分類');
            addParentItems(current as HTMLElement); // 遞迴繼續向上
            break;
          }
          current = current.parentElement;
        }
      }

      allowedLinks.forEach((link) => {
        let listItem = link.closest('li.menu__list-item') as HTMLElement;
        const linkText = link.textContent?.trim();
        console.log(
          '🔗 處理允許的連結:',
          linkText,
          '→ 找到 listItem:',
          !!listItem
        );

        if (listItem) {
          addParentItems(listItem);
        }
      });

      // 對於沒有 href 的分類標題，檢查是否有符合權限的子項目
      const allListItems = document.querySelectorAll(
        '.theme-doc-sidebar-container li.menu__list-item'
      );

      // 遞迴檢查分類是否有符合權限的子項目
      function checkCategoryHasAllowedItems(
        listItem: Element,
        parentText?: string
      ): boolean {
        const link = listItem.querySelector('a.menu__link');
        const href = link?.getAttribute('href');
        const text = link?.textContent?.trim() || '';

        // 如果有 href 且不是 #，檢查是否符合權限
        if (href && href !== '#') {
          const fullPath = href.startsWith('/') ? href : `/${href}`;
          if (isPathAllowed(fullPath)) {
            console.log('  ✓ 分類包含允許的項目:', text, fullPath);
            return true;
          }
        }

        // 檢查直接子項目（第一層）
        const subItems = listItem.querySelectorAll(
          ':scope > ul > li.menu__list-item'
        );
        for (const subItem of Array.from(subItems)) {
          const subLink = subItem.querySelector('a.menu__link');
          const subHref = subLink?.getAttribute('href');
          const subText = subLink?.textContent?.trim() || '';

          // 如果是子分類標題，使用 isSubCategoryAllowed 檢查
          if ((!subHref || subHref === '#') && parentText) {
            if (isSubCategoryAllowed(parentText, subText)) {
              // 繼續檢查這個子分類的子項目
              if (checkCategoryHasAllowedItems(subItem, subText)) {
                return true;
              }
            }
          } else if (subHref && subHref !== '#') {
            // 如果是實際連結，檢查路徑
            const subFullPath = subHref.startsWith('/')
              ? subHref
              : `/${subHref}`;
            if (isPathAllowed(subFullPath)) {
              return true;
            }
          } else {
            // 遞迴檢查子項目
            if (checkCategoryHasAllowedItems(subItem, text)) {
              return true;
            }
          }
        }

        return false;
      }

      // 檢查所有分類，確保有符合權限子項目的分類也加入白名單
      allListItems.forEach((listItem) => {
        const link = listItem.querySelector('a.menu__link');
        const href = link?.getAttribute('href');
        const text = link?.textContent?.trim() || '';

        // 如果這個 list item 沒有 href 或 href 是 #（是分類標題），檢查子項目
        if (!href || href === '#') {
          // 獲取父分類的文字（如果有的話）
          const parentListItem = listItem
            .closest('li.menu__list-item')
            ?.parentElement?.closest('li.menu__list-item');
          const parentLink = parentListItem?.querySelector('a.menu__link');
          const parentText = parentLink?.textContent?.trim();

          if (checkCategoryHasAllowedItems(listItem, parentText)) {
            const listItemElement = listItem as HTMLElement;
            itemsToShow.add(listItemElement);
            console.log('📁 加入分類到白名單:', text);

            // 確保所有父分類也顯示
            addParentItems(listItemElement);
          }
        }
      });

      // 清理白名單：移除不符合條件的項目
      // 重新檢查所有項目，確保只有符合條件的項目才在白名單中
      const itemsToRemove = new Set<HTMLElement>();
      itemsToShow.forEach((listItemElement) => {
        const link = listItemElement.querySelector('a.menu__link');
        const href = link?.getAttribute('href');
        const text = link?.textContent?.trim() || '';
        const textLower = text.toLowerCase();

        // 如果是分類標題（沒有 href 或 href 是 #）
        if (!href || href === '#') {
          // 檢查這個分類是否有符合條件的子項目
          const directSubItems = listItemElement.querySelectorAll(
            ':scope > ul > li.menu__list-item'
          );
          let hasAllowedSubItem = false;

          directSubItems.forEach((subItem) => {
            const subLink = subItem.querySelector('a.menu__link');
            const subHref = subLink?.getAttribute('href');
            const subText = subLink?.textContent?.trim() || '';

            if (subHref && subHref !== '#') {
              const subFullPath = subHref.startsWith('/')
                ? subHref
                : `/${subHref}`;
              if (isPathAllowed(subFullPath)) {
                hasAllowedSubItem = true;
              }
            } else if (!subHref || subHref === '#') {
              // 檢查子分類是否應該被允許
              if (isSubCategoryAllowed(text, subText)) {
                hasAllowedSubItem = true;
              }
            }
          });

          // 如果沒有符合條件的子項目，且不是 TailorMed 本身（因為它需要顯示 Website 或 Airtable/Data），則移除
          if (!hasAllowedSubItem && !textLower.includes('tailormed')) {
            // 但如果是 TailorMed 的直接子項目（Website 或 Airtable），需要檢查
            const parentListItem = listItemElement
              .closest('li.menu__list-item')
              ?.parentElement?.closest('li.menu__list-item');
            const parentLink = parentListItem?.querySelector('a.menu__link');
            const parentText = parentLink?.textContent?.trim() || '';

            if (parentText && textLower.includes('tailormed')) {
              // 這是 TailorMed 分類，檢查是否有 Website 或 Airtable 子項目
              if (
                !directSubItems.length ||
                !Array.from(directSubItems).some((item) => {
                  const itemText =
                    item.querySelector('a.menu__link')?.textContent?.trim() ||
                    '';
                  const itemTextLower = itemText.toLowerCase();
                  return (
                    itemTextLower.includes('website') ||
                    itemTextLower.includes('airtable')
                  );
                })
              ) {
                itemsToRemove.add(listItemElement);
              }
            } else if (!isSubCategoryAllowed(parentText, text)) {
              itemsToRemove.add(listItemElement);
            }
          }
        }
      });

      // 移除不符合條件的項目
      itemsToRemove.forEach((item) => {
        itemsToShow.delete(item);
        console.log(
          '🗑️ 從白名單移除:',
          item.querySelector('a.menu__link')?.textContent?.trim()
        );
      });

      // 再次檢查：確保正確的分類層級都被加入
      // 只處理已經在白名單中的項目
      const itemsToProcess = Array.from(itemsToShow);
      itemsToProcess.forEach((listItemElement) => {
        const link = listItemElement.querySelector('a.menu__link');
        const text = link?.textContent?.trim() || '';

        // 只查找直接子項目（第一層），使用 isSubCategoryAllowed 檢查
        const directSubItems = listItemElement.querySelectorAll(
          ':scope > ul > li.menu__list-item'
        );
        console.log(
          `  🔍 檢查 ${directSubItems.length} 個直接子項目 (父分類: ${text})...`
        );

        directSubItems.forEach((subItem) => {
          const subLink = subItem.querySelector('a.menu__link');
          const subHref = subLink?.getAttribute('href');
          const subText = subLink?.textContent?.trim() || '';
          const subTextLower = subText.toLowerCase();

          // 明確排除 Billing Info
          if (
            subTextLower.includes('billing') &&
            subTextLower.includes('info')
          ) {
            console.log('  🚫 排除 Billing Info 子項目:', subText);
            return;
          }

          if (subHref && subHref !== '#') {
            const subFullPath = subHref.startsWith('/')
              ? subHref
              : `/${subHref}`;

            // 檢查路徑是否包含 billing info
            const pathLower = subFullPath.toLowerCase();
            const decodedPath = decodeURIComponent(pathLower);
            if (
              pathLower.includes('billing') &&
              (pathLower.includes('info') ||
                decodedPath.includes('billing info'))
            ) {
              console.log(
                '  🚫 排除 Billing Info 路徑:',
                subText,
                '→',
                subFullPath
              );
              return;
            }

            // 只允許符合特定路徑的內容
            if (isPathAllowed(subFullPath)) {
              itemsToShow.add(subItem as HTMLElement);
              console.log(
                '  ✅ 加入子項目到白名單:',
                subText,
                '→',
                subFullPath
              );
              // 確保子項目的父分類也在白名單中
              addParentItems(subItem as HTMLElement);
            }
          } else if (!subHref || subHref === '#') {
            // 子項目也是分類標題，使用 isSubCategoryAllowed 檢查
            if (isSubCategoryAllowed(text, subText)) {
              itemsToShow.add(subItem as HTMLElement);
              console.log(
                '  ✅ 加入子分類到白名單:',
                subText,
                '(父分類:',
                text,
                ')'
              );
              addParentItems(subItem as HTMLElement);
            } else {
              console.log('  ❌ 拒絕子分類:', subText, '(父分類:', text, ')');
            }
          }
        });
      });

      console.log('📊 最終白名單項目數量:', itemsToShow.size);

      // 調試：輸出白名單項目
      if (process.env.NODE_ENV === 'development') {
        console.log('白名單項目數量:', itemsToShow.size);
        console.log('所有項目數量:', allListItems.length);
      }

      // 隱藏所有不在白名單中的項目
      allListItems.forEach((listItem) => {
        const listItemElement = listItem as HTMLElement;
        const link = listItem.querySelector('a.menu__link');
        const href = link?.getAttribute('href');
        const text = link?.textContent?.trim() || '';
        const textLower = text.toLowerCase();

        // 明確隱藏 Billing Info，無論是否在白名單中
        if (textLower.includes('billing') && textLower.includes('info')) {
          listItemElement.style.display = 'none';
          if (process.env.NODE_ENV === 'development') {
            console.log('🚫 強制隱藏 Billing Info:', text, href);
          }
          return;
        }

        // 檢查路徑是否包含 billing info
        if (href) {
          const pathLower = href.toLowerCase();
          const decodedPath = decodeURIComponent(pathLower);
          if (
            pathLower.includes('billing') &&
            (pathLower.includes('info') || decodedPath.includes('billing info'))
          ) {
            listItemElement.style.display = 'none';
            if (process.env.NODE_ENV === 'development') {
              console.log('🚫 強制隱藏 Billing Info 路徑:', text, href);
            }
            return;
          }
        }

        if (itemsToShow.has(listItemElement)) {
          listItemElement.style.display = '';
          if (
            process.env.NODE_ENV === 'development' &&
            text?.includes('TailorMed')
          ) {
            console.log('顯示項目:', text, href);
          }
        } else {
          // tailormed 用戶不顯示 intro（DGHM 文件管理系統）連結
          // 只保留首頁連結
          if (href && href === '/') {
            listItemElement.style.display = '';
          } else if (href && href.includes('intro')) {
            // 隱藏 intro 連結
            listItemElement.style.display = 'none';
            if (process.env.NODE_ENV === 'development') {
              console.log('隱藏 intro 連結:', text, href);
            }
          } else {
            listItemElement.style.display = 'none';
            if (
              process.env.NODE_ENV === 'development' &&
              text?.includes('TailorMed')
            ) {
              console.log('隱藏項目:', text, href);
            }
          }
        }
      });
    }
  }

  // 頁面載入時執行
  function init() {
    // 等待 sidebar 完全載入
    function waitForSidebar() {
      const sidebar = document.querySelector('.theme-doc-sidebar-container');
      if (!sidebar) {
        setTimeout(waitForSidebar, 100);
        return;
      }

      // sidebar 載入後再等待一下，確保內容已渲染
      setTimeout(() => {
        filterSidebarItems();
      }, 300);
    }

    waitForSidebar();

    // 監聽 DOM 變化（Docusaurus 可能會動態更新 sidebar）
    let filterTimeout: NodeJS.Timeout | null = null;
    let isUserInteracting = false;

    // 監聽 sidebar 上的點擊事件，標記用戶正在互動
    document.addEventListener(
      'click',
      (e) => {
        const target = e.target as Element;
        if (target.closest('.theme-doc-sidebar-container')) {
          isUserInteracting = true;
          setTimeout(() => {
            isUserInteracting = false;
          }, 1000); // 1 秒後重置標記
        }
      },
      true
    );

    const observer = new MutationObserver((mutations) => {
      // 如果用戶正在與 sidebar 互動（點擊展開/收合），不重新執行過濾
      if (isUserInteracting) {
        return;
      }

      // 檢查是否只是展開/收合的變化
      const isOnlyToggleChange = mutations.every((mutation) => {
        const target = mutation.target as Element;

        // 如果是屬性變化，檢查是否只是 class、aria-expanded 等展開相關屬性的變化
        if (mutation.type === 'attributes') {
          const attrName = mutation.attributeName;
          // 展開/收合通常只改變 class 和 aria-expanded
          if (
            attrName === 'class' ||
            attrName === 'aria-expanded' ||
            attrName === 'aria-hidden'
          ) {
            // 檢查目標是否是 menu 相關元素
            if (
              target.classList.contains('menu__list-item') ||
              target.classList.contains('menu__link') ||
              target.closest('.menu__list-item')
            ) {
              return true;
            }
          }
          return false;
        }

        // 如果是子節點變化，檢查是否只是顯示/隱藏的變化（展開/收合時子元素可能被添加/移除）
        if (mutation.type === 'childList') {
          const target = mutation.target as Element;
          // 如果變化發生在 menu 結構內，且只是添加/移除子元素，可能是展開/收合
          if (
            target.closest('.menu__list-item') ||
            target.classList.contains('menu__list')
          ) {
            const addedNodes = Array.from(mutation.addedNodes);
            const removedNodes = Array.from(mutation.removedNodes);

            // 如果只是添加/移除 li 元素，且這些元素已經存在於 DOM 中（只是顯示/隱藏），可能是展開/收合
            const allAreListItems = [...addedNodes, ...removedNodes].every(
              (node) => {
                if (node.nodeType !== Node.ELEMENT_NODE) return false;
                const element = node as Element;
                return (
                  element.tagName === 'LI' ||
                  element.classList.contains('menu__list-item')
                );
              }
            );

            if (allAreListItems) {
              return true;
            }
          }
        }

        return false;
      });

      // 如果是展開/收合操作，不重新執行過濾
      if (isOnlyToggleChange && mutations.length > 0) {
        return;
      }

      // 只在 sidebar 相關的結構性變化時才執行過濾
      const hasSidebarChange = mutations.some((mutation) => {
        const target = mutation.target as Element;
        const isInSidebar =
          target.closest('.theme-doc-sidebar-container') !== null;

        // 排除只是 class、aria 屬性的變化（展開/收合）
        if (mutation.type === 'attributes') {
          const attrName = mutation.attributeName;
          if (
            attrName === 'class' ||
            attrName === 'aria-expanded' ||
            attrName === 'aria-hidden'
          ) {
            return false;
          }
        }

        return isInSidebar;
      });

      if (hasSidebarChange) {
        // 清除之前的 timeout，避免重複執行
        if (filterTimeout) {
          clearTimeout(filterTimeout);
        }
        // 延遲執行，確保子項目完全載入
        filterTimeout = setTimeout(() => {
          filterSidebarItems();
        }, 500);
      }
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
        setTimeout(filterSidebarItems, 300);
      }
    };

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
