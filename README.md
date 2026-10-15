# Destiny Bike Tools

Digital bike tools suite — cyberpunk UI, runs as static web, Windows .exe, and Linux .AppImage.

## Tools

| Tool | Description |
|---|---|
| **Gearing Calculator** | Gear ratios, development (m/rev), speed at cadence — interactive gear matrix |
| **Bike Fit / Size** | Frame size & saddle height via LeMond + Hamley methods |
| **Tire Pressure** | Front/rear PSI — SILCA model, tubeless derating, hookless warning |
| **Power Output** | Martin et al. 1998 physics model — Speed↔Power, CdA, Crr, Coggan zones |
| **Standards Docs** | 13 reference docs: BB, chain, derailleur, axles, tires, headsets, brakes, cockpit |
| **Bibliography** | 22 cited sources — peer-reviewed, manufacturer, ISO standards, books |

## Quick Start

```bash
npm install
npm run dev          # dev server at http://localhost:5173
```

## Build

```bash
npm run build:web    # → dist/  (static web)
npm run build:linux  # → release/*.AppImage
npm run build:win    # → release/*.exe  (needs Windows or cross-compile)
```

## Deploy

**Web (GitHub Pages):** Push to `main` — GitHub Actions deploys automatically.

**Desktop releases:**
```bash
git tag v1.0.0
git push --tags
# GitHub Actions builds .exe + .AppImage and uploads to GitHub Releases
```

## GitHub Setup

1. Create repo → push this project
2. Settings → Pages → Source: **GitHub Actions**
3. Settings → Actions → Workflow permissions: **Read and write**
4. Push to `main` → web deploys
5. Tag a version → desktop binaries in Releases

## Editing Content (No Rebuild Needed)

| File | What it controls |
|---|---|
| `public/citations.json` | All bibliography entries + tool/doc links |
| `public/docs/index.json` | Standards docs sidebar structure |
| `public/docs/*.md` | Individual standards documents |

## Tech Stack

- **React 18** + **Vite 5** — SPA
- **Tailwind CSS v4** — utility + cyberpunk CSS vars
- **React Router v6** — hash routing (static-host compatible)
- **Electron 30** — desktop wrapper
- **electron-builder** — .exe (NSIS) + .AppImage packaging
- **react-markdown** + **remark-gfm** — Markdown standards docs

## Disclaimer

Results are estimates for reference only. Always verify with manufacturer specifications.
