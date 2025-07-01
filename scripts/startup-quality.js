
#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

// Console statement removed by auto-fix

const runQualityCheck = () => {
  try {
    // Run auto-fix first
    // Console statement removed by auto-fix
    execSync('npm run quality:autofix', { stdio: 'inherit' });
    
    // Then run quality check
    // Console statement removed by auto-fix
    execSync('npm run quality:check', { stdio: 'inherit' });
    
    // Generate timestamp
    const timestamp = new Date().toISOString();
    writeFileSync('.quality-last-run', timestamp);
    
    // Console statement removed by auto-fix
    return true;
  } catch (error) {
    // Console statement removed by auto-fix
    return false;
  }
};

// Run immediately
runQualityCheck();
