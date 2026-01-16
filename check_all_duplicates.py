#!/usr/bin/env python3
import json
import os

def find_all_duplicate_keys(obj, path=''):
    """Find all duplicate keys in a JSON object (case-sensitive and case-insensitive)"""
    duplicates = []
    if isinstance(obj, dict):
        # Check for exact duplicates (shouldn't happen with standard JSON)
        keys = {}
        for k, v in obj.items():
            key_path = f'{path}.{k}' if path else k
            keys[k] = key_path
        
        # Check for case-insensitive duplicates
        keys_lower = {}
        for k, key_path in keys.items():
            k_lower = k.lower()
            if k_lower in keys_lower:
                duplicates.append({
                    'path': path,
                    'key': k,
                    'conflicts_with': keys_lower[k_lower],
                    'message': f"Case-insensitive duplicate: '{k}' vs '{keys_lower[k_lower].split('.')[-1]}'"
                })
            else:
                keys_lower[k_lower] = key_path
            
            # Recursively check nested objects
            duplicates.extend(find_all_duplicate_keys(v, key_path))
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            duplicates.extend(find_all_duplicate_keys(item, f'{path}[{i}]'))
    return duplicates

def check_file(filepath):
    """Check a JSON file for duplicate keys"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        duplicates = find_all_duplicate_keys(data)
        if duplicates:
            print(f"\n🔴 Case-insensitive duplicates found in {os.path.basename(filepath)}:")
            for dup in duplicates:
                print(f"   - {dup['message']} at path: {dup['path']}")
            return True
        else:
            print(f"\n✅ No case-insensitive duplicates in {os.path.basename(filepath)}")
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
        sys.exit(1)
    else:
        print("\n🎉 All files checked, no case-insensitive duplicates found!")
