import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Navbar from "./components/Navbar"

import Dashboard from "./pages/Dashboard"
import ScanPage from "./pages/ScanPage"
import GitHubScanner from "./pages/GitHubScanner"

import { Toaster } from "react-hot-toast"

import { checkBackendHealth } from "./services/api"

function App() {

  const [backendStatus, setBackendStatus] = useState("checking")

  useEffect(() => {

    const checkBackend = async () => {

      try {

        await checkBackendHealth()

        setBackendStatus("online")

      } catch (error) {

        console.error("Backend offline:", error)

        setBackendStatus("offline")

      }

    }

    // Initial check
    checkBackend()

    // Check every 30 seconds
    const interval = setInterval(checkBackend, 30000)

    return () => clearInterval(interval)

  }, [])

  return (

    <Router>

      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">

        {/* Navbar */}
        <Navbar backendStatus={backendStatus} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-10">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/github-scan" element={<GitHubScanner />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </main>

        {/* Toast Notifications */}
        <Toaster position="top-right" />

      </div>

    </Router>

  )

}

export default App