const fs = require('fs');

// 读取中文资源文件
const zhJsonPath = '/home/yjs/Flowise/packages/ui/src/locales/zh-CN/common.json';
const zhContent = fs.readFileSync(zhJsonPath, 'utf8');

// 解析JSON
let zhJson;
try {
    zhJson = JSON.parse(zhContent);
} catch (error) {
    console.error('JSON解析错误:', error.message);
    process.exit(1);
}

// 递归遍历JSON对象，收集所有键路径
const allKeys = new Set();
const duplicateKeys = new Map();

function collectKeys(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        // 检查是否重复
        if (allKeys.has(currentPath)) {
            duplicateKeys.set(currentPath, (duplicateKeys.get(currentPath) || 0) + 1);
        } else {
            allKeys.add(currentPath);
        }
        
        // 递归处理嵌套对象
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            collectKeys(value, currentPath);
        }
    }
}

collectKeys(zhJson);

// 输出检查结果
console.log('=== 中文国际化资源重复键检查 ===');
console.log(`总键数: ${allKeys.size}`);
console.log(`重复键数: ${duplicateKeys.size}`);

if (duplicateKeys.size > 0) {
    console.log('\n重复键列表:');
    duplicateKeys.forEach((count, key) => {
        console.log(`- ${key} (出现 ${count} 次)`);
    });
} else {
    console.log('\n✅ 没有发现重复键');
}

// 额外检查：检查是否存在相同键但不同路径的情况
console.log('\n=== 检查相同键名但不同路径的情况 ===');
const keyMap = new Map();

function checkSameKeyNames(obj, path = '') {
    for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        // 记录键名和路径
        if (!keyMap.has(key)) {
            keyMap.set(key, []);
        }
        keyMap.get(key).push(currentPath);
        
        // 递归处理嵌套对象
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            checkSameKeyNames(value, currentPath);
        }
    }
}

checkSameKeyNames(zhJson);

const sameKeyNames = [];
keyMap.forEach((paths, key) => {
    if (paths.length > 1) {
        sameKeyNames.push({ key, paths });
    }
});

if (sameKeyNames.length > 0) {
    console.log(`发现 ${sameKeyNames.length} 个键名在不同路径重复:`);
    sameKeyNames.forEach(({ key, paths }) => {
        console.log(`- ${key}:`);
        paths.forEach(path => console.log(`  ${path}`));
    });
} else {
    console.log('✅ 没有发现相同键名在不同路径的情况');
}