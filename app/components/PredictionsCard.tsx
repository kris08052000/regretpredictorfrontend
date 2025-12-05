import { Loader2, TrendingDown, ShoppingBag, Calendar, ChevronRight, AlertCircle } from "lucide-react";
import { Prediction } from "../history/types";

export function PredictionCard({ prediction, onClick }: { prediction: Prediction; onClick: () => void }) {
  const getScoreColor = (score: number) => {
    if (score < 30) return "bg-green-500";
    if (score < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition">
            {prediction.itemName}
          </h3>
          <p className="text-gray-600 font-semibold">
            ₹{prediction.price.toLocaleString('en-IN')}
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {formatDate(prediction.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`w-16 h-16 rounded-full ${getScoreColor(prediction.regretScore)} flex items-center justify-center`}>
            <span className="text-xl font-bold text-white">{prediction.regretScore}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-2">
        {prediction.reasons}
      </p>

      {prediction.alternatives && prediction.alternatives.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShoppingBag className="w-4 h-4" />
            <span>{prediction.alternatives.length} alternatives available</span>
          </div>
        </div>
      )}
    </div>
  );
}