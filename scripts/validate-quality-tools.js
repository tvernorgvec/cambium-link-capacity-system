import { execSync } from 'child_process';
import { existsSync } from 'fs';

const tools = [
  {
    name: 'ESLint',
    command: 'npx eslint --version',
    config: 'eslint.config.js',
  },
  {
    name: 'Prettier',
    command: 'npx prettier --version',
    config: '.prettierrc',
  },
  { name: 'TypeScript', command: 'npx tsc --version', config: 'tsconfig.json' },
  { name: 'Node.js', command: 'node --version', config: null },
  { name: 'npm', command: 'npm --version', config: null },
];

const validateTool = tool => {
  try {
    const output = execSync(tool.command, {
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 10000,
      cwd: process.cwd(),
    }).trim();

    const configExists = tool.config ? existsSync(tool.config) : true;

    return {
      name: tool.name,
      status: 'available',
      version: output.split('\n')[0],
      configExists,
      config: tool.config,
    };
  } catch (error) {
    return {
      name: tool.name,
      status: 'missing',
      error: error.message || 'Not available',
      configExists: tool.config ? existsSync(tool.config) : false,
      config: tool.config,
    };
  }
};

const generateReport = () => {
  // Console statement removed by auto-fix

  const results = tools.map(validateTool);
  const available = results.filter(r => r.status === 'available');

  // Console statement removed by auto-fix

  results.forEach(tool => {
    const status = tool.status === 'available' ? '✅' : '❌';
    const config = tool.configExists ? '✅' : tool.config ? '❌' : 'N/A';
    console.log(
      `  ${tool.name}: ${status} ${tool.version || 'Not available'} Config: ${config}`
    );
  });

  return {
    available: available.length,
    total: tools.length,
    tools: results,
  };
};

// Check if this script is being run directly
if (process.argv[1] && process.argv[1].endsWith('validate-quality-tools.js')) {
  generateReport();
}

export { validateTool, generateReport };
