# Flowise 全项目 i18n 国际化检查清单

## 1. 准备工作
- [ ] 确认 `react-i18next` 已在项目入口初始化（如 `i18n.js`），并加载 `zh-CN` / `en` 的 `common.json` 等翻译文件。
- [ ] 检查所有需要国际化的模块是否都已引入 `useTranslation` Hook。
- [ ] 统一翻译键命名规范（如 `module.functionKey`，避免冲突）。

## 2. 翻译文件检查 (`/packages/ui/src/locales/`)
- [ ] **`common.json`**
  - [ ] 每个功能模块（menu、chatflows、agentflows、tools、credentials、documentStores、variables、assistants、marketplaces 等）都有独立节点。
  - [ ] 基础通用键：`menu`、`button`、`message`、`validation`、`profile`、`exportDialog`、`dataTypes`、`breadcrumbs` 等完整无缺。
  - [ ] 各模块包含：title、searchPlaceholder、cardView、listView、addNew、noXXX、name、description、actions、load、delete、deleteConfirm、deleteSuccess、deleteFailed 等常用键。
  - [ ] 错误信息含插值占位符（如 `{{error}}`、`{{name}}`）。
- [ ] **`nodeDescriptions.json`**
  - [ ] 节点描述是否需国际化（一般只英文，但若有多语言需求需补充）。
- [ ] 检查 JSON 语法有效性，避免多余逗号导致解析错误。

## 3. 页面级组件检查
针对每个功能视图（`.jsx`）：
- [ ] **顶部菜单 / 标题栏**
  - [ ] 页面主标题使用 `t('module.title')`。
  - [ ] 搜索框占位符使用 `t('module.searchPlaceholder')`。
- [ ] **工具栏按钮**
  - [ ] Add / Edit / Delete / Save / Cancel / Confirm 等使用 `t('button.xxx')` 或模块专用键。
  - [ ] Tooltip 文本国际化。
- [ ] **表格 / 列表**
  - [ ] 表头列名使用对应模块键（如 `t('module.name')`）。
  - [ ] 操作列按钮（删除、加载等）国际化。
  - [ ] 空状态提示 `t('module.noXXX')`。
- [ ] **表单对话框**
  - [ ] 标题、字段标签、按钮文字、成功/失败提示均使用 `t()`。
  - [ ] 动态插值（如 `{{name}}`）正确使用。
- [ ] **Canvas / 节点编辑器**
  - [ ] 区块标题（Inputs、Outputs、Additional Parameters）使用 `t('canvas.xxx')`。
  - [ ] 节点标签若需固定文案则国际化。
- [ ] **路由相关**
  - [ ] 面包屑 `t('breadcrumbs.xxx')`。
  - [ ] 页面内跳转按钮或链接说明文字国际化。
- [ ] **通知 / Snackbar / Alert**
  - [ ] 成功、失败、加载中等消息使用 `t('message.xxx')` 或模块键。

## 4. 特殊场景检查
- [ ] **常量 / 枚举显示的文案**（如 badge 的 POPULAR 转成 `t('xxx')` 或保留大写显示）。
- [ ] **图片 Alt 文本**（如 `<img alt='Notification'>` 是否需国际化）。
- [ ] **第三方库或硬编码字符串**（如 `console.log` 提示不需国际化，但用户可见的必须处理）。
- [ ] **代码注释**不需国际化，但用户 UI 文案必须全部覆盖。
- [ ] **错误边界捕获的用户提示**需走 `t()`。

## 5. 检查流程建议
1. **目录扫描**：使用 `search_content` 查找未被 `t()` 包裹的字符串（排除 `<Trans>`、变量、路径等）。
2. **模块遍历**：按 menu 列表逐个页面检查（chatflows、agentflows、tools、credentials、documentStores、variables、assistants、marketplaces）。
3. **交叉比对**：对照 `common.json` 键树，查漏补缺。
4. **测试切换**：在 UI 切换中英文，验证所有文本是否正确显示。
5. **Lint 检查**：修改后跑 `read_lints` 保证无语法/运行错误。

## 6. 已完成模块标记
- [x] **assistants** – 完整国际化（界面、对话框、表格、通知）
- [x] **marketplaces** – 完整国际化（界面、表格、节点、对话框按钮）
- [x] **chatflows** – 完整国际化（主页面、列表、APICodeDialog 等，已补全 `apiCodeDialog.chooseApiKey` 键及引用）
- [x] **agentflows** – 完整国际化（主页面、列表、空状态、视图切换，无硬编码）
- [x] **tools** – 完整国际化（主页面、表格、对话框，修复表头 Name/Description 硬编码）
- [x] **credentials** – 完整国际化（主页面、列表弹窗，修复 Search credential / Clear Search 硬编码）
- [x] **documentStores** – 完整国际化（主页面、对话框，修复 Add/Delete 按钮及 Checkbox label 硬编码）
- [x] **variables** – 完整国际化（主页面、对话框，补充 actions/load/delete/howToUseIntro1-5 键，修复 AddEditVariableDialog 和 HowToUseVariablesDialog 硬编码）
- [x] **login** – 完整国际化（LoginDialog 组件、chatbot/agentflows/chatflows 页面调用处，修复硬编码文本）
- [x] **dropdown 组件** – 完全国际化（修复所有 'Choose an option' 硬编码，添加 useTranslation 导入）
- [x] **NvidiaNIMDialog** – 完整国际化（标题、步骤数组、提示段落、按钮文字及所有 alert 消息）
- [x] **File 组件** – 完整国际化（文件上传提示和按钮文本）
- [x] **LanguageSwitcher** – 完整国际化（语言名称显示）
- [x] **ViewMessagesDialog** – 完整国际化（Export 按钮）
- [x] **profile / settings** – 完整国际化（所有菜单项和对话框文本）
- [x] **canvas 公共区块** – 完整国际化（CanvasHeader、CanvasNode、NodeInputHandler、NodeOutputHandler、CredentialInputHandler 组件，修复所有硬编码标题和按钮文本）
- [x] **其它弹窗** – 完整国际化（ExportAsTemplateDialog、ChatFeedbackContentDialog、ManageScrapedLinksDialog，修复所有硬编码消息、标题和按钮文本）
- [x] **apikey 页面** – 完整国际化（APIKey 和 APIKeyDialog 组件，修复所有硬编码文本、按钮和提示信息）

## 7. 备注
- 本清单用于跟踪国际化进度，建议配合 Git 提交记录同步更新完成状态。
- 每完成一个模块，及时在 `common.json` 补充对应翻译键，保证键和值完整。