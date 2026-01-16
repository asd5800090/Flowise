const fs = require('fs');
const zhCNPath = '/home/yjs/Flowise/packages/ui/src/locales/zh-CN/common.json';

// 读取并解析JSON文件
const content = fs.readFileSync(zhCNPath, 'utf8');
const data = JSON.parse(content);

// 获取nodeDescriptions的所有键
const nodeDescriptionsKeys = Object.keys(data.nodeDescriptions || {});
const uniqueKeys = [];
const duplicateKeys = [];

nodeDescriptionsKeys.forEach(key => {
  if (uniqueKeys.includes(key)) {
    duplicateKeys.push(key);
  } else {
    uniqueKeys.push(key);
  }
});

console.log('Total keys:', nodeDescriptionsKeys.length);
console.log('Unique keys:', uniqueKeys.length);
console.log('Duplicate keys:', duplicateKeys.length);

if (duplicateKeys.length > 0) {
  console.log('\nDuplicate keys:');
  duplicateKeys.forEach(key => {
    console.log('-', key);
  });
}