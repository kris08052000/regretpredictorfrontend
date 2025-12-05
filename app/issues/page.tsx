"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, Loader2, CheckCircle2, MessageSquare } from "lucide-react";
import ProtectedRoute from "../components/ProtectedRoute";
import { api } from "../lib/api";

// Types
type IssueFormData = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  category: "bug" | "feature" | "improvement" | "other";
};

// Schema
const issueSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title too long"),
  description: z.string().min(20, "Please provide more details (at least 20 characters)").max(1000, "Description too long"),
  priority: z.enum(["low", "medium", "high"]),
  category: z.enum(["bug", "feature", "improvement", "other"]),
  
});

export default function IssuesPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      priority: "medium",
      category: "bug"
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [issueId, setIssueId] = useState<string | null>(null);

  const onSubmit = async (data: IssueFormData) => {
    try {
      setError(null);
      setSuccess(false);

      // Generate issue ID for tracking
      const generatedIssueId = `RPR-${Date.now().toString().slice(-6)}`;
      setIssueId(generatedIssueId);
      setSuccess(true);
      reset();

      const user = localStorage.getItem("user");
      const userEmail = user ? JSON.parse(user).email : "Anonymous";

      // Send to backend which will forward to Discord
      const response = await api.post("/issues", {
          ...data,
          generatedIssueId,
          userEmail,
          timestamp: new Date().toISOString()
      });

      if (!response) {
        throw new Error("Failed to submit issue");
      }

      // Auto-hide success message after 10 seconds
      setTimeout(() => {
        setSuccess(false);
        setIssueId(null);
      }, 10000);

    } catch (err: any) {
      console.error(err);
      setError("Failed to submit issue. Please try again or contact support.");
    }
  };

  return (
    <>
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Report an Issue
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Found a bug or have a feature request? Let us know and we'll track it on Discord.
            </p>
          </div>

          {/* Success Message */}
          {success && issueId && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Issue Submitted Successfully!
                  </h3>
                  <p className="text-sm text-green-700 mb-3">
                    Your issue has been reported and posted to our Discord server. You can track the status there.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-xs text-gray-600 mb-1">Issue Tracking ID:</p>
                    <p className="text-lg font-bold text-gray-900">{issueId}</p>
                  </div>
                  <a
                    href="https://discord.gg/7KVEacXB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition text-sm"
                    >
                    <MessageSquare className="w-4 h-4" />
                    Join Discord to Track
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  {...register("title")}
                  placeholder="e.g., Prediction not loading correctly"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  disabled={isSubmitting}
                  />
                {errors.title && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.title.message}</span>
                  </div>
                )}
              </div>

              {/* Category & Priority */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    {...register("category")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    disabled={isSubmitting}
                    >
                    <option value="bug">🐛 Bug Report</option>
                    <option value="feature">✨ Feature Request</option>
                    <option value="improvement">🚀 Improvement</option>
                    <option value="other">💬 Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="priority"
                    {...register("priority")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    disabled={isSubmitting}
                    >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🔴 High</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  rows={6}
                  placeholder="Please describe the issue in detail. Include steps to reproduce if it's a bug."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  disabled={isSubmitting}
                  />
                {errors.description && (
                  <div className="mt-2 flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.description.message}</span>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Submit Issue
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Track Your Issues on Discord
            </h3>
            <p className="text-sm text-blue-700 mb-4">
              All reported issues are posted to our Discord server where you can track status updates, 
              discuss with the team, and see when they're resolved.
            </p>
            <a
              href="https://discord.gg/7KVEacXB"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition text-sm"
              >
              <MessageSquare className="w-4 h-4" />
              Join Our Discord Server
            </a>
          </div>
        </div>
      </div>
      </ProtectedRoute>
    </>
  );
}