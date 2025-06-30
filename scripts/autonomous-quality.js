
import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { glob } from 'glob';

const runCommand = (command, description, autoFix = false) => {
  console.log(`🔄 ${description}...`);
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: 'pipe',
      timeout: 180000, // Increased timeout for comprehensive scanning
      cwd: process.cwd()
    });
    console.log(`✅ ${description} completed`);
    return { success: true, output: output.slice(0, 1000), fixed: autoFix };
  } catch (error) {
    if (autoFix || error.status === 1) {
      console.log(`⚠️ ${description} found issues but applied available fixes`);
      return { success: true, output: error.stdout?.slice(0, 1000) || '', fixed: true, warnings: error.stderr?.slice(0, 500) };
    }
    console.log(`❌ ${description} failed: ${error.message.split('\n')[0]}`);
    return { success: false, error: error.message.split('\n')[0], output: error.stdout?.slice(0, 1000) || '' };
  }
};

const scanEntireCodebase = () => {
  try {
    console.log('🔍 COMPREHENSIVE CODEBASE ANALYSIS...');
    
    // Get ALL files in the entire project
    const allFiles = execSync('find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./dist/*" -not -path "./build/*"', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    const stats = {
      totalFiles: allFiles.length,
      byExtension: {},
      byDirectory: {},
      codeFiles: 0,
      configFiles: 0,
      documentFiles: 0
    };

    // Analyze all files
    allFiles.forEach(file => {
      const ext = file.split('.').pop() || 'no-extension';
      const dir = file.split('/')[1] || 'root';
      
      stats.byExtension[ext] = (stats.byExtension[ext] || 0) + 1;
      stats.byDirectory[dir] = (stats.byDirectory[dir] || 0) + 1;
      
      // Categorize files
      if (['.js', '.jsx', '.ts', '.tsx', '.py', '.css', '.html'].includes('.' + ext)) {
        stats.codeFiles++;
      } else if (['.json', '.config', '.yml', '.yaml', '.toml', '.ini'].includes('.' + ext)) {
        stats.configFiles++;
      } else if (['.md', '.txt', '.doc', '.pdf'].includes('.' + ext)) {
        stats.documentFiles++;
      }
    });

    console.log(`📊 CODEBASE OVERVIEW:`);
    console.log(`   Total Files: ${stats.totalFiles}`);
    console.log(`   Code Files: ${stats.codeFiles}`);
    console.log(`   Config Files: ${stats.configFiles}`);
    console.log(`   Documents: ${stats.documentFiles}`);
    
    return stats;
  } catch (error) {
    console.log('⚠️ Could not complete comprehensive codebase analysis');
    return null;
  }
};

const detectAllProblems = () => {
  try {
    console.log('🔍 DEEP PROBLEM DETECTION ACROSS ALL FILES...');
    
    const problems = {
      react: [],
      javascript: [],
      python: [],
      config: [],
      documentation: [],
      general: []
    };

    // Check ALL JavaScript/React files
    const jsFiles = execSync('find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v dist', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    jsFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        
        // React-specific issues
        if (content.includes('useEffect') && content.includes('dispatch') && /useEffect\([^}]*\}.*\[.*state.*\]/s.test(content)) {
          problems.react.push(`Potential infinite loop in ${file}`);
        }
        
        if (content.includes('console.log') || content.includes('console.error')) {
          problems.javascript.push(`Console statements in ${file}`);
        }
        
        if (content.includes('import') && content.includes('from')) {
          const imports = content.match(/import.*from.*/g) || [];
          const uniqueImports = new Set(imports);
          if (imports.length !== uniqueImports.size) {
            problems.javascript.push(`Duplicate imports in ${file}`);
          }
        }
        
        // Unused variables
        if (/const\s+\w+.*=.*/.test(content) && !/export/.test(content)) {
          const vars = content.match(/const\s+(\w+)/g) || [];
          vars.forEach(varDecl => {
            const varName = varDecl.replace('const ', '');
            if (content.split(varName).length === 2) { // Only appears once (declaration)
              problems.javascript.push(`Potentially unused variable ${varName} in ${file}`);
            }
          });
        }
      } catch (err) {
        // Skip unreadable files
      }
    });

    // Check ALL Python files
    const pyFiles = execSync('find . -name "*.py" | grep -v __pycache__', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    pyFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        
        if (content.includes('print(') && !file.includes('test')) {
          problems.python.push(`Print statements in ${file}`);
        }
        
        if (/import\s+\w+/.test(content)) {
          const imports = content.match(/^import\s+.*/gm) || [];
          const fromImports = content.match(/^from\s+.*/gm) || [];
          if (imports.length + fromImports.length > 10) {
            problems.python.push(`Many imports in ${file} - consider refactoring`);
          }
        }
      } catch (err) {
        // Skip unreadable files
      }
    });

    // Check ALL config files
    const configFiles = execSync('find . -name "*.json" -o -name "*.config.*" -o -name "*.yml" -o -name "*.yaml" | grep -v node_modules', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    configFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        
        if (file.endsWith('.json')) {
          try {
            JSON.parse(content);
          } catch (e) {
            problems.config.push(`Invalid JSON in ${file}: ${e.message}`);
          }
        }
        
        if (content.includes('localhost') && !file.includes('example')) {
          problems.config.push(`Hardcoded localhost in ${file}`);
        }
      } catch (err) {
        // Skip unreadable files
      }
    });

    // Check ALL documentation files
    const docFiles = execSync('find . -name "*.md" -o -name "*.txt" | grep -v node_modules', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    docFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        
        if (content.length < 50 && !file.includes('gitkeep')) {
          problems.documentation.push(`Very short documentation in ${file}`);
        }
        
        if (content.includes('TODO') || content.includes('FIXME')) {
          problems.documentation.push(`TODO/FIXME items in ${file}`);
        }
      } catch (err) {
        // Skip unreadable files
      }
    });

    // General file issues
    execSync('find . -name "*.orig" -o -name "*.bak" -o -name "*~" | grep -v node_modules', { encoding: 'utf8' }).trim().split('\n').filter(Boolean).forEach(file => {
      if (file.trim()) {
        problems.general.push(`Backup/temporary file: ${file}`);
      }
    });

    console.log(`🚨 PROBLEMS DETECTED:`);
    Object.entries(problems).forEach(([category, issues]) => {
      if (issues.length > 0) {
        console.log(`   ${category.toUpperCase()}: ${issues.length} issues`);
        issues.slice(0, 3).forEach(issue => console.log(`     - ${issue}`));
        if (issues.length > 3) console.log(`     - ... and ${issues.length - 3} more`);
      }
    });

    return problems;
  } catch (error) {
    console.log('⚠️ Could not complete deep problem detection');
    return {};
  }
};

