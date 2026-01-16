import { useTranslation } from 'react-i18next'

// 将节点描述转换为翻译键
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
  
  const translateDescription = (description) => {
    if (!description) return ''
    
    const key = getNodeDescriptionKey(description)
    // 尝试获取翻译，如果没有找到则返回原始描述
    const translated = t(`nodeDescriptions.${key}`, { defaultValue: description })
    return translated
  }
  
  return {
    translateDescription
  }
}

export default useNodeTranslations
export { useNodeTranslations }