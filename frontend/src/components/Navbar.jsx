import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Shield,
  Code,
  Github,
  Home,
  Wifi,
  WifiOff,
  Loader,
  Menu,
  X,
} from "lucide-react"

import ThemeToggle from "./ThemeToggle"

const Navbar = ({ backendStatus }) => {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/scan", label: "Code Scan", icon: Code },
    { path: "/github-scan", label: "GitHub Scan", icon: Github },
  ]

  const renderStatus = () => {
    if (backendStatus === "checking") {
      return (
        <>
          <Loader className="h-4 w-4 animate-spin text-yellow-400" />
          <span className="text-sm">Checking...</span>
        </>
      )
    }

    if (backendStatus === "online") {
      return (
        <>
          <Wifi className="h-4 w-4 text-green-400" />
          <span className="text-sm">Backend Online</span>
        </>
      )
    }

    return (
      <>
        <WifiOff className="h-4 w-4 text-red-400" />
        <span className="text-sm">Backend Offline</span>
      </>
    )
  }

  const toggleMobile = () => setMobileOpen((open) => !open)

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-white" />
            <div>
              <div className="text-xl font-bold text-white">SecureCode AI</div>
              <div className="text-xs text-white/70">Code security made simple</div>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path

              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all
                    ${isActive
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              )
            })}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                {renderStatus()}
              </div>
              <ThemeToggle />
            </div>
          </div>

          <button
            onClick={toggleMobile}
            className="md:hidden inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-2 pb-4 border-b border-white/10">
            <div className="space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path

                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                )
              })}

              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <span>Backend status</span>
                  <span className="text-xs">{renderStatus()}</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar