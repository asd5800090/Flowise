const fs = require('fs');
const result = JSON.parse(fs.readFileSync('translation_check_result.json', 'utf8'));

// 获取VectorStores类别的缺失翻译
const vectorStoreTranslations = result.missingInZhCN.filter(item => 
  item.description.includes('vector') || item.description.includes('Vector') ||
  item.description.includes('Upsert') || item.description.includes('upsert')
);

console.log(`Found ${vectorStoreTranslations.length} missing vector store translations\n`);

// 输出前10个最常用的向量存储翻译
vectorStoreTranslations.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. Key: ${item.key}`);
  console.log(`   Description: ${item.description}`);
});

console.log('\n');

// 获取Tools类别的缺失翻译
const toolsTranslations = result.missingInZhCN.filter(item => 
  item.description.includes('Tool') || item.description.includes('tool') ||
  item.description.includes('execute') || item.description.includes('Execute')
);

console.log(`Found ${toolsTranslations.length} missing tools translations\n`);

// 输出前10个最常用的工具翻译
toolsTranslations.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. Key: ${item.key}`);
  console.log(`   Description: ${item.description}`);
});