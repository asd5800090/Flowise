# Flowise 国际化更新总结

## 更新时间
2026年1月16日

## 更新内容
本次更新添加了大量节点描述的翻译键，主要包括以下类别：

### 1. 模型节点翻译
- 添加了20+个大语言模型节点的英文和中文翻译
- 包括Fireworks、Google Gemini、VertexAI、HuggingFace、IBM watsonx、Mistral、NVIDIA NIM、Ollama、OpenAI、TogetherAI、XAI、Deepseek和Groq等模型

### 2. 文档加载器翻译
- 添加了20+个文档加载器节点的英文和中文翻译
- 包括EPUB、Figma、通用文件加载器、FireCrawl、GitBook、GitHub、JSON、Notion、PDF、S3、Spider和Unstructured.io等加载器

### 3. 嵌入模型翻译
- 添加了15+个嵌入模型节点的英文和中文翻译
- 包括AWS Bedrock、Azure OpenAI、Cohere、Google Generative、Google VertexAI、HuggingFace、IBM Watsonx、JinaAI、MistralAI、Ollama、OpenAI、TogetherAI和Voyage AI等嵌入模型

### 4. 记忆相关翻译
- 添加了10+个记忆相关节点的英文和中文翻译
- 包括对话记忆、数据库存储、记忆窗口、对话总结等功能

### 5. 工具相关翻译
- 添加了10+个工具节点的英文和中文翻译
- 包括BraveSearch、Exa Search、Google Custom Search、SearXNG、SerpAPI、Serper.dev、TavilyAPI和WolframAlpha等工具

### 6. 向量存储翻译
- 添加了10+个向量存储节点的英文和中文翻译
- 包括Chroma、Faiss、Meilisearch、MongoDB Atlas、OpenSearch、Supabase和Weaviate等向量存储

## 已知问题
- 翻译文件中存在一些重复的键，但这些是预先存在的问题，不是本次更新导致的
- 已尽可能减少新增的重复键

## 文件更新
- `/home/yjs/Flowise/packages/ui/src/locales/en/common.json` - 添加了英文翻译
- `/home/yjs/Flowise/packages/ui/src/locales/zh-CN/common.json` - 添加了中文翻译

## 后续建议
1. 可以考虑创建自动化脚本，在新节点添加时自动生成翻译键
2. 定期检查并修复重复的翻译键
3. 考虑为不常用节点也添加翻译，以实现完整的国际化支持