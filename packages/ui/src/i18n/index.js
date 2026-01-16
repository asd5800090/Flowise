import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 导入翻译资源
import enCommon from '../locales/en/common.json'
import zhCNCommon from '../locales/zh-CN/common.json'

const resources = {
  en: {
    common: enCommon
  },
  'zh-CN': {
    common: zhCNCommon
  }
}

i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 传递 i18n 实例给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    resources,
    fallbackLng: 'en', // 默认语言
    debug: process.env.NODE_ENV === 'development', // 开发环境显示日志

    // 语言检测配置
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // 缓存用户语言选择
      lookupLocalStorage: 'i18nextLng'
    },

    interpolation: {
      escapeValue: false // React 已经默认转义
    },

    // 命名空间
    defaultNS: 'common',
    ns: ['common'],

    // 键分隔符
    keySeparator: '.',
    
    // 命名空间分隔符
    nsSeparator: ':'
  })

export default i18n