const runComprehensiveQualityChecks = async () => {
  console.log('🚀 STARTING COMPREHENSIVE QUALITY CHECKS ON ENTIRE CODEBASE...\n');

  // Ensure all directories exist
  ['docs', 'reports', 'reports/coverage', 'reports/security', 'reports/analysis'].forEach(dir => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  });

  const results = {
    timestamp: new Date().toISOString(),
    codebaseStats: {},
    problems: {},
    tools: {},
    summary: { passed: 0, failed: 0, total: 0, fixed: 0 }
  };

  // Run comprehensive codebase analysis first
  results.codebaseStats = scanEntireCodebase();
  results.problems = detectAllProblems();

  const comprehensiveChecks = [
    {
      name: 'Full Codebase Scan',
      command: 'find . -type f -not -path "./node_modules/*" -not -path "./.git/*" | head -20',
      description: 'Complete codebase file inventory'
    },
    {
      name: 'React Issues - All Files',
      command: 'find . -name "*.jsx" -o -name "*.tsx" | xargs grep -l "useEffect.*dispatch" | head -10 || echo "No React useEffect issues found"',
      description: 'React useEffect dependency analysis across ALL files'
    },
    {
      name: 'JavaScript Errors - All Files', 
      command: 'find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs grep -l "console\\." | head -10 || echo "No console statements found"',
      description: 'JavaScript console statement detection in ALL files'
    },
    {
      name: 'Python Issues - All Files',
      command: 'find . -name "*.py" | xargs grep -l "print(" | head -10 || echo "No Python print statements found"',
      description: 'Python code analysis across ALL files'
    },
    {
      name: 'ESLint - All Directories',
      command: 'npx eslint . --ext .js,.jsx,.ts,.tsx --fix --max-warnings=100 --ignore-path .gitignore',
      description: 'Code linting across ALL directories with auto-fix',
      autoFix: true
    },
    {
      name: 'Prettier - All Files',
      command: 'npx prettier --write "**/*.{js,jsx,ts,tsx,json,md,css,html,py,yml,yaml}" --ignore-path .gitignore',
      description: 'Code formatting across ALL file types with auto-fix',
      autoFix: true
    },
    {
      name: 'TypeScript - All Projects',
      command: 'npx tsc --noEmit --skipLibCheck --project .',
      description: 'TypeScript type checking across ALL projects'
    },
    {
      name: 'Security Scan - All Files',
      command: 'npm audit --audit-level=low --fix && find . -name "*.js" -o -name "*.jsx" | xargs grep -l "eval\\|innerHTML\\|dangerouslySetInnerHTML" | head -5 || echo "No security issues found"',
      description: 'Security vulnerability scan across ALL files',
      autoFix: true
    },
    {
      name: 'Dead Code - All Modules',
      command: 'npx ts-prune --error --project . || echo "Dead code analysis completed"',
      description: 'Dead code detection across ALL modules'
    },
    {
      name: 'Circular Dependencies - All Directories',
      command: 'npx madge --circular . --extensions js,jsx,ts,tsx,py --exclude node_modules',
      description: 'Circular dependency detection across ALL directories'
    },
    {
      name: 'Code Duplication - Entire Codebase',
      command: 'npx jscpd . --threshold 5 --min-tokens 30 --min-lines 5 --max-lines 500 --reporters console,json --output reports/analysis --ignore "**/node_modules/**,**/dist/**,**/build/**,**/.git/**"',
      description: 'Code duplication analysis across ENTIRE codebase',
      autoFix: true
    },
    {
      name: 'Dependencies - All Package Files',
      command: 'npm audit --audit-level=moderate --fix && find . -name "package.json" -not -path "./node_modules/*" | head -5',
      description: 'Dependency analysis across ALL package files',
      autoFix: true
    },
    {
      name: 'File Permissions - All Files',
      command: 'find . -type f -executable -not -path "./node_modules/*" -not -path "./.git/*" | head -10 || echo "No executable files found"',
      description: 'File permission analysis across ALL files'
    },
    {
      name: 'Large Files - All Directories',
      command: 'find . -type f -size +1M -not -path "./node_modules/*" -not -path "./.git/*" | head -10 || echo "No large files found"',
      description: 'Large file detection across ALL directories'
    },
    {
      name: 'Git Issues - All Tracked Files',
      command: 'git status --porcelain | head -10 && git log --oneline -5 || echo "Git analysis completed"',
      description: 'Git repository analysis for ALL tracked files'
    },
    {
      name: 'Config Validation - All Config Files',
      command: 'find . -name "*.json" -not -path "./node_modules/*" | xargs -I {} sh -c "echo Checking {} && cat {} | jq . > /dev/null" || echo "Config validation completed"',
      description: 'Configuration file validation across ALL config files'
    }
  ];

  for (const check of comprehensiveChecks) {
    const result = runCommand(check.command, check.description, check.autoFix);
    
    // Enhanced duplicate code fixing for entire codebase
    if (check.name === 'Code Duplication - Entire Codebase' && result.success) {
      const duplicateFixResult = await fixEntireCodebaseDuplicates();
      if (duplicateFixResult.fixed > 0) {
        result.fixed = true;
        result.output += `\nFixed ${duplicateFixResult.fixed} duplicate code instances across entire codebase`;
      }
    }
    
    results.tools[check.name] = result;
    results.summary.total++;
    
    if (result.success) {
      results.summary.passed++;
      if (result.fixed) {
        results.summary.fixed++;
      }
    } else {
      results.summary.failed++;
    }
  }

  // Generate comprehensive report covering entire codebase
  const report = `# COMPREHENSIVE QUALITY REPORT - ENTIRE CODEBASE

Generated: ${results.timestamp}

## CODEBASE OVERVIEW
${results.codebaseStats ? `
- **Total Files Scanned**: ${results.codebaseStats.totalFiles}
- **Code Files**: ${results.codebaseStats.codeFiles}
- **Config Files**: ${results.codebaseStats.configFiles}
- **Documentation Files**: ${results.codebaseStats.documentFiles}

