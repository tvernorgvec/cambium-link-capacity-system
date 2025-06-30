# Comprehensive Quality Report

Generated: 2025-06-30T20:29:56.501Z

## Summary
- **Total Checks**: 9
- **Passed**: 5
- **Failed**: 4
- **Auto-Fixed**: 2
- **Success Rate**: 56%

## Detailed Results

### ESLint ❌

❌ Error: Command failed: npx eslint . --ext .js,.jsx,.ts,.tsx --fix --max-warnings=0

### Prettier ✅ (Auto-Fixed)
```
Checking formatting...

```


### TypeScript ✅



### Unused Exports ✅



### Circular Dependencies ✅
```
Processed 19 files (1.4s) 



```


### Code Duplication ❌
```
SyntaxError: /home/runner/workspace/.jscpd.json: Unexpected non-whitespace character after JSON at position 191
    at JSON.parse (<anonymous>)
    at readFileSync (/home/runner/workspace/node_modules/jsonfile/index.js:52:17)
    at readConfigJson (/home/runner/workspace/node_modules/jscpd/dist/jscpd.js:123:67)
    at prepareOptions (/home/runner/workspace/node_modules/jscpd/dist/jscpd.js:143:24)
    at initOptionsFromCli (/home/runner/workspace/node_modules/jscpd/dist/jscpd.js:167:19)
    at js
```
❌ Error: Command failed: npx jscpd src --threshold 3 --reporters console

### Dependencies ✅ (Auto-Fixed)
```
found 0 vulnerabilities

```


### Unused Dependencies ❌
```
Unused dependencies
* @tailwindcss/postcss
* autoprefixer
* postcss-import
Unused devDependencies
* @commitlint/cli
* @commitlint/config-conventional
* audit-ci
* lint-staged
* npm-check-updates
Missing dependencies
* @emotion/is-prop-valid: ./preview-dist/assets/index-CZKHK-VA.js

```
❌ Error: Command failed: npx depcheck --ignores="@types/*,eslint-*,@typescript-eslint/*"

### License Check ❌

❌ Error: Command failed: npx license-checker --onlyAllow "MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC;0BSD;Unlicense"

## Recommendations


- 4 checks failed and need manual attention
- Review failed checks and fix issues manually
- Run quality checks again after fixes



- 2 issues were automatically fixed
- Review auto-fixed changes before committing


## Next Steps

1. Review and commit any auto-fixed changes
2. Address any remaining manual issues
3. Run `npm run quality:check` regularly
4. Consider adding pre-commit hooks for continuous quality
