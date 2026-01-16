import React from 'react'
import { useTranslation } from 'react-i18next'

const I18nTest = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Internationalization Test</h1>
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('zh-CN')}>中文</button>
      </div>
      <h2>{t('menu.chatflows')}</h2>
      <p>{t('about.title')}</p>
      <p>{t('button.save')}</p>
      <p>{t('login.username')}</p>
      <p>{t('dropdown.defaultOption')}</p>
      <p>{t('breadcrumbs.dashboard')}</p>
      <p>{t('canvas.deleteConfirm', { title: 'Chatflow', name: 'Test Chatflow' })}</p>
    </div>
  )
}

export default I18nTest