import { TrendingDown } from "lucide-react";

interface Props {
  itemName: string;
  price: number;
  regretScore: number;
  reasons: string;
}

export default function RegretScoreCard({ itemName, price, regretScore, reasons }: Props) {
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{itemName}</h2>
          <p className="text-xl text-gray-600 font-semibold">
            ${price.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full ${getScoreColor(regretScore)} flex items-center justify-center shadow-lg`}>
            <span className="text-3xl font-bold text-white">{regretScore}</span>
          </div>
          <span className="mt-2 text-sm font-semibold text-gray-700">
            {getScoreLabel(regretScore)}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          Analysis
        </h3>
        <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-200">
          {reasons}
        </p>
      </div>
    </div>
  );
}