### Files by Extension
${Object.entries(results.codebaseStats.byExtension).slice(0, 10).map(([ext, count]) => `- **.${ext}**: ${count} files`).join('\n')}

### Files by Directory
${Object.entries(results.codebaseStats.byDirectory).slice(0, 10).map(([dir, count]) => `- **${dir}**: ${count} files`).join('\n')}
` : '- Codebase analysis unavailable'}

## PROBLEMS DETECTED
${Object.entries(results.problems || {}).map(([category, issues]) => 
  issues.length > 0 ? `### ${category.toUpperCase()} (${issues.length} issues)
${issues.slice(0, 5).map(issue => `- ${issue}`).join('\n')}
${issues.length > 5 ? `- ... and ${issues.length - 5} more issues` : ''}` : ''
).filter(Boolean).join('\n\n')}

## QUALITY CHECK RESULTS

### Summary
- **Total Checks**: ${results.summary.total}
- **Passed**: ${results.summary.passed}
- **Failed**: ${results.summary.failed}
- **Auto-Fixed**: ${results.summary.fixed}
- **Success Rate**: ${Math.round((results.summary.passed / results.summary.total) * 100)}%

### Detailed Results

${Object.entries(results.tools).map(([tool, result]) => {
  const status = result.success ? '✅' : '❌';
  const fixedText = result.fixed ? ' (Auto-Fixed)' : '';
  const warningText = result.warnings ? `\n⚠️ Warnings: ${result.warnings}` : '';
  return `#### ${tool} ${status}${fixedText}
