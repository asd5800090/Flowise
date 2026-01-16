# Flowise 国际化中文语言支持实施计划

## 项目背景
Flowise 项目目前正处于国际化起步阶段，已有基础框架但未完全实现。本文档提供一个详细的待办列表，用于指导项目逐步完成中文语言支持。

## 第一阶段：基础框架搭建 ✅

### 1. 安装必要依赖 ✅
- [x] 安装 i18next
- [x] 安装 react-i18next
- [x] 安装 i18next-browser-languagedetector

```bash
cd packages/ui
pnpm add i18next react-i18next i18next-browser-languagedetector
```

### 2. 创建i18n配置文件 ✅
- [x] 创建 `packages/ui/src/i18n/index.js` 配置文件
- [x] 配置语言检测、回退语言和资源加载
- [x] 配置中文简体(zh-CN)和英文(en)支持

### 3. 集成到应用入口 ✅
- [x] 修改 `packages/ui/src/index.jsx`
- [x] 引入i18n配置
- [x] 用 I18nextProvider 包装应用

### 4. 创建语言切换功能 ✅
- [x] 在 Header 组件中添加语言切换按钮/下拉菜单
- [x] 实现语言切换逻辑
- [x] 添加语言切换状态管理

## 第二阶段：核心UI元素翻译 🚧

### 1. 扩展翻译文件内容 ✅
- [x] 重命名 `common_old.json` 为 `common.json`
- [x] 创建按模块组织的翻译文件结构：
  - [x] 菜单项 (menu)
  - [x] 按钮文本 (button)
  - [x] 提示消息 (message)
  - [x] 用户配置 (profile)
  - [x] 导出对话框 (exportDialog)
  - [x] 数据类型 (dataTypes)
- [x] 完善英文和中文翻译内容

### 2. 导航和菜单翻译 ✅
- [x] 翻译 `layout/MainLayout/Sidebar/MenuList` 组件
- [x] 更新菜单项硬编码文本
- [x] 实现 NavItem 组件翻译

### 3. 头部和用户界面翻译 ✅
- [x] 翻译 `layout/MainLayout/Header` 组件 (添加了语言切换器)
- [x] 处理用户个人信息部分的文本
- [x] 翻译 ProfileSection 组件
- [x] 翻译 ViewHeader 组件
- [x] 实现导出/导入对话框翻译

## 第三阶段：功能模块翻译 ✅

### 1. 核心功能模块
- [x] Chatflows 界面翻译
  - [x] Chatflows 列表页面
  - [x] Chatflows 创建/编辑界面 (APICodeDialog, ShareChatbot)
  - [x] Chatflows 相关对话框
- [x] Agentflows 界面翻译
  - [x] Agentflows 列表页面
  - [x] Agentflows 创建/编辑界面
  - [x] Agentflows 相关对话框
- [x] Canvas 组件翻译
  - [x] 节点相关文本
  - [x] 工具栏和快捷菜单
  - [x] 节点属性面板 (CanvasNode)

### 2. 配置和设置模块
- [x] Credentials 界面翻译
- [x] Tools 界面翻译
- [x] Variables 界面翻译
- [x] Document Stores 界面翻译

### 3. 对话框和模态框
- [x] 翻译所有对话框组件
  - [x] starterPromptsDialog
  - [x] SaveChatflowDialog
  - [x] ConditionDialog
  - [x] ChatFeedbackContentDialog
  - [x] ManageScrapedLinksDialog
  - [x] TagDialog
  - [x] PromptLangsmithHubDialog
  - [x] APICodeDialog
  - [x] ShareChatbot
  - [x] 其他通用对话框
- [x] 翻译表单验证消息
  - [x] 添加验证消息翻译键 (validation)
  - [x] 更新 NvidiaNIMDialog.jsx 中的验证消息
  - [x] 更新 PasteJSONDialog.jsx 中的验证消息
- [x] 翻译错误提示和成功通知
  - [x] 添加通用错误和成功消息翻译键
  - [x] 更新 AddEditCredentialDialog.jsx 中的通知消息
  - [x] 更新 AddEditVariableDialog.jsx 中的通知消息  
  - [x] 更新 AddDocStoreDialog.jsx 中的通知消息

## 第四阶段：完善与优化

### 1. 语言持久化
- [ ] 实现语言选择保存到localStorage
- [ ] 实现刷新页面后保持语言设置
- [ ] 添加语言切换Redux状态管理

### 2. 性能优化
- [ ] 实现按需加载语言资源
- [ ] 优化翻译文件大小
- [ ] 处理长文本的翻译

### 3. 高级功能
- [ ] 处理日期和时间的本地化
- [ ] 处理数字和货币的本地化
- [ ] 添加复数形式支持
- [ ] 添加动态变量插值

## 工具和辅助任务

### 1. 自动化工具
- [ ] 配置 i18next-parser 自动提取需要翻译的文本
- [ ] 创建翻译管理脚本
- [ ] 设置翻译文件检查工具

### 2. 测试
- [ ] 测试所有界面的语言切换
- [ ] 测试语言持久化功能
- [ ] 测试响应式布局下的翻译显示
- [ ] 修复翻译不完整或显示问题

### 3. 文档
- [ ] 为贡献者添加国际化指南
- [ ] 更新开发者文档中的国际化说明
- [ ] 创建翻译文件维护指南

## 注意事项

1. **实施顺序**：严格按照上述阶段顺序实施，确保基础框架稳定后再进行UI翻译。

2. **文件命名**：统一使用 `zh-CN` 作为中文简体标识，保持与国际标准一致。

3. **回退机制**：确保当某些翻译缺失时，有适当的回退机制（通常回退到英文）。

4. **性能考虑**：避免一次性加载所有翻译资源，考虑按需加载。

5. **协作**：将翻译任务分配给不同团队成员，提高效率。

## 预期成果

完成上述待办事项后，Flowise 项目将具备：
- 完整的中英文双语支持
- 用户友好的语言切换功能
- 持久化的语言设置
- 可扩展的多语言框架，便于未来添加其他语言

## 时间估算

- 第一阶段：基础框架搭建 - 2-3天
- 第二阶段：核心UI元素翻译 - 5-7天
- 第三阶段：功能模块翻译 - 7-10天
- 第四阶段：完善与优化 - 3-5天

总计：约17-25天（根据团队规模和经验可能有所变化）