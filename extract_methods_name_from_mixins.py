import os
import re
import sys
import json

def extract_methods_name_from_mixin(mixin_name):
    """
    Extract method names from a Vue2 mixin file
    
    Args:
        mixin_name (str): Name of the mixin file (without extension)
    
    Returns:
        dict: Object containing method names categorized by type
    """
    try:
        mixin_path = os.path.join(os.path.dirname(__file__), 'mixins_to_migrate', f'{mixin_name}.js')
        
        if not os.path.exists(mixin_path):
            raise FileNotFoundError(f'Mixin file not found: {mixin_path}')

        with open(mixin_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Extract methods section - need to handle nested braces correctly
        methods_start = content.find('methods:')
        if methods_start == -1:
            print(f'No methods found in {mixin_name}')
            return {'crud': [], 'custom': [], 'all': []}
        
        # Find the opening brace after methods:
        brace_start = content.find('{', methods_start)
        if brace_start == -1:
            print(f'No methods object found in {mixin_name}')
            return {'crud': [], 'custom': [], 'all': []}
        
        # Count braces to find the matching closing brace
        brace_count = 0
        i = brace_start
        while i < len(content):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    break
            i += 1
        
        if brace_count != 0:
            print(f'Malformed methods object in {mixin_name}')
            return {'crud': [], 'custom': [], 'all': []}
        
        methods_section = content[brace_start + 1:i]
        
        # Debug: print a portion of the methods section
        print("DEBUG - Methods section preview:")
        print(methods_section[:500] + "..." if len(methods_section) > 500 else methods_section)
        print("=" * 50)
        
        # Extract individual method names - Vue2 mixin syntax: methodName: function() or methodName: async function()
        # Handle both single-line and multi-line method declarations
        method_pattern = r'([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(?:async\s+)?function\s*\([^)]*\)\s*\{'
        methods = re.findall(method_pattern, methods_section, re.MULTILINE | re.DOTALL)
        
        # Categorize methods
        crud_pattern = r'^(get|fetch|load|create|add|update|edit|delete|remove)'
        crud_methods = [method for method in methods if re.match(crud_pattern, method.lower())]
        custom_methods = [method for method in methods if not re.match(crud_pattern, method.lower())]

        result = {
            'mixinName': mixin_name,
            'crud': crud_methods,
            'custom': custom_methods,
            'all': methods
        }

        print('\n=== MIXIN ANALYSIS ===')
        print(f'Mixin: {mixin_name}')
        print(f'Total methods: {len(methods)}')
        print(f'methods: {len(custom_methods)}')
        
        if crud_methods:
            print('\nCRUD Methods:')
            for method in crud_methods:
                print(f'  - {method}')
        
        if custom_methods:
            print('Methods list:')
            for method in custom_methods:
                print(f'  - {method}')

        return result

    except Exception as error:
        print(f'Error extracting methods from {mixin_name}: {str(error)}')
        return {'crud': [], 'custom': [], 'all': []}

# CLI usage
if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python extract_methods_name_from_mixins.py <mixinName>')
        sys.exit(1)
    
    mixin_name = sys.argv[1]
    result = extract_methods_name_from_mixin(mixin_name)
    
    # Optionally output as JSON for programmatic use
    if len(sys.argv) > 2 and sys.argv[2] == '--json':
        print(json.dumps(result, indent=2))