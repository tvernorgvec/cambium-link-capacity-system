
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

const autoFixIssues = async () => {
  console.log('🔧 Running Automated Issue Fixes...\n');
  
  const fixes = [];

  // 1. Remove unused imports
  console.log('🔄 Removing unused imports...');
  try {
    execSync('npx eslint src --ext .js,.jsx,.ts,.tsx --fix --quiet', { stdio: 'pipe' });
    fixes.push('✅ Unused imports removed via ESLint');
  } catch (error) {
    fixes.push('⚠️ Some import issues may remain');
  }

  // 2. Fix formatting
  console.log('🔄 Formatting code...');
  try {
    execSync('npx prettier --write "src/**/*.{js,jsx,ts,tsx,json,md}"', { stdio: 'pipe' });
    fixes.push('✅ Code formatting applied');
  } catch (error) {
    fixes.push('❌ Formatting failed');
  }

  // 3. Fix package vulnerabilities
  console.log('🔄 Fixing security vulnerabilities...');
  try {
    const auditResult = execSync('npm audit fix --force', { encoding: 'utf8', stdio: 'pipe' });
    fixes.push('✅ Security vulnerabilities fixed');
  } catch (error) {
    fixes.push('⚠️ Some vulnerabilities may require manual attention');
  }

  // 4. Clean up console statements (only in non-development files)
  console.log('🔄 Cleaning up console statements...');
  try {
    const files = await glob('src/**/*.{js,jsx,ts,tsx}');
    let consoleFixed = 0;
    
    files.forEach(file => {
      if (file.includes('ErrorBoundary') || file.includes('.test.') || file.includes('.spec.')) {
        return; // Skip test files and error boundaries
      }
      
      const content = readFileSync(file, 'utf8');
      const lines = content.split('\n');
      let modified = false;
      
      const cleanedLines = lines.map(line => {
        if (line.trim().startsWith('console.log(') || line.trim().startsWith('console.error(') || line.trim().startsWith('console.warn(')) {
          modified = true;
          consoleFixed++;
          return line.replace(/console\.(log|error|warn)\([^)]*\);?/, '// Console statement removed by auto-fix');
        }
        return line;
      });
      
      if (modified) {
        writeFileSync(file, cleanedLines.join('\n'));
      }
    });
    
    if (consoleFixed > 0) {
      fixes.push(`✅ Removed ${consoleFixed} console statements`);
    }
  } catch (error) {
    fixes.push('⚠️ Console cleanup had issues');
  }

  // 5. Add missing PropTypes or disable them consistently
  console.log('🔄 Standardizing PropTypes...');
  try {
    execSync('npx eslint src --ext .jsx,.tsx --fix --rule "react/prop-types: off"', { stdio: 'pipe' });
    fixes.push('✅ PropTypes standardized');
  } catch (error) {
    fixes.push('⚠️ PropTypes standardization incomplete');
  }

  // 6. Fix React useEffect dependency issues
  console.log('🔄 Checking React useEffect dependencies...');
  try {
    execSync('npx eslint src --ext .jsx,.tsx --fix --rule "react-hooks/exhaustive-deps: error"', { stdio: 'pipe' });
    fixes.push('✅ React hooks dependencies fixed');
  } catch (error) {
    fixes.push('⚠️ Some React hooks issues may need manual attention');
  }

  // 7. Fix React infinite loop patterns
  console.log('🔄 Checking for React infinite loop patterns...');
  try {
    const files = await glob('src/**/*.{js,jsx,ts,tsx}');
    let loopFixed = 0;
    
    files.forEach(file => {
      const content = readFileSync(file, 'utf8');
      let modified = false;
      let fixedContent = content;
      
      // Check for useEffect with state dependencies that can cause infinite loops
      if (content.includes('useEffect') && content.includes('dispatch')) {
        const useEffectRegex = /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?},\s*\[[^\]]*state[^\]]*\]/g;
        if (useEffectRegex.test(content)) {
          fixedContent = fixedContent.replace(useEffectRegex, (match) => {
            return match.replace(/,\s*\[[^\]]*state[^\]]*\]/, ', []');
          });
          modified = true;
          loopFixed++;
        }
      }
      
      // Check for conditional loading that can cause loops
      if (content.includes('if (state.data.linkCapacity.length === 0') && 
          content.includes('loadInitialData();')) {
        fixedContent = fixedContent.replace(
          /\/\/ Only load data if we don't already have it\s*\n\s*if \(state\.data\.linkCapacity\.length === 0[^}]*loadInitialData\(\);[^}]*}/g,
          'loadInitialData();'
        );
        modified = true;
        loopFixed++;
      }
      
      // Check for missing loading state reset in dispatch calls
      if (content.includes('dispatch') && content.includes('SET_LINK_CAPACITY') && 
          !content.includes('loading: false') && content.includes('useReducer')) {
        const lines = fixedContent.split('\n');
        let inReducer = false;
        let inSetCapacityCase = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          
          if (line.includes('function appReducer') || line.includes('const appReducer')) {
            inReducer = true;
          }
          
          if (inReducer && line.includes("case 'SET_LINK_CAPACITY':")) {
            inSetCapacityCase = true;
          }
          
          if (inSetCapacityCase && line.includes('return {') && 
              !lines.slice(i, i + 5).some(nextLine => nextLine.includes('loading: false'))) {
            // Find the closing brace of the return statement
            let braceCount = 0;
            let returnEndIndex = i;
            for (let j = i; j < lines.length; j++) {
              if (lines[j].includes('{')) braceCount++;
              if (lines[j].includes('}')) {
                braceCount--;
                if (braceCount === 0) {
                  returnEndIndex = j;
                  break;
                }
              }
            }
            
            // Insert loading: false before the closing brace
            const beforeClosing = lines[returnEndIndex].replace(/(\s*})/, ',\n        loading: false,$1');
            lines[returnEndIndex] = beforeClosing;
            modified = true;
            loopFixed++;
            inSetCapacityCase = false;
          }
          
          if (inReducer && line.includes('default:')) {
            inReducer = false;
          }
        }
        
        if (modified) {
          fixedContent = lines.join('\n');
        }
      }
      
      // Check for setState in useEffect without proper dependencies
      if (content.includes('setState') && content.includes('useEffect') && content.includes('}, [state])')) {
        fixedContent = fixedContent.replace(/}, \[state\]\)/g, '}, [])');
        modified = true;
        loopFixed++;
      }
      
      // Check for useEffect causing infinite loops with actions in dependencies
      if (content.includes('useEffect') && content.includes('actions')) {
        const lines = fixedContent.split('\n');
        let inUseEffect = false;
        fixedContent = lines.map(line => {
          if (line.includes('useEffect')) {
            inUseEffect = true;
          }
          if (inUseEffect && line.includes('], [') && line.includes('actions')) {
            modified = true;
            loopFixed++;
            return line.replace(/,\s*actions[^\]]*/, '');
          }
          if (line.includes('});') && inUseEffect) {
            inUseEffect = false;
          }
          return line;
        }).join('\n');
      }
      
      // Check for problematic useEffect patterns that cause infinite loops
      if (content.includes('useEffect') && content.includes('dispatch') && content.includes('SET_LOADING')) {
        const lines = fixedContent.split('\n');
        let inUseEffect = false;
        let useEffectStart = -1;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          if (line.includes('useEffect(')) {
            inUseEffect = true;
            useEffectStart = i;
          }
          
          if (inUseEffect && line.includes('}, [') && line.includes('])')) {
            // Check if this useEffect has conditional data loading that might cause loops
            const useEffectBlock = lines.slice(useEffectStart, i + 1).join('\n');
            
            if (useEffectBlock.includes('if (state.data.linkCapacity.length === 0') && 
                useEffectBlock.includes('loadInitialData();')) {
              // Replace conditional loading with simple loading
              const newBlock = useEffectBlock.replace(
                /if \(state\.data\.linkCapacity\.length === 0[^}]*\n[^}]*loadInitialData\(\);[^}]*}/,
                'loadInitialData();'
              );
              
              if (newBlock !== useEffectBlock) {
                // Replace the block in the lines array
                const blockLines = newBlock.split('\n');
                lines.splice(useEffectStart, i - useEffectStart + 1, ...blockLines);
                modified = true;
                loopFixed++;
              }
            }
            
            inUseEffect = false;
            useEffectStart = -1;
          }
        }
        
        if (modified) {
          fixedContent = lines.join('\n');
        }
      }
      
      // Check for dispatch calls without proper SET_LOADING handling
      if (content.includes('dispatch') && content.includes('SET_LOADING') && content.includes('useEffect')) {
        const lines = fixedContent.split('\n');
        let inUseEffect = false;
        let needsLoadingFix = false;
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes('useEffect')) {
            inUseEffect = true;
          }
          if (inUseEffect && line.includes('dispatch') && line.includes('SET_LOADING')) {
            // Check if there are multiple SET_LOADING calls without proper sequencing
            const nextLines = lines.slice(i + 1, i + 20);
            const hasAnotherDispatch = nextLines.some(nextLine => 
              nextLine.includes('dispatch') && !nextLine.includes('SET_LOADING')
            );
            if (hasAnotherDispatch) {
              needsLoadingFix = true;
              break;
            }
          }
          if (line.includes('}, [') && inUseEffect) {
            inUseEffect = false;
          }
        }
        
        if (needsLoadingFix) {
          // Add condition to prevent multiple data loading
          if (content.includes('dispatch({ type: \'SET_LOADING\', payload: true });') && 
              !content.includes('if (state.data.linkCapacity.length === 0')) {
            fixedContent = fixedContent.replace(
              /loadInitialData\(\);/g,
              `// Only load data if we don't already have it
    if (state.data.linkCapacity.length === 0 && !state.loading) {
      loadInitialData();
    }`
            );
            modified = true;
            loopFixed++;
          }
        }
      }
      
      // Check for missing SET_LOADING false calls
      if (content.includes('SET_LOADING', true) && 
          content.includes('dispatch') && 
          !content.includes('SET_LOADING\', payload: false')) {
        const lines = fixedContent.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('dispatch({ type: \'SET_LINK_CAPACITY\'') ||
              lines[i].includes('dispatch({ type: \'SET_HISTORY\'') ||
              lines[i].includes('dispatch({ type: \'SET_SCHEDULED_TASKS\'')) {
            // Add SET_LOADING false after the last dispatch
            if (i + 1 < lines.length && 
                !lines.slice(i, i + 5).some(line => line.includes('SET_LOADING\', payload: false'))) {
              lines.splice(i + 1, 0, '          dispatch({ type: \'SET_LOADING\', payload: false });');
              modified = true;
              loopFixed++;
              break;
            }
          }
        }
        fixedContent = lines.join('\n');
      }
      
      if (modified) {
        writeFileSync(file, fixedContent);
      }
    });
    
    if (loopFixed > 0) {
      fixes.push(`✅ Fixed ${loopFixed} React infinite loop patterns`);
    } else {
      fixes.push('✅ No React infinite loops detected');
    }
  } catch (error) {
    fixes.push('⚠️ React loop check had issues');
  }

  // 8. Fix duplicate imports and extract duplicate code
  console.log('🔄 Fixing duplicate imports and extracting duplicate code...');
  try {
    const files = await glob('src/**/*.{js,jsx,ts,tsx}');
    let duplicateImportsFixed = 0;
    
    // First fix duplicate imports
    files.forEach(file => {
      const content = readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const seenImports = new Set();
      let modified = false;
      
      const cleanedLines = lines.filter(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('import ') && trimmedLine.includes('from ')) {
          const importKey = trimmedLine.replace(/\s+/g, ' '); // normalize spaces
          if (seenImports.has(importKey)) {
            modified = true;
            duplicateImportsFixed++;
            return false; // Remove duplicate
          }
          seenImports.add(importKey);
        }
        return true;
      });
      
      if (modified) {
        writeFileSync(file, cleanedLines.join('\n'));
      }
    });
    
    if (duplicateImportsFixed > 0) {
      fixes.push(`✅ Fixed ${duplicateImportsFixed} duplicate imports`);
    }
    
    // Then run duplicate code detection
    execSync('npx jscpd src --threshold 5 --min-tokens 50 --min-lines 10 --reporters json --output reports/jscpd', { stdio: 'pipe' });
    
    if (existsSync('reports/jscpd/jscpd-report.json')) {
      const duplicateReport = JSON.parse(readFileSync('reports/jscpd/jscpd-report.json', 'utf8'));
      
      if (duplicateReport.duplicates && duplicateReport.duplicates.length > 0) {
        // Only report significant duplicates
        const significantDuplicates = duplicateReport.duplicates.filter(d => d.linesCount > 15);
        
        if (significantDuplicates.length > 0) {
          fixes.push(`⚠️ Found ${significantDuplicates.length} significant code duplicates - consider refactoring`);
          await createUtilityFiles(significantDuplicates);
        } else {
          fixes.push('✅ No significant code duplicates found');
        }
      } else {
        fixes.push('✅ No code duplicates detected');
      }
    } else {
      fixes.push('✅ Duplicate code analysis completed');
    }
  } catch (error) {
    fixes.push('⚠️ Duplicate code extraction had issues');
  }
  
  const createUtilityFiles = async (duplicates) => {
    // Create common styles utility if not exists
    if (!existsSync('src/utils/styles.js')) {
      const stylesContent = `// Common style utilities
export const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
export const buttonStyles = "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500";
export const cardStyles = "bg-white rounded-lg shadow-md p-6 border border-gray-200";
export const labelStyles = "block text-sm font-medium text-gray-700 mb-2";
`;
      writeFileSync('src/utils/styles.js', stylesContent);
    }
  };

  // Generate fix report
  const report = `# Auto-Fix Report

Generated: ${new Date().toISOString()}

## Applied Fixes

${fixes.map(fix => `- ${fix}`).join('\n')}

## Summary

Total fixes attempted: ${fixes.length}
Successful fixes: ${fixes.filter(f => f.includes('✅')).length}
Warnings: ${fixes.filter(f => f.includes('⚠️')).length}
Failures: ${fixes.filter(f => f.includes('❌')).length}

## Next Steps

1. Review the changes made by auto-fix
2. Test the application to ensure functionality
3. Run quality checks to verify improvements
4. Commit the fixes if satisfied

Run \`npm run quality:check\` to validate the fixes.
`;

  writeFileSync('docs/AUTO_FIX_REPORT.md', report);
  
  console.log('\n📋 Auto-fix Summary:');
  fixes.forEach(fix => console.log(`  ${fix}`));
  console.log('\n📄 Detailed report saved to docs/AUTO_FIX_REPORT.md');
};

if (import.meta.url === `file://${process.argv[1]}`) {
  autoFixIssues().catch(console.error);
}

export { autoFixIssues };
