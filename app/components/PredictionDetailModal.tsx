import { Prediction } from "../history/types";
import { Loader2, TrendingDown, ShoppingBag, Calendar, ChevronRight, AlertCircle } from "lucide-react";

export function PredictionDetailModal({ prediction, onClose }: { prediction: Prediction | null; onClose: () => void }) {
  if (!prediction) return null;

  const getScoreColor = (score: number) => {
    if (score < 30) return "bg-green-500";
    if (score < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score < 30) return "Low Risk";
    if (score < 60) return "Moderate Risk";
    return "High Risk";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Prediction Details</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Regret Score Card */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {prediction.itemName}
                </h3>
                <p className="text-lg text-gray-600 font-semibold">
                  ₹{prediction.price.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full ${getScoreColor(prediction.regretScore)} flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{prediction.regretScore}</span>
                </div>
                <span className="mt-2 text-xs font-semibold text-gray-700">
                  {getScoreLabel(prediction.regretScore)}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Analysis
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {prediction.reasons}
              </p>
            </div>
          </div>

          {/* Alternatives */}
          {prediction.alternatives && prediction.alternatives.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Alternative Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prediction.alternatives.map((alt, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
                  >
                    <div className="mb-3">
                      <h4 className="font-bold text-gray-900 mb-1">{alt.name}</h4>
                      <p className="text-xl font-bold text-blue-600">
                        ₹{alt.price.toLocaleString('en-IN')}
                      </p>
                      {prediction.price > alt.price && (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          Save ₹{(prediction.price - alt.price).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>

                    {alt.description && (
                      <p className="text-xs text-gray-600 mb-3">
                        {alt.description}
                      </p>
                    )}

                    {alt.link && (
                      <a
                        href={alt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
                      >
                        View Details →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}