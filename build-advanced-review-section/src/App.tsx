import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { cn } from './utils/cn';

// --- MOCK DATA ---
const REVIEWS = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5,
    date: 'October 12, 2023',
    verified: true,
    title: 'Absolutely love this product!',
    content: 'I was hesitant at first, but after using it for a week, I can confidently say this is the best purchase I have made all year. The build quality is excellent, and it does exactly what it promises. Highly recommend!',
    photos: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200&h=200',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200&h=200'
    ],
    helpfulCount: 34
  },
  {
    id: '2',
    author: 'Michael T.',
    rating: 4,
    date: 'September 28, 2023',
    verified: true,
    title: 'Great, but could use one improvement',
    content: 'Overall a fantastic item. My only gripe is that the setup instructions were a bit confusing. Once I got past that, everything worked seamlessly. The customer support team was also very responsive when I reached out.',
    helpfulCount: 12
  },
  {
    id: '3',
    author: 'Emily R.',
    avatar: 'https://i.pravatar.cc/150?u=emily',
    rating: 5,
    date: 'August 15, 2023',
    verified: false,
    title: 'Exceeded my expectations',
    content: 'I bought this as a gift for my husband and he absolutely loves it. The packaging was beautiful and the product itself feels very premium.',
    photos: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200&h=200'
    ],
    helpfulCount: 8
  },
  {
    id: '4',
    author: 'David L.',
    rating: 2,
    date: 'July 5, 2023',
    verified: true,
    title: 'Not for me',
    content: 'The product looks good but did not fit my needs. The sizing runs a bit small compared to what is advertised. Returning it was easy enough, though.',
    helpfulCount: 3
  },
  {
    id: '5',
    author: 'Amanda V.',
    rating: 5,
    date: 'June 10, 2023',
    verified: true,
    title: 'Flawless design',
    content: 'Sleek, modern, and perfectly matches my other accessories. It arrived super fast as well. 10/10 would buy again.',
    helpfulCount: 45
  }
];

// Calculate breakdown
const totalReviews = REVIEWS.length;
const averageRating = (REVIEWS.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);

const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
REVIEWS.forEach(r => {
  if (r.rating >= 1 && r.rating <= 5) {
    ratingCounts[r.rating as keyof typeof ratingCounts]++;
  }
});

// --- COMPONENTS ---

