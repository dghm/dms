const { mdToPdf } = require('md-to-pdf');
const path = require('path');

const inputFile = path.join(__dirname, 'docs', 'BrandRize', 'CUUMED', '會議記錄', 'MM-260116.md');
const outputFile = path.join(__dirname, 'docs', 'BrandRize', 'CUUMED', '會議記錄', 'MM-260116.pdf');

(async () => {
  try {
    const pdf = await mdToPdf({ path: inputFile }, {
      dest: outputFile,
      pdf_options: {
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        }
      }
    });

    if (pdf) {
      console.log('PDF 已成功生成：', outputFile);
    } else {
      console.log('轉換失敗');
    }
  } catch (error) {
    console.error('錯誤：', error.message);
  }
})();
