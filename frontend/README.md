# SecureCode AI Frontend

A modern React-based frontend for the SecureCode AI security analysis platform.

## Features

- **Code Security Scanner**: Analyze code snippets for security vulnerabilities
- **GitHub Repository Scanner**: Scan entire GitHub repositories
- **AI-Powered Analysis**: Leverages Groq AI for intelligent security analysis
- **Real-time Results**: Instant feedback with detailed issue reports
- **Modern UI**: Clean, responsive interface with dark mode support

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Monaco Editor** - Professional code editor
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons
- **Tailwind CSS** - Utility-first CSS framework

## Setup Instructions

### Prerequisites

1. **Node.js** (version 16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use a version manager like [nvm](https://github.com/nvm-sh/nvm)

2. **Backend Server** running on `http://localhost:8000`

### Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Backend URL / proxy configuration

- During development, Vite proxies `/api/*` to `http://localhost:8000` (the backend).
- To point the frontend to a different backend URL, set `VITE_API_URL` before starting:
  ```bash
  export VITE_API_URL=http://localhost:8000
  npm run dev
  ```

  On Windows PowerShell:
  ```powershell
  $env:VITE_API_URL = "http://localhost:8000"
  npm run dev
  ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── SecurityScore.jsx # Security score display
│   │   └── ResultCard.jsx  # Issue result cards
│   ├── pages/              # Page components
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── ScanPage.jsx    # Code scanning interface
│   │   └── GitHubScanner.jsx # GitHub repo scanner
│   ├── services/
│   │   └── api.js          # API service functions
│   ├── utils/
│   │   └── helpers.js      # Utility functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── package.json
└── vite.config.js
```

## API Integration

The frontend communicates with the FastAPI backend through these endpoints:

- `GET /health/` - Health check
- `POST /scan/` - Code security analysis
- `POST /github-scan` - GitHub repository analysis

## Features Overview

### Code Scanner
- Monaco Editor for code input
- Support for multiple programming languages
- Real-time syntax highlighting
- Security vulnerability detection
- Detailed issue reports with fixes

### GitHub Scanner
- Repository URL input with validation
- Full repository analysis
- Security score calculation
- Comprehensive issue reporting

### Dashboard
- Overview of scanning capabilities
- Statistics display
- Getting started guide
- Navigation to different features

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Style

This project uses ESLint for code linting. Make sure to run `npm run lint` before committing.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is part of the SecureCode AI platform.