const StarRating = ({ rating, size = 16 }: { rating: number, size?: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = rating >= star;
        const half = rating > star - 1 && rating < star;
        return (
          <div key={star} className="relative">
            <Star size={size} className={cn("text-gray-200", { "text-amber-400 fill-amber-400": fill })} />
            {half && (
              <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
                <Star size={size} className="text-amber-400 fill-amber-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

interface ReviewBreakdownProps {
  filter: number | null;
  setFilter: (val: number | null) => void;
}

const ReviewBreakdown: React.FC<ReviewBreakdownProps> = ({ filter, setFilter }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
      {/* Left side: Avg rating */}
      <div className="flex flex-col items-center justify-center min-w-[160px] space-y-3 md:border-r md:border-gray-100 md:pr-8">
        <h2 className="text-6xl font-extrabold text-gray-900 tracking-tight">{averageRating}</h2>
        <div className="flex flex-col items-center gap-1">
          <StarRating rating={Number(averageRating)} size={20} />
          <p className="text-sm text-gray-500 font-medium mt-1">Based on {totalReviews} reviews</p>
        </div>
      </div>

      {/* Right side: Breakdown bars */}
      <div className="flex-1 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingCounts[star as keyof typeof ratingCounts];
          const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
          const isSelected = filter === star;
          
          return (
            <button 
              key={star} 
              onClick={() => setFilter(isSelected ? null : star)}
              className={cn(
                "w-full flex items-center gap-3 text-sm group cursor-pointer p-1.5 -mx-1.5 rounded-lg transition-colors border border-transparent",
                isSelected ? "bg-amber-50 border-amber-100" : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-1.5 w-12 font-semibold text-gray-700">
                {star} <Star size={14} className={cn("transition-colors", isSelected ? "text-amber-500 fill-amber-500" : "text-gray-400 fill-gray-400 group-hover:text-amber-400")} />
              </div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className={cn("h-full rounded-full transition-all duration-700 ease-out", isSelected ? "bg-amber-500" : "bg-amber-400")}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-10 text-right text-gray-500 text-xs font-bold">{percentage}%</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }: { review: typeof REVIEWS[0] }) => {
  const [helpfulStatus, setHelpfulStatus] = useState<'yes' | 'no' | null>(null);
  const [localHelpfulCount, setLocalHelpfulCount] = useState(review.helpfulCount);

  const handleHelpful = (type: 'yes' | 'no') => {
    if (helpfulStatus === type) {
      setHelpfulStatus(null);
      if (type === 'yes') setLocalHelpfulCount(prev => prev - 1);
    } else {
      if (helpfulStatus === 'yes' && type === 'no') setLocalHelpfulCount(prev => prev - 1);
      if (helpfulStatus === 'no' && type === 'yes') setLocalHelpfulCount(prev => prev + 1);
      if (helpfulStatus === null && type === 'yes') setLocalHelpfulCount(prev => prev + 1);
      setHelpfulStatus(type);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-5 transition-all hover:shadow-md">
      {/* Header: Author & Rating */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {review.avatar ? (
            <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 text-indigo-700 flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white">
              {review.author.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{review.author}</span>
              {review.verified && (
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <CheckCircle size={12} className="text-emerald-600" />
                  Verified Buyer
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1">
              <StarRating rating={review.rating} size={14} />
              <span className="text-xs text-gray-400 font-medium">•</span>
              <span className="text-xs text-gray-500 font-medium">{review.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-1">
        <h4 className="font-bold text-gray-900 text-lg mb-2">{review.title}</h4>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{review.content}</p>
      </div>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-3 mt-2">
          {review.photos.map((photo, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <img 
                src={photo} 
                alt={`Review photo ${idx + 1}`} 
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl border border-gray-200 shadow-sm transition-all group-hover:brightness-90 group-hover:border-gray-300 group-hover:shadow" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
                <ImageIcon className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md scale-75 group-hover:scale-100 transition-all" size={24} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer: Helpfulness */}
      <div className="mt-3 pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
        <span className="text-gray-500 font-medium">Was this review helpful?</span>
        <div className="flex gap-2">
          <button 
            onClick={() => handleHelpful('yes')}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all border",
              helpfulStatus === 'yes' 
                ? "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            )}
          >
            <ThumbsUp size={15} className={cn("transition-transform", {"fill-indigo-700 scale-110": helpfulStatus === 'yes'})} />
            <span>Yes</span>
            {localHelpfulCount > 0 && <span className="ml-1 text-xs opacity-80">({localHelpfulCount})</span>}
          </button>
          <button 
            onClick={() => handleHelpful('no')}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold transition-all border",
              helpfulStatus === 'no' 
                ? "bg-rose-50 text-rose-700 border-rose-200 shadow-sm" 
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            )}
          >
            <ThumbsDown size={15} className={cn("transition-transform mt-0.5", {"fill-rose-700 scale-110": helpfulStatus === 'no'})} />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export function App() {
  const [filter, setFilter] = useState<number | null>(null);

  const filteredReviews = filter 
    ? REVIEWS.filter(r => r.rating === filter)
    : REVIEWS;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-3">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Real feedback from our verified customers. Read their experiences and see why they love our product.
          </p>
        </div>

        {/* Summary Breakdown */}
        <ReviewBreakdown filter={filter} setFilter={setFilter} />

        {/* Filters & Review List */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
              {filter && <span className="text-amber-500 ml-2">({filter} Stars)</span>}
            </h3>
            
            {/* Simple Star Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Filter by:</span>
              <select 
                className="text-sm border-gray-300 rounded-lg py-2 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm outline-none border bg-white font-medium text-gray-700 cursor-pointer"
                value={filter || ''}
                onChange={(e) => setFilter(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>

          {/* Active Filter Clear Button */}
          {filter && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Showing reviews with {filter} stars.</span>
              <button 
                onClick={() => setFilter(null)}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Clear filter
              </button>
            </div>
          )}

          <div className="space-y-6">
            {filteredReviews.length > 0 ? (
              filteredReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-gray-300" size={24} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">No reviews found</h4>
                <p className="text-gray-500 font-medium max-w-sm mx-auto">
                  We couldn't find any reviews matching your selected rating.
                </p>
                <button 
                  onClick={() => setFilter(null)}
                  className="mt-6 px-6 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-full hover:bg-indigo-100 transition-colors"
                >
                  View all reviews
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
