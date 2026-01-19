/**
 * 翻译完整性验证工具
 * 用于检查节点翻译是否完整，确保中英文都有对应的翻译
 */

import enNodes from '@/locales/en/nodes.json'
import zhCNNodes from '@/locales/zh-CN/nodes.json'
import { getAllNodeTypes, getNodeTranslationKey } from './nodeRegistry'

/**
 * 验证节点翻译完整性
 * @returns {Object} 验证结果
 */
export const validateNodeTranslations = () => {
  const results = {
    totalNodes: 0,
    missingTranslations: [],
    incompleteTranslations: [],
    validTranslations: []
  }

  const nodeTypes = getAllNodeTypes()
  results.totalNodes = nodeTypes.length

  nodeTypes.forEach(nodeType => {
    const translationKey = getNodeTranslationKey(nodeType)
    
    if (!translationKey) {
      results.missingTranslations.push({
        nodeType,
        reason: 'No translation key defined in registry'
      })
      return
    }

    // 检查键路径是否有效
    const [namespace, category, nodeName] = translationKey.split('.')
    
    if (!enNodes[category] || !enNodes[category][nodeName]) {
      results.missingTranslations.push({
        nodeType,
        key: translationKey,
        reason: `Missing English translation`
      })
      return
    }

    if (!zhCNNodes[category] || !zhCNNodes[category][nodeName]) {
      results.missingTranslations.push({
        nodeType,
        key: translationKey,
        reason: `Missing Chinese translation`
      })
      return
    }

    const enTranslation = enNodes[category][nodeName]
    const zhTranslation = zhCNNodes[category][nodeName]

    // 检查翻译是否为空或与键相同
    if (!enTranslation || enTranslation === translationKey) {
      results.incompleteTranslations.push({
        nodeType,
        key: translationKey,
        language: 'en',
        reason: 'Empty or identical to key'
      })
    }

    if (!zhTranslation || zhTranslation === translationKey) {
      results.incompleteTranslations.push({
        nodeType,
        key: translationKey,
        language: 'zh-CN',
        reason: 'Empty or identical to key'
      })
    }

    // 如果两个翻译都有效
    if (enTranslation && zhTranslation && 
        enTranslation !== translationKey && 
        zhTranslation !== translationKey) {
      results.validTranslations.push({
        nodeType,
        key: translationKey,
        en: enTranslation,
        zh: zhTranslation
      })
    }
  })

  return results
}

/**
 * 生成翻译验证报告
 * @param {Object} results 验证结果
 * @returns {string} HTML格式的报告
 */
export const generateTranslationReport = (results) => {
  const { totalNodes, missingTranslations, incompleteTranslations, validTranslations } = results
  
  let report = `
  <h2>节点翻译完整性验证报告</h2>
  <p><strong>总节点数:</strong> ${totalNodes}</p>
  <p><strong>有效翻译:</strong> ${validTranslations.length}</p>
  <p><strong>缺失翻译:</strong> ${missingTranslations.length}</p>
  <p><strong>不完整翻译:</strong> ${incompleteTranslations.length}</p>
  
  <h3>覆盖率: ${((validTranslations.length / totalNodes) * 100).toFixed(1)}%</h3>
  `

  if (missingTranslations.length > 0) {
    report += '<h3>缺失的翻译:</h3><ul>'
    missingTranslations.forEach(item => {
      report += `<li><strong>${item.nodeType}</strong>: ${item.reason} (${item.key || 'N/A'})</li>`
    })
    report += '</ul>'
  }

  if (incompleteTranslations.length > 0) {
    report += '<h3>不完整的翻译:</h3><ul>'
    incompleteTranslations.forEach(item => {
      report += `<li><strong>${item.nodeType}</strong> [${item.language}]: ${item.reason}</li>`
    })
    report += '</ul>'
  }

  return report
}

/**
 * 验证特定节点类型的翻译
 * @param {string} nodeType 节点类型
 * @returns {Object} 验证结果
 */
export const validateNodeTypeTranslation = (nodeType) => {
  const translationKey = getNodeTranslationKey(nodeType)
  
  if (!translationKey) {
    return {
      valid: false,
      error: `No translation key defined for node type: ${nodeType}`
    }
  }

  const [namespace, category, nodeName] = translationKey.split('.')
  
  const enTranslation = enNodes[category]?.[nodeName]
  const zhTranslation = zhCNNodes[category]?.[nodeName]

  const result = {
    nodeType,
    key: translationKey,
    en: {
      exists: !!enTranslation,
      valid: enTranslation && enTranslation !== translationKey,
      translation: enTranslation
    },
    zh: {
      exists: !!zhTranslation,
      valid: zhTranslation && zhTranslation !== translationKey,
      translation: zhTranslation
    },
    valid: false
  }

  result.valid = result.en.valid && result.zh.valid
  
  return result
}

/**
 * 检查是否有重复的翻译键
 * @returns {Object[]} 重复的翻译键列表
 */
export const findDuplicateTranslationKeys = () => {
  const keys = new Set()
  const duplicates = []

  const checkDuplicates = (lang, translations) => {
    const seen = new Set()
    
    Object.keys(translations).forEach(category => {
      Object.keys(translations[category]).forEach(nodeName => {
        const key = `nodes.${category}.${nodeName}`
        if (seen.has(key)) {
          duplicates.push({
            key,
            language: lang,
            category,
            nodeName
          })
        } else {
          seen.add(key)
        }
      })
    })
  }

  checkDuplicates('en', enNodes)
  checkDuplicates('zh-CN', zhCNNodes)

  return duplicates
}

export default {
  validateNodeTranslations,
  generateTranslationReport,
  validateNodeTypeTranslation,
  findDuplicateTranslationKeys
}