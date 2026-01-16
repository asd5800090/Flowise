const fs = require('fs');
const result = JSON.parse(fs.readFileSync('translation_check_result.json', 'utf8'));

// 获取Loaders类别的缺失翻译
const loaderTranslations = result.missingInZhCN.filter(item => 
  item.description.includes('Load') || item.description.includes('load')
);

console.log(`Found ${loaderTranslations.length} missing loader translations\n`);

// 输出前10个最常用的加载器翻译
loaderTranslations.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. Key: ${item.key}`);
  console.log(`   Description: ${item.description}`);
});