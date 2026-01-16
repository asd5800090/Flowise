#!/usr/bin/env python3
import json
import sys
import os

def find_case_insensitive_duplicates(obj, path=''):
    """Find keys that are the same when ignoring case"""
    duplicates = []
    if isinstance(obj, dict):
        # Create a mapping of lowercase key to original keys
        key_map = {}
        for k in obj.keys():
            lower_k = k.lower()
            if lower_k in key_map:
                # Found a case-insensitive duplicate
                duplicates.append({
                    'path': path,
                    'key': k,
                    'conflicts_with': key_map[lower_k],
                    'message': f"Case-insensitive duplicate: '{k}' vs '{key_map[lower_k]}'"
                })
            else:
                key_map[lower_k] = k
        
        # Recursively check nested objects
        for k, v in obj.items():
            key_path = f'{path}.{k}' if path else k
            duplicates.extend(find_case_insensitive_duplicates(v, key_path))
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            duplicates.extend(find_case_insensitive_duplicates(item, f'{path}[{i}]'))
    return duplicates

def check_file(filepath):
    """Check a JSON file for case-insensitive duplicate keys"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        duplicates = find_case_insensitive_duplicates(data)
        if duplicates:
            print(f"\n🔴 Case-insensitive duplicates found in {filepath}:")
            for dup in duplicates:
                print(f"   - {dup['message']} at path: {dup['path']}")
            return True
        else:
            print(f"\n✅ No case-insensitive duplicates in {filepath}")
            return False
    except Exception as e:
        print(f"\n❌ Error reading {filepath}: {e}")
        return False

if __name__ == "__main__":
    base_dir = "/home/yjs/Flowise/packages/ui/src/locales"
    files = ["en/common.json", "zh-CN/common.json"]
    
    found_duplicates = False
    for filename in files:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            if check_file(filepath):
                found_duplicates = True
        else:
            print(f"\n⚠️  File not found: {filepath}")
    
    if found_duplicates:
        print("\n❌ Found case-insensitive duplicate keys!")
        sys.exit(1)
    else:
        print("\n🎉 All files checked, no case-insensitive duplicates found!")
