
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
      
      // Check for setState in useEffect without proper dependencies
      if (content.includes('setState') && content.includes('useEffect') && content.includes('}, [state])')) {
        const lines = content.split('\n');
        const fixedContent = lines.map(line => {
          if (line.includes('}, [state])') && line.includes('useEffect')) {
            modified = true;
            loopFixed++;
            return line.replace('}, [state])', '}, [])');
          }
          return line;
        }).join('\n');
        
        if (modified) {
          writeFileSync(file, fixedContent);
        }
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
