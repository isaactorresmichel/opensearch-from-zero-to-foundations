# OpenSearch: From Zero to Foundations

A comprehensive presentation website about OpenSearch for your team. This 15-minute guide covers everything from basics to hands-on practice.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm

### Installation

```bash
npm install
```

### Local Development

```bash
npm run start
```

Opens at `http://localhost:3000`. Changes reload automatically!

## 🏗️ Building

```bash
# Production build
npm run build

# Test production build locally
npm run serve
```

## 🌐 Deploy to GitHub Pages

1. **Create GitHub repo**: `opensearch-from-zero-to-foundations`

2. **Update config** (`docusaurus.config.ts`):
   ```typescript
   organizationName: 'your-github-username',
   projectName: 'opensearch-from-zero-to-foundations',
   url: 'https://your-github-username.github.io',
   ```

3. **Deploy**:
   ```bash
   USE_SSH=true npm run deploy
   # OR
   GIT_USER=<your-username> npm run deploy
   ```

GitHub Actions will automatically build and deploy when you push to `gh-pages` branch.

## 🔗 Key Links

- [Docusaurus Docs](https://docusaurus.io/docs/intro)
- [OpenSearch Docs](https://opensearch.org/docs/)
- [GitHub Pages Setup](https://docs.github.com/en/pages)

---

**Ready to present?** Run `npm start` and open `http://localhost:3000` 🚀
