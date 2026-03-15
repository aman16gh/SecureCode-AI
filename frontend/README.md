# SecureCode AI Frontend

React + Vite web client for SecureCode AI.

## Responsibilities

- Provide UI for code snippet scanning.
- Provide UI for GitHub repository scanning.
- Display security findings, severity, and score.
- Call backend APIs and render success/error states.

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- Monaco Editor
- Tailwind CSS
- React Hot Toast
- Lucide React

## Setup

### Prerequisites

- Node.js 16+
- Backend running at http://localhost:8000

### Install and Run

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173

### Backend URL Configuration

- Default development behavior uses Vite proxy for /api/*.
- To override backend target, set VITE_API_URL before running.

macOS/Linux:

```bash
export VITE_API_URL=http://localhost:8000
npm run dev
```

Windows PowerShell:

```powershell
$env:VITE_API_URL = "http://localhost:8000"
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Frontend Structure

```text
frontend/
|-- README.md
|-- index.html
|-- package.json
|-- postcss.config.js
|-- tailwind.config.js
|-- vite.config.js
|-- scripts/
|   `-- inspect_githubscanner.py
`-- src/
    |-- main.jsx
    |-- App.jsx
    |-- index.css
    |-- components/
    |   |-- CodeEditor.jsx
    |   |-- Navbar.jsx
    |   |-- ResultCard.jsx
    |   |-- ScanButton.jsx
    |   |-- SecurityScore.jsx
    |   `-- ThemeToggle.jsx
    |-- pages/
    |   |-- Dashboard.jsx
    |   |-- GitHubScanner.jsx
    |   `-- ScanPage.jsx
    |-- services/
    |   `-- api.js
    `-- utils/
        |-- helpers.js
        `-- storage.js
```

## File Purpose Reference

- index.html: App shell loaded by Vite.
- package.json: Frontend dependencies and scripts.
- postcss.config.js: PostCSS plugin setup.
- tailwind.config.js: Tailwind content and theme configuration.
- vite.config.js: Vite server/build settings, including proxy behavior.
- scripts/inspect_githubscanner.py: Script utility for scanner-related inspection/debugging.

### src Core

- src/main.jsx: React entry point and root mounting.
- src/App.jsx: Main app-level layout and route composition.
- src/index.css: Global styles and base design tokens.

### src/pages

- src/pages/Dashboard.jsx: Landing/summary experience for platform features.
- src/pages/ScanPage.jsx: Manual code input scan workflow.
- src/pages/GitHubScanner.jsx: Repository URL scan workflow.

### src/components

- src/components/Navbar.jsx: Main navigation and route access.
- src/components/CodeEditor.jsx: Code editing/input surface (Monaco).
- src/components/ScanButton.jsx: Reusable scan action trigger.
- src/components/ResultCard.jsx: Individual finding visualization.
- src/components/SecurityScore.jsx: Score and severity summary visualization.
- src/components/ThemeToggle.jsx: Theme preference switch.

### src/services and src/utils

- src/services/api.js: Centralized backend API calls.
- src/utils/helpers.js: Shared formatting/transformation helpers.
- src/utils/storage.js: Local storage access wrappers.

## API Usage

Frontend calls these backend endpoints:

- GET /health/
- POST /scan/
- POST /github-scan

## Development Commands

- npm run dev: Start development server.
- npm run build: Build production assets.
- npm run preview: Preview production build locally.
- npm run lint: Run lint checks.

## Manual Verification

1. Open app and verify dashboard renders.
2. Scan a sample vulnerable code snippet from Scan page.
3. Scan a public GitHub repository from GitHub Scanner page.
4. Confirm result cards and security score render correctly.
