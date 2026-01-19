/**
 * 节点类型注册表 - 为每个节点类型提供标准化的翻译键
 */

// 节点类型到翻译键的映射
const nodeRegistry = {
  // Agents 代理
  'agents/conversational': 'nodes.agents.conversational',
  'agents/react': 'nodes.agents.react',
  'agents/autogpt': 'nodes.agents.autogpt',
  'agents/xml': 'nodes.agents.xml',
  'agents/zeroShotReact': 'nodes.agents.zeroShotReact',
  'agents/structuredChat': 'nodes.agents.structuredChat',
  'agents/openAIAssistant': 'nodes.agents.openAIAssistant',
  'agents/openAIFunctions': 'nodes.agents.openAIFunctions',
  'agents/anthropicFunctions': 'nodes.agents.anthropicFunctions',
  'agents/babyAGI': 'nodes.agents.babyAGI',
  'agents/planAndExecute': 'nodes.agents.planAndExecute',
  'agents/airtable': 'nodes.agents.airtable',
  'agents/csv': 'nodes.agents.csv',
  'agents/conversationalRetrievalTool': 'nodes.agents.conversationalRetrievalTool',
  'agents/tool': 'nodes.agents.tool',
  
  // Chat Models 聊天模型
  'chatmodels/openai': 'nodes.chatModels.openai',
  'chatmodels/anthropic': 'nodes.chatModels.anthropic',
  'chatmodels/azureOpenai': 'nodes.chatModels.azureOpenai',
  'chatmodels/google': 'nodes.chatModels.google',
  'chatmodels/mistral': 'nodes.chatModels.mistral',
  'chatmodels/ollama': 'nodes.chatModels.ollama',
  'chatmodels/fireworks': 'nodes.chatModels.fireworks',
  'chatmodels/cohere': 'nodes.chatModels.cohere',
  'chatmodels/awsBedrock': 'nodes.chatModels.awsBedrock',
  'chatmodels/alibabaTongyi': 'nodes.chatModels.alibabaTongyi',
  'chatmodels/baiduWenxin': 'nodes.chatModels.baiduWenxin',
  'chatmodels/cerebras': 'nodes.chatModels.cerebras',
  'chatmodels/googleVertexAI': 'nodes.chatModels.googleVertexAI',
  'chatmodels/huggingFace': 'nodes.chatModels.huggingFace',
  'chatmodels/ibmWatsonx': 'nodes.chatModels.ibmWatsonx',
  'chatmodels/localAI': 'nodes.chatModels.localAI',
  'chatmodels/nemoGuardrails': 'nodes.chatModels.nemoGuardrails',
  'chatmodels/nvidiaNIM': 'nodes.chatModels.nvidiaNIM',
  'chatmodels/openAICustom': 'nodes.chatModels.openAICustom',
  'chatmodels/openRouter': 'nodes.chatModels.openRouter',
  'chatmodels/togetherAI': 'nodes.chatModels.togetherAI',
  'chatmodels/xAI': 'nodes.chatModels.xAI',
  'chatmodels/deepseek': 'nodes.chatModels.deepseek',
  'chatmodels/groq': 'nodes.chatModels.groq',
  
  // LLMs 大语言模型
  'llms/openai': 'nodes.llms.openai',
  'llms/anthropic': 'nodes.llms.anthropic',
  'llms/azureOpenai': 'nodes.llms.azureOpenai',
  'llms/google': 'nodes.llms.google',
  'llms/mistral': 'nodes.llms.mistral',
  'llms/ollama': 'nodes.llms.ollama',
  'llms/fireworks': 'nodes.llms.fireworks',
  'llms/cohere': 'nodes.llms.cohere',
  'llms/awsBedrock': 'nodes.llms.awsBedrock',
  'llms/huggingFaceInference': 'nodes.llms.huggingFaceInference',
  'llms/ibmWatsonx': 'nodes.llms.ibmWatsonx',
  'llms/replicate': 'nodes.llms.replicate',
  'llms/togetherAI': 'nodes.llms.togetherAI',
  
  // Document Loaders 文档加载器
  'loaders/api': 'nodes.documentLoaders.api',
  'loaders/csv': 'nodes.documentLoaders.csv',
  'loaders/pdf': 'nodes.documentLoaders.pdf',
  'loaders/text': 'nodes.documentLoaders.text',
  'loaders/json': 'nodes.documentLoaders.json',
  'loaders/docx': 'nodes.documentLoaders.docx',
  'loaders/folder': 'nodes.documentLoaders.folder',
  'loaders/web': 'nodes.documentLoaders.web',
  'loaders/notion': 'nodes.documentLoaders.notion',
  'loaders/airtable': 'nodes.documentLoaders.airtable',
  'loaders/apifyWebsiteContentCrawler': 'nodes.documentLoaders.apifyWebsiteContentCrawler',
  'loaders/braveSearchAPI': 'nodes.documentLoaders.braveSearchAPI',
  'loaders/cheerio': 'nodes.documentLoaders.cheerio',
  'loaders/confluence': 'nodes.documentLoaders.confluence',
  'loaders/customDocumentLoader': 'nodes.documentLoaders.customDocumentLoader',
  'loaders/documentStore': 'nodes.documentLoaders.documentStore',
  'loaders/epub': 'nodes.documentLoaders.epub',
  'loaders/figma': 'nodes.documentLoaders.figma',
  'loaders/file': 'nodes.documentLoaders.file',
  'loaders/fireCrawl': 'nodes.documentLoaders.fireCrawl',
  'loaders/gitbook': 'nodes.documentLoaders.gitbook',
  'loaders/github': 'nodes.documentLoaders.github',
  'loaders/jsonlines': 'nodes.documentLoaders.jsonlines',
  'loaders/plainText': 'nodes.documentLoaders.plainText',
  'loaders/playwright': 'nodes.documentLoaders.playwright',
  'loaders/puppeteer': 'nodes.documentLoaders.puppeteer',
  'loaders/s3Directory': 'nodes.documentLoaders.s3Directory',
  'loaders/s3File': 'nodes.documentLoaders.s3File',
  'loaders/searchApi': 'nodes.documentLoaders.searchApi',
  'loaders/serpApi': 'nodes.documentLoaders.serpApi',
  'loaders/spider': 'nodes.documentLoaders.spider',
  'loaders/unstructured': 'nodes.documentLoaders.unstructured',
  'loaders/vectorStoreToDocument': 'nodes.documentLoaders.vectorStoreToDocument',
  
  // Text Splitters 文本分割器
  'textSplitters/recursiveCharacter': 'nodes.textSplitters.recursiveCharacter',
  'textSplitters/character': 'nodes.textSplitters.character',
  'textSplitters/token': 'nodes.textSplitters.token',
  'textSplitters/markdown': 'nodes.textSplitters.markdown',
  'textSplitters/code': 'nodes.textSplitters.code',
  'textSplitters/htmlToMarkdown': 'nodes.textSplitters.htmlToMarkdown',
  
  // Embeddings 嵌入模型
  'embeddings/openai': 'nodes.embeddings.openai',
  'embeddings/cohere': 'nodes.embeddings.cohere',
  'embeddings/google': 'nodes.embeddings.google',
  'embeddings/huggingface': 'nodes.embeddings.huggingface',
  'embeddings/mistral': 'nodes.embeddings.mistral',
  'embeddings/awsBedrock': 'nodes.embeddings.awsBedrock',
  'embeddings/azureOpenAI': 'nodes.embeddings.azureOpenAI',
  'embeddings/googleVertexAI': 'nodes.embeddings.googleVertexAI',
  'embeddings/ibmWatsonx': 'nodes.embeddings.ibmWatsonx',
  'embeddings/jinaAI': 'nodes.embeddings.jinaAI',
  'embeddings/localAI': 'nodes.embeddings.localAI',
  'embeddings/ollama': 'nodes.embeddings.ollama',
  'embeddings/openAICustom': 'nodes.embeddings.openAICustom',
  'embeddings/togetherAI': 'nodes.embeddings.togetherAI',
  'embeddings/voyageAI': 'nodes.embeddings.voyageAI',
  
  // Vector Stores 向量存储
  'vectorstores/pinecone': 'nodes.vectorStores.pinecone',
  'vectorstores/faiss': 'nodes.vectorStores.faiss',
  'vectorstores/chroma': 'nodes.vectorStores.chroma',
  'vectorstores/weaviate': 'nodes.vectorStores.weaviate',
  'vectorstores/qdrant': 'nodes.vectorStores.qdrant',
  'vectorstores/redis': 'nodes.vectorStores.redis',
  'vectorstores/astra': 'nodes.vectorStores.astra',
  'vectorstores/couchbase': 'nodes.vectorStores.couchbase',
  'vectorstores/documentStore': 'nodes.vectorStores.documentStore',
  'vectorstores/elasticsearch': 'nodes.vectorStores.elasticsearch',
  'vectorstores/inMemory': 'nodes.vectorStores.inMemory',
  'vectorstores/meilisearch': 'nodes.vectorStores.meilisearch',
  'vectorstores/milvus': 'nodes.vectorStores.milvus',
  'vectorstores/mongoDBAtlas': 'nodes.vectorStores.mongoDBAtlas',
  'vectorstores/openSearch': 'nodes.vectorStores.openSearch',
  'vectorstores/postgres': 'nodes.vectorStores.postgres',
  'vectorstores/simpleStore': 'nodes.vectorStores.simpleStore',
  'vectorstores/singlestore': 'nodes.vectorStores.singlestore',
  'vectorstores/supabase': 'nodes.vectorStores.supabase',
  'vectorstores/upstash': 'nodes.vectorStores.upstash',
  'vectorstores/vectara': 'nodes.vectorStores.vectara',
  'vectorstores/zep': 'nodes.vectorStores.zep',
  'vectorstores/zepCloud': 'nodes.vectorStores.zepCloud',
  
  // Tools 工具
  'tools/serper': 'nodes.tools.serper',
  'tools/serpapi': 'nodes.tools.serpapi',
  'tools/wolfram': 'nodes.tools.wolfram',
  'tools/calculator': 'nodes.tools.calculator',
  'tools/webBrowser': 'nodes.tools.webBrowser',
  'tools/braveSearchAPI': 'nodes.tools.braveSearchAPI',
  'tools/chainTool': 'nodes.tools.chainTool',
  'tools/chatflowTool': 'nodes.tools.chatflowTool',
  'tools/codeInterpreterE2B': 'nodes.tools.codeInterpreterE2B',
  'tools/composio': 'nodes.tools.composio',
  'tools/currentDateTime': 'nodes.tools.currentDateTime',
  'tools/customTool': 'nodes.tools.customTool',
  'tools/exaSearch': 'nodes.tools.exaSearch',
  'tools/googleSearchAPI': 'nodes.tools.googleSearchAPI',
  'tools/mcp': 'nodes.tools.mcp',
  'tools/openAPIToolkit': 'nodes.tools.openAPIToolkit',
  'tools/queryEngineTool': 'nodes.tools.queryEngineTool',
  'tools/readFile': 'nodes.tools.readFile',
  'tools/requestsGet': 'nodes.tools.requestsGet',
  'tools/requestsPost': 'nodes.tools.requestsPost',
  'tools/retrieverTool': 'nodes.tools.retrieverTool',
  'tools/searchApi': 'nodes.tools.searchApi',
  'tools/searxng': 'nodes.tools.searxng',
  'tools/stripeTool': 'nodes.tools.stripeTool',
  'tools/tavilyAPI': 'nodes.tools.tavilyAPI',
  'tools/writeFile': 'nodes.tools.writeFile',
  
  // Chains 链
  'chains/retrievalQA': 'nodes.chains.retrievalQA',
  'chains/conversationalRetrievalQA': 'nodes.chains.conversationalRetrievalQA',
  'chains/llmChain': 'nodes.chains.llmChain',
  'chains/apiChain': 'nodes.chains.apiChain',
  'chains/conversation': 'nodes.chains.conversation',
  'chains/graphCypherQA': 'nodes.chains.graphCypherQA',
  'chains/multiPrompt': 'nodes.chains.multiPrompt',
  'chains/multiRetrievalQA': 'nodes.chains.multiRetrievalQA',
  'chains/sqlDatabase': 'nodes.chains.sqlDatabase',
  'chains/vectara': 'nodes.chains.vectara',
  'chains/vectorDBQA': 'nodes.chains.vectorDBQA',
  
  // Memory 记忆
  'memory/buffer': 'nodes.memory.buffer',
  'memory/summary': 'nodes.memory.summary',
  'memory/entity': 'nodes.memory.entity',
  'memory/redis': 'nodes.memory.redis',
  'memory/agentMemory': 'nodes.memory.agentMemory',
  'memory/bufferWindow': 'nodes.memory.bufferWindow',
  'memory/conversationSummaryBuffer': 'nodes.memory.conversationSummaryBuffer',
  'memory/conversationSummary': 'nodes.memory.conversationSummary',
  'memory/dynamoDb': 'nodes.memory.dynamoDb',
  'memory/mem0': 'nodes.memory.mem0',
  'memory/mongoDB': 'nodes.memory.mongoDB',
  'memory/redisBackedChat': 'nodes.memory.redisBackedChat',
  'memory/upstashRedisBackedChat': 'nodes.memory.upstashRedisBackedChat',
  'memory/zep': 'nodes.memory.zep',
  'memory/zepCloud': 'nodes.memory.zepCloud',
  
  // Utilities 工具集
  'utilities/outputParser': 'nodes.utilities.outputParser',
  'utilities/stringTemplate': 'nodes.utilities.stringTemplate',
  'utilities/ifElse': 'nodes.utilities.ifElse',
  'utilities/customFunction': 'nodes.utilities.customFunction',
  'utilities/getVariable': 'nodes.utilities.getVariable',
  'utilities/setVariable': 'nodes.utilities.setVariable',
  'utilities/stickyNote': 'nodes.utilities.stickyNote',
  
  // Cache 缓存
  'cache/inMemory': 'nodes.cache.inMemory',
  'cache/redis': 'nodes.cache.redis',
  'cache/momento': 'nodes.cache.momento',
  'cache/googleGenerativeAIContext': 'nodes.cache.googleGenerativeAIContext',
  'cache/upstashRedis': 'nodes.cache.upstashRedis',
  
  // Analytics 分析
  'analytic/arize': 'nodes.analytic.arize',
  'analytic/langFuse': 'nodes.analytic.langFuse',
  'analytic/langSmith': 'nodes.analytic.langSmith',
  'analytic/langWatch': 'nodes.analytic.langWatch',
  'analytic/lunary': 'nodes.analytic.lunary',
  'analytic/opik': 'nodes.analytic.opik',
  'analytic/phoenix': 'nodes.analytic.phoenix',
  
  // Engine 引擎
  'engine/chat': 'nodes.engine.chat',
  'engine/query': 'nodes.engine.query',
  'engine/subQuestionQuery': 'nodes.engine.subQuestionQuery',
  
  // Multiagents 多智能体
  'multiagents/supervisor': 'nodes.multiagents.supervisor',
  'multiagents/worker': 'nodes.multiagents.worker',
  
  // Sequential Agents 顺序智能体
  'sequentialagents/agent': 'nodes.sequentialagents.agent',
  'sequentialagents/condition': 'nodes.sequentialagents.condition',
  'sequentialagents/conditionAgent': 'nodes.sequentialagents.conditionAgent',
  'sequentialagents/customFunction': 'nodes.sequentialagents.customFunction',
  'sequentialagents/end': 'nodes.sequentialagents.end',
  'sequentialagents/executeFlow': 'nodes.sequentialagents.executeFlow',
  'sequentialagents/llmNode': 'nodes.sequentialagents.llmNode',
  'sequentialagents/loop': 'nodes.sequentialagents.loop',
  'sequentialagents/start': 'nodes.sequentialagents.start',
  'sequentialagents/state': 'nodes.sequentialagents.state',
  'sequentialagents/toolNode': 'nodes.sequentialagents.toolNode',
  
  // Speech to Text 语音转文本
  'speechtotext/assemblyai': 'nodes.speechtotext.assemblyai',
}

/**
 * 根据节点类型获取对应的翻译键
 * @param {string} nodeType - 节点类型标识符
 * @returns {string} 对应的翻译键，如果未找到则返回null
 */
export const getNodeTranslationKey = (nodeType) => {
  return nodeRegistry[nodeType] || null
}

/**
 * 获取所有已注册的节点类型
 * @returns {string[]} 所有节点类型数组
 */
export const getAllNodeTypes = () => {
  return Object.keys(nodeRegistry)
}

/**
 * 验证翻译键是否存在
 * @param {string} nodeType - 节点类型
 * @param {string} translationKey - 翻译键
 * @returns {boolean} 是否有效
 */
export const validateTranslationKey = (nodeType, translationKey) => {
  const expectedKey = nodeRegistry[nodeType]
  return expectedKey === translationKey
}

/**
 * 获取节点分类映射
 * @returns {Object} 按分类组织的节点类型映射
 */
export const getNodeCategories = () => {
  const categories = {}
  
  Object.keys(nodeRegistry).forEach(nodeType => {
    const [category] = nodeType.split('/')
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(nodeType)
  })
  
  return categories
}

export default nodeRegistry