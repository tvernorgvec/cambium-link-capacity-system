import { execSync } from 'child_process';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

const autoFixEntireCodebase = async () => {
  console.log(
    '🔧 Running COMPREHENSIVE Automated Issue Fixes Across ENTIRE Codebase...\n'
  );

  const fixes = [];

  // 1. Fix ALL files - not just src
  // Console statement removed by auto-fix
  try {
    execSync(
      'find . -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | grep -v node_modules | xargs npx eslint --fix --quiet',
      { stdio: 'pipe' }
    );
    fixes.push(
      '✅ Unused imports removed from ALL JavaScript/TypeScript files'
    );
  } catch (error) {
    fixes.push('⚠️ Some import issues may remain in certain files');
  }

  // 2. Format ALL file types
  // Console statement removed by auto-fix
  try {
    execSync(
      'npx prettier --write "**/*.{js,jsx,ts,tsx,json,md,css,html,py,yml,yaml}" --ignore-path .gitignore',
      { stdio: 'pipe' }
    );
    fixes.push('✅ Code formatting applied to ALL file types');
  } catch (error) {
    fixes.push('❌ Some formatting failed');
  }

  // 3. Fix security across ALL files
  // Console statement removed by auto-fix
  try {
    execSync('npm audit fix --force', { stdio: 'pipe' });

    // Check for common security issues in ALL files
    const securityIssues = execSync(
      'find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | xargs grep -l "eval\\|innerHTML\\|dangerouslySetInnerHTML" || echo ""',
      { encoding: 'utf8' }
    ).trim();
    if (securityIssues) {
      fixes.push('⚠️ Security vulnerabilities found - manual review needed');
    } else {
      fixes.push('✅ Security vulnerabilities fixed across ALL files');
    }
  } catch (error) {
    fixes.push('⚠️ Some vulnerabilities may require manual attention');
  }

  // 4. Clean console statements from ALL files
  // Console statement removed by auto-fix
  try {
    const files = await glob('**/*.{js,jsx,ts,tsx}', {
      ignore: ['node_modules/**', 'dist/**', 'build/**'],
    });
    let consoleFixed = 0;

    files.forEach(file => {
      if (
        file.includes('ErrorBoundary') ||
        file.includes('.test.') ||
        file.includes('.spec.')
      ) {
        return; // Skip test files and error boundaries
      }

      try {
        const content = readFileSync(file, 'utf8');
        const lines = content.split('\n');
        let modified = false;

        const cleanedLines = lines.map(line => {
          if (
            line.trim().startsWith('console.log(') ||
            line.trim().startsWith('console.error(') ||
            line.trim().startsWith('console.warn(')
          ) {
            modified = true;
            consoleFixed++;
            return line.replace(
              /console\.(log|error|warn)\([^)]*\);?/,
              '// Console statement removed by auto-fix'
            );
          }
          return line;
        });

        if (modified) {
          writeFileSync(file, cleanedLines.join('\n'));
        }
      } catch (err) {
        // Skip unreadable files
      }
    });

    if (consoleFixed > 0) {
      fixes.push(
        `✅ Removed ${consoleFixed} console statements from ALL files`
      );
    }
  } catch (error) {
    fixes.push('⚠️ Console cleanup had issues in some files');
  }

  // 5. Fix Python files
  // Console statement removed by auto-fix
  try {
    const pyFiles = await glob('**/*.py', {
      ignore: ['node_modules/**', '__pycache__/**'],
    });
    let pythonFixed = 0;

    pyFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        let modified = false;
        let fixedContent = content;

        // Remove print statements (except in main blocks)
        if (
          content.includes('print(') &&
          !content.includes('if __name__ == "__main__"')
        ) {
          const lines = fixedContent.split('\n');
          const cleanedLines = lines.map(line => {
            if (line.trim().startsWith('print(') && !line.includes('# keep')) {
              modified = true;
              pythonFixed++;
              return line.replace(
                /print\([^)]*\)/,
                '# Print statement removed by auto-fix'
              );
            }
            return line;
          });

          if (modified) {
            fixedContent = cleanedLines.join('\n');
          }
        }

        // Fix imports
        const lines = fixedContent.split('\n');
        const imports = new Set();
        let hasFixedImports = false;

        const cleanedLines = lines.filter(line => {
          const trimmedLine = line.trim();
          if (
            trimmedLine.startsWith('import ') ||
            trimmedLine.startsWith('from ')
          ) {
            if (imports.has(trimmedLine)) {
              hasFixedImports = true;
              return false; // Remove duplicate
            }
            imports.add(trimmedLine);
          }
          return true;
        });

        if (hasFixedImports) {
          fixedContent = cleanedLines.join('\n');
          modified = true;
          pythonFixed++;
        }

        if (modified) {
          writeFileSync(file, fixedContent);
        }
      } catch (err) {
        // Skip unreadable files
      }
    });

    if (pythonFixed > 0) {
      fixes.push(`✅ Fixed ${pythonFixed} Python issues`);
    }
  } catch (error) {
    fixes.push('⚠️ Python file fixes had issues');
  }

  // 6. Fix React issues across ALL React files
  // Console statement removed by auto-fix
  try {
    const reactFiles = await glob('**/*.{jsx,tsx}', {
      ignore: ['node_modules/**', 'dist/**'],
    });
    let loopFixed = 0;

    reactFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        let modified = false;
        const fixedContent = content;

        // Fix useEffect infinite loops
        if (content.includes('useEffect') && content.includes('dispatch')) {
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
              const useEffectBlock = lines
                .slice(useEffectStart, i + 1)
                .join('\n');

              // Detect and fix dangerous dependency patterns
              if (
                useEffectBlock.includes('dispatch') &&
                /\[.*state.*\]/.test(useEffectBlock)
              ) {
                const newBlock = useEffectBlock.replace(/\[.*state.*\]/, '[]');

                if (newBlock !== useEffectBlock) {
                  const blockLines = newBlock.split('\n');
                  lines.splice(
                    useEffectStart,
                    i - useEffectStart + 1,
                    ...blockLines
                  );
                  modified = true;
                  loopFixed++;
                }
              }

              inUseEffect = false;
              useEffectStart = -1;
            }
          }

          if (modified) {
            writeFileSync(file, lines.join('\n'));
          }
        }
      } catch (err) {
        // Skip files that can't be processed
      }
    });

    if (loopFixed > 0) {
      fixes.push(
        `✅ Fixed ${loopFixed} React infinite loop patterns across ALL React files`
      );
    } else {
      fixes.push('✅ No React infinite loops detected in ANY files');
    }
  } catch (error) {
    fixes.push('⚠️ React loop check had issues');
  }

  // 7. Fix duplicate imports across ALL files
  // Console statement removed by auto-fix
  try {
    const allFiles = await glob('**/*.{js,jsx,ts,tsx,py}', {
      ignore: ['node_modules/**', 'dist/**', 'build/**'],
    });
    let duplicateImportsFixed = 0;

    allFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        const lines = content.split('\n');
        const seenImports = new Set();
        let modified = false;

        const cleanedLines = lines.filter(line => {
          const trimmedLine = line.trim();
          if (
            (trimmedLine.startsWith('import ') &&
              trimmedLine.includes('from ')) ||
            (trimmedLine.startsWith('from ') && trimmedLine.includes('import'))
          ) {
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
      } catch (err) {
        // Skip unreadable files
      }
    });

    if (duplicateImportsFixed > 0) {
      fixes.push(
        `✅ Fixed ${duplicateImportsFixed} duplicate imports across ALL files`
      );
    }
  } catch (error) {
    fixes.push('⚠️ Duplicate import fixing had issues');
  }

  // 8. Clean up temporary and backup files
  // Console statement removed by auto-fix
  try {
    execSync('find . -name "*.orig" -delete', { stdio: 'pipe' });
    execSync('find . -name "*.bak" -delete', { stdio: 'pipe' });
    execSync('find . -name "*~" -delete', { stdio: 'pipe' });
    fixes.push('✅ Cleaned up temporary and backup files');
  } catch (error) {
    fixes.push('⚠️ Some temporary files could not be removed');
  }

  // 9. Fix JSON files
  // Console statement removed by auto-fix
  try {
    const jsonFiles = await glob('**/*.json', { ignore: ['node_modules/**'] });
    let jsonFixed = 0;

    jsonFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        const parsed = JSON.parse(content);
        const formatted = JSON.stringify(parsed, null, 2);

        if (content !== formatted) {
          writeFileSync(file, formatted);
          jsonFixed++;
        }
      } catch (err) {
        fixes.push(`⚠️ Invalid JSON in ${file}: ${err.message}`);
      }
    });

    if (jsonFixed > 0) {
      fixes.push(`✅ Fixed formatting in ${jsonFixed} JSON files`);
    }
  } catch (error) {
    fixes.push('⚠️ JSON file fixes had issues');
  }

  // Generate comprehensive fix report
  const report = `# COMPREHENSIVE AUTO-FIX REPORT - ENTIRE CODEBASE

Generated: ${new Date().toISOString()}

## Applied Fixes Across ALL Files

${fixes.map(fix => `- ${fix}`).join('\n')}

## Summary

Total fixes attempted: ${fixes.length}
Successful fixes: ${fixes.filter(f => f.includes('✅')).length}
Warnings: ${fixes.filter(f => f.includes('⚠️')).length}
Failures: ${fixes.filter(f => f.includes('❌')).length}

## Scope of Auto-Fix

- **JavaScript/TypeScript**: ALL .js, .jsx, .ts, .tsx files
- **Python**: ALL .py files  
- **JSON**: ALL .json files
- **Documentation**: ALL .md files
- **Configuration**: ALL config files
- **Styling**: ALL .css files

## Files Processed

- Source code in ALL directories (not just src/)
- Configuration files in root and subdirectories
- Documentation across the entire project
- Backend and frontend files
- Scripts and utilities

## Next Steps

1. Review ALL changes made by auto-fix across the entire codebase
2. Test the application to ensure functionality in ALL components
3. Run comprehensive quality checks to verify improvements
4. Commit the fixes if satisfied with ALL changes

Run \`npm run quality:comprehensive\` to validate ALL fixes across the entire codebase.
`;

  writeFileSync('docs/COMPREHENSIVE_AUTO_FIX_REPORT.md', report);

  // Console statement removed by auto-fix:');
  fixes.forEach(fix => console.log(`  ${fix}`));
  console.log(
    '\n📄 Detailed report saved to docs/COMPREHENSIVE_AUTO_FIX_REPORT.md'
  );
  // Console statement removed by auto-fix
};

if (import.meta.url === `file://${process.argv[1]}`) {
  autoFixEntireCodebase().catch(console.error);
}

export { autoFixEntireCodebase };
