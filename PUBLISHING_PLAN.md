# Publishing Plan for @mtuckerb/mcp-roo

## Overview
This document outlines the steps to publish the MCP Roo server to npm registry so it can be used via `npx @mtuckerb/mcp-roo`.

## Pre-Publication Checklist

### 1. Build Verification
- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Run `npm run build` to compile TypeScript to JavaScript
- [ ] Verify the build output in `build/` directory
- [ ] Ensure `build/index.js` has proper shebang (`#!/usr/bin/env node`)
- [ ] Check that build/index.js has executable permissions (755)

### 2. Package Configuration Review
- [x] Package name: `@mtuckerb/mcp-roo` ✓
- [x] Version: `1.0.0` ✓
- [x] Main entry point: `./build/index.js` (via bin field) ✓
- [x] License: MIT ✓
- [x] Repository URL configured ✓
- [x] Keywords added for discoverability ✓

### 3. Create .npmignore
Need to create `.npmignore` to ensure only necessary files are published:
```
# Source files (not needed in published package)
src/
*.ts
!*.d.ts

# Development files
.gitignore
.git/
tsconfig.json
.vscode/
.idea/

# Test files
test/
*.test.js
*.spec.js

# Documentation files (optional - you may want to keep README.md)
PUBLISHING_PLAN.md

# Logs and temp files
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm/
tmp/
temp/

# OS files
.DS_Store
Thumbs.db

# Keep these files
!build/
!package.json
!README.md
!LICENSE
```

### 4. Local Testing
Before publishing, test the package locally:
```bash
# Build the project
npm run build

# Test the binary directly
node build/index.js

# Create a local package
npm pack

# In a different directory, test the package
npm install /path/to/mtuckerb-mcp-roo-1.0.0.tgz
npx mcp-roo

# Or use npm link for local testing
npm link
# In another project
npm link @mtuckerb/mcp-roo
```

## Publication Steps

### 1. Final Pre-flight Checks
```bash
# Ensure you're logged in to npm
npm whoami

# Verify you have access to the @mtuckerb scope
npm access ls-packages @mtuckerb

# Run a dry run to see what would be published
npm publish --dry-run
```

### 2. Publish to NPM
```bash
# Publish the package
npm publish --access public

# Note: --access public is required for scoped packages on first publish
```

### 3. Post-Publication Verification
```bash
# Wait a minute for npm to propagate
sleep 60

# Test with npx
npx @mtuckerb/mcp-roo

# Verify package info
npm info @mtuckerb/mcp-roo

# Check package page
# Visit: https://www.npmjs.com/package/@mtuckerb/mcp-roo
```

## Integration Testing

### Test with Roo Cloud
1. Update MCP settings (`~/.roo/mcp_settings.json`):
```json
{
  "mcpServers": {
    "proofessor": {
      "command": "npx",
      "args": ["@mtuckerb/mcp-roo"],
      "disabled": false
    }
  }
}
```

2. Restart Roo Cloud or reload MCP servers
3. Test each tool function

### Test with Claude Desktop
1. Update Claude Desktop config:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. Add configuration:
```json
{
  "mcpServers": {
    "proofessor": {
      "command": "npx",
      "args": ["@mtuckerb/mcp-roo"]
    }
  }
}
```

3. Restart Claude Desktop
4. Verify server appears in MCP tools

## Troubleshooting

### Common Issues and Solutions

1. **404 Error when using npx**
   - Ensure package is published with public access
   - Wait for npm CDN propagation (can take up to 5 minutes)
   - Clear npx cache: `npx clear-npx-cache`

2. **Permission denied when executing**
   - Ensure build script sets executable permissions: `chmod +x build/index.js`
   - Verify shebang line is present in index.js

3. **Module not found errors**
   - Ensure all dependencies are in `dependencies` not `devDependencies`
   - Verify TypeScript compilation settings for module resolution

4. **MCP connection failures**
   - Check that server uses stdio transport
   - Verify no console.log statements interfere with MCP protocol
   - Ensure error messages go to stderr, not stdout

## Version Management

For future updates:
1. Update version in package.json
2. Update CHANGELOG in README.md
3. Commit changes
4. Create git tag: `git tag v1.0.1`
5. Push tag: `git push origin v1.0.1`
6. Publish: `npm publish`

## Security Considerations

- Never commit `.npmrc` with auth tokens
- Use npm 2FA for publishing
- Regularly audit dependencies: `npm audit`
- Keep dependencies updated
- Review npm publish output for sensitive data

## Success Criteria

- [ ] Package successfully published to npm
- [ ] `npx @mtuckerb/mcp-roo` works without installation
- [ ] Server connects successfully via MCP protocol
- [ ] All five tools respond correctly
- [ ] Integration works with both Roo Cloud and Claude Desktop
- [ ] Package page on npmjs.com shows correct information