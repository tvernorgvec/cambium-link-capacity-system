
#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const tools = [
  { name: 'ESLint', command: 'npx eslint --version', config: 'eslint.config.js' },
  { name: 'Prettier', command: 'npx prettier --version', config: '.prettierrc' },
  { name: 'TypeScript', command: 'npx tsc --version', config: 'tsconfig.json' }
];

const validateTool = (tool) => {
  try {
    const output = execSync(tool.command, { 
      encoding: 'utf8', 
      stdio: 'pipe', 
      timeout: 10000 
    }).trim();
    
    const configExists = tool.config ? existsSync(tool.config) : true;
    
    return {
      name: tool.name,
      status: 'available',
      version: output.split('\n')[0], // First line only
      configExists,
      config: tool.config
    };
  } catch (error) {
    return {
      name: tool.name,
      status: 'missing',
      error: 'Not available',
      configExists: false,
      config: tool.config
    };
  }
};

const generateReport = () => {
  console.log('🔍 Validating Quality Tools...\n');
  
  const results = tools.map(validateTool);
  const available = results.filter(r => r.status === 'available');
  
  console.log(`✅ Available Tools: ${available.length}/${tools.length}\n`);
  
  results.forEach(tool => {
    const status = tool.status === 'available' ? '✅' : '❌';
    const config = tool.configExists ? '✅' : '❌';
    console.log(`  ${tool.name}: ${status} ${tool.version || 'Not available'} Config: ${config}`);
  });
  
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
