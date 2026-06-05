/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Skill, Mentor, CommunityPost } from "./types";

export const CATEGORIES = [
  { name: "Graphic Design", emoji: "🎨", value: "Graphic Design" },
  { name: "Web Development", emoji: "💻", value: "Web Development" },
  { name: "Photography", emoji: "📸", value: "Photography" },
  { name: "Tailoring", emoji: "👗", value: "Tailoring" },
  { name: "Music Production", emoji: "🎵", value: "Music Production" },
  { name: "Cooking", emoji: "🍳", value: "Cooking" },
  { name: "Fitness", emoji: "💪", value: "Fitness" },
  { name: "Social Media Marketing", emoji: "📱", value: "Social Media Marketing" },
];

export const WARDS = [
  "Clay City",
  "Mwiki",
  "Kasarani",
  "Njiru",
  "Ruai"
];

export const INITIAL_SKILLS: Skill[] = [
  {
    id: "skill-1",
    name: "Graphic Design Mastery",
    instructor: "Kev Design",
    ward: "Kasarani",
    location: "Kasarani Stage, near Equity Bank",
    category: "Graphic Design",
    description: "Learn brand identity creation, typography, and how to master Adobe Illustrator & Photoshop. Step-by-step hands-on sessions designed for absolute beginners seeking freelance gigs.",
    phone: "+254712345678",
    price: 500,
    rating: 4.8,
    reviewsCount: 12,
    emoji: "🎨",
    availability: "Saturdays 10:00 AM - 1:00 PM",
    stripeColor: "Lime",
    verifiedInstructor: true,
    verificationProof: "Verified via National ID & Adobe Certified Professional graphic design credentials."
  },
  {
    id: "skill-2",
    name: "Web Development Bootcamp",
    instructor: "Alex Code",
    ward: "Clay City",
    location: "Clay City Business Center, Room 4B",
    category: "Web Development",
    description: "Build full-stack web applications with React, Tailwind CSS, & Node.js. Learn HTML/CSS basics in week 1, git integration, and deploy your first live project. Includes freelance roadmap.",
    phone: "+254722123456",
    price: 750,
    rating: 4.9,
    reviewsCount: 18,
    emoji: "💻",
    availability: "Mondays & Wednesdays 6:00 PM - 8:00 PM",
    stripeColor: "Sky Blue",
    verifiedInstructor: true,
    verificationProof: "Verified via Government ID & certified Full-Stack Coding Mentor certification."
  },
  {
    id: "skill-3",
    name: "Photography & Color Grading Basics",
    instructor: "Jane Capture",
    ward: "Mwiki",
    location: "Mwiki Road, opposite Total Station",
    category: "Photography",
    description: "Understand manual exposure, outdoor lighting, and digital post-processing in Lightroom. Bring your phone or DSLR. We do practical street shoots in Kasarani every weekend.",
    phone: "+254733987654",
    price: 400,
    rating: 4.6,
    reviewsCount: 8,
    emoji: "📸",
    availability: "Sundays afternoons 2:00 PM - 5:00 PM",
    stripeColor: "Orange"
  },
  {
    id: "skill-4",
    name: "Professional Tailoring & Design",
    instructor: "Mama Fashion",
    ward: "Njiru",
    location: "Njiru Market, block C shop 12",
    category: "Tailoring",
    description: "Master pattern drafting, sizing cutting, and sewing machine operation. We focus on modern African wear design, repair adjustments, and making bespoke tailoring businesses profitable.",
    phone: "+254724555666",
    price: 300,
    rating: 4.7,
    reviewsCount: 15,
    emoji: "👗",
    availability: "Tuesdays & Thursdays 9:00 AM - 11:30 AM",
    stripeColor: "Purple"
  },
  {
    id: "skill-5",
    name: "Music Production 101 with FL Studio",
    instructor: "DJ Beats",
    ward: "Ruai",
    location: "Ruai Shopping Complex, Penthouse Studio",
    category: "Music Production",
    description: "Learn audio mixing, beat making, synth patch layout, and vocal production using FL Studio & Logic Pro. Ideal for aspiring Gengetone, Afrobeats, and Amapiano producers.",
    phone: "+254705111222",
    price: 600,
    rating: 5.0,
    reviewsCount: 9,
    emoji: "🎵",
    availability: "Wednesdays & Fridays 4:00 PM - 6:30 PM",
    stripeColor: "Lime",
    verifiedInstructor: true,
    verificationProof: "Verified via National ID & Steinberg FL Studio certified producer proof."
  },
  {
    id: "skill-6",
    name: "Cooking & Catering Masterclass",
    instructor: "Chef Paul",
    ward: "Kasarani",
    location: "Kasarani Seasons, Block 9 flat 2A",
    category: "Cooking",
    description: "Learn continental cuisine, professional plating, fast-food snacks preparation, and bulk baking. Ideal for young people wanting to start a backyard food box business or catering service.",
    phone: "+254701222333",
    price: 450,
    rating: 4.5,
    reviewsCount: 7,
    emoji: "🍳",
    availability: "Fridays 10:00 AM - 2:00 PM",
    stripeColor: "Orange"
  },
  {
    id: "skill-7",
    name: "Fitness & Personal Training Certification",
    instructor: "Coach Mike",
    ward: "Mwiki",
    location: "Power Gym Mwiki Center",
    category: "Fitness",
    description: "Learn bodybuilding kinesiology, nutrition guiding, cardio routine planning, and gym business monetization. Prepare to get clients as a certified neighborhood fitness coach.",
    phone: "+254708333444",
    price: 550,
    rating: 4.7,
    reviewsCount: 14,
    emoji: "💪",
    availability: "Daily mornings 6:00 AM - 8:00 AM",
    stripeColor: "Purple"
  },
  {
    id: "skill-8",
    name: "Social Media Marketing & Brand Growth",
    instructor: "Grace Digital",
    ward: "Clay City",
    location: "Clay City Hub, Desk 7",
    category: "Social Media Marketing",
    description: "Grow your TikTok, Instagram, and YouTube audience. Learn viral content creation strategies, modern SEO copywriting, video editing on CapCut, and setting up Facebook/Google Ads campaigns.",
    phone: "+254715555666",
    price: 500,
    rating: 4.8,
    reviewsCount: 20,
    emoji: "📱",
    availability: "Thursdays 5:00 PM - 7:30 PM",
    stripeColor: "Sky Blue",
    verifiedInstructor: true,
    verificationProof: "Verified via National ID & Google Digital Marketing Specialist Certification."
  }
];

