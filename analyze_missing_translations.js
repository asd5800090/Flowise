const fs = require('fs');
const result = JSON.parse(fs.readFileSync('translation_check_result.json', 'utf8'));

// 按类别分类缺失的翻译
const categories = {};
result.missingInZhCN.forEach(item => {
  // 尝试从描述中推断类别
  if (item.description.includes('Agent') || item.description.includes('agent')) {
    categories.Agents = (categories.Agents || 0) + 1;
  } else if (item.description.includes('Chain') || item.description.includes('chain')) {
    categories.Chains = (categories.Chains || 0) + 1;
  } else if (item.description.includes('Cache') || item.description.includes('cache')) {
    categories.Cache = (categories.Cache || 0) + 1;
  } else if (item.description.includes('Load') || item.description.includes('load')) {
    categories.Loaders = (categories.Loaders || 0) + 1;
  } else if (item.description.includes('Embeddings') || item.description.includes('embeddings')) {
    categories.Embeddings = (categories.Embeddings || 0) + 1;
  } else if (item.description.includes('Wrapper') || item.description.includes('wrapper')) {
    categories.Models = (categories.Models || 0) + 1;
  } else if (item.description.includes('vector') || item.description.includes('Vector')) {
    categories.VectorStores = (categories.VectorStores || 0) + 1;
  } else if (item.description.includes('Memory') || item.description.includes('memory')) {
    categories.Memory = (categories.Memory || 0) + 1;
  } else if (item.description.includes('Tool') || item.description.includes('tool')) {
    categories.Tools = (categories.Tools || 0) + 1;
  } else {
    categories.Other = (categories.Other || 0) + 1;
  }
});

console.log('Missing translations by category:');
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
  console.log(`${category}: ${count}`);
});

// 输出前10个缺失的翻译
console.log('\nTop 10 missing translations:');
result.missingInZhCN.slice(0, 10).forEach((item, index) => {
  console.log(`${index + 1}. Key: ${item.key}`);
  console.log(`   Description: ${item.description}`);
});