export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  photos: string[];
  helpful: number;
  notHelpful: number;
  tags?: string[];
}

export const sampleReviews: Review[] = [
  {
    id: 1,
    author: "Sarah Mitchell",
    avatar: "SM",
    rating: 5,
    title: "Absolutely love this product!",
    body: "I've been using this for about 3 weeks now and I'm blown away by the quality. The build is solid, the design is sleek, and it works exactly as advertised. The packaging was also really premium feeling. Would definitely recommend to anyone looking for something reliable and well-made.",
    date: "2024-12-15",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    ],
    helpful: 47,
    notHelpful: 3,
    tags: ["Great Quality", "Worth the Price"],
  },
  {
    id: 2,
    author: "James Rodriguez",
    avatar: "JR",
    rating: 4,
    title: "Great product, minor issues",
    body: "Overall very happy with my purchase. The performance is excellent and it looks great on my desk. The only reason I'm giving 4 stars instead of 5 is that the instruction manual could be clearer. Took me a bit to figure out some of the advanced features. But once you get the hang of it, it's fantastic.",
    date: "2024-12-10",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop",
    ],
    helpful: 32,
    notHelpful: 5,
    tags: ["Good Performance"],
  },
  {
    id: 3,
    author: "Emily Chen",
    avatar: "EC",
    rating: 5,
    title: "Best purchase I've made this year",
    body: "Where has this been all my life? Seriously, this is one of those products that you don't realize you needed until you have it. The attention to detail is impressive, and customer service was incredibly responsive when I had a question about setup. 10/10 would buy again.",
    date: "2024-12-08",
    verified: true,
    photos: [],
    helpful: 28,
    notHelpful: 1,
    tags: ["Excellent Service", "Must Have"],
  },
  {
    id: 4,
    author: "Michael Thompson",
    avatar: "MT",
    rating: 3,
    title: "Decent but expected more",
    body: "It's a solid product for the most part. Does what it says on the tin. However, at this price point, I was expecting a bit more premium feel to the materials. It works well and I don't have any functional complaints, but it feels like they could have used better materials without increasing the cost too much.",
    date: "2024-12-05",
    verified: false,
    photos: [],
    helpful: 15,
    notHelpful: 8,
  },
  {
    id: 5,
    author: "Aisha Patel",
    avatar: "AP",
    rating: 5,
    title: "Exceeded all expectations!",
    body: "I was skeptical at first because of some mixed reviews, but I'm so glad I took the plunge. This product is beautifully designed and functions flawlessly. I've recommended it to three friends already and they all love it too. The battery life is outstanding and it charges super fast.",
    date: "2024-11-28",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop",
    ],
    helpful: 56,
    notHelpful: 2,
    tags: ["Battery Life", "Fast Charging", "Beautiful Design"],
  },
  {
    id: 6,
    author: "David Kim",
    avatar: "DK",
    rating: 2,
    title: "Not what I expected",
    body: "The product looks nice but I've had some reliability issues. It occasionally disconnects and I've had to reset it a few times. Customer support was helpful but I shouldn't have to troubleshoot this much for a product at this price. Hoping a firmware update fixes things.",
    date: "2024-11-25",
    verified: true,
    photos: [],
    helpful: 22,
    notHelpful: 4,
  },
  {
    id: 7,
    author: "Lisa Wang",
    avatar: "LW",
    rating: 4,
    title: "Really solid choice",
    body: "I bought this as a gift for my husband and he absolutely loves it. Setup was straightforward and it integrates well with his existing setup. The only thing I'd change is adding more color options. We went with the black which looks sleek, but more variety would be nice.",
    date: "2024-11-20",
    verified: true,
    photos: [
      "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=300&h=300&fit=crop",
    ],
    helpful: 19,
    notHelpful: 2,
    tags: ["Great Gift"],
  },
  {
    id: 8,
    author: "Robert Garcia",
    avatar: "RG",
    rating: 1,
    title: "Arrived damaged",
    body: "Unfortunately my unit arrived with a visible scratch on the surface and the box was clearly mishandled during shipping. I'm in the process of getting a replacement. Can't review the actual product functionality yet, but the unboxing experience was very disappointing. Will update once I get the replacement.",
    date: "2024-11-18",
    verified: true,
    photos: [],
    helpful: 11,
    notHelpful: 6,
  },
  {
    id: 9,
    author: "Nina Petrov",
    avatar: "NP",
    rating: 5,
    title: "Perfect in every way",
    body: "I researched for weeks before making this purchase and I'm so happy I chose this one. The build quality is exceptional, the performance is top-notch, and it looks amazing. I've been using it daily for a month now with zero issues. This is how products should be made.",
    date: "2024-11-15",
    verified: false,
    photos: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    ],
    helpful: 41,
    notHelpful: 3,
    tags: ["Top Quality", "Daily Use"],
  },
  {
    id: 10,
    author: "Carlos Mendez",
    avatar: "CM",
    rating: 4,
    title: "Very impressed overall",
    body: "Coming from a cheaper alternative, this is a huge upgrade. Everything feels more responsive and polished. The premium materials are noticeable and it's clear a lot of thought went into the design. Slightly heavy, but that also gives it a premium feel so I don't mind too much.",
    date: "2024-11-10",
    verified: true,
    photos: [],
    helpful: 25,
    notHelpful: 3,
    tags: ["Premium Feel", "Big Upgrade"],
  },
];

export function getStarBreakdown(reviews: Review[]) {
  const breakdown = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    breakdown[r.rating - 1]++;
  });
  return breakdown.reverse(); // 5 stars first
}

export function getAverageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}
