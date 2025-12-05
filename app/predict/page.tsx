"use client";
import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import PredictionForm from "../components/PredictionForm";
import RegretScoreCard from "../components/RegretScoreCard";
import AlternativeCard from "../components/AlternativeCard";
import { ShoppingBag } from "lucide-react";
import { PredictionResult } from "./types";

export default function PredictPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Purchase Regret Predictor
            </h1>
            <p className="text-lg text-gray-600">
              Get AI-powered insights before you buy
            </p>
          </div>

          <div className="mb-8">
            <PredictionForm onSubmitSuccess={setResult} />
          </div>

          {result && (
            <div className="space-y-6">
              <RegretScoreCard
                itemName={result.itemName}
                price={result.price}
                regretScore={result.regretScore}
                reasons={result.reasons}
              />

              {result.alternatives && result.alternatives.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6" />
                    Alternative Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {result.alternatives.map((alt, index) => (
                      <AlternativeCard
                        key={index}
                        alternative={alt}
                        originalPrice={result.price}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}