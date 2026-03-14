import { Link } from "react-router-dom"
import { Shield, Code, Github, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

import { getScanHistory } from "../utils/storage"
import { formatRelativeTime } from "../utils/helpers"

const Dashboard = () => {
  const { codeScans, repoScans } = getScanHistory()

  const allScans = [...codeScans, ...repoScans]
  const scansToday = allScans.filter((scan) => {
    const scanDate = new Date(scan.timestamp)
    const now = new Date()
    return (
      scanDate.getDate() === now.getDate() &&
      scanDate.getMonth() === now.getMonth() &&
      scanDate.getFullYear() === now.getFullYear()
    )
  })

  const totalIssues = allScans.reduce((sum, scan) => {
    if (Array.isArray(scan.result)) {
      return (
        sum +
        scan.result.reduce((acc, file) => acc + (file.analysis?.issues?.length || 0), 0)
      )
    }

    return sum + (scan.result?.issues?.length || 0)
  }, 0)

  const criticalCount = allScans.reduce((sum, scan) => {
    if (Array.isArray(scan.result)) {
      return (
        sum +
        scan.result.reduce(
          (acc, file) =>
            acc +
            (file.analysis?.issues?.filter((issue) =>
              issue.risk?.toLowerCase() === "critical"
            ).length || 0),
          0
        )
      )
    }

    return (
      sum +
      (scan.result?.issues?.filter((issue) =>
        issue.risk?.toLowerCase() === "critical"
      ).length || 0)
    )
  }, 0)

  const stats = [
    { label: "Scans Today", value: scansToday.length, icon: Zap, color: "text-blue-500" },
    { label: "Issues Found", value: totalIssues, icon: AlertTriangle, color: "text-yellow-500" },
    { label: "Today’s Score", value: allScans.length ? Math.round(allScans.reduce((sum, scan) => sum + (scan.result?.security_score || 0), 0) / allScans.length) : "—", icon: CheckCircle, color: "text-green-500" },
    { label: "Critical Risks", value: criticalCount, icon: XCircle, color: "text-red-500" },
  ]

  const features = [
    {
      title: "Code Security Scan",
      description: "Scan your code snippets for vulnerabilities using AI analysis.",
      icon: Code,
      path: "/scan",
      color: "bg-blue-500"
    },
    {
      title: "GitHub Repository Scan",
      description: "Analyze an entire GitHub repository for security issues.",
      icon: Github,
      path: "/github-scan",
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-blue-500" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-3">SecureCode AI</h1>

        <p className="text-white/80 max-w-2xl mx-auto">
          AI-powered platform to detect vulnerabilities in code and GitHub repositories.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-body flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>

              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            className="card hover:shadow-xl transition"
          >
            <div className="card-body flex items-start gap-4">
              <div className={`${feature.color} p-3 rounded-lg text-white`}>
                <feature.icon className="h-6 w-6" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>

                <p className="text-white/70">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {allScans.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent scans</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {[...allScans]
              .sort((a, b) => b.timestamp - a.timestamp)
              .slice(0, 4)
              .map((scan) => (
                <div key={scan.id} className="card">
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-white/70">
                          {scan.type === "repo" ? "GitHub scan" : "Code scan"}
                        </p>
                        <p className="text-base font-semibold text-white">
                          {formatRelativeTime(scan.timestamp)}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-white/50">Score</p>
                        <p className="text-lg font-semibold text-white">
                          {scan.result?.security_score ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard