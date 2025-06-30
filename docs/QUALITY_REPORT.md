# Comprehensive Quality Report

Generated: 2025-06-30T20:32:28.554Z

## Summary
- **Total Checks**: 9
- **Passed**: 8
- **Failed**: 1
- **Auto-Fixed**: 3
- **Success Rate**: 89%

## Detailed Results

### ESLint ✅ (Auto-Fixed)

⚠️ Warnings: 
Oops! Something went wrong! :(

ESLint: 9.30.0

TypeError: context.getScope is not a function
Occurred while linting /home/runner/workspace/dist/assets/index-LK7OlPv2.js:49
Rule: "security/detect-non


### Prettier ✅ (Auto-Fixed)
```
Checking formatting...
All matched files use Prettier code style!

```


### TypeScript ✅



### Unused Exports ✅



### Circular Dependencies ✅
```
Processed 19 files (1.2s) 



```


### Code Duplication ✅
```
Clone found (javascript):
 - [1m[32m/home/runner/workspace/src/components/History.jsx[39m[22m [237:13 - 325:5] (88 lines, 644 tokens)
   [1m[32m/home/runner/workspace/src/components/Scheduler.jsx[39m[22m [191:11 - 255:74]

[90m┌────────────[39m[90m┬────────────────[39m[90m┬─────────────[39m[90m┬──────────────[39m[90m┬──────────────[39m[90m┬──────────────────[39m[90m┬───────────────────┐[39m
[90m│[39m[31m Format     [39m[90m│[39m[31m Files analyzed [39m[90m│[39m[3
```


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

### License Check ✅
```
License check completed with warnings

```


## Recommendations


- 1 checks failed and need manual attention
- Review failed checks and fix issues manually
- Run quality checks again after fixes



- 3 issues were automatically fixed
- Review auto-fixed changes before committing


## Next Steps

1. Review and commit any auto-fixed changes
2. Address any remaining manual issues
3. Run `npm run quality:check` regularly
4. Consider adding pre-commit hooks for continuous quality
