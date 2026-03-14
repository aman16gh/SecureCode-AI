import React, { Suspense, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const CodeEditor = React.lazy(() => import("../components/CodeEditor"))

import ScanButton from "../components/ScanButton"
import SecurityScore from "../components/SecurityScore"
import ResultCard from "../components/ResultCard"

import { scanCode } from "../services/api"
import { getScanHistory, saveCodeScanEntry } from "../utils/storage"
import { formatTimestamp } from "../utils/helpers"

const ScanPage = () => {
  const [code, setCode] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [selectedScanId, setSelectedScanId] = useState(null)

  const loadHistory = () => {
    const { codeScans } = getScanHistory()
    setHistory(codeScans)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const handleScan = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code")
      return
    }

    setLoading(true)

    try {
      const response = await scanCode(code)

      setResults(response)
      setSelectedScanId(null)
      saveCodeScanEntry({
        id: `code-${Date.now()}`,
        type: "code",
        timestamp: Date.now(),
        code,
        result: response,
      })

      loadHistory()
      toast.success("Scan completed!")
    } catch (err) {
      toast.error(err.message || "Scan failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectHistory = (entry) => {
    setSelectedScanId(entry.id)
    setResults(entry.result)
    setCode(entry.code)
  }

  const historyItems = useMemo(() => {
    return history.slice(0, 6)
  }, [history])

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Code Security Scanner</h1>
          <p className="text-white/70 mt-2 max-w-2xl">
            Paste your code to get a security risk score and see detailed findings.
          </p>
        </div>

        {history.length > 0 && (
          <div className="text-sm text-white/70">
            Last scan: {formatTimestamp(history[0].timestamp)}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="card">
          <div className="card-header">Code Editor</div>

          <div className="card-body">
            <Suspense fallback={<div className="h-96 rounded-xl bg-white/5 flex items-center justify-center text-white/60">Loading editor…</div>}>
              <CodeEditor code={code} setCode={setCode} />
            </Suspense>

            <ScanButton onScan={handleScan} loading={loading} />

            {historyItems.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white/80 mb-2">Recent scans</h3>
                <div className="space-y-2">
                  {historyItems.map((scan) => (
                    <button
                      key={scan.id}
                      onClick={() => handleSelectHistory(scan)}
                      className={`w-full text-left rounded-xl px-4 py-3 bg-white/5 border border-white/10 transition hover:bg-white/10 ${
                        selectedScanId === scan.id ? "ring-1 ring-indigo-400" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Score: {scan.result?.security_score ?? "—"}</span>
                        <span className="text-xs text-white/50">{formatTimestamp(scan.timestamp)}</span>
                      </div>
                      <p className="text-xs text-white/60 truncate">{scan.code.trim().slice(0, 80)}{scan.code.trim().length > 80 ? "..." : ""}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results ? (
            <>
              <SecurityScore score={results.security_score} />

              <div className="card">
                <div className="card-header">Issues Found</div>

                <div className="card-body">
                  {results.issues?.length === 0 ? (
                    <p className="text-white/70">No vulnerabilities detected 🎉</p>
                  ) : (
                    results.issues.map((issue, i) => <ResultCard key={i} issue={issue} />)
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-white/70">Run a scan to see security issues and suggested fixes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScanPage