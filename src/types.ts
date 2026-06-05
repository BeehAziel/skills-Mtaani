/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  id: string;
  name: string;
  instructor: string;
  ward: string;
  location: string;
  category: string;
  description: string;
  phone: string;
  price: number;
  rating: number;
  reviewsCount: number;
  emoji: string;
  availability: string;
  instructorId?: string; // Optional: associated user
  stripeColor?: string;  // Lime, Orange, Sky Blue, Purple
  verifiedInstructor?: boolean; // Label indicating if instructor provided proof
  verificationProof?: string;   // Information about proof (e.g. Govt ID / cert)
}

export interface Mentor {
  id: string;
  name: string;
  skill: string;
  emoji: string;
  years: number;
  tags: string[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  phone: string;
  ward: string;
  joinDate: string;
  avatarColor: string; // Tailwind bg color class
  avatarInitials: string;
  bio?: string;
  skills: string[]; // Posted skill IDs
  bookmarks: string[]; // Bookmarked skill IDs
  verified?: boolean;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatarInitials: string;
  userAvatarColor: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  shares: number;
  likedByUser?: boolean;
}

export interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}
