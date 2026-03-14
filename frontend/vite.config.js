import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Vite configuration for SecureCode AI frontend
export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",     // allows localhost + network access
    port: 5173,          // fixed port
    strictPort: true,    // prevents random port changes
    open: true,          // opens browser automatically

    proxy: {
      "/api": {
        target: "http://localhost:8000", // FastAPI backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})