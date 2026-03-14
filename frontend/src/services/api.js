import axios from "axios"

/*
API Base URL

DEV:
React (Vite) → proxy → FastAPI
/api -> http://localhost:8000

PROD:
Direct backend URL
*/

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "/api" : "http://localhost:8000")

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

/*
Global response handler
*/
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error)

    if (error.response) {
      throw new Error(error.response.data?.detail || "Server Error")
    }

    if (error.request) {
      throw new Error("Backend not reachable")
    }

    throw new Error(error.message)
  }
)

/*
Health Check
*/
export const checkBackendHealth = async () => {
  return await api.get("/health/")
}

/*
Scan Code
POST /scan/
*/
export const scanCode = async (code) => {

  return await api.post("/scan/", {
    code: code
  })

}

/*
Scan GitHub Repository
POST /github-scan?repo_url=...
*/
export const scanGitHubRepo = async (repoUrl) => {
  // FastAPI endpoint expects a query parameter (repo_url) for this route.
  // The backend returns an array of per-file scan results.
  const response = await api.post(`/github-scan?repo_url=${encodeURIComponent(repoUrl)}`)
  return response
}

export default api