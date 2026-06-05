/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { MapPin, User, Star, ArrowUpRight } from "lucide-react";
import { Skill } from "../types";

interface SkillCardProps {
  skill: Skill;
  onLearnMore: (skill: Skill) => void;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onLearnMore, index }) => {
  // Map Stripe Theme Colors
  const stripeColors: Record<string, string> = {
    Lime: "bg-lime-brand",
    Orange: "bg-orange-brand",
    "Sky Blue": "bg-sky-brand",
    Purple: "bg-purple-brand"
  };

  const glowClasses: Record<string, string> = {
    Lime: "hover:shadow-[0_0_20px_rgba(197,241,53,0.15)] hover:border-lime-brand/30",
    Orange: "hover:shadow-[0_0_20px_rgba(255,92,40,0.15)] hover:border-orange-brand/30",
    "Sky Blue": "hover:shadow-[0_0_20px_rgba(58,175,255,0.15)] hover:border-sky-brand/30",
    Purple: "hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-purple-brand/30"
  };

  const colorKey = skill.stripeColor || "Lime";
  const stripeBg = stripeColors[colorKey] || "bg-lime-brand";
  const glowBorder = glowClasses[colorKey] || "hover:border-lime-brand/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`relative flex flex-col bg-card-dark rounded-2xl border border-border-dark overflow-hidden transition-all duration-300 ${glowBorder} group shadow-lg`}
    >
      {/* Top Brand Stripe */}
      <div className={`h-2 w-full ${stripeBg}`} />

      <div className="p-5 flex-1 flex flex-col">
        {/* Category Badge & Price Tag */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-dark border border-border-dark text-xs font-mono font-medium text-white-pure">
              <span className="text-[14px]">{skill.emoji}</span> {skill.category}
            </span>
            {skill.verifiedInstructor && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono font-bold text-emerald-400" title="Verified Instructor: Government ID or certification proof verified.">
                🛡️ Verified
              </span>
            )}
          </div>
          <span className="text-white-pure font-display font-extrabold text-sm sm:text-base">
            KSh {skill.price.toLocaleString()}
          </span>
        </div>

        {/* Skill Title */}
        <h4 className="font-display font-black text-lg text-white-pure leading-tight group-hover:text-lime-brand transition-colors line-clamp-2">
          {skill.name}
        </h4>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-2 text-xs font-sans font-medium text-text-muted">
          <User size={12} className="text-lime-brand" />
          <span className="flex items-center gap-1.5 flex-wrap">
            <span>Taught by <strong className="text-white-pure">{skill.instructor}</strong></span>
            {skill.verifiedInstructor && (
              <span className="inline-flex items-center gap-0.5 px-1 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-black" title="Certified & ID verified">
                ✓ ID / Certification Verified
              </span>
            )}
          </span>
        </div>

        {/* Location & Ward */}
        <div className="flex items-center gap-2 mt-1.5 text-xs font-sans font-medium text-text-muted">
          <MapPin size={12} className="text-orange-brand" />
          <span>Ward: <span className="text-white-pure font-bold">{skill.ward}</span></span>
        </div>

        {/* Shortened Description */}
        <p className="mt-4 text-xs sm:text-sm text-text-muted line-clamp-3 leading-relaxed flex-1">
          {skill.description}
        </p>

        {/* Rating and Reviews Footer */}
        <div className="mt-5 pt-4 border-t border-border-dark flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <div className="flex items-center text-amber-400 gap-0.5">
              <Star size={13} fill="currentColor" />
              <span className="text-white-pure font-black ml-0.5">{skill.rating.toFixed(1)}</span>
            </div>
            <span className="text-text-muted">({skill.reviewsCount} reviews)</span>
          </div>

          <button
            onClick={() => onLearnMore(skill)}
            className="px-3.5 py-1.5 rounded-lg bg-bg-dark border border-border-dark text-xs font-display font-bold uppercase tracking-wider text-white-pure group-hover:bg-lime-brand group-hover:text-bg-dark transition-all duration-300 inline-flex items-center gap-1 cursor-pointer"
          >
            Learn More
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
