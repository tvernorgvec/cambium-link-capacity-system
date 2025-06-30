
#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

console.log('🚀 Starting automated quality checks on restart...\n');

const runQualityCheck = () => {
  try {
    // Run auto-fix first
    console.log('🔧 Running auto-fix...');
    execSync('npm run quality:autofix', { stdio: 'inherit' });
    
    // Then run quality check
    console.log('🔍 Running quality check...');
    execSync('npm run quality:check', { stdio: 'inherit' });
    
    // Generate timestamp
    const timestamp = new Date().toISOString();
    writeFileSync('.quality-last-run', timestamp);
    
    console.log('✅ Startup quality checks completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Quality checks failed:', error.message);
    return false;
  }
};

// Run immediately
runQualityCheck();
