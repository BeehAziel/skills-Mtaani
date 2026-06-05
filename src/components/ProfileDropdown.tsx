/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { User, LogOut, BookOpen, Trash2, Edit3, Calendar, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { Skill, User as UserType } from "../types";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserType | null;
  skills: Skill[];
  onLogout: () => void;
  onEditSkill: (skill: Skill) => void;
  onDeleteSkill: (skillId: string) => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
  currentUser,
  skills,
  onLogout,
  onEditSkill,
  onDeleteSkill,
}: ProfileDropdownProps) {
  if (!isOpen || !currentUser) return null;

  // Filter skills posted by the current user
  // (Either instructor name matches full name or we match instructorId)
  const mySkills = skills.filter(
    (s) => s.instructor.toLowerCase() === currentUser.fullName.toLowerCase() || s.instructorId === currentUser.id
  );

  const handleDeleteClick = (skillId: string, skillName: string) => {
    const confirmed = window.confirm(`Are you absolutely sure you want to delete "${skillName}"? This action cannot be undone.`);
    if (confirmed) {
      onDeleteSkill(skillId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-card-dark rounded-3xl border border-border-dark overflow-hidden shadow-2xl relative"
      >
        {/* Colorful brand decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-lime-brand via-sky-brand to-purple-brand" />

        {/* Modal headers */}
        <div className="p-6 border-b border-border-dark flex items-center justify-between">
          <h3 className="font-display font-black text-xl uppercase tracking-tight text-white-pure flex items-center gap-2">
            <Sparkles size={20} className="text-lime-brand" /> My Resident Dashboard
          </h3>
          <button
            onMouseDown={onClose}
            className="p-1 px-3 py-1 bg-bg-dark border border-border-dark text-text-muted hover:text-white-pure text-xs tracking-wider rounded-xl cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Profiles body dashboard */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Personal Bio Card */}
          <div className="bg-bg-dark/50 p-5 rounded-2xl border border-border-dark flex flex-col sm:flex-row gap-5 items-center">
            {/* LARGE INITIALS AVATAR */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-2xl text-bg-dark border border-white-pure/10 shadow-lg shrink-0 ${currentUser.avatarColor}`}>
              {currentUser.avatarInitials}
            </div>

            <div className="text-center sm:text-left flex-1 space-y-1">
              <h4 className="font-display font-extrabold text-lg text-white-pure uppercase">
                {currentUser.fullName}
              </h4>
              <div className="text-xs font-mono text-lime-brand lowercase">
                @{currentUser.username}
              </div>

              {/* Badges indicators */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1.5">
                <span className="px-2 py-0.5 rounded bg-lime-brand/10 text-lime-brand border border-lime-brand/20 font-mono text-[9px] uppercase font-bold">
                  Verified Instructor
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-brand/10 text-sky-brand border border-sky-brand/20 font-mono text-[9px] uppercase font-bold">
                  {currentUser.ward} Ward
                </span>
              </div>
            </div>
          </div>

          {/* Metadata properties deck */}
          <div className="bg-bg-dark/30 p-4 rounded-xl border border-border-dark/60 space-y-2.5 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <Mail size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted">Email:</span>
              <span className="text-white-pure font-bold truncate">{currentUser.email}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted">Phone:</span>
              <span className="text-white-pure font-bold">{currentUser.phone}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted">Ward Connection:</span>
              <span className="text-white-pure font-bold">{currentUser.ward} Ward</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Calendar size={14} className="text-text-muted shrink-0" />
              <span className="text-text-muted">Join Date:</span>
              <span className="text-white-pure font-bold">{currentUser.joinDate}</span>
            </div>
          </div>

          {/* SECTION: MY POSTED SKILLS */}
          <div>
            <h4 className="text-xs font-mono uppercase text-lime-brand tracking-widest font-black mb-3.5 flex items-center gap-1.5">
              <BookOpen size={13} /> Active Skill Advertisements ({mySkills.length})
            </h4>

            {mySkills.length === 0 ? (
              <div className="text-center py-6 bg-bg-dark/20 rounded-2xl border border-dashed border-border-dark text-xs font-mono text-text-muted">
                You haven't posted any lessons yet.<br />Click "+ Post Skill" in the top bar to get started!
              </div>
            ) : (
              <div className="space-y-3.5">
                {mySkills.map((sk) => (
                  <div
                    key={sk.id}
                    className="p-4 bg-bg-dark/40 rounded-xl border border-border-dark/60 flex items-center justify-between gap-4 hover:border-lime-brand/20 transition-all"
                  >
                    <div className="min-w-0">
                      <h5 className="font-display font-bold text-sm text-white-pure truncate">
                        {sk.emoji} {sk.name}
                      </h5>
                      <span className="text-[10px] font-mono text-text-muted uppercase">
                        {sk.category} • KSh {sk.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => onEditSkill(sk)}
                        className="p-2 rounded-lg bg-bg-dark text-white-pure hover:text-lime-brand border border-border-dark hover:border-lime-brand/30 transition-colors cursor-pointer"
                        title="Edit Course Information"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(sk.id, sk.name)}
                        className="p-2 rounded-lg bg-bg-dark text-red-500 hover:text-red-400 border border-border-dark hover:border-red-500/30 transition-colors cursor-pointer"
                        title="Delete Advertisement"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logout CTA Panel Footer */}
        <div className="p-6 border-t border-border-dark bg-[#0f0f0e] flex items-center justify-between">
          <span className="text-[10px] font-mono text-text-muted italic">Skill Mtaani Platform</span>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-orange-brand/10 hover:bg-orange-brand text-orange-brand hover:text-white-pure border border-orange-brand/20 text-xs font-display font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut size={13} /> Log Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
