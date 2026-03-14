const STORAGE_KEY = "securecode_ai_scan_history"
const MAX_ENTRIES = 20

const safeParse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

export const getScanHistory = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  const parsed = safeParse(raw)

  return parsed && typeof parsed === "object"
    ? {
        codeScans: Array.isArray(parsed.codeScans) ? parsed.codeScans : [],
        repoScans: Array.isArray(parsed.repoScans) ? parsed.repoScans : [],
      }
    : { codeScans: [], repoScans: [] }
}

const saveHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  } catch {
    // ignore storage write errors
  }
}

export const saveCodeScanEntry = (entry) => {
  const history = getScanHistory()

  const next = {
    ...history,
    codeScans: [entry, ...history.codeScans].slice(0, MAX_ENTRIES),
  }

  saveHistory(next)
}

export const saveRepoScanEntry = (entry) => {
  const history = getScanHistory()

  const next = {
    ...history,
    repoScans: [entry, ...history.repoScans].slice(0, MAX_ENTRIES),
  }

  saveHistory(next)
}

export const clearScanHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
