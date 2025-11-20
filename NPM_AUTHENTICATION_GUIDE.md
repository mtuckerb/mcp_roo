# NPM Authentication and Publishing Guide

## Current Status ✅

The package is fully prepared and ready to publish:
- ✅ `.npmignore` file created to exclude unnecessary files
- ✅ Dependencies installed successfully
- ✅ TypeScript compiled to JavaScript
- ✅ Build artifacts verified (executable permissions, shebang line)
- ✅ Package dry-run successful (7.5 kB compressed, 24.8 kB unpacked)
- ✅ Only 7 essential files will be published

## Next Steps Required 🔐

### Step 1: Authenticate with npm

You need to log in to npm before publishing. Run this command:

```bash
npm login
```

You'll be prompted for:
1. **Username**: Your npm username (mtuckerb)
2. **Password**: Your npm password
3. **Email**: Your email address (public)
4. **OTP** (if 2FA is enabled): One-time password from your authenticator app

**Alternative: Using Access Token**

If you prefer to use an access token (recommended for CI/CD):

```bash
npm config set //registry.npmjs.org/:_authToken=YOUR_NPM_TOKEN
```

To create a token:
1. Visit https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token"
3. Choose "Automation" or "Publish" type
4. Copy the token and use it in the command above

### Step 2: Verify Authentication

After logging in, verify your authentication:

```bash
npm whoami
```

This should display your npm username: `mtuckerb`

### Step 3: Publish the Package

Once authenticated, publish with:

```bash
npm publish --access public
```

**Important Notes:**
- The `--access public` flag is **required** for scoped packages (@mtuckerb/mcp-roo)
- Without this flag, npm will try to publish as private (requires paid account)
- The package will be immediately available on npm registry

### Step 4: Verify Publication

Wait 1-2 minutes for npm CDN propagation, then verify:

```bash
# Check package info
npm info @mtuckerb/mcp-roo

# Test with npx (the ultimate test!)
npx @mtuckerb/mcp-roo
```

Expected output: `MCP Roo server running on stdio` (to stderr)

### Step 5: Test Integration

Update your MCP configuration to use the published package:

**For Roo Cloud** (`~/.roo/mcp_settings.json`):
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

**For Claude Desktop** (macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`):
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

Restart the application and test the MCP server integration.

## Troubleshooting 🔧

### Issue: "npm ERR! code E401" or "npm ERR! code E403"

**Solution**: Authentication failed or insufficient permissions
```bash
# Re-authenticate
npm logout
npm login

# Verify you own the @mtuckerb scope
npm access ls-packages @mtuckerb
```

### Issue: "npm ERR! 402 Payment Required"

**Solution**: Trying to publish scoped package as private
- Ensure you're using `--access public` flag
- Or upgrade to npm paid account for private packages

### Issue: "npm ERR! code E409" or "version already exists"

**Solution**: Version 1.0.0 is already published
```bash
# Bump the version
npm version patch  # Changes to 1.0.1
# or manually edit package.json

# Then publish again
npm publish --access public
```

### Issue: npx command fails with 404 after publishing

**Solution**: Wait for CDN propagation
```bash
# Clear npx cache
npx clear-npx-cache

# Wait a few minutes and try again
sleep 120
npx @mtuckerb/mcp-roo
```

## Post-Publication Checklist ✓

After successful publication:

- [ ] Visit package page: https://www.npmjs.com/package/@mtuckerb/mcp-roo
- [ ] Verify package info shows correct version and description
- [ ] Test `npx @mtuckerb/mcp-roo` from a clean directory
- [ ] Update MCP configuration in your development environment
- [ ] Test all 5 MCP tools work correctly
- [ ] Create git tag: `git tag v1.0.0 && git push --tags`
- [ ] Create GitHub release with changelog
- [ ] Update README badges (optional)

## Git Workflow for This Change 🌿

Since you're in a temporary worker environment, commit and push your changes:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m 'feat: prepare package for npm publication

- Add .npmignore to exclude development files
- Add publishing documentation (PUBLISHING_PLAN.md, IMPLEMENTATION_STEPS.md)
- Package ready for npm publish with --access public flag'

# Push to remote branch
git push origin HEAD:feature/initial-mcp-server-implementation

# Create pull request
gh pr create --repo mtuckerb/mcp_roo \
  --head feature/initial-mcp-server-implementation \
  --title 'feat: Prepare MCP server for npm publication' \
  --body 'This PR prepares the @mtuckerb/mcp-roo package for publication to npm registry.

## Changes
- Added .npmignore to exclude unnecessary files from npm package
- Created comprehensive publishing documentation
- Verified build process and package contents
- Ready for `npm publish --access public`

## Testing
- [x] Build successful with executable permissions
- [x] Package dry-run shows correct files (7.5 kB)
- [x] No vulnerabilities found in dependencies

## Next Steps
After merging, run `npm publish --access public` to publish to npm registry.'
```

## Security Reminders 🔒

- **Never commit npm auth tokens** to git
- Use environment variables for tokens in CI/CD
- Enable 2FA on your npm account for security
- Regularly audit dependencies: `npm audit`
- Review package contents before publishing: `npm pack --dry-run`

## Success Indicators 🎉

You'll know the publication was successful when:

1. `npm publish` completes without errors
2. Package appears on https://www.npmjs.com/package/@mtuckerb/mcp-roo
3. `npx @mtuckerb/mcp-roo` works without prior installation
4. MCP clients can connect and use all 5 tools
5. The original 404 error is resolved

## Support

If you encounter issues:
- Check npm status: https://status.npmjs.org/
- Review npm documentation: https://docs.npmjs.com/
- Open an issue on GitHub: https://github.com/mtuckerb/mcp_roo/issues