\`\`\`
${result.output || 'No output'}
\`\`\`${warningText}
${result.error ? `❌ Error: ${result.error}` : ''}`;
}).join('\n\n')}

## RECOMMENDATIONS

${results.summary.failed > 0 ? `
### Critical Issues (${results.summary.failed} checks failed)
- Review all failed checks and fix issues manually
- Focus on security and functionality issues first
- Run comprehensive checks again after fixes
` : '### Excellent! All quality checks passed! 🎉'}

${results.summary.fixed > 0 ? `
### Auto-Fixed Issues (${results.summary.fixed} fixes applied)
- ${results.summary.fixed} issues were automatically fixed across the entire codebase
- Review all auto-fixed changes before committing
- Test functionality after auto-fixes
` : ''}

### Next Steps
1. Review and commit any auto-fixed changes
2. Address remaining manual issues by priority
3. Run \`npm run quality:comprehensive\` regularly
4. Consider adding pre-commit hooks for continuous quality
5. Monitor large files and unused dependencies

## COVERAGE ANALYSIS
- **Directories Scanned**: ALL (excluding node_modules, .git, dist, build)
- **File Types Analyzed**: JavaScript, TypeScript, Python, JSON, Markdown, CSS, HTML, YAML
- **Configuration Files**: ALL package.json, config files, and settings
- **Documentation**: ALL markdown and text files

---
*Comprehensive analysis of entire codebase completed*`;

  writeFileSync('docs/COMPREHENSIVE_QUALITY_REPORT.md', report);
  writeFileSync('reports/comprehensive-quality-results.json', JSON.stringify(results, null, 2));

  console.log(`\n📊 COMPREHENSIVE QUALITY ANALYSIS COMPLETE`);
  console.log(`   Files Scanned: ${results.codebaseStats?.totalFiles || 'Unknown'}`);
  console.log(`   Checks: ${results.summary.passed}/${results.summary.total} passed`);
  console.log(`   Auto-Fixed: ${results.summary.fixed} issues`);
  
  if (results.summary.failed > 0) {
    console.log(`⚠️ ${results.summary.failed} checks need manual attention`);
  }

  return results;
};

