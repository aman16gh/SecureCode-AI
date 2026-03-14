import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

const THEME_KEY = "securecode_ai_theme"

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light"

  const saved = window.localStorage.getItem(THEME_KEY)
  if (saved === "light" || saved === "dark") return saved

  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    ? "dark"
    : "light"
}

const applyTheme = (theme) => {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggle = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  )
}

export default ThemeToggle
