import { Alternative } from "../predict/types";

interface Props {
  alternative: Alternative;
  originalPrice: number;
}

export default function AlternativeCard({ alternative, originalPrice }: Props) {
  const savings = originalPrice > alternative.price ? originalPrice - alternative.price : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{alternative.name}</h4>
        <p className="text-2xl font-bold text-blue-600">
          ${alternative.price.toLocaleString('en-IN')}
        </p>
        {savings > 0 && (
          <p className="text-sm text-green-600 font-semibold mt-1">
            Save ${savings.toLocaleString('en-IN')}
          </p>
        )}
      </div>

      {alternative.description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {alternative.description}
        </p>
      )}

      {alternative.link && (
        <a
          href={alternative.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          View Details →
        </a>
      )}
    </div>
  );
}
