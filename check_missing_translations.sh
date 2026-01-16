#!/bin/bash

# 检查缺失翻译的脚本

# 合并所有描述到一个文件
cat /tmp/agent_descriptions.txt /tmp/chain_descriptions.txt /tmp/vectorstore_descriptions.txt /tmp/retriever_descriptions.txt /tmp/tool_descriptions.txt > /tmp/all_descriptions.txt

# 将描述转换为键名格式（小写，空格替换为下划线，特殊字符处理）
while read -r desc; do
  if [ -n "$desc" ]; then
    # 转换为键名格式
    key=$(echo "$desc" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_\|_$//g')
    echo "$key"
  fi
done < /tmp/all_descriptions.txt > /tmp/keys_list.txt

# 检查哪些键不在中文翻译文件中
zh_file="/home/yjs/Flowise/packages/ui/src/locales/zh-CN/common.json"

while read -r key; do
  if ! grep -q "\"$key\":" "$zh_file"; then
    echo "$key"
  fi
done < /tmp/keys_list.txt > /tmp/missing_keys.txt

echo "缺失的键数量: $(wc -l < /tmp/missing_keys.txt)"
echo "前几个缺失的键:"
head -20 /tmp/missing_keys.txt

# 显示对应的原始描述
echo ""
echo "对应的原始描述:"
count=0
while read -r desc; do
  if [ -n "$desc" ]; then
    key=$(echo "$desc" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_\|_$//g')
    if grep -q "^$key$" /tmp/missing_keys.txt; then
      echo "$key: $desc"
      ((count++))
      if [ $count -ge 20 ]; then
        break
      fi
    fi
  fi
done < /tmp/all_descriptions.txt