import { StarRating } from "./StarRating";

interface StarBreakdownProps {
  breakdown: number[];
  total: number;
  average: number;
  onFilterStar: (star: number | null) => void;
  activeStar: number | null;
}

export function StarBreakdown({
  breakdown,
  total,
  average,
  onFilterStar,
  activeStar,
}: StarBreakdownProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>

      {/* Average Rating */}
      <div className="mt-4 flex items-center gap-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">
            {average.toFixed(1)}
          </div>
          <StarRating rating={average} size="md" />
          <p className="mt-1 text-sm text-gray-500">
            {total} {total === 1 ? "review" : "reviews"}
          </p>
        </div>
      </div>

      {/* Star Bars */}
      <div className="mt-6 space-y-2.5">
        {breakdown.map((count, index) => {
          const star = 5 - index;
          const pct = total > 0 ? (count / total) * 100 : 0;
          const isActive = activeStar === star;
          return (
            <button
              key={star}
              onClick={() => onFilterStar(isActive ? null : star)}
              className={`group flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left transition-all hover:bg-amber-50 ${
                isActive ? "bg-amber-50 ring-1 ring-amber-200" : ""
              }`}
            >
              <span className="w-8 text-sm font-medium text-gray-600 shrink-0">
                {star}
                <span className="ml-0.5 text-amber-400">★</span>
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm text-gray-500 shrink-0">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {activeStar !== null && (
        <button
          onClick={() => onFilterStar(null)}
          className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
