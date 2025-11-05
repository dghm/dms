const fs = require('fs');
const path = require('path');
const pug = require('pug');
const stylus = require('stylus');

const ROOT_DIR = __dirname;
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');
const TEMPLATE_DIR = path.join(FRONTEND_DIR, 'Templates');
const STYLE_DIR = path.join(FRONTEND_DIR, 'Styles');
const ASSETS_DIR = path.join(FRONTEND_DIR, 'Assets');
const JS_SOURCE_DIR = path.join(FRONTEND_DIR, 'Javascript');
// 編譯到 monorepo 根目錄的 dist/Projects/DGHM/
// 從 src/Projects/DGHM/ 往上兩層到根目錄，然後進入 dist/Projects/DGHM/
const REPO_ROOT = path.join(ROOT_DIR, '..', '..', '..');
const DIST_DIR = path.join(REPO_ROOT, 'dist', 'Projects', 'DGHM');
// 源碼使用 Javascript（大寫），編譯後使用 js（小寫）
const JS_DIST_DIR = path.join(DIST_DIR, 'js');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  ensureDir(destDir);
  fs.readdirSync(srcDir).forEach((item) => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    const stats = fs.statSync(srcPath);

    if (stats.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

console.log('🚚 開始編譯 DGHM...');

// 1. 編譯 Pug -> HTML
function compilePugRecursive(dir, outputBaseDir, basePath = '') {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      compilePugRecursive(filePath, outputBaseDir, path.join(basePath, file));
    } else if (file.endsWith('.pug')) {
      try {
        const html = pug.renderFile(filePath, {
          pretty: true,
          basedir: TEMPLATE_DIR,
        });

        const relativePath = path.relative(TEMPLATE_DIR, filePath);
        const outputPath = path.join(
          outputBaseDir,
          relativePath.replace(/\.pug$/, '.html')
        );
        ensureDir(path.dirname(outputPath));

        fs.writeFileSync(outputPath, html);
        console.log(`  ✅ 已生成 ${path.relative(DIST_DIR, outputPath)}`);
      } catch (error) {
        console.error(`  ⚠️ 編譯失敗 ${filePath}:`, error.message);
      }
    }
  });
}

if (fs.existsSync(TEMPLATE_DIR)) {
  try {
    console.log('📝 編譯 Pug 模板...');
    compilePugRecursive(TEMPLATE_DIR, DIST_DIR);
  } catch (error) {
    console.error('❌ Pug 編譯失敗:', error.message);
    process.exit(1);
  }
} else {
  console.warn('⚠️ 未找到 Templates 目錄');
}

// 2. 編譯 Stylus -> CSS
function compileStylusRecursive(dir, outputBaseDir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      compileStylusRecursive(filePath, outputBaseDir);
    } else if (file.endsWith('.styl')) {
      try {
        const stylusCode = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(STYLE_DIR, filePath);
        const outputPath = path.join(
          outputBaseDir,
          'css',
          relativePath.replace(/\.styl$/, '.css')
        );
        ensureDir(path.dirname(outputPath));

        stylus(stylusCode)
          .set('filename', filePath)
          .set('paths', [STYLE_DIR])
          .render((err, css) => {
            if (err) {
              console.error(`  ⚠️ 編譯失敗 ${filePath}:`, err.message);
            } else {
              fs.writeFileSync(outputPath, css);
              console.log(`  ✅ 已生成 ${path.relative(DIST_DIR, outputPath)}`);
            }
          });
      } catch (error) {
        console.error(`  ⚠️ 編譯失敗 ${filePath}:`, error.message);
      }
    }
  });
}

if (fs.existsSync(STYLE_DIR)) {
  try {
    console.log('🎨 編譯 Stylus 樣式...');
    compileStylusRecursive(STYLE_DIR, DIST_DIR);
  } catch (error) {
    console.error('❌ Stylus 編譯失敗:', error.message);
    process.exit(1);
  }
} else {
  console.warn('⚠️ 未找到 Styles 目錄');
}

// 3. 複製 JavaScript 檔案
console.log('📜 複製 JavaScript 檔案...');
if (fs.existsSync(JS_SOURCE_DIR)) {
  copyDir(JS_SOURCE_DIR, JS_DIST_DIR);
  console.log('  ✅ 已複製 JavaScript 檔案到 js/');
} else {
  console.warn(`  ⚠️ 未找到 Javascript 目錄: ${JS_SOURCE_DIR}`);
}

// 4. 複製靜態資源
console.log('📦 複製靜態資源...');
if (fs.existsSync(ASSETS_DIR)) {
  copyDir(ASSETS_DIR, path.join(DIST_DIR, 'images'));
  console.log('  ✅ 已複製 Assets 到 images/');
} else {
  console.warn('  ⚠️ 未找到 Assets 目錄');
}

// 5. 複製 .htaccess 檔案
console.log('📄 複製 .htaccess 檔案...');
const htaccessSource = path.join(ROOT_DIR, '.htaccess');
const htaccessDest = path.join(DIST_DIR, '.htaccess');
if (fs.existsSync(htaccessSource)) {
  copyFile(htaccessSource, htaccessDest);
  console.log('  ✅ 已複製 .htaccess 到 dist/');
} else {
  console.warn('  ⚠️ 未找到 .htaccess 檔案');
}

console.log('✅ 靜態資源已就緒');
console.log(`🎉 編譯完成！可以在 ${DIST_DIR}/index.html 預覽 DGHM 專案`);