export const MENTORS: Mentor[] = [
  {
    id: "mentor-1",
    name: "James Kariuki",
    skill: "Web Development",
    emoji: "👨‍💻",
    years: 15,
    tags: ["React", "NodeJS", "AWS Architecture", "Mentoring"]
  },
  {
    id: "mentor-2",
    name: "Sarah Mwangi",
    skill: "Graphic Design",
    emoji: "👩‍🎨",
    years: 12,
    tags: ["Branding", "Adobe Illustrator", "Modern Typography", "UI/UX"]
  },
  {
    id: "mentor-3",
    name: "David Omondi",
    skill: "Business Strategy",
    emoji: "📈",
    years: 10,
    tags: ["Financial Literacy", "Startup Scale", "Investment Pitching"]
  },
  {
    id: "mentor-4",
    name: "Amina Hassan",
    skill: "Digital Marketing",
    emoji: "🚀",
    years: 8,
    tags: ["SEO Copywriting", "Social Ads Strategy", "KOL Campaigns"]
  }
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    userId: "admin",
    userName: "Alex Code",
    userAvatarInitials: "AC",
    userAvatarColor: "bg-[#3AAFFF]",
    content: "Just graduated my third web development cohort in Clay City! 💻 Super proud of Kelvin who just landed his first Upwork Gig designing landing pages for a local tech startup. Pamoja we grow! 🔥",
    timestamp: "2 hours ago",
    likes: 18,
    replies: 4,
    shares: 2,
    likedByUser: false
  },
  {
    id: "post-2",
    userId: "user-mama",
    userName: "Mama Fashion",
    userAvatarInitials: "MF",
    userAvatarColor: "bg-[#8B5CF6]",
    content: "I have two slots open for tailors who want to learn advanced Ankara gown design this coming Sunday at Njiru. Text or call me directly. Registration closes tomorrow! 👗✨",
    timestamp: "5 hours ago",
    likes: 12,
    replies: 2,
    shares: 0,
    likedByUser: false
  },
  {
    id: "post-3",
    userId: "user-dj",
    userName: "DJ Beats",
    userAvatarInitials: "DB",
    userAvatarColor: "bg-[#C5F135]",
    content: "Created a free starter pack of modern Gengetone and drill drum loops for youth in Ruai. Reach out to download and level up your production! Let's make some hit records! 🎵🔥",
    timestamp: "1 day ago",
    likes: 25,
    replies: 9,
    shares: 5,
    likedByUser: false
  }
];
