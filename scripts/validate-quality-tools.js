
#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const tools = [
  { name: 'ESLint', command: 'npx eslint --version', config: 'eslint.config.js' },
  { name: 'Prettier', command: 'npx prettier --version', config: '.prettierrc' },
  { name: 'TypeScript Prune', command: 'npx ts-prune --version', config: 'tsconfig.json' },
  { name: 'JSCPD', command: 'npx jscpd --version', config: '.jscpd.json' },
  { name: 'Madge', command: 'npx madge --version', config: null },
  { name: 'Husky', command: 'npx husky --version', config: '.husky' },
  { name: 'Lint-Staged', command: 'npx lint-staged --version', config: '.lintstagedrc.json' },
  { name: 'Commitlint', command: 'npx commitlint --version', config: 'commitlint.config.js' },
  { name: 'Commitizen', command: 'npx cz --version', config: '.czrc' },
  { name: 'Depcheck', command: 'npx depcheck --version', config: null },
  { name: 'npm-check-updates', command: 'npx ncu --version', config: null },
  { name: 'License Checker', command: 'npx license-checker --version', config: null },
  { name: 'Audit CI', command: 'npx audit-ci --version', config: null }
];

const validateTool = (tool) => {
  try {
    const version = execSync(tool.command, { encoding: 'utf8' }).trim();
    const configExists = tool.config ? existsSync(tool.config) : true;
    
    return {
      name: tool.name,
      status: 'available',
      version,
      configExists,
      config: tool.config
    };
  } catch (error) {
    return {
      name: tool.name,
      status: 'missing',
      error: error.message,
      configExists: false,
      config: tool.config
    };
  }
};

const generateReport = () => {
  console.log('🔍 Validating Quality Tools...\n');
  
  const results = tools.map(validateTool);
  const available = results.filter(r => r.status === 'available');
  const missing = results.filter(r => r.status === 'missing');
  
  console.log(`✅ Available Tools: ${available.length}/${tools.length}\n`);
  
  available.forEach(tool => {
    const configStatus = tool.configExists ? '✅' : '❌';
    console.log(`  ${tool.name}: ${tool.version} ${configStatus}`);
  });
  
  if (missing.length > 0) {
    console.log(`\n❌ Missing Tools: ${missing.length}\n`);
    missing.forEach(tool => {
      console.log(`  ${tool.name}: ${tool.error}`);
    });
  }
  
  console.log('\n📊 Quality Tool Validation Complete');
  return { available: available.length, total: tools.length };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  generateReport();
}

export { validateTool, generateReport };
