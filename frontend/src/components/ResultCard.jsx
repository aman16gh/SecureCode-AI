import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle, XCircle, AlertCircle, Info, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const ResultCard = ({ issue }) => {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk.toLowerCase()) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-600" />
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'medium': return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case 'low': return <Info className="h-5 w-5 text-green-600" />
      default: return <Info className="h-5 w-5 text-gray-600" />
    }
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className={`border-l-4 rounded-lg ${getRiskColor(issue.risk)}`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {getRiskIcon(issue.risk)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white break-words">
                  {issue.type}
                </h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  issue.risk.toLowerCase() === 'critical' ? 'bg-red-100 text-red-800' :
                  issue.risk.toLowerCase() === 'high' ? 'bg-orange-100 text-orange-800' :
                  issue.risk.toLowerCase() === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {issue.risk}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3 break-words">
                {issue.message}
              </p>

              {issue.fix && (
                <div className="mb-3">
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">
                      {expanded ? 'Hide' : 'Show'} Fix
                    </span>
                  </button>

                  {expanded && (
                    <div className="mt-3 relative">
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => copyToClipboard(issue.fix)}
                          className="p-1 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                          title="Copy fix"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="overflow-x-auto rounded-md">
                        <SyntaxHighlighter
                          language="javascript"
                          style={oneDark}
                          className="rounded-md text-sm"
                          customStyle={{ margin: 0, minWidth: '100%' }}
                        >
                          {issue.fix}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultCard