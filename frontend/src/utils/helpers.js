/*
Utility helpers for SecureCode AI frontend
Used across pages and components
*/

/* ---------------------------
   Risk Formatting
---------------------------- */

export const formatRiskLevel = (risk = "") => {
  return risk.charAt(0).toUpperCase() + risk.slice(1).toLowerCase()
}

/* ---------------------------
   Risk Color (Tailwind classes)
---------------------------- */

export const getRiskColor = (risk = "") => {

  switch (risk.toLowerCase()) {

    case "critical":
      return "text-red-600 bg-red-50 border-red-200"

    case "high":
      return "text-orange-600 bg-orange-50 border-orange-200"

    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"

    case "low":
      return "text-green-600 bg-green-50 border-green-200"

    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }

}

/* ---------------------------
   Security Score Grade
---------------------------- */

export const getScoreGrade = (score = 0) => {

  if (score >= 90) return "A+"
  if (score >= 80) return "A"
  if (score >= 70) return "B"
  if (score >= 60) return "C"
  if (score >= 50) return "D"

  return "F"

}

/* ---------------------------
   Security Score Label
---------------------------- */

export const getScoreLabel = (score = 0) => {

  if (score >= 80) return "Excellent Security"
  if (score >= 60) return "Moderate Risk"
  if (score >= 40) return "Needs Improvement"

  return "High Risk"

}

/* ---------------------------
   Debounce (used for input)
---------------------------- */

export const debounce = (func, wait = 300) => {

  let timeout

  return (...args) => {

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)

  }

}

/* ---------------------------
   Validate GitHub URL
---------------------------- */

export const validateGitHubUrl = (url = "") => {
  const regex = /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/
  return regex.test(url.trim())
}

/* ---------------------------
   Extract Repo Info
---------------------------- */

export const extractRepoInfo = (url = "") => {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null

  return {
    owner: match[1],
    repo: match[2],
  }
}

/* ---------------------------
   Format Issue Title
---------------------------- */

export const formatIssueTitle = (title = "") => {

  return title
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())

}

/* ---------------------------
   Truncate Long Text
---------------------------- */

export const truncateText = (text = "", length = 120) => {

  if (text.length <= length) return text

  return text.substring(0, length) + "..."

}
/* ---------------------------
   Date / Time Helpers
--------------------------- */

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "-"
  const date = new Date(timestamp)
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "-"
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000)

  if (seconds < 60) return "Just now"
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`

  return `${Math.floor(seconds / 86400)}d ago`
}
