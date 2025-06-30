
#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { generateReport } from './validate-quality-tools.js';
import { generateInventory } from './inventory.js';

const runCommand = (command, description) => {
  console.log(`🔄 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} completed`);
    return { success: true, output };
  } catch (error) {
    console.log(`❌ ${description} failed: ${error.message}`);
    return { success: false, error: error.message };
  }
};

const setupHooks = () => {
  console.log('🔧 Setting up Git hooks...');
  try {
    execSync('npx husky install', { stdio: 'inherit' });
    execSync('chmod +x .husky/pre-commit', { stdio: 'inherit' });
    execSync('chmod +x .husky/commit-msg', { stdio: 'inherit' });
    console.log('✅ Git hooks configured');
    return true;
  } catch (error) {
    console.log(`❌ Git hooks setup failed: ${error.message}`);
    return false;
  }
};

const runQualityChecks = async () => {
  console.log('🚀 Starting Autonomous Quality Suite...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    tools: {},
    summary: { passed: 0, failed: 0, total: 0 }
  };
  
  // Validate tools
  const toolValidation = generateReport();
  results.toolsAvailable = toolValidation;
  
  // Setup Git hooks
  const hooksSetup = setupHooks();
  results.hooksSetup = hooksSetup;
  
  // Quality checks with auto-fix
  const checks = [
    {
      name: 'ESLint',
      command: 'npx eslint src --ext .ts,.tsx,.js,.jsx --fix --format=json',
      description: 'Linting and auto-fixing code'
    },
    {
      name: 'Prettier',
      command: 'npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,md}"',
      description: 'Formatting code'
    },
    {
      name: 'TypeScript Prune',
      command: 'npx ts-prune --error',
      description: 'Checking for dead code'
    },
    {
      name: 'JSCPD',
      command: 'npx jscpd src --threshold 10',
      description: 'Detecting duplicate code'
    },
    {
      name: 'Madge',
      command: 'npx madge --circular src',
      description: 'Checking circular dependencies'
    },
    {
      name: 'Depcheck',
      command: 'npx depcheck --json',
      description: 'Checking unused dependencies'
    },
    {
      name: 'License Check',
      command: 'npx license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD" --json',
      description: 'Validating license compliance'
    },
    {
      name: 'Security Audit',
      command: 'npm audit --audit-level=moderate --json',
      description: 'Security vulnerability scan'
    }
  ];
  
  for (const check of checks) {
    const result = runCommand(check.command, check.description);
    results.tools[check.name] = result;
    results.summary.total++;
    
    if (result.success) {
      results.summary.passed++;
    } else {
      results.summary.failed++;
    }
  }
  
  // Generate inventory
  console.log('\n📋 Generating project inventory...');
  const inventory = generateInventory();
  results.inventory = inventory;
  
  // Generate quality report
  const report = `# Quality Report\n\n**Generated:** ${results.timestamp}\n\n## Summary\n- **Tools Available:** ${toolValidation.available}/${toolValidation.total}\n- **Checks Passed:** ${results.summary.passed}/${results.summary.total}\n- **Git Hooks:** ${hooksSetup ? 'Configured' : 'Failed'}\n\n## Tool Results\n${Object.entries(results.tools).map(([tool, result]) => `### ${tool}\n- **Status:** ${result.success ? '✅ Passed' : '❌ Failed'}\n${result.error ? `- **Error:** ${result.error}\n` : ''}`).join('\n')}\n\n---\n*Auto-generated quality report*`;
  
  writeFileSync('docs/QUALITY_REPORT.md', report);
  writeFileSync('docs/quality-results.json', JSON.stringify(results, null, 2));
  
  console.log('\n📊 Quality Suite Complete:');
  console.log(`  - Passed: ${results.summary.passed}/${results.summary.total}`);
  console.log(`  - Report: docs/QUALITY_REPORT.md`);
  
  return results;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  runQualityChecks().catch(console.error);
}

export { runQualityChecks };
