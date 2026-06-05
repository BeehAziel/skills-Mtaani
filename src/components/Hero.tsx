/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Users, Calendar, ArrowRight, Award } from "lucide-react";

interface HeroProps {
  totalSkills: number;
  onPostClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ totalSkills, onPostClick, onExploreClick }: HeroProps) {
  // Anim containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative pt-8 pb-16 overflow-hidden border-b border-border-dark flex flex-col items-center">
      {/* Background glow effects */}
      <div className="absolute top-[-20%] left-[20%] w-[400px] h-[400px] bg-lime-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[350px] h-[350px] bg-orange-brand/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6 px-4 py-1.5 rounded-full border border-border-dark bg-card-dark text-lime-brand text-xs font-mono inline-flex items-center gap-2 uppercase tracking-widest"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-brand opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-brand"></span>
        </span>
        Empowering Youth of Kasarani
      </motion.div>

      {/* Main headings */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center px-4"
      >
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white-pure uppercase leading-[1.05]"
        >
          Learn Skills From <br />
          <span className="text-lime-brand bg-gradient-to-r from-lime-brand via-sky-brand to-lime-brand bg-clip-text text-transparent">
            Kasarani Experts
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg text-text-muted max-w-2xl mx-auto font-sans font-medium"
        >
          Youth skill-sharing hub. Learn modern computer tech, hands-on sewing, creative music, cooking and digital marketing from your local neighbors. 
          <span className="block mt-1 font-display text-white-pure font-bold italic text-sm sm:text-base">
            "Learn. Teach. Grow Pamoja" 🌟
          </span>
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white-pure text-bg-dark font-display font-black uppercase text-sm tracking-wide hover:bg-lime-brand transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] inline-flex items-center justify-center gap-2 group cursor-pointer"
          >
            Explore Skills
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            id="hero-post-btn"
            onClick={onPostClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-card-dark border border-border-dark text-white-pure font-display font-bold uppercase text-sm tracking-wide hover:border-lime-brand/50 hover:bg-card-dark/80 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Post My Skill 🚀
          </button>
        </motion.div>
      </motion.div>

      {/* Grid of 3 stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl w-full px-4 mt-16 z-10"
      >
        <div className="bg-card-dark p-6 rounded-2xl border border-border-dark flex items-center gap-4 hover:border-lime-brand/30 transition-all duration-300 shadow-xl group">
          <div className="p-3 bg-lime-brand/10 text-lime-brand rounded-xl group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <div>
            <div className="text-3xl font-display font-extrabold text-white-pure">{totalSkills}</div>
            <div className="text-xs text-text-muted font-mono uppercase tracking-widest mt-0.5">Active Skills Available</div>
          </div>
        </div>

        <div className="bg-card-dark p-6 rounded-2xl border border-border-dark flex items-center gap-4 hover:border-sky-brand/30 transition-all duration-300 shadow-xl group">
          <div className="p-3 bg-sky-brand/10 text-sky-brand rounded-xl group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <div>
            <div className="text-3xl font-display font-extrabold text-white-pure">1,248+</div>
            <div className="text-xs text-text-muted font-mono uppercase tracking-widest mt-0.5">Community Members</div>
          </div>
        </div>

        <div className="bg-card-dark p-6 rounded-2xl border border-border-dark flex items-center gap-4 hover:border-orange-brand/30 transition-all duration-300 shadow-xl group">
          <div className="p-3 bg-orange-brand/10 text-orange-brand rounded-xl group-hover:scale-110 transition-transform">
            <Calendar size={24} />
          </div>
          <div>
            <div className="text-3xl font-display font-extrabold text-white-pure">42</div>
            <div className="text-xs text-text-muted font-mono uppercase tracking-widest mt-0.5">Skills Posted This Month</div>
          </div>
        </div>
      </motion.div>

      {/* Infinite scrolling ticker banner (20s loop) */}
      <div className="w-full bg-[#111] border-y border-border-dark py-3.5 overflow-hidden mt-16 relative">
        <div className="animate-ticker">
          {/* Ticker 1 */}
          <div className="flex items-center gap-8 text-xs font-display font-black text-white-pure uppercase tracking-widest whitespace-nowrap px-4">
            <span>Learn. Teach. Grow Pamoja 🌟</span>
            <span className="text-lime-brand">★</span>
            <span>Clay City Ward</span>
            <span className="text-orange-brand">★</span>
            <span>Mwiki Ward</span>
            <span className="text-sky-brand">★</span>
            <span>Kasarani Ward</span>
            <span className="text-purple-brand">★</span>
            <span>Njiru Ward</span>
            <span className="text-lime-brand">★</span>
            <span>Ruai Ward</span>
            <span className="text-orange-brand">★</span>
            <span>Empowering Kasarani Youth</span>
            <span className="text-sky-brand">★</span>
            <span>100% Free Peer Connection</span>
            <span className="text-purple-brand">★</span>
          </div>
          {/* Ticker 2 duplicate for seamless loop */}
          <div className="flex items-center gap-8 text-xs font-display font-black text-white-pure uppercase tracking-widest whitespace-nowrap px-4" aria-hidden="true">
            <span>Learn. Teach. Grow Pamoja 🌟</span>
            <span className="text-lime-brand">★</span>
            <span>Clay City Ward</span>
            <span className="text-orange-brand">★</span>
            <span>Mwiki Ward</span>
            <span className="text-sky-brand">★</span>
            <span>Kasarani Ward</span>
            <span className="text-purple-brand">★</span>
            <span>Njiru Ward</span>
            <span className="text-lime-brand">★</span>
            <span>Ruai Ward</span>
            <span className="text-orange-brand">★</span>
            <span>Empowering Kasarani Youth</span>
            <span className="text-sky-brand">★</span>
            <span>100% Free Peer Connection</span>
            <span className="text-purple-brand">★</span>
          </div>
        </div>
      </div>
    </section>
  );
}
