
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { execSync } from 'child_process';
import { join, extname } from 'path';

const getDirectorySize = (dirPath) => {
  let size = 0;
  try {
    const files = readdirSync(dirPath);
    for (const file of files) {
      const filePath = join(dirPath, file);
      const stats = statSync(filePath);
      if (stats.isDirectory()) {
        size += getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    }
  } catch (error) {
    // Skip inaccessible directories
  }
  return size;
};

const getFilesByExtension = (dirPath, extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json']) => {
  const files = {};
  extensions.forEach(ext => files[ext] = []);

  const walkDir = (currentPath) => {
    try {
      const items = readdirSync(currentPath);
      for (const item of items) {
        const itemPath = join(currentPath, item);
        const stats = statSync(itemPath);
        
        if (stats.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          walkDir(itemPath);
        } else if (stats.isFile()) {
          const ext = extname(item);
          if (extensions.includes(ext)) {
            files[ext].push(itemPath);
          }
        }
      }
    } catch (error) {
      // Skip inaccessible directories
    }
  };

  walkDir(dirPath);
  return files;
};

const getPackageInfo = () => {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    return {
      name: packageJson.name,
      version: packageJson.version,
      dependencies: Object.keys(packageJson.dependencies || {}).length,
      devDependencies: Object.keys(packageJson.devDependencies || {}).length,
      scripts: Object.keys(packageJson.scripts || {}).length
    };
  } catch (error) {
    return null;
  }
};

const getGitInfo = () => {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    const commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    return {
      branch,
      commit,
      hasUncommittedChanges: status.length > 0,
      uncommittedFiles: status.split('\n').filter(line => line.trim()).length
    };
  } catch (error) {
    return null;
  }
};

const generateInventory = () => {
  console.log('📋 Generating project inventory...');
  
  const timestamp = new Date().toISOString();
  
  // Read package.json for additional info
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  
  // Get system info
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  
  // Quality tools inventory
  const qualityTools = {
    'ESLint': '9.29.0',
    'Prettier': '3.6.1',
    'TypeScript Prune': '0.10.3',
    'JSCPD': '4.0.5',
    'Madge': '8.0.0',
    'Husky': '9.0.11',
    'Lint-Staged': '15.2.10',
    'Commitlint': '19.5.0',
    'Commitizen': '4.3.1',
    'Depcheck': '1.4.7',
    'npm-check-updates': '17.1.10',
    'License Checker': '25.0.1',
    'Audit CI': '7.1.0'
  };

  const inventory = {
    timestamp,
    project: {
      name: packageJson.name || 'GVEC Link Capacity',
      version: packageJson.version || '1.0.0',
      description: packageJson.description || 'Link capacity testing application',
      dependencies: Object.keys(packageJson.dependencies || {}).length,
      devDependencies: Object.keys(packageJson.devDependencies || {}).length,
      scripts: Object.keys(packageJson.scripts || {}).length
    },
    git: getGitInfo(),
    runtime: {
      node: nodeVersion,
      npm: npmVersion
    },
    frontend: {
      framework: 'React 18.2.0',
      language: 'TypeScript/JavaScript',
      styling: 'Tailwind CSS',
      animation: 'Framer Motion',
      routing: 'React Router DOM',
      bundler: 'Vite'
    },
    qualityTools,
    structure: {
      totalSize: getDirectorySize('.'),
      files: getFilesByExtension('src'),
      directories: []
    },
    routes: {
      frontend: [
        '/linktest/',
        '/linktest/dashboard',
        '/linktest/scheduler',
        '/linktest/history',
        '/linktest/settings'
      ]
    },
    configurations: [
      'eslint.config.js',
      '.prettierrc',
      '.jscpd.json',
      '.lintstagedrc.json',
      'commitlint.config.js',
      '.czrc',
      'tsconfig.json'
    ]
  };

  // Get directory structure
  try {
    const srcDirs = readdirSync('src', { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    inventory.structure.directories = srcDirs;
  } catch (error) {
    inventory.structure.directories = [];
  }

  // Calculate file counts
  inventory.structure.fileCounts = {};
  Object.entries(inventory.structure.files).forEach(([ext, files]) => {
    inventory.structure.fileCounts[ext] = files.length;
  });

  // Generate markdown report
  const markdown = `# Project Inventory

**Generated:** ${timestamp}

## Project Information
- **Name:** ${inventory.project.name}
- **Version:** ${inventory.project.version}
- **Description:** ${inventory.project.description}
- **Dependencies:** ${inventory.project.dependencies}
- **Dev Dependencies:** ${inventory.project.devDependencies}
- **Scripts:** ${inventory.project.scripts}

## Git Information
${inventory.git ? `
- **Branch:** ${inventory.git.branch}
- **Commit:** ${inventory.git.commit}
- **Uncommitted Changes:** ${inventory.git.hasUncommittedChanges ? 'Yes' : 'No'}
- **Uncommitted Files:** ${inventory.git.uncommittedFiles || 0}
` : '- Git information not available'}

## Runtime Environment
- **Node.js:** ${inventory.runtime.node}
- **npm:** ${inventory.runtime.npm}

## Technology Stack

### Frontend
- **Framework:** ${inventory.frontend.framework}
- **Language:** ${inventory.frontend.language}
- **Styling:** ${inventory.frontend.styling}
- **Animation:** ${inventory.frontend.animation}
- **Routing:** ${inventory.frontend.routing}
- **Bundler:** ${inventory.frontend.bundler}

### Quality Tools (${Object.keys(qualityTools).length} tools)
${Object.entries(qualityTools).map(([tool, version]) => `- **${tool}:** ${version}`).join('\n')}

## Project Structure
- **Total Size:** ${(inventory.structure.totalSize / 1024 / 1024).toFixed(2)} MB
- **Source Directories:** ${inventory.structure.directories.join(', ') || 'None'}

## File Counts by Extension
${Object.entries(inventory.structure.fileCounts).map(([ext, count]) => `- **${ext}:** ${count} files`).join('\n')}

## Routes
${inventory.routes.frontend.map(route => `- ${route}`).join('\n')}

## Configuration Files
${inventory.configurations.map(config => `- ${config}`).join('\n')}

---
*Auto-generated by inventory script*`;
  
  // Write files
  writeFileSync('docs/INVENTORY.md', markdown);
  writeFileSync('docs/inventory.json', JSON.stringify(inventory, null, 2));
  
  console.log('📋 Project inventory generated:');
  console.log('  - docs/INVENTORY.md');
  console.log('  - docs/inventory.json');
  
  return inventory;
};

if (import.meta.url === `file://${process.argv[1]}`) {
  generateInventory();
}

export { generateInventory };
