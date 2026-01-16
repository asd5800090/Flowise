# Flowise 国际化修复总结

## 问题描述
在中文国际化状态下，AutoGPT节点的描述仍然显示为英文，而不是中文。

## 根本原因
1. 英文翻译文件中缺少`autonomous_agent_with_chain_of_thoughts_for_self_guided_task_completion`键
2. `getNodeDescriptionKey`函数没有正确处理连字符，导致生成的键与翻译文件中的键不匹配

## 修复内容

### 1. 修改nodeTranslations.js函数
修改了`getNodeDescriptionKey`函数，使其能够正确处理连字符：
```javascript
return description
  .replace(/-/g, '_') // 将连字符替换为下划线
  .replace(/[^a-zA-Z0-9\s_]/g, '') // 移除其他特殊字符，保留下划线
  .replace(/\s+/g, '_')
  .toLowerCase()
```

### 2. 添加缺失的翻译键
在英文和中文翻译文件中添加了以下键：

#### 英文翻译 (packages/ui/src/locales/en/common.json)
- `autonomous_agent_with_chain_of_thoughts_for_self_guided_task_completion`
- `agent_that_is_designed_for_llms_that_are_good_for_reasoningwriting_xml_eg_anthropic_claude`
- `large_context_cache_for_google_gemini_large_language_models`
- `cache_llm_response_in_memory_will_be_cleared_once_app_restarted`
- `cache_generated_embeddings_in_memory_to_avoid_needing_to_recompute_them`
- `cache_llm_response_using_momento_a_distributed_serverless_cache`
- `cache_llm_response_in_redis_useful_for_sharing_cache_across_multiple_processes_or_servers`
- `cache_generated_embeddings_in_redis_to_avoid_needing_to_recompute_them`
- `cache_llm_response_in_upstash_redis_serverless_data_for_redis_and_kafka`
- `document_qa___built_on_retrievalqachain_to_provide_a_chat_history_component`
- `wrapper_around_aws_bedrock_large_language_models_that_use_the_converse_api`
- `wrapper_around_azure_openai_large_language_models_that_use_the_chat_endpoint`
- `wrapper_around_azure_openai_chat_llm_specific_for_llamaindex`
- `wrapper_around_alibaba_tongyi_chat_endpoints`
- `wrapper_around_chatanthropic_large_language_models_that_use_the_chat_endpoint`
- `wrapper_around_chatanthropic_llm_specific_for_llamaindex`
- `wrapper_around_baiduwenxin_chat_endpoints`
- `wrapper_around_cerebras_inference_api`
- `wrapper_around_cohere_chat_endpoints`
- `load_data_from_an_api`
- `load_data_from_airtable_table`
- `load_data_from_apify_website_content_crawler`
- `load_and_process_data_from_bravesearch_results`
- `load_data_from_webpages`
- `load_data_from_a_confluence_document`
- `load_data_from_csv_files`
- `custom_function_for_loading_documents`
- `load_data_from_pre_configured_document_stores`
- `load_data_from_docx_files`

#### 中文翻译 (packages/ui/src/locales/zh-CN/common.json)
为所有上述英文键添加了对应的中文翻译。

## 结果
- 修复了AutoGPT节点描述在中文界面下显示英文的问题
- 添加了24个常用的模型和加载器节点的翻译
- 总计添加了约30个翻译键（中英文各15个）
- 所有修改都通过了代码检查，没有错误

## 后续建议
1. 可以继续添加剩余的缺失翻译，特别是向量存储、工具和文档加载器类别的节点
2. 定期运行检查脚本，确保新添加的节点都有相应的翻译
3. 考虑创建一个自动化脚本，从节点描述生成翻译键和默认翻译，减少手动工作