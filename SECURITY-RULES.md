# Cline Security Rules

---

## NPM Package Security

### Before installing ANY new package, you MUST:

1. **Check the package on npm first** by running:

   ```
   npm show <package-name> version
   npm show <package-name> time
   npm show <package-name> dependencies
   ```

   Report the results to the user before proceeding.

2. **Warn the user** if any of these red flags are present:
   - The latest version was published less than 48 hours ago
   - The package has unexpected or new dependencies
   - The package has very few weekly downloads
   - The maintainer account changed recently

3. **Prefer native alternatives** over installing packages:
   - Use `fetch()` instead of axios
   - Use `crypto.randomUUID()` instead of uuid
   - Use native `Date` instead of moment.js
   - Use native array methods instead of lodash
   - Always ask: "Can we do this without a package?"

4. **Always install with exact versions** — never use ^ or ~:

   ```
   npm install axios@1.14.0 --save-exact
   ```

   Never run `npm install axios` without a pinned version.

5. **Never run npm install during the exposure window** of a
   known compromised package without explicit user confirmation.

---

## After Any npm install

Always run:

```
npm audit
ls node_modules/<any-new-package>
```

Check that `node_modules/plain-crypto-js` does NOT exist:

```
ls node_modules/plain-crypto-js 2>/dev/null \
  && echo "WARNING: plain-crypto-js found" \
  || echo "Clean"
```

---

## Package Version Pinning

When adding packages to package.json always use exact versions:

```json
// WRONG - never do this
"axios": "^1.14.0"

// CORRECT - always do this
"axios": "1.14.0"
```

Always remind the user to commit package-lock.json to git.

---

## Disabling postinstall Scripts

For any package where postinstall is not required:

```
npm install --ignore-scripts
```

Always ask the user before running postinstall scripts
from packages that don't explicitly need them.

---

## Supply Chain Attack Checklist

Before installing a package, verify:

- [ ] Published more than 48 hours ago
- [ ] Dependencies match what is expected
- [ ] No new maintainers added recently
- [ ] Downloaded from the official npm registry
- [ ] Not a typosquatted name (e.g. "axois" instead of "axios")

---

## General Security Posture

- Never auto-approve npm install commands without checking above
- Never install packages from unverified sources
- Always prefer fewer dependencies over more
- Always run `npm audit` before any deployment
- Remind user to rotate credentials if any compromise is suspected
