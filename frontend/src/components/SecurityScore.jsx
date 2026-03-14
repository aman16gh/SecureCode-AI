import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const SecurityScore = ({ score = 0 }) => {

  // determine score status
  const getScoreStatus = () => {
    if (score >= 80) {
      return {
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
        icon: <CheckCircle size={28} className="text-green-600" />,
        label: "Excellent Security"
      };
    }

    if (score >= 60) {
      return {
        color: "text-yellow-600",
        bg: "bg-yellow-50 border-yellow-200",
        icon: <Shield size={28} className="text-yellow-600" />,
        label: "Moderate Security"
      };
    }

    return {
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
      icon: <AlertTriangle size={28} className="text-red-600" />,
      label: "Vulnerable Code"
    };
  };

  const status = getScoreStatus();

  return (
    <div className={`rounded-xl p-5 border ${status.bg} shadow-sm`}>

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Security Score
          </h2>

          <p className="text-sm text-gray-500">
            {status.label}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {status.icon}

          <div className="text-right">
            <p className={`text-3xl font-bold ${status.color}`}>
              {score}
            </p>
            <p className="text-xs text-gray-500">
              /100
            </p>
          </div>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2">

        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            score >= 80
              ? "bg-green-500"
              : score >= 60
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />

      </div>

    </div>
  );
};

export default SecurityScore;