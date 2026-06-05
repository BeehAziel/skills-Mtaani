/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, GraduationCap } from "lucide-react";
import { MENTORS } from "../data";

export default function MentorSection() {
  return (
    <section className="py-16 border-t border-b border-border-dark relative">
      {/* Visual backgrounds */}
      <div className="absolute bottom-[-10%] left-[5%] w-[250px] h-[250px] bg-purple-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Title elements */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-brand/10 border border-purple-brand/20 text-xs font-mono text-purple-brand uppercase mb-3">
            <Sparkles size={12} /> Expert Guidance
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white-pure uppercase tracking-tight">
            Senior Community Mentors
          </h2>
          <p className="mt-2 text-sm sm:text-base text-text-muted max-w-xl mx-auto">
            Experienced industry professionals from across Kasarani volunteer their spare time to guide and shape your career roadmap.
          </p>
        </div>

        {/* 4 Cards with custom directional transitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENTORS.map((mentor, index) => {
            // Alternating sliding direction
            const isLeft = index % 2 === 0;
            const cardVariants = {
              hidden: { opacity: 0, x: isLeft ? -50 : 50 },
              visible: { 
                opacity: 1, 
                x: 0, 
                transition: { type: "spring", stiffness: 70, damping: 15, delay: index * 0.1 } 
              },
            };

            return (
              <motion.div
                key={mentor.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4 }}
                className="bg-card-dark p-6 rounded-2xl border border-border-dark flex flex-col justify-between hover:border-purple-brand/30 transition-all duration-300 relative overflow-hidden group shadow-md"
              >
                {/* Visual grid accent */}
                <div className="absolute top-0 right-0 p-8 bg-purple-brand/5 rounded-full blur-2xl group-hover:bg-purple-brand/10 transition-colors pointer-events-none" />

                <div>
                  {/* Top: Avatar & name */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl filter drop-shadow bg-bg-dark rounded-xl p-2.5 border border-border-dark w-14 h-14 flex items-center justify-center">
                      {mentor.emoji}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-purple-brand">
                      <GraduationCap size={12} />
                      <span>{mentor.years} Yrs Exp</span>
                    </div>
                  </div>

                  {/* Specialty content */}
                  <h4 className="font-display font-bold text-lg text-white-pure tracking-wide">
                    {mentor.name}
                  </h4>
                  <div className="text-xs font-mono font-medium text-purple-brand mt-1 uppercase">
                    {mentor.skill}
                  </div>
                </div>

                {/* Tags bottom container */}
                <div className="mt-6">
                  <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">Specialties:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] sm:text-xs font-sans font-medium bg-bg-dark border border-border-dark text-text-muted hover:text-white-pure hover:border-purple-brand/20 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
