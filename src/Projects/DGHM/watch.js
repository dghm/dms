const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');

const ROOT_DIR = __dirname;
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');
const TEMPLATE_DIR = path.join(FRONTEND_DIR, 'Templates');
const STYLE_DIR = path.join(FRONTEND_DIR, 'Styles');
const JS_SOURCE_DIR = path.join(FRONTEND_DIR, 'Javascript');
const ASSETS_DIR = path.join(FRONTEND_DIR, 'Assets');

// 編譯函數
function compile() {
  console.log('\n🔄 檔案變更偵測到，重新編譯...');
  const compileProcess = spawn('node', ['compile.js'], {
    cwd: ROOT_DIR,
    stdio: 'inherit'
  });

  compileProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ 編譯完成\n');
    } else {
      console.log(`❌ 編譯失敗 (退出碼: ${code})\n`);
    }
  });
}

// 監視 Pug 檔案
console.log('👀 開始監視檔案變化...');
console.log(`📝 監視 Pug 模板: ${TEMPLATE_DIR}`);
console.log(`🎨 監視 Stylus 樣式: ${STYLE_DIR}`);
console.log(`📜 監視 JavaScript: ${JS_SOURCE_DIR}`);
console.log(`📦 監視 Assets: ${ASSETS_DIR}`);
console.log('\n按 Ctrl+C 停止監視\n');

const watcher = chokidar.watch([
  path.join(TEMPLATE_DIR, '**/*.pug'),
  path.join(STYLE_DIR, '**/*.styl'),
  path.join(JS_SOURCE_DIR, '**/*.js'),
  path.join(ASSETS_DIR, '**/*'),
], {
  ignored: /(^|[\/\\])\../, // 忽略隱藏檔案
  persistent: true,
  ignoreInitial: true
});

// 防抖函數，避免短時間內多次觸發
let compileTimeout;
function debounceCompile() {
  clearTimeout(compileTimeout);
  compileTimeout = setTimeout(compile, 300);
}

watcher
  .on('add', (path) => {
    console.log(`➕ 新增檔案: ${path}`);
    debounceCompile();
  })
  .on('change', (path) => {
    console.log(`📝 檔案變更: ${path}`);
    debounceCompile();
  })
  .on('unlink', (path) => {
    console.log(`🗑️  刪除檔案: ${path}`);
    debounceCompile();
  })
  .on('error', (error) => {
    console.error('❌ 監視錯誤:', error);
  });

// 初始編譯
console.log('🚀 執行初始編譯...');
compile();

