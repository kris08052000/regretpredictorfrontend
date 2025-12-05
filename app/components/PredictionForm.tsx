"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2, TrendingDown } from "lucide-react";
import { api } from "../lib/api";
import { PredictionResult, FormData } from "../predict/types";

interface Props {
  onSubmitSuccess: (result: PredictionResult) => void;
}

const schema = z.object({
  itemName: z.string().min(1, "Item name is required").max(200, "Item name too long"),
  price: z.number().min(1, "Price must be greater than 0").max(10_000_000, "Price too high")
});

export default function PredictionForm({ onSubmitSuccess }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      const res = await api.post("/predictions", data);
      onSubmitSuccess(res.data.prediction);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create prediction.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="itemName" className="block text-sm font-semibold text-gray-700 mb-2">
            What do you want to buy?
          </label>
          <input
            id="itemName"
            {...register("itemName")}
            placeholder="e.g., iPhone 15 Pro Max, PlayStation 5, Macbook Pro"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg"
            disabled={isSubmitting}
          />
          {errors.itemName && (
            <div className="mt-2 flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.itemName.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
            Price ($)
          </label>
          <input
            id="price"
            {...register("price", { valueAsNumber: true })}
            type="number"
            placeholder="e.g., 1299"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg"
            disabled={isSubmitting}
          />
          {errors.price && (
            <div className="mt-2 flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{errors.price.message}</span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Analyzing Purchase...
            </>
          ) : (
            <>
              <TrendingDown className="w-6 h-6" />
              Predict Regret Score
            </>
          )}
        </button>
      </div>
    </div>
  );
}
