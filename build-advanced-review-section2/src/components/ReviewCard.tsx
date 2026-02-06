import { useState } from "react";
import { cn } from "@/utils/cn";
import { StarRating } from "./StarRating";
import type { Review } from "@/data/reviews";

interface ReviewCardProps {
  review: Review;
  onPhotoClick: (photos: string[], index: number) => void;
}

export function ReviewCard({ review, onPhotoClick }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (voted === type) {
      // Undo vote
      if (type === "up") setHelpfulCount((c) => c - 1);
      else setNotHelpfulCount((c) => c - 1);
      setVoted(null);
    } else {
      // Switch or new vote
      if (voted === "up") setHelpfulCount((c) => c - 1);
      if (voted === "down") setNotHelpfulCount((c) => c - 1);
      if (type === "up") setHelpfulCount((c) => c + 1);
      else setNotHelpfulCount((c) => c + 1);
      setVoted(type);
    }
  };

  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const avatarColors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
  ];
  const colorIndex = review.id % avatarColors.length;

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white",
              avatarColors[colorIndex]
            )}
          >
            {review.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">{review.author}</span>
              {review.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-200">
                  <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified Purchase
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Stars & Title */}
      <div className="mt-3">
        <StarRating rating={review.rating} size="sm" />
        <h4 className="mt-1.5 font-semibold text-gray-900">{review.title}</h4>
      </div>

      {/* Body */}
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.body}</p>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Photos */}
      {review.photos.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {review.photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => onPhotoClick(review.photos, i)}
              className="shrink-0 overflow-hidden rounded-xl ring-2 ring-transparent transition-all hover:ring-amber-400 hover:shadow-lg focus:outline-none focus:ring-amber-400"
            >
              <img
                src={photo}
                alt={`Review photo ${i + 1}`}
                className="h-20 w-20 object-cover transition-transform hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {/* Helpfulness */}
      <div className="mt-4 flex items-center gap-4 border-t border-gray-50 pt-4">
        <span className="text-xs text-gray-500">Was this review helpful?</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleVote("up")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              voted === "up"
                ? "bg-green-100 text-green-700 ring-1 ring-green-300"
                : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-700"
            )}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48a4.53 4.53 0 01-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            {helpfulCount}
          </button>
          <button
            onClick={() => handleVote("down")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
              voted === "down"
                ? "bg-red-100 text-red-700 ring-1 ring-red-300"
                : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-700"
            )}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-1.302 4.665c-.245.404.028.96.5.96h1.053c.832 0 1.612-.453 1.918-1.227.306-.774.51-1.597.637-2.447a.748.748 0 00-.01-.279 11.95 11.95 0 00-2.649-7.521c-.388-.482-.987-.729-1.605-.729H13.48a4.53 4.53 0 00-1.423.23l-3.114 1.04a4.501 4.501 0 01-1.423.23H5.904m10.598-1.843A2.25 2.25 0 0016.5 4.5c0-1.152.26-2.243.723-3.218C17.49.724 17.118 0 16.5 0h-.128a.75.75 0 00-.75.75v.633c0 .573-.11 1.14-.322 1.672-.303.76-.93 1.331-1.653 1.715a9.04 9.04 0 00-2.861 2.4c-.498.634-1.226 1.08-2.032 1.08H6.633m11.619-5.5H16.5m-9.596 14c-.083.205-.173.405-.27.602-.197.4.078.898.523.898h.908c.889 0 1.713-.518 1.972-1.368.14-.461.254-.932.342-1.41"
              />
            </svg>
            {notHelpfulCount}
          </button>
        </div>
      </div>
    </div>
  );
}
