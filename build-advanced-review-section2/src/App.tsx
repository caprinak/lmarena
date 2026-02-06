import { useState, useMemo, useCallback } from "react";
import { StarBreakdown } from "./components/StarBreakdown";
import { ReviewCard } from "./components/ReviewCard";
import { PhotoModal } from "./components/PhotoModal";
import {
  sampleReviews,
  getStarBreakdown,
  getAverageRating,
} from "./data/reviews";

type SortOption = "newest" | "oldest" | "highest" | "lowest" | "helpful";

export function App() {
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("helpful");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showWithPhotos, setShowWithPhotos] = useState(false);

  // Photo modal state
  const [modalPhotos, setModalPhotos] = useState<string[] | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  const breakdown = useMemo(() => getStarBreakdown(sampleReviews), []);
  const average = useMemo(() => getAverageRating(sampleReviews), []);

  const filteredAndSorted = useMemo(() => {
    let reviews = [...sampleReviews];

    if (filterStar !== null) {
      reviews = reviews.filter((r) => r.rating === filterStar);
    }
    if (showVerifiedOnly) {
      reviews = reviews.filter((r) => r.verified);
    }
    if (showWithPhotos) {
      reviews = reviews.filter((r) => r.photos.length > 0);
    }

    switch (sortBy) {
      case "newest":
        reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        reviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "highest":
        reviews.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        reviews.sort((a, b) => a.rating - b.rating);
        break;
      case "helpful":
        reviews.sort((a, b) => b.helpful - a.helpful);
        break;
    }

    return reviews;
  }, [filterStar, sortBy, showVerifiedOnly, showWithPhotos]);

  // All photos across all reviews for the gallery section
  const allPhotos = useMemo(() => {
    const photos: { url: string; author: string }[] = [];
    sampleReviews.forEach((r) => {
      r.photos.forEach((p) => photos.push({ url: p, author: r.author }));
    });
    return photos;
  }, []);

  const handlePhotoClick = useCallback((photos: string[], index: number) => {
    setModalPhotos(photos);
    setModalIndex(index);
  }, []);

  const closeModal = useCallback(() => setModalPhotos(null), []);
  const prevPhoto = useCallback(() => {
    setModalIndex((i) => (modalPhotos ? (i - 1 + modalPhotos.length) % modalPhotos.length : 0));
  }, [modalPhotos]);
  const nextPhoto = useCallback(() => {
    setModalIndex((i) => (modalPhotos ? (i + 1) % modalPhotos.length : 0));
  }, [modalPhotos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-200/50">
              <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Product Reviews</h1>
              <p className="text-sm text-gray-500">See what our customers are saying</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Photo Gallery Strip */}
        {allPhotos.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              📸 Customer Photos
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() =>
                    handlePhotoClick(
                      allPhotos.map((p) => p.url),
                      i
                    )
                  }
                  className="group relative shrink-0 overflow-hidden rounded-xl shadow-sm ring-2 ring-transparent transition-all hover:ring-amber-400 hover:shadow-lg focus:outline-none focus:ring-amber-400"
                >
                  <img
                    src={photo.url}
                    alt={`Photo by ${photo.author}`}
                    className="h-24 w-24 object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <StarBreakdown
              breakdown={breakdown}
              total={sampleReviews.length}
              average={average}
              onFilterStar={setFilterStar}
              activeStar={filterStar}
            />

            {/* Filters */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Filters
              </h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showVerifiedOnly}
                    onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 accent-amber-500"
                  />
                  <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                    <svg className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified purchases only
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={showWithPhotos}
                    onChange={(e) => setShowWithPhotos(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 accent-amber-500"
                  />
                  <span className="flex items-center gap-1.5 text-sm text-gray-700 group-hover:text-gray-900">
                    <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    With photos only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div>
            {/* Sort Bar */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredAndSorted.length}
                </span>{" "}
                of {sampleReviews.length} reviews
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-500">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                >
                  <option value="helpful">Most Helpful</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>

            {/* Review Cards */}
            {filteredAndSorted.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSorted.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onPhotoClick={handlePhotoClick}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">No reviews found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters to see more reviews
                </p>
                <button
                  onClick={() => {
                    setFilterStar(null);
                    setShowVerifiedOnly(false);
                    setShowWithPhotos(false);
                  }}
                  className="mt-4 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Photo Modal */}
      {modalPhotos && (
        <PhotoModal
          photos={modalPhotos}
          currentIndex={modalIndex}
          onClose={closeModal}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
}
