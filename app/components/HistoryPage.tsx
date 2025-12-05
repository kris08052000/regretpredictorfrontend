"use client";

import { api } from "../lib/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, TrendingDown, ShoppingBag, Calendar, ChevronRight, AlertCircle } from "lucide-react";
import { Prediction } from "../history/types";
import { PredictionCard } from "./PredictionsCard";
import { PredictionDetailModal } from "./PredictionDetailModal";

export default function HistoryPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await api.get("/predictions");
        setPredictions(res.data.predictions || res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load predictions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your predictions...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Prediction History</h1>
            <p className="text-gray-600">Review your past purchase predictions</p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {predictions.length === 0 && !error ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <TrendingDown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No predictions yet</h3>
              <p className="text-gray-600 mb-6">
                Start making predictions to see your history here
              </p>
              <button
                onClick={() => router.push("/predict")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition shadow-lg"
              >
                Make Your First Prediction
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {predictions.map((prediction) => (
                <PredictionCard
                  key={prediction.id}
                  prediction={prediction}
                  onClick={() => setSelectedPrediction(prediction)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPrediction && (
        <PredictionDetailModal
          prediction={selectedPrediction}
          onClose={() => setSelectedPrediction(null)}
        />
      )}
    </>
  );
}