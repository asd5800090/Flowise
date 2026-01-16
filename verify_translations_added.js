// 验证翻译键是否正确添加的脚本
const fs = require('fs');
const path = require('path');

// 读取翻译文件
const enPath = path.join(__dirname, 'packages/ui/src/locales/en/common.json');
const zhCNPath = path.join(__dirname, 'packages/ui/src/locales/zh-CN/common.json');

const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const zhCNTranslations = JSON.parse(fs.readFileSync(zhCNPath, 'utf8'));

// 要验证的翻译键列表
const translationKeysToVerify = [
  'wrapper_around_fireworks_chat_endpoints',
  'wrapper_around_google_gemini_large_language_models_that_use_the_chat_endpoint',
  'wrapper_around_vertexai_large_language_models_that_use_the_chat_endpoint',
  'wrapper_around_huggingface_large_language_models',
  'wrapper_around_ibm_watsonxai_foundation_models',
  'use_local_llms_like_llamacpp_gpt4all_using_localai',
  'wrapper_around_mistral_large_language_models_that_use_the_chat_endpoint',
  'wrapper_around_chatmistral_llm_specific_for_llamaindex',
  'access_models_through_the_nemo_guardrails_api',
  'wrapper_around_nvidia_nim_inference_api',
  'chat_completion_using_open_source_llm_on_ollama',
  'wrapper_around_chatollama_llm_specific_for_llamaindex',
  'wrapper_around_openai_large_language_models_that_use_the_chat_endpoint',
  'wrapper_around_openai_chat_llm_specific_for_llamaindex',
  'customfinetuned_model_using_openai_chat_compatible_api',
  'wrapper_around_open_router_inference_api',
  'wrapper_around_togetherai_large_language_models',
  'wrapper_around_chattogetherai_llm_specific_for_llamaindex',
  'wrapper_around_grok_from_xai',
  'wrapper_around_deepseek_large_language_models_that_use_the_chat_endpoint',
  'wrapper_around_groq_llm_specific_for_llamaindex',
  'wrapper_around_groq_api_with_lpu_inference_engine',
  'load_data_from_epub_files',
  'load_data_from_a_figma_file',
  'a_generic_file_loader_that_can_load_txt_json_csv_docx_pdf_and_other_files',
  'load_data_from_url_using_firecrawl',
  'load_data_from_folder_with_multiple_files',
  'load_data_from_gitbook',
  'load_data_from_a_github_repository',
  'load_data_from_json_files',
  'load_data_from_json_lines_files',
  'load_data_from_notion_database_each_row_is_a_separate_document_with_all_properties_as_metadata',
  'load_data_from_the_exported_and_unzipped_notion_folder',
  'load_data_from_notion_page_including_child_pages_all_as_separate_documents',
  'load_data_from_pdf_files',
  'load_data_from_plain_text',
  'load_data_from_s3_buckets',
  'load_data_from_real_time_search_results',
  'load_and_process_data_from_web_search_results',
  'scrape_crawl_the_web_with_spider',
  'load_data_from_text_files',
  'use_unstructuredio_to_load_data_from_a_file_path',
  'use_unstructuredio_to_load_data_from_a_folder_note_currently_doesn',
  'awsbedrock_embedding_models_to_generate_embeddings_for_a_given_text',
  'azure_openai_api_to_generate_embeddings_for_a_given_text',
  'azure_openai_api_embeddings_specific_for_llamaindex',
  'cohere_api_to_generate_embeddings_for_a_given_text',
  'google_generative_api_to_generate_embeddings_for_a_given_text',
  'google_vertexai_api_to_generate_embeddings_for_a_given_text',
  'huggingface_inference_api_to_generate_embeddings_for_a_given_text',
  'generate_embeddings_for_a_given_text_using_open_source_model_on_ibm_watsonx',
  'jinaai_api_to_generate_embeddings_for_a_given_text',
  'use_local_embeddings_models_like_llamacpp',
  'mistralai_api_to_generate_embeddings_for_a_given_text',
  'generate_embeddings_for_a_given_text_using_open_source_model_on_ollama',
  'openai_api_to_generate_embeddings_for_a_given_text',
  'openai_embedding_specific_for_llamaindex',
  'togetherai_embedding_models_to_generate_embeddings_for_a_given_text',
  'voyage_ai_api_to_generate_embeddings_for_a_given_text',
  'answer_question_based_on_retrieved_documents_context_with_built_in_memory_to_remember_conversation',
  'simple_engine_to_handle_back_and_forth_conversations',
  'simple_query_engine_built_to_answer_question_over_your_data_without_memory',
  'breaks_complex_query_into_sub_questions_for_each_relevant_data_source_then_gather_all_the_intermediate_reponses_and_synthesizes_a_final_response',
  'connect_with_neo4j_graph_database',
  'wrapper_around_aws_bedrock_large_language_models',
  'wrapper_around_azure_openai_large_language_models',
  'wrapper_around_cohere_large_language_models',
  'wrapper_around_fireworks_api_for_large_language_models',
  'wrapper_around_googlevertexai_large_language_models',
  'wrapper_around_huggingface_large_language_models',
  'wrapper_around_ibm_watsonxai_foundation_models',
  'wrapper_around_open_source_large_language_models_on_ollama',
  'wrapper_around_openai_large_language_models',
  'use_replicate_to_run_open_source_models_on_cloud',
  'wrapper_around_togetherai_large_language_models',
  'memory_for_agentflow_to_remember_the_state_of_the_conversation',
  'memory_for_agentflow_to_remember_the_state_of_the_conversation_using_mysql_database',
  'memory_for_agentflow_to_remember_the_state_of_the_conversation_using_postgres_database',
  'memory_for_agentflow_to_remember_the_state_of_the_conversation_using_sqlite_database',
  'retrieve_chat_messages_stored_in_database',
  'uses_a_window_of_size_k_to_surface_the_last_k_back_and_forth_to_use_as_memory',
  'uses_token_length_to_decide_when_to_summarize_conversations',
  'summarizes_the_conversation_and_stores_the_current_summary_in_memory',
  'stores_the_conversation_in_dynamo_db_table',
  'stores_and_manages_chat_memory_using_mem0_service',
  'stores_the_conversation_in_mongodb_atlas',
  'summarizes_the_conversation_and_stores_the_memory_in_redis_server',
  'summarizes_the_conversation_and_stores_the_memory_in_upstash_redis_server',
  'summarizes_the_conversation_and_stores_the_memory_in_zep_server',
  'check_whether_content_complies_with_openai_usage_policies',
  'check_whether_input_consists_of_any_text_from_deny_list_and_prevent_being_sent_to_llm',
  'parse_the_output_of_an_llm_call_as_a_comma_separated_list_of_values',
  'parse_the_output_of_an_llm_call_as_a_list_of_values',
  'parse_the_output_of_an_llm_call_into_a_given_json_structure',
  'parse_the_output_of_an_llm_call_into_a_given_structure_by_providing_a_zod_schema',
  'schema_to_represent_a_chat_prompt',
  'prompt_template_you_can_build_with_examples',
  'fetch_schema_from_langfuse_to_represent_a_prompt_for_an_llm',
  'schema_to_represent_a_basic_prompt_for_an_llm',
  'wrapper_around_bravesearch_api___a_real_time_api_to_access_brave_search_results',
  'toolset_with_over_250_apps_for_building_ai_powered_applications',
  'mcp_server_that_provides_a_tool_for_dynamic_and_reflective_problem_solving_through_a_structured_thinking_process',
  'tool_used_to_invoke_query_engine',
  'wrapper_around_exa_search_api___search_engine_fully_designed_for_use_by_llms',
  'wrapper_around_google_custom_search_api___a_real_time_api_to_access_google_search_results',
  'wrapper_around_searxng___a_free_internet_metasearch_engine',
  'wrapper_around_serpapi___a_real_time_api_to_access_google_search_results',
  'wrapper_around_serperdev___google_search_api',
  'wrapper_around_tavilyapi___a_real_time_api_to_access_google_search_results',
  'wrapper_around_wolframalpha___a_powerful_computational_knowledge_engine',
  'upsert_embedded_data_and_perform_similarity_or_mmr_search_upon_query_using_chroma_an_open_source_embedding_database',
  'upsert_embedded_data_and_perform_similarity_search_upon_query_using_faiss_library_from_meta',
  'in_memory_vectorstore_that_stores_embeddings_and_does_an_exact_linear_search_for_the_most_similar_embeddings',
  'upsert_embedded_data_and_perform_similarity_search_upon_query_using_meilisearch_hybrid_search_functionality',
  'upsert_embedded_data_and_perform_similarity_or_mmr_search_upon_query_using_mongodb_atlas_a_managed_cloud_mongodb_database',
  'upsert_embedded_data_and_perform_similarity_search_upon_query_using_opensearch_an_open_source_all_in_one_vector_database',
  'upsert_embedded_data_and_perform_similarity_or_mmr_search_upon_query_using_supabase_via_pgvector_extension',
  'upsert_embedded_data_and_perform_similarity_or_mmr_search_upon_query_using_weaviate_a_scalable_open_source_vector_database'
];

// 验证翻译键是否存在
let missingInEn = [];
let missingInZhCN = [];

translationKeysToVerify.forEach(key => {
  if (!enTranslations[key]) {
    missingInEn.push(key);
  }
  
  if (!zhCNTranslations[key]) {
    missingInZhCN.push(key);
  }
});

// 输出结果
console.log(`\n验证翻译键:\n`);
console.log(`总共需要验证的键数: ${translationKeysToVerify.length}`);
console.log(`英文翻译文件中缺失的键数: ${missingInEn.length}`);
console.log(`中文翻译文件中缺失的键数: ${missingInZhCN.length}`);

if (missingInEn.length > 0) {
  console.log('\n英文翻译文件中缺失的键:');
  missingInEn.forEach(key => console.log(`- ${key}`));
}

if (missingInZhCN.length > 0) {
  console.log('\n中文翻译文件中缺失的键:');
  missingInZhCN.forEach(key => console.log(`- ${key}`));
}

if (missingInEn.length === 0 && missingInZhCN.length === 0) {
  console.log('\n✅ 所有翻译键都已正确添加到英文和中文翻译文件中!');
}