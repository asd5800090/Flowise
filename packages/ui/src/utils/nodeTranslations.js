import { useTranslation } from 'react-i18next'

// 节点描述翻译映射
const nodeDescriptionTranslations = {
  "Conversational agent for a chat model. It will utilize chat specific prompts": "对话模型的会话智能体。它将使用特定于聊天的提示",
  "Split documents recursively by different characters - starting with \"\\n\\n\", then \"\\n\", then \" \"": "按不同字符递归分割文档 - 从\"\\n\\n\"开始，然后是\"\\n\"，最后是\" \"",
  "splits only on one type of character (defaults to \"\\n\\n\").": "仅按一种字符类型分割（默认为\"\\n\\n\"）",
  "Agent that is optimized for being used in a conversational setting": "针对对话场景优化的智能体",
  "Agent that is optimized for being used with a LLM": "针对与大语言模型配合使用的智能体",
  "Agent that uses the ReAct framework to decide which tool to use, based on the tool's description": "使用ReAct框架根据工具描述决定使用哪个工具的智能体",
  "AutoGPT Agent that can complete a task with human guidance": "可以在人类指导下完成任务AutoGPT智能体",
  "BabyAGI Agent that can create and execute tasks based on a given objective": "可以根据给定目标创建和执行任务的BabyAGI智能体",
  "Tool calling agent optimized for being used with OpenAI assistants": "针对OpenAI助手优化的工具调用智能体",
  "Agent that uses XML to prompt the model": "使用XML提示模型的智能体",
  "A simple chain that uses a chat model and a prompt template": "使用聊天模型和提示模板的简单链",
  "A chain that uses a chat model, a prompt, and an output parser": "使用聊天模型、提示和输出解析器的链",
  "A chain that uses an LLM to generate a response based on a prompt": "使用LLM根据提示生成响应的链",
  "A chain that uses an LLM to answer questions based on the contents of retrieved documents": "使用LLM根据检索到的文档内容回答问题的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of documents": "使用LLM根据提示和一组文档生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of tools": "使用LLM根据提示和一组工具生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of actions": "使用LLM根据提示和一组动作生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of memories": "使用LLM根据提示和一组记忆生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of variables": "使用LLM根据提示和一组变量生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of conditions": "使用LLM根据提示和一组条件生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of filters": "使用LLM根据提示和一组过滤器生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of transformations": "使用LLM根据提示和一组转换生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of embeddings": "使用LLM根据提示和一组嵌入生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of vectors": "使用LLM根据提示和一组向量生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of indices": "使用LLM根据提示和一组索引生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of retrievers": "使用LLM根据提示和一组检索器生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of parsers": "使用LLM根据提示和一组解析器生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of synthesizers": "使用LLM根据提示和一组合成器生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of agents": "使用LLM根据提示和一组智能体生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of chains": "使用LLM根据提示和一组链生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of models": "使用LLM根据提示和一组模型生成响应的链",
  "A chain that uses an LLM to generate a response based on a prompt and a set of prompts": "使用LLM根据提示和一组提示生成响应的链",
  "Base class for all chat models": "所有聊天模型的基类",
  "Base class for all language models": "所有语言模型的基类",
  "Base class for all embedding models": "所有嵌入模型的基类",
  "Base class for all vector stores": "所有向量存储的基类",
  "Base class for all document loaders": "所有文档加载器的基类",
  "Base class for all text splitters": "所有文本分割器的基类",
  "Base class for all agents": "所有智能体的基类",
  "Base class for all chains": "所有链的基类",
  "Base class for all prompts": "所有提示的基类",
  "Base class for all memories": "所有记忆的基类",
  "Base class for all tools": "所有工具的基类",
  "Base class for all output parsers": "所有输出解析器的基类",
  "Base class for all retrievers": "所有检索器的基类",
  "Base class for all text transformers": "所有文本转换器的基类",
  "Base class for all utilities": "所有工具的基类",
  "Base class for all record managers": "所有记录管理器的基类",
  "Base class for all analytics": "所有分析工具的基类",
  "Base class for all audio models": "所有音频模型的基类",
  "Base class for all data models": "所有数据模型的基类",
  "Base class for all file models": "所有文件模型的基类",
  "Base class for all image models": "所有图像模型的基类",
  "Base class for all video models": "所有视频模型的基类",
  "Base class for all web models": "所有网络模型的基类",
  "Base class for all other models": "所有其他模型的基类",
  "Base class for all cache models": "所有缓存模型的基类",
  "Base class for all graph models": "所有图模型的基类",
  "Base class for all moderation models": "所有审核模型的基类",
  "Base class for all MCP tools": "所有MCP工具的基类",
  "Base class for all engines": "所有引擎的基类",
  "Base class for all response synthesizers": "所有响应合成器的基类"
}

// 翻译节点描述的函数
export const translateNodeDescription = (description, language = 'zh-CN') => {
  if (language === 'zh-CN' && nodeDescriptionTranslations[description]) {
    return nodeDescriptionTranslations[description]
  }
  return description
}

// 使用React Hook的翻译函数
export const useNodeTranslations = () => {
  const { i18n } = useTranslation()
  
  const translateDescription = (description) => {
    return translateNodeDescription(description, i18n.language)
  }
  
  return {
    translateDescription
  }
}

export default translateNodeDescription