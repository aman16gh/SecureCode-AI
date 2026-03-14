import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

import { Github, RefreshCcw } from "lucide-react"

import { scanGitHubRepo } from "../services/api"
import { validateGitHubUrl } from "../utils/helpers"
import { getScanHistory, saveRepoScanEntry } from "../utils/storage"

import SecurityScore from "../components/SecurityScore"
import ResultCard from "../components/ResultCard"

const GitHubScanner = () => {
  const [repoUrl, setRepoUrl] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [selectedScanId, setSelectedScanId] = useState(null)

  const isRepositoryScan = Array.isArray(results)

  const scanSummary = useMemo(() => {
    if (!isRepositoryScan) return null

    const totalFiles = results.length
    const totalIssues = results.reduce(
      (acc, file) => acc + (file.analysis?.issues?.length || 0),
      0
    )

    const averageScore =
      results.reduce((acc, file) => acc + (file.analysis?.security_score || 0), 0) /
      Math.max(totalFiles, 1)

    return {
      totalFiles,
      totalIssues,
      averageScore: Math.round(averageScore),
    }
  }, [isRepositoryScan, results])

  const loadHistory = () => {
    const { repoScans } = getScanHistory()
    setHistory(repoScans)
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const handleScan = async () => {
    if (!validateGitHubUrl(repoUrl)) {
      toast.error("Enter a valid GitHub repository URL")
      return
    }

    setLoading(true)

    try {
      const response = await scanGitHubRepo(repoUrl)
      setResults(response)
      setSelectedScanId(null)

      saveRepoScanEntry({
        id: `repo-${Date.now()}`,
        type: "repo",
        timestamp: Date.now(),
        repoUrl,
        result: response,
      })

      loadHistory()
      toast.success("Repository scanned!")
    } catch (err) {
      toast.error(err.message || "Scan failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResults(null)
    setRepoUrl("")
    setSelectedScanId(null)
  }

  const recentScans = useMemo(() => {
    return history.slice(0, 6)
  }, [history])

  const loadScan = (scan) => {
    setSelectedScanId(scan.id)
    setRepoUrl(scan.repoUrl)
    setResults(scan.result)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">GitHub Repository Scanner</h1>
          <p className="text-white/70 max-w-xl mt-2">
            Scan a public GitHub repository for potential security issues using AI analysis and static scanning.
          </p>
        </div>

        {results && (
          <button
            onClick={reset}
            className="btn btn-secondary gap-2"
            disabled={loading}
          >
            <RefreshCcw className="h-4 w-4" />
            New Scan
          </button>
        )}
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
        <section className="space-y-4">
          <div className="card w-full max-w-md">
            <div className="card-body space-y-4">
              <input
                type="text"
                placeholder="https://github.com/user/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="form-input"
                disabled={loading}
              />

              <button
                onClick={handleScan}
                className="btn btn-primary w-full"
                disabled={loading}
              >
                <Github className="h-5 w-5" />
                {loading ? "Scanning…" : "Scan Repository"}
              </button>

              {recentScans.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-2">Recent scans</h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {recentScans.map((scan) => (
                      <button
                        key={scan.id}
                        onClick={() => loadScan(scan)}
                        className={`w-full min-w-0 text-left rounded-xl px-4 py-3 bg-white/5 border border-white/10 transition hover:bg-white/10 ${
                          selectedScanId === scan.id ? "ring-1 ring-indigo-400" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex-1 min-w-0 text-sm font-medium text-white truncate">
                            {scan.repoUrl}
                          </span>
                          <span className="shrink-0 text-xs text-white/50">{new Date(scan.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-white/60">
                          Score: {scan.result?.length ? Math.round(scan.result.reduce((sum, file) => sum + (file.analysis?.security_score || 0), 0) / scan.result.length) : "—"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {results ? (
            <div className="space-y-6">
              {isRepositoryScan && scanSummary && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                    <div className="text-sm text-white/60">Files Scanned</div>
                    <div className="text-2xl font-semibold text-white">
                      {scanSummary.totalFiles}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                    <div className="text-sm text-white/60">Total Issues</div>
                    <div className="text-2xl font-semibold text-white">
                      {scanSummary.totalIssues}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                    <div className="text-sm text-white/60">Average Security Score</div>
                    <div className="text-2xl font-semibold text-white">
                      {scanSummary.averageScore}
                    </div>
                  </div>
                </div>
              )}

              {isRepositoryScan ? (
                <div className="space-y-4">
                  {results.map((fileResult, idx) => (
                    <div key={fileResult.file || idx} className="card">
                      <div className="card-header flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className="flex-1 min-w-0 text-sm text-white/70 truncate">
                            {fileResult.file}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/50">Security Score</div>
                          <div className="text-lg font-semibold text-white">
                            {fileResult.analysis?.security_score ?? "—"}
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        {fileResult.analysis?.issues?.length > 0 ? (
                          fileResult.analysis.issues.map((issue, i) => (
                            <ResultCard key={`${fileResult.file}-${i}`} issue={issue} />
                          ))
                        ) : (
                          <p className="text-white/70">No issues found for this file.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <SecurityScore score={results.security_score} />

                  <div className="card">
                    <div className="card-header">Security Issues</div>
                    <div className="card-body">
                      {results.issues?.length ? (
                        results.issues.map((issue, i) => (
                          <ResultCard key={i} issue={issue} />
                        ))
                      ) : (
                        <p className="text-white/70">No issues found.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-white/70">Run a scan to view repository security findings.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default GitHubScanner