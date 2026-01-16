const fs = require('fs');
const path = require('path');

// 读取国际化文件
const zhCNPath = path.join(__dirname, 'packages/ui/src/locales/zh-CN/common.json');
const enPath = path.join(__dirname, 'packages/ui/src/locales/en/common.json');

const zhCNTranslations = JSON.parse(fs.readFileSync(zhCNPath, 'utf8'));
const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 获取所有节点描述
function getNodeDescriptionKey(description) {
  return description
    .replace(/-/g, '_') // 将连字符替换为下划线
    .replace(/[^a-zA-Z0-9\s_]/g, '') // 移除其他特殊字符，保留下划线
    .replace(/\s+/g, '_')
    .toLowerCase();
}

// 递归查找所有节点文件
function findNodeFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findNodeFiles(filePath, fileList);
    } else if (file.endsWith('.ts') && !file.includes('test') && !file.includes('spec')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 提取节点描述
function extractNodeDescriptions(nodeFiles) {
  const descriptions = [];
  
  nodeFiles.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 查找description字段
      const descMatch = content.match(/this\.description\s*=\s*['"`]([^'"`]+)['"`]/);
      if (descMatch) {
        descriptions.push(descMatch[1]);
      }
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
    }
  });
  
  return descriptions;
}

// 检查翻译
function checkTranslations(descriptions) {
  const missingInZhCN = [];
  const missingInEn = [];
  const mismatchedKeys = [];
  
  descriptions.forEach(desc => {
    const key = getNodeDescriptionKey(desc);
    
    if (zhCNTranslations.nodeDescriptions && !zhCNTranslations.nodeDescriptions[key]) {
      missingInZhCN.push({ key, description: desc });
    }
    
    if (enTranslations.nodeDescriptions && !enTranslations.nodeDescriptions[key]) {
      missingInEn.push({ key, description: desc });
    }
    
    // 检查键是否匹配
    if (zhCNTranslations.nodeDescriptions && enTranslations.nodeDescriptions) {
      const zhCNKey = Object.keys(zhCNTranslations.nodeDescriptions).find(k => 
        getNodeDescriptionKey(k.replace(/[^a-zA-Z0-9\s_]/g, '').replace(/\s+/g, '_')) === key
      );
      
      const enKey = Object.keys(enTranslations.nodeDescriptions).find(k => 
        getNodeDescriptionKey(k.replace(/[^a-zA-Z0-9\s_]/g, '').replace(/\s+/g, '_')) === key
      );
      
      if (zhCNKey && enKey && zhCNKey !== enKey) {
        mismatchedKeys.push({ description: desc, zhCNKey, enKey, expectedKey: key });
      }
    }
  });
  
  return { missingInZhCN, missingInEn, mismatchedKeys };
}

// 主函数
function main() {
  const nodesDir = path.join(__dirname, 'packages/components/nodes');
  const nodeFiles = findNodeFiles(nodesDir);
  
  console.log(`Found ${nodeFiles.length} node files`);
  
  const descriptions = extractNodeDescriptions(nodeFiles);
  console.log(`\nFound ${descriptions.length} node descriptions`);
  
  const { missingInZhCN, missingInEn, mismatchedKeys } = checkTranslations(descriptions);
  
  console.log('\n=== Missing translations in zh-CN ===');
  missingInZhCN.forEach(item => {
    console.log(`Key: ${item.key}`);
    console.log(`Description: ${item.description}`);
    console.log('---');
  });
  
  console.log('\n=== Missing translations in en ===');
  missingInEn.forEach(item => {
    console.log(`Key: ${item.key}`);
    console.log(`Description: ${item.description}`);
    console.log('---');
  });
  
  console.log('\n=== Mismatched keys ===');
  mismatchedKeys.forEach(item => {
    console.log(`Description: ${item.description}`);
    console.log(`zh-CN key: ${item.zhCNKey}`);
    console.log(`en key: ${item.enKey}`);
    console.log(`Expected key: ${item.expectedKey}`);
    console.log('---');
  });
  
  // 保存结果到文件
  const result = {
    missingInZhCN,
    missingInEn,
    mismatchedKeys
  };
  
  fs.writeFileSync('translation_check_result.json', JSON.stringify(result, null, 2));
  console.log('\nResults saved to translation_check_result.json');
}

main();