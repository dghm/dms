/**
 * Mermaid 主題切換客戶端模組
 * 在 Night Mode 下動態修改 mermaid 圖表的背景顏色
 */

// 只在瀏覽器環境中執行
if (typeof window !== 'undefined') {
  // 監聽主題變化
  const observer = new MutationObserver(() => {
    updateMermaidColors();
  });

  // 監聽 data-theme 屬性的變化
  const htmlElement = document.documentElement;
  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // 延遲執行函數，確保 mermaid 完全渲染
  function delayedUpdate() {
    // 使用多次延遲，確保 mermaid 完全渲染
    setTimeout(() => {
      updateMermaidColors();
    }, 100);
    setTimeout(() => {
      updateMermaidColors();
    }, 500);
    setTimeout(() => {
      updateMermaidColors();
    }, 1000);
  }

  // 頁面載入時執行一次
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', delayedUpdate);
  } else {
    delayedUpdate();
  }

  // 監聽 mermaid 圖表渲染完成
  const mermaidObserver = new MutationObserver(() => {
    delayedUpdate();
  });

  // 監聽整個文檔的變化，以便在 mermaid 圖表渲染後更新顏色
  mermaidObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // 使用 IntersectionObserver 監聽 mermaid 圖表進入視圖
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(() => {
        delayedUpdate();
      });
    });
    
    // 觀察所有 mermaid 容器
    document.querySelectorAll('.mermaid').forEach((el) => {
      io.observe(el);
    });
  }

  function updateMermaidColors() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (!isDarkMode) return; // 只在 Night Mode 下執行

    const mermaidSvgs = document.querySelectorAll('.mermaid svg');

    mermaidSvgs.forEach((svg) => {
      // 找到所有節點組（g.node）
      const nodes = svg.querySelectorAll('g.node');
      
      nodes.forEach((node, index) => {
        // 找到節點內的背景元素（rect 或 polygon）
        const bgElements = node.querySelectorAll('rect, polygon');
        
        bgElements.forEach((element) => {
          // 跳過明顯不是背景的元素
          if (element.classList.contains('edge-thickness-normal') || 
              element.classList.contains('edge-pattern-solid')) {
            return;
          }

          const fill = element.getAttribute('fill') || '';
          const fillLower = fill.toLowerCase();
          
          // 檢查是否是淺色背景（使用更寬鬆的匹配）
          const isLightColor = 
            fillLower.includes('c6cde0') || // 淺藍
            fillLower.includes('e8ebf2') || // 淺灰
            fillLower.includes('d4e8f5') || // 淺藍灰
            fillLower.includes('fff4d4') || // 淺黃
            fillLower.includes('f5d7d7') || // 淺粉紅
            fillLower.includes('d4f5d4') || // 淺綠
            fillLower.includes('198') && fillLower.includes('205') && fillLower.includes('224') || // rgb(198, 205, 224)
            fillLower.includes('232') && fillLower.includes('235') && fillLower.includes('242') || // rgb(232, 235, 242)
            fillLower.includes('212') && fillLower.includes('232') && fillLower.includes('245') || // rgb(212, 232, 245)
            fillLower.includes('255') && fillLower.includes('244') && fillLower.includes('212') || // rgb(255, 244, 212)
            fillLower.includes('245') && fillLower.includes('215') && fillLower.includes('215') || // rgb(245, 215, 215)
            fillLower.includes('212') && fillLower.includes('245') && fillLower.includes('212'); // rgb(212, 245, 212)

          if (isLightColor) {
            let newFill = '#202833'; // 預設深灰色
            
            // 檢查是否是第一個或最後一個節點
            const isFirstOrLast = index === 0 || index === nodes.length - 1;
            
            // 如果是開始節點且是淺藍色
            if (isFirstOrLast && (fillLower.includes('c6cde0') || (fillLower.includes('198') && fillLower.includes('205') && fillLower.includes('224')))) {
              newFill = '#00337F'; // 深藍色
            }
            // 如果是完成節點且是淺綠色
            else if (fillLower.includes('d4f5d4') || (fillLower.includes('212') && fillLower.includes('245') && fillLower.includes('212'))) {
              newFill = '#2d5a2d'; // 深綠色
            }
            
            // 強制設置新顏色
            element.setAttribute('fill', newFill);
            element.style.setProperty('fill', newFill, 'important');
          }
        });
      });
    });
  }
}

