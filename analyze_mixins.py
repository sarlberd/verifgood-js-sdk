import os
import re
from pathlib import Path

def analyze_mixin_file(file_path):
    """Analyze a single mixin file and extract method information"""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Extract all method definitions
    method_pattern = r'(\w+):\s*function\s*\([^)]*\)\s*\{'
    methods = re.findall(method_pattern, content)
      # Basic CRUD operations patterns for <entity>Mixins_<operation> format
    crud_patterns = [
        r'\w+Mixins_get$',        # EntityMixins_get (get single)
        r'\w+Mixins_getAll$',     # EntityMixins_getAll 
        r'\w+Mixins_get\w+$',     # EntityMixins_getXxx (but not complex ones)
        r'\w+Mixins_fetch$',      # EntityMixins_fetch (get single)
        r'\w+Mixins_fetchAll$',   # EntityMixins_fetchAll
        r'\w+Mixins_fetchById$',  # EntityMixins_fetchById
        r'\w+Mixins_create$',     # EntityMixins_create
        r'\w+Mixins_update$',     # EntityMixins_update
        r'\w+Mixins_delete$',     # EntityMixins_delete
        r'\w+Mixins_remove$',     # EntityMixins_remove
    ]
    
    # Identify basic CRUD methods
    basic_crud = []
    non_crud = []
    
    for method in methods:
        is_crud = False
        for pattern in crud_patterns:
            if re.search(pattern, method):
                # Additional check for simple CRUD operations
                method_content = extract_method_content(content, method)
                if is_simple_crud(method_content, method):
                    basic_crud.append(method)
                    is_crud = True
                    break
        
        if not is_crud:
            non_crud.append(method)
    
    # Calculate complexity based on method content
    complexity = calculate_complexity(content, non_crud)
    
    return {
        'total_methods': len(methods),
        'basic_crud': basic_crud,
        'non_crud': non_crud,
        'complexity': complexity
    }

def extract_method_content(content, method_name):
    """Extract the content of a specific method"""
    # Updated pattern to handle nested braces better
    pattern = rf'{method_name}:\s*function\s*\([^)]*\)\s*\{{'
    start_match = re.search(pattern, content)
    
    if not start_match:
        return ""
    
    start_pos = start_match.end() - 1  # Position of opening brace
    brace_count = 1
    pos = start_pos + 1
    
    while pos < len(content) and brace_count > 0:
        if content[pos] == '{':
            brace_count += 1
        elif content[pos] == '}':
            brace_count -= 1
        pos += 1
    
    if brace_count == 0:
        return content[start_pos + 1:pos - 1]
    else:
        return ""

def is_simple_crud(method_content, method_name):
    """Determine if a method is a simple CRUD operation"""
    # Check for complex logic indicators
    complex_indicators = [
        r'if\s*\([^)]*\)\s*\{',   # Complex conditional logic
        r'for\s*\(',              # Loops
        r'forEach',               # Array iterations
        r'map\s*\(',              # Data transformations
        r'filter\s*\(',           # Data filtering
        r'blob',                  # File handling
        r'FormData',              # File uploads
        r'dispatch.*Store.*set(?!$|[^a-zA-Z])', # Complex store operations (not just set)
        r'/api/[^"\']+/[^"\']+/', # Multiple complex endpoints
        r'new\s+Date',            # Date manipulations
        r'JSON\.parse|JSON\.stringify', # Data parsing
    ]
    
    # Count complex indicators
    complex_count = 0
    for indicator in complex_indicators:
        matches = re.findall(indicator, method_content, re.IGNORECASE)
        complex_count += len(matches)
    
    # If method has too many complex indicators, it's not simple CRUD
    if complex_count > 2:
        return False
    
    # Check if it's a straightforward API call
    simple_api_patterns = [
        r'\$rc\.get\(',
        r'\$rc\.post\(',
        r'\$rc\.put\(',
        r'\$rc\.delete\(',
    ]
    
    has_api_call = any(re.search(pattern, method_content) for pattern in simple_api_patterns)
    
    # Special case: methods with only simple store dispatch are still CRUD
    simple_store_only = re.search(r'dispatch.*Store.*set[^a-zA-Z]', method_content) and complex_count <= 1
    
    # If it has API call and minimal complex logic, or just simple store operations, it's simple CRUD
    return has_api_call and (complex_count <= 1 or simple_store_only)

