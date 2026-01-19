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
function searchFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // 跳过 node_modules 和其他不需要的目录
            if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') {
                continue;
            }
            searchFiles(filePath, fileList);
        } else if (stat.isFile() && /\.(js|jsx|ts|tsx)$/.test(file)) {
            fileList.push(filePath);
        }
    }
    
    return fileList;
}

// 简单的字符串搜索
function searchInFile(filePath, searchString) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return content.includes(searchString);
    } catch (error) {
        console.warn(`⚠️  无法读取文件 ${filePath}: ${error.message}`);
        return false;
    }
}

// 主检查函数
async function checkTranslationUsage() {
    console.log('🔍 开始检查国际化键使用情况...\n');
    
    // 获取所有国际化键
    const allTranslationKeys = getAllKeys(enTranslations);
    console.log(`📊 国际化资源总键数: ${allTranslationKeys.length}`);
    
    // 搜索所有相关文件
    const srcDir = path.join(__dirname, 'packages/ui/src');
    const jsFiles = searchFiles(srcDir);
    console.log(`📁 搜索的文件数: ${jsFiles.length}`);
    
    // 检查每个国际化键的使用情况
    const usedKeys = new Set();
    const unusedKeys = [];
    
    let keysProcessed = 0;
    const totalKeys = allTranslationKeys.length;
    
    for (const key of allTranslationKeys) {
        let found = false;
        
        // 搜索模式：t('key') 或 t("key")
        const searchPattern1 = `t('${key}')`;
        const searchPattern2 = `t("${key}")`;
        
        for (const filePath of jsFiles) {
            if (searchInFile(filePath, searchPattern1) || searchInFile(filePath, searchPattern2)) {
                found = true;
                usedKeys.add(key);
                break;
            }
        }
        
        if (!found) {
            unusedKeys.push(key);
        }
        
        keysProcessed++;
        if (keysProcessed % 100 === 0) {
            console.log(`🔑 已处理 ${keysProcessed}/${totalKeys} 个键...`);
        }
    }
    
    console.log(`✅ 已完成键使用情况检查`);
    console.log(`🔑 已使用的国际化键数: ${usedKeys.size}`);
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
        path.join(__dirname, 'translation_usage_result.json'),
        JSON.stringify(result, null, 2)
    );
    
    console.log('\n💾 详细结果已保存到 translation_usage_result.json');
}

// 运行检查
checkTranslationUsage().catch(console.error);