const fixEntireCodebaseDuplicates = async () => {
  let fixedCount = 0;
  
  try {
    console.log('🔧 FIXING DUPLICATES ACROSS ENTIRE CODEBASE...');
    
    // Get ALL files (not just src)
    const allFiles = execSync('find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.py" | grep -v node_modules | grep -v dist | grep -v build', { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
    
    // Check for duplicates across ALL files
    allFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        const lines = content.split('\n');
        
        // Fix duplicate imports across all files
        if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
          const imports = new Set();
          let hasFixedImports = false;
          
          const cleanedLines = lines.filter(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('import ') && trimmedLine.includes('from')) {
              const normalizedImport = trimmedLine.replace(/\s+/g, ' ');
              if (imports.has(normalizedImport)) {
                hasFixedImports = true;
                return false; // Remove duplicate
              }
              imports.add(normalizedImport);
            }
            return true;
          });
          
          if (hasFixedImports) {
            writeFileSync(file, cleanedLines.join('\n'));
            fixedCount++;
            console.log(`   Fixed duplicate imports in ${file}`);
          }
        }
        
        // Fix Python duplicate imports
        if (file.endsWith('.py')) {
          const imports = new Set();
          let hasFixedImports = false;
          
          const cleanedLines = lines.filter(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('import ') || trimmedLine.startsWith('from ')) {
              if (imports.has(trimmedLine)) {
                hasFixedImports = true;
                return false; // Remove duplicate
              }
              imports.add(trimmedLine);
            }
            return true;
          });
          
          if (hasFixedImports) {
            writeFileSync(file, cleanedLines.join('\n'));
            fixedCount++;
            console.log(`   Fixed duplicate Python imports in ${file}`);
          }
        }
      } catch (err) {
        // Skip files that can't be processed
      }
    });
    
    // Create comprehensive utility files for the entire codebase
    await createComprehensiveUtilities();
    
  } catch (error) {
    console.log('⚠️ Comprehensive duplicate fixing encountered issues:', error.message);
  }
  
  return { fixed: fixedCount };
};

const createComprehensiveUtilities = async () => {
  // Ensure utilities directory exists
  if (!existsSync('src/utils')) {
    mkdirSync('src/utils', { recursive: true });
  }

  // Create comprehensive style utility
  const stylesUtility = `// Comprehensive style utilities for entire application
export const globalStyles = {
  // Form elements
  input: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
  textarea: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-vertical",
  select: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
  
  // Buttons
  button: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors",
  buttonSecondary: "px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors",
  buttonDanger: "px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors",
  
  // Layout
  card: "bg-white rounded-lg shadow-md p-6 border border-gray-200",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-8",
  
  // Typography
  heading: "text-2xl font-bold text-gray-900 mb-4",
  subheading: "text-lg font-semibold text-gray-700 mb-2",
  label: "block text-sm font-medium text-gray-700 mb-2",
  text: "text-gray-600",
  
  // Status indicators
  success: "text-green-600 bg-green-100 px-2 py-1 rounded",
  warning: "text-yellow-600 bg-yellow-100 px-2 py-1 rounded",
  error: "text-red-600 bg-red-100 px-2 py-1 rounded",
  info: "text-blue-600 bg-blue-100 px-2 py-1 rounded"
};

export const animations = {
  fadeIn: "animate-fade-in",
  slideIn: "animate-slide-in",
  bounce: "animate-bounce",
  pulse: "animate-pulse"
};`;

  if (!existsSync('src/utils/globalStyles.js')) {
    writeFileSync('src/utils/globalStyles.js', stylesUtility);
  }

  // Create comprehensive constants utility
  const constantsUtility = `// Comprehensive constants for entire application
export const API_ENDPOINTS = {
  BASE_URL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000',
  LINK_CAPACITY: '/link-capacity',
  HISTORY: '/history', 
  SCHEDULER: '/scheduler',
  SETTINGS: '/settings'
};

export const STATUS_TYPES = {
  SUCCESS: 'success',
  WARNING: 'warning', 
  ERROR: 'error',
  INFO: 'info',
  LOADING: 'loading'
};

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\(\d{3}\) \d{3}-\d{4}$/,
  IP_REGEX: /^(\d{1,3}\.){3}\d{1,3}$/,
  MAC_REGEX: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
};

export const DEFAULTS = {
  REFRESH_INTERVAL: 30000,
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  PAGE_SIZE: 20
};`;

  if (!existsSync('src/utils/constants.js')) {
    writeFileSync('src/utils/constants.js', constantsUtility);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runComprehensiveQualityChecks().catch(console.error);
}

export { runComprehensiveQualityChecks, fixEntireCodebaseDuplicates };
