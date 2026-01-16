const fs = require('fs');
const result = JSON.parse(fs.readFileSync('translation_check_result.json', 'utf8'));

// 获取Models类别的缺失翻译
const modelTranslations = result.missingInZhCN.filter(item => 
  item.description.includes('Wrapper') || item.description.includes('wrapper') ||
  item.description.includes('Model') || item.description.includes('model')
);

console.log(`Found ${modelTranslations.length} missing model translations\n`);

// 输出前10个最常用的模型翻译
modelTranslations.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. Key: ${item.key}`);
  console.log(`   Description: ${item.description}`);
});