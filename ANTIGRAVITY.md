# Antigravity Project Guide

> Created by Antigravity Agent on 2026-01-01

## 1. Project Overview
**Claude Code CLI Guide & Game** is a comprehensive learning resource for the Claude Code CLI tool. It features a documentation hub and an interactive terminal simulation game built with Vue 3.

- **Primary Goal**: Teach users how to use Claude Code CLI effectively.
- **Key Component**: `web-game-vue` (Vue 3 + Naive UI interactive game).
- **Repository**: [raven1997s/claude-code-guide](https://github.com/raven1997s/claude-code-guide)

## 2. Technical Stack (Vue 3 Version)
- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Build Tool**: Vite 5.x
- **UI Library**: Naive UI (Dark theme optimized)
- **Search Engine**: Fuse.js (Fuzzy search implementation)
- **Icons**: @vicons/fa (Font Awesome)

## 3. Current Status
*Based on `STATUS.md` (2025-12-31)*

### ✅ Completed
- **Migration**: Full migration from Vanilla JS to Vue 3.
- **Project Structure**: Organized into `scripts/`, `docs/`, `archive/`.
- **Quality Control**: ESLint 9 + Prettier configured.
- **Core Features**: Search (4 modes), Game (25 levels), Navigation.

### 🚧 Action Items (Next Steps)
Derived from project status tracking:

#### Search Enhancements
- [ ] Add search history recording
- [ ] Add "Trending Searches" tags
- [ ] Support regex search patterns

#### Game Polish
- [ ] Implement Hint System (contextual help)
- [ ] Add Achievement System
- [ ] Visualize learning progress

#### UX Improvements
- [ ] Dark/Light theme toggle
- [ ] Keyboard shortcuts support

## 4. Workflows
### Quick Start
```bash
cd web-game-vue
npm install
npm run dev
# Visit http://localhost:8000
```

### Key Files
- `web-game-vue/src/components/SearchBox.vue`: Core search logic.
- `web-game-vue/src/views/GameView.vue`: Main game logic.
- `web-game-vue/src/data/game-data.js`: Level definitions.

## 5. Agent Instructions
When working on this project, refer to:
1. `web-game-vue/PROJECT.md` for technical details.
2. `STATUS.md` for the latest progress tracking.
3. This file (`ANTIGRAVITY.md`) for high-level context.
