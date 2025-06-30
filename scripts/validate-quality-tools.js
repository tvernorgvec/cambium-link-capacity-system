
#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const tools = [
  { name: 'ESLint', command: 'npx eslint --version', config: 'eslint.config.js' },
  { name: 'Prettier', command: 'npx prettier --version', config: '.prettierrc' },
  { name: 'Depcheck', command: 'npx depcheck --version', config: null },
  { name: 'TypeScript', command: 'npx tsc --version', config: 'tsconfig.json' },
  { name: 'Husky', command: 'npx husky --version', config: '.husky' },
  { name: 'Lint-Staged', command: 'npx lint-staged --version', config: '.lintstagedrc.json' },
  { name: 'Commitlint', command: 'npx commitlint --version', config: 'commitlint.config.js' },
  { name: 'JSCPD', command: 'npx jscpd --version', config: '.jscpd.json' }
];

const validateTool = (tool) => {
  try {
    const version = execSync(tool.command, { encoding: 'utf8', stdio: 'pipe', timeout: 10000 }).trim();
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
      error: error.message.split('\n')[0], // Only first line of error
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
      console.log(`  ${tool.name}: Not available`);
    });
  }
  
  console.log('\n📊 Quality Tool Validation Complete');
  return { 
    available: available.length, 
    total: tools.length,
    tools: results
  };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  generateReport();
}

export { validateTool, generateReport };
