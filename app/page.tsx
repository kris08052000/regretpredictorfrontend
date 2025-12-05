import { Metadata } from "next";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "Regret Predictor - Avoid Buyer's Regret with AI-Powered Purchase Insights",
  description: "Make smarter purchasing decisions with AI-powered predictions. Get personalized insights, alternative recommendations, and confidence scores before you buy. Free few instances.",
  keywords: [
    "purchase predictor",
    "buyer regret",
    "shopping decision",
    "AI purchase assistant",
    "smart shopping",
    "purchase analysis",
    "buying alternatives",
    "regret score",
    "purchase confidence"
  ],
  authors: [{ name: "Regret Predictor" }],
  openGraph: {
    title: "Regret Predictor - Avoid Buyer's Regret",
    description: "Make smarter purchases with AI-powered insights and alternative recommendations.",
    url: "https://regretpredictor.com",
    siteName: "Regret Predictor",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regret Predictor - Avoid Buyer's Regret",
    description: "Make smarter purchases with AI-powered insights",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <HomePage />;
}