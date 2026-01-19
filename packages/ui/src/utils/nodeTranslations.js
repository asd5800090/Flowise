import { useTranslation } from 'react-i18next'
import { getNodeTranslationKey } from './nodeRegistry'

// 将节点描述转换为翻译键（旧系统兼容）
const getNodeDescriptionKey = (description) => {
  // 将描述转换为适合作为键的格式
  // 将连字符替换为下划线，移除其他特殊字符，将空格替换为下划线，转换为小写
  return description
    .replace(/-/g, '_') // 将连字符替换为下划线
    .replace(/[^a-zA-Z0-9\s_]/g, '') // 移除其他特殊字符，保留下划线
    .replace(/\s+/g, '_')
    .toLowerCase()
}

const useNodeTranslations = () => {
  const { t } = useTranslation()
  
  const translateDescription = (nodeType, description) => {
    try {
      if (!description) return ''
      
      // 首先尝试使用新的注册表系统
      const translationKey = getNodeTranslationKey(nodeType)
      if (translationKey) {
        const translated = t(translationKey)
        // 如果翻译结果与键名不同，说明翻译存在
        if (translated !== translationKey) {
          return translated
        }
      }
      
      // 如果新系统没有找到翻译，回退到旧的动态键系统
      const key = getNodeDescriptionKey(description)
      const translated = t(`nodeDescriptions.${key}`)
      
      // 检查是否翻译成功，如果没有则返回原始描述并记录警告
      if (translated === `nodeDescriptions.${key}`) {
        console.warn(`Missing translation for node type: ${nodeType}, key: ${translationKey || `nodeDescriptions.${key}`}`)
        return description
      }
      
      return translated
    } catch (error) {
      // 如果发生任何错误，返回原始描述并记录错误
      console.error('Translation error:', error)
      return description
    }
  }
  
  return {
    translateDescription
  }
}

export default useNodeTranslations
export { useNodeTranslations, getNodeDescriptionKey }