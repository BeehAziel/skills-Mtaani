/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CATEGORIES } from "../data";
import { Skill } from "../types";

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  skills: Skill[];
}

export default function Categories({ selectedCategory, onSelectCategory, skills }: CategoriesProps) {
  // Get count per category
  const getCategoryCount = (categoryName: string) => {
    return skills.filter((skill) => skill.category === categoryName).length;
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg uppercase tracking-wide text-white-pure">
          Browse by Category
        </h3>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-mono text-lime-brand hover:underline cursor-pointer"
          >
            Clear Filter [✕]
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {/* 'All' category chip */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-extrabold uppercase tracking-wide cursor-pointer border transition-all duration-300 inline-flex items-center gap-2 ${
            selectedCategory === null
              ? "bg-lime-brand text-bg-dark border-lime-brand shadow-lg shadow-lime-brand/10"
              : "bg-card-dark text-text-muted border-border-dark hover:border-text-muted/30"
          }`}
        >
          <span>🌐 All Wards & Skills</span>
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono leading-none ${
            selectedCategory === null ? "bg-bg-dark text-lime-brand" : "bg-border-dark text-text-muted"
          }`}>
            {skills.length}
          </span>
        </motion.button>

        {CATEGORIES.map((cat, index) => {
          const isActive = selectedCategory === cat.value;
          const count = getCategoryCount(cat.value);

          return (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(cat.value)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-extrabold uppercase tracking-wide cursor-pointer border transition-all duration-300 inline-flex items-center gap-2 ${
                isActive
                  ? "bg-lime-brand text-bg-dark border-lime-brand shadow-lg shadow-lime-brand/10"
                  : "bg-card-dark text-text-muted border-border-dark hover:border-text-muted/30"
              }`}
            >
              <span>{cat.emoji} {cat.name}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono leading-none ${
                isActive ? "bg-bg-dark text-lime-brand" : "bg-border-dark text-text-muted"
              }`}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
