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

// 测试特定描述的翻译
function testTranslation(description) {
  const key = getNodeDescriptionKey(description);
  const zhCNTranslation = zhCNTranslations.nodeDescriptions[key];
  const enTranslation = enTranslations.nodeDescriptions[key];
  
  console.log(`Description: ${description}`);
  console.log(`Generated key: ${key}`);
  console.log(`English translation: ${enTranslation || 'MISSING'}`);
  console.log(`Chinese translation: ${zhCNTranslation || 'MISSING'}`);
  console.log('---');
}

// 测试我们添加的翻译
const testDescriptions = [
  'Autonomous agent with chain of thoughts for self-guided task completion',
  'Agent that is designed for LLMs that are good for reasoning/writing XML (e.g: Anthropic Claude)',
  'Large context cache for Google Gemini large language models',
  'Cache LLM response in memory, will be cleared once app restarted',
  'Wrapper around AWS Bedrock large language models that use the Converse API',
  'Wrapper around Azure OpenAI large language models that use the Chat endpoint',
  'Load data from an API',
  'Load data from Airtable table',
  'Load data from webpages',
  'Load data from CSV files'
];

console.log('Testing our added translations:\n');
testDescriptions.forEach(desc => testTranslation(desc));

// 统计总翻译数量
const totalZhCNKeys = Object.keys(zhCNTranslations.nodeDescriptions || {}).length;
const totalEnKeys = Object.keys(enTranslations.nodeDescriptions || {}).length;

console.log(`\nTotal translations in zh-CN: ${totalZhCNKeys}`);
console.log(`Total translations in en: ${totalEnKeys}`);