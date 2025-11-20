# Implementation Steps for Publishing @mtuckerb/mcp-roo

## Immediate Actions Required

### Step 1: Create .npmignore file
Create a new file `.npmignore` with the following content to ensure only necessary files are published:

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
PUBLISHING_PLAN.md
IMPLEMENTATION_STEPS.md

# Test files
test/
*.test.js
*.spec.js

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

# Node modules (should never be published)
node_modules/

# Lock files (controversial, but generally excluded)
package-lock.json
yarn.lock

# Keep these files
!build/
!package.json
!README.md
!LICENSE
```

### Step 2: Build and Verify the Project

Run these commands in sequence:

```bash
# Install dependencies
npm install

# Build the TypeScript project
npm run build

# Verify the build output exists
ls -la build/

# Check that index.js has the shebang line
head -n 1 build/index.js
# Should show: #!/usr/bin/env node

# Verify executable permissions
ls -l build/index.js
# Should show -rwxr-xr-x or similar (executable)
```

### Step 3: Test Locally Before Publishing

```bash
# Create a tarball to see what will be published
npm pack

# This creates mtuckerb-mcp-roo-1.0.0.tgz
# Check the contents
tar -tzf mtuckerb-mcp-roo-1.0.0.tgz

# Test in isolation
mkdir /tmp/test-mcp-roo
cd /tmp/test-mcp-roo
npm init -y
npm install /path/to/mcp_roo/mtuckerb-mcp-roo-1.0.0.tgz

# Try running it
npx @mtuckerb/mcp-roo
# Should output: "MCP Roo server running on stdio" to stderr

# Clean up
cd -
rm -rf /tmp/test-mcp-roo
```

### Step 4: Publish to NPM

```bash
# Verify npm authentication
npm whoami
# Should show your npm username

# Do a dry run first
npm publish --dry-run --access public

# Review the output - ensure no sensitive files are included
# Check the tarball size is reasonable (should be < 100KB)

# If everything looks good, publish for real
npm publish --access public

# Note: The --access public flag is REQUIRED for scoped packages
# Without it, npm will try to publish as private (requires paid account)
```

### Step 5: Verify Publication

```bash
# Wait for npm CDN propagation (usually 1-2 minutes)
sleep 120

# Check npm registry
npm view @mtuckerb/mcp-roo

# Test with npx (the ultimate test)
cd /tmp
npx @mtuckerb/mcp-roo
# Should download and run successfully

# Visit the package page
# https://www.npmjs.com/package/@mtuckerb/mcp-roo
```

### Step 6: Test MCP Integration

Create a test configuration file `/tmp/test-mcp-config.json`:

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

Test with MCP inspector or your MCP client to ensure the server:
1. Starts without errors
2. Lists all 5 tools correctly
3. Responds to tool calls appropriately

## Potential Issues and Solutions

### Issue 1: Build Errors
If `npm run build` fails:
- Check TypeScript errors in src/index.ts
- Ensure all type definitions are installed
- Verify tsconfig.json settings

### Issue 2: Permission Errors
If the built file isn't executable:
- The package.json build script should handle this
- Manually fix: `chmod +x build/index.js`

### Issue 3: NPM Authentication Issues
If npm publish fails with 401/403:
```bash
# Re-authenticate
npm login

# Check scope access
npm access ls-packages

# Ensure you own the @mtuckerb scope
npm owner ls @mtuckerb/mcp-roo
```

### Issue 4: Package Already Exists
If version 1.0.0 already exists:
- Bump version in package.json to 1.0.1
- Update README.md changelog
- Try publishing again

## Commands Summary

Here's the complete sequence of commands to execute:

```bash
# 1. Create .npmignore (use Code mode for this)

# 2. Build
npm install
npm run build

# 3. Test locally
npm pack
tar -tzf mtuckerb-mcp-roo-1.0.0.tgz

# 4. Publish
npm publish --access public

# 5. Verify
sleep 120
npx @mtuckerb/mcp-roo

# 6. Clean up
rm mtuckerb-mcp-roo-1.0.0.tgz
```

## Next Steps After Publishing

1. **Update GitHub Repository**
   - Create a release tag: `git tag v1.0.0`
   - Push tags: `git push --tags`
   - Create GitHub release with changelog

2. **Monitor Usage**
   - Check npm downloads: https://www.npmjs.com/package/@mtuckerb/mcp-roo
   - Watch for issues on GitHub
   - Respond to user feedback

3. **Documentation Updates**
   - Add badges to README (npm version, downloads, license)
   - Create examples directory with usage examples
   - Add troubleshooting guide based on user feedback

4. **Future Enhancements**
   - Implement actual connection to Proofessor AI
   - Add configuration options
   - Implement caching for responses
   - Add more specialized tools based on user needs