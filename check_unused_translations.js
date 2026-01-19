const fs = require('fs');
const path = require('path');

// 读取国际化文件
const enPath = path.join(__dirname, 'packages/ui/src/locales/en/common.json');
const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 获取所有国际化键（扁平化）
function getAllKeys(obj, prefix = '') {
    let keys = [];
    for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        keys.push(fullKey);
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            keys = keys.concat(getAllKeys(value, fullKey));
        }
    }
    return keys;
}

// 递归搜索目录中的所有文件
function searchFiles(dir, pattern, fileList = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // 跳过 node_modules 和其他不需要的目录
            if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') {
                continue;
            }
            searchFiles(filePath, pattern, fileList);
        } else if (stat.isFile() && pattern.test(file)) {
            fileList.push(filePath);
        }
    }
    
    return fileList;
}

// 在文件中搜索国际化键的使用
function searchForTranslationUsage(filePath, translationKeys) {
    const content = fs.readFileSync(filePath, 'utf8');
    const usedKeys = [];
    
    translationKeys.forEach(key => {
        // 转义特殊字符
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        try {
            // 搜索 t() 函数调用中的键
            const tPattern = new RegExp(`t\(['"]${escapedKey}['"]`, 'g');
            if (tPattern.test(content)) {
                usedKeys.push(key);
                return;
            }
            
            // 搜索其他可能的国际化使用模式
            const otherPatterns = [
                new RegExp(`['"]${escapedKey}['"]`, 'g'),
                new RegExp(`\$t\(['"]${escapedKey}['"]`, 'g'),
                new RegExp(`i18n\.t\(['"]${escapedKey}['"]`, 'g')
            ];
            
            for (const pattern of otherPatterns) {
                if (pattern.test(content)) {
                    usedKeys.push(key);
                    break;
                }
            }
        } catch (error) {
            console.warn(`⚠️  正则表达式错误处理键 "${key}": ${error.message}`);
        }
    });
    
    return usedKeys;
}

// 主检查函数
async function checkUnusedTranslations() {
    console.log('🔍 开始检查未使用的国际化键...\n');
    
    // 获取所有国际化键
    const allTranslationKeys = getAllKeys(enTranslations);
    console.log(`📊 国际化资源总键数: ${allTranslationKeys.length}`);
    
    // 搜索所有相关文件
    const srcDir = path.join(__dirname, 'packages/ui/src');
    const jsFiles = searchFiles(srcDir, /\.(js|jsx|ts|tsx)$/);
    console.log(`📁 搜索的文件数: ${jsFiles.length}`);
    
    // 检查每个文件中的国际化键使用
    const usedKeys = new Set();
    let filesProcessed = 0;
    
    for (const filePath of jsFiles) {
        const fileUsedKeys = searchForTranslationUsage(filePath, allTranslationKeys);
        fileUsedKeys.forEach(key => usedKeys.add(key));
        filesProcessed++;
        
        if (filesProcessed % 100 === 0) {
            console.log(`📄 已处理 ${filesProcessed}/${jsFiles.length} 个文件...`);
        }
    }
    
    console.log(`✅ 已完成文件扫描`);
    console.log(`🔑 已使用的国际化键数: ${usedKeys.size}`);
    
    // 找出未使用的键
    const unusedKeys = allTranslationKeys.filter(key => !usedKeys.has(key));
    console.log(`❌ 未使用的国际化键数: ${unusedKeys.length}`);
    
    // 输出未使用的键（按命名空间分组）
    if (unusedKeys.length > 0) {
        console.log('\n📋 未使用的国际化键（按命名空间分组）:');
        
        const groupedKeys = {};
        unusedKeys.forEach(key => {
            const namespace = key.split('.')[0];
            if (!groupedKeys[namespace]) {
                groupedKeys[namespace] = [];
            }
            groupedKeys[namespace].push(key);
        });
        
        Object.keys(groupedKeys).sort().forEach(namespace => {
            console.log(`\n📂 ${namespace} (${groupedKeys[namespace].length} 个未使用键):`);
            groupedKeys[namespace].sort().forEach(key => {
                console.log(`  - ${key}`);
            });
        });
    } else {
        console.log('\n🎉 恭喜！所有国际化键都被使用了！');
    }
    
    // 统计使用率
    const usageRate = (usedKeys.size / allTranslationKeys.length * 100).toFixed(2);
    console.log(`\n📈 国际化键使用率: ${usageRate}%`);
    
    // 保存结果到文件
    const result = {
        timestamp: new Date().toISOString(),
        totalKeys: allTranslationKeys.length,
        usedKeys: usedKeys.size,
        unusedKeys: unusedKeys.length,
        usageRate: usageRate,
        unusedKeysByNamespace: {},
        unusedKeysList: unusedKeys
    };
    
    Object.keys(groupedKeys || {}).forEach(namespace => {
        result.unusedKeysByNamespace[namespace] = groupedKeys[namespace];
    });
    
    fs.writeFileSync(
        path.join(__dirname, 'unused_translation_check_result.json'),
        JSON.stringify(result, null, 2)
    );
    
    console.log('\n💾 详细结果已保存到 unused_translation_check_result.json');
}

// 运行检查
checkUnusedTranslations().catch(console.error);