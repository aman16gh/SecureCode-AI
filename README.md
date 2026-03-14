# SecureCode AI

AI-Powered Security Code Analysis Platform

## Overview

SecureCode AI is a comprehensive security analysis platform that uses artificial intelligence to detect vulnerabilities in code. The platform consists of a FastAPI backend with Groq AI integration and a modern React frontend.

## Features

- **AI-Powered Analysis**: Leverages Groq AI for intelligent security vulnerability detection
- **Code Snippet Scanning**: Analyze individual code snippets for security issues
- **GitHub Repository Scanning**: Scan entire GitHub repositories
- **Real-time Results**: Instant security analysis with detailed reports
- **Multiple Language Support**: Supports JavaScript, Python, Java, C++, C#, PHP, Go, Rust, and more
- **Security Scoring**: Comprehensive security score calculation
- **Actionable Fixes**: Detailed remediation suggestions for identified issues

## Architecture

### Backend (FastAPI)
- **Framework**: FastAPI with automatic API documentation
- **AI Integration**: Groq API for advanced security analysis
- **Security Engine**: Custom regex rules and static analysis
- **GitHub Integration**: Repository cloning and analysis
- **Models**: Pydantic models for request/response validation

### Frontend (React + Vite)
- **Framework**: React 18 with modern hooks
- **Build Tool**: Vite for fast development and building
- **Code Editor**: Monaco Editor for professional code editing
- **UI Components**: Custom components with responsive design
- **State Management**: React hooks for local state
- **API Integration**: Axios for backend communication

## Quick Start

### Prerequisites

- **Python 3.8+** for backend
- **Node.js 16+** for frontend
- **Git** for repository operations

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **(Optional) Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/Scripts/activate   # Windows
   source venv/bin/activate      # macOS/Linux
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file with your Groq API key (required for AI analysis):
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Start the backend server:**
   ```bash
   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## API Endpoints

### Health Check
- `GET /health/` - Check backend status

### Code Scanning
- `POST /scan/` - Analyze code snippet
  ```json
  {
    "code": "your code here"
  }
  ```

### GitHub Scanning
- `POST /github-scan` - Analyze a GitHub repository
  - Expected input: a URL query parameter named `repo_url`
  - Example:
    ```
    POST /github-scan?repo_url=https://github.com/owner/repo
    ```

## Usage Examples

### Code Scanning
```javascript
// Example vulnerable code
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  // SQL Injection vulnerability
  const query = "SELECT * FROM users WHERE id = " + req.params.id;
  // ... rest of code
});
```

### GitHub Repository
```
https://github.com/expressjs/express
```

## Security Analysis Types

- **Injection Attacks**: SQL injection, XSS, command injection
- **Authentication Issues**: Weak passwords, improper session handling
- **Authorization Flaws**: Access control vulnerabilities
- **Data Exposure**: Sensitive data leakage
- **Cryptography Issues**: Weak encryption, improper key management
- **Configuration Errors**: Misconfigurations, exposed secrets
- **Input Validation**: Improper input sanitization

## Development

### Backend Development
- Uses FastAPI for automatic API documentation
- Modular architecture with separate services
- Comprehensive error handling
- Async operations for performance

### Frontend Development
- Component-based architecture
- Responsive design with custom CSS
- Real-time code editing with Monaco
- Toast notifications for user feedback

## Project Structure

```
securecode-ai/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── api/                 # API endpoints
│   │   │   ├── scan.py
│   │   │   ├── github_scan.py
│   │   │   └── health.py
│   │   ├── models/              # Pydantic models
│   │   ├── services/            # Business logic
│   │   ├── security/            # Security analysis
│   │   └── utils/               # Utilities
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── docs/
├── infrastructure/
├── scripts/
└── tests/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source. See LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in the `docs/` folder
- Review the API documentation at `/docs` when backend is running