def calculate_complexity(content, non_crud_methods):
    """Calculate complexity level based on method characteristics"""
    complexity_score = 0
    
    # Factors that increase complexity
    complexity_factors = [
        (r'blob', 3, 'File handling'),
        (r'FormData', 3, 'File uploads'),
        (r'dispatch.*Store.*(?!set[^a-zA-Z])', 2, 'Complex store management'),
        (r'/api/\w+/\w+/\w+', 2, 'Complex endpoints'),
        (r'forEach|map|filter', 2, 'Data transformations'),
        (r'new\s+Date', 2, 'Date manipulations'),
        (r'JSON\.parse|JSON\.stringify', 1, 'Data parsing'),
        (r'if\s*\([^)]*\)\s*\{', 1, 'Conditional logic'),
        (r'deprecated', 1, 'Deprecated methods'),
        (r'console\.log', 1, 'Debug code'),
        (r'\.xlsx|\.csv|\.pdf', 2, 'File export/import'),
    ]
    
    reasons = []
    for pattern, score, reason in complexity_factors:
        matches = len(re.findall(pattern, content, re.IGNORECASE))
        if matches > 0:
            complexity_score += score * matches
            reasons.append(f"{reason} ({matches}x)")
    
    # Additional complexity for number of non-CRUD methods
    non_crud_count = len(non_crud_methods)
    if non_crud_count > 20:
        complexity_score += 5
        reasons.append(f"Many custom methods ({non_crud_count})")
    elif non_crud_count > 10:
        complexity_score += 3
        reasons.append(f"Multiple custom methods ({non_crud_count})")
    
    # Determine complexity level
    if complexity_score >= 20:
        return "Very High - " + ", ".join(reasons[:3])
    elif complexity_score >= 12:
        return "High - " + ", ".join(reasons[:3])
    elif complexity_score >= 6:
        return "Medium - " + ", ".join(reasons[:2])
    else:
        return "Low - Basic API operations"

def main():
    """Main function to analyze all mixin files"""
    mixins_folder = Path("mixins_to_migrate")
    
    if not mixins_folder.exists():
        print("Error: mixins_to_migrate folder not found")
        return
    
    # Find all mixin files
    mixin_files = list(mixins_folder.glob("*Mixins.js"))
    
    if not mixin_files:
        print("No mixin files found in mixins_to_migrate folder")
        return
    
    # Generate markdown table
    markdown_output = """# Mixins to SDK Migration Roadmap

| Filename | Total Methods | Basic CRUD Methods | Non-Basic CRUD Methods | TODO Flag Resolution |
|----------|---------------|-------------------|------------------------|---------------------|
"""
    
    detailed_analysis = "\n## Detailed Analysis\n\n"
    
    total_files = len(mixin_files)
    total_methods = 0
    total_non_crud = 0
    
    for mixin_file in sorted(mixin_files):
        try:
            analysis = analyze_mixin_file(mixin_file)
            filename = mixin_file.name
            
            total_methods += analysis['total_methods']
            total_non_crud += len(analysis['non_crud'])
            
            # Add to markdown table
            markdown_output += f"| {filename} | {analysis['total_methods']} | {len(analysis['basic_crud'])} | {len(analysis['non_crud'])} | {analysis['complexity']} |\n"
            
            # Add detailed analysis
            detailed_analysis += f"### {filename}\n\n"
            detailed_analysis += f"**Total Methods:** {analysis['total_methods']}\n\n"
            
            if analysis['basic_crud']:
                detailed_analysis += f"**Basic CRUD Methods ({len(analysis['basic_crud'])}):**\n"
                for method in analysis['basic_crud']:
                    detailed_analysis += f"- {method}\n"
                detailed_analysis += "\n"
            
            if analysis['non_crud']:
                detailed_analysis += f"**Non-Basic CRUD Methods ({len(analysis['non_crud'])}):**\n"
                for i, method in enumerate(analysis['non_crud']):
                    detailed_analysis += f"- {method}\n"
                    if i >= 9:  # Limit display to first 10 methods
                        remaining = len(analysis['non_crud']) - 10
                        if remaining > 0:
                            detailed_analysis += f"- ... and {remaining} more\n"
                        break
                detailed_analysis += "\n"
            
            detailed_analysis += f"**Complexity:** {analysis['complexity']}\n\n"
            detailed_analysis += "---\n\n"
            
        except Exception as e:
            print(f"Error analyzing {mixin_file}: {e}")
            markdown_output += f"| {mixin_file.name} | ERROR | ERROR | ERROR | Error analyzing file |\n"
    
    # Add summary
    avg_non_crud = total_non_crud/total_files if total_files > 0 else 0
    summary = f"""## Summary

- **Total Files:** {total_files}
- **Total Methods:** {total_methods}
- **Total Non-CRUD Methods:** {total_non_crud}
- **Average Non-CRUD per File:** {avg_non_crud:.1f}

## Estimated Migration Time

Based on the analysis:
- **Low Complexity:** 1.5-2 hours per entity
- **Medium Complexity:** 2-3 hours per entity  
- **High Complexity:** 3-4 hours per entity
- **Very High Complexity:** 4-6 hours per entity

**Total Estimated Time:** {total_files * 2.5:.1f} - {total_files * 4:.1f} hours
"""
    
    # Write output to file
    output_file = "mixins_migration_roadmap.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(markdown_output)
        f.write(summary)
        f.write(detailed_analysis)
    
    print(f"Analysis complete! Results written to {output_file}")
    print(f"Found {total_files} mixin files with {total_methods} total methods")
    print(f"{total_non_crud} methods require custom implementation")

if __name__ == "__main__":
    main()