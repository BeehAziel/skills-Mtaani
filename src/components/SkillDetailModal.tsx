/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { X, Phone, MessageSquare, Mail, MapPin, User, Shield, DollarSign, Calendar, Star, Copy } from "lucide-react";
import { Skill, User as UserType } from "../types";

interface SkillDetailModalProps {
  skill: Skill | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
  currentUser: UserType | null;
}

export default function SkillDetailModal({
  skill,
  onClose,
  onShowToast,
  currentUser,
}: SkillDetailModalProps) {
  if (!skill) return null;

  // Clean phone number format for WhatsApp.
  // Standard format requested wa.me/254[phone]. We sanitize +254... or 07... to wa.me/254...
  const getWhatsAppLink = (phoneNum: string, skillName: string) => {
    let sanitized = phoneNum.replace(/\D/g, ""); // strip non-digits
    
    if (sanitized.startsWith("0")) {
      sanitized = "254" + sanitized.substring(1);
    } else if (sanitized.startsWith("254")) {
      // already has country code
    } else {
      // fallback
      sanitized = "254" + sanitized;
    }
    
    const textMsg = encodeURIComponent(
      `Hi, I'm interested in your "${skillName}" course listed on Skill Mtaani! Can I get more details?`
    );
    return `https://wa.me/${sanitized}?text=${textMsg}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(skill.phone);
    onShowToast("Phone number copied to clipboard! 📋");
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-card-dark rounded-3xl border border-border-dark overflow-hidden shadow-2xl relative"
      >
        {/* Top Header stripe */}
        <div className={`h-2.5 w-full ${
          skill.stripeColor === "Orange" ? "bg-orange-brand" :
          skill.stripeColor === "Sky Blue" ? "bg-sky-brand" :
          skill.stripeColor === "Purple" ? "bg-purple-brand" : "bg-lime-brand"
        }`} />

        {/* Modal content header */}
        <div className="p-6 pb-4 border-b border-border-dark flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-dark border border-border-dark text-xs font-mono font-medium text-white-pure mb-2.5">
              <span className="text-[14px]">{skill.emoji}</span> {skill.category}
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white-pure uppercase leading-tight">
              {skill.name}
            </h3>
          </div>
          <button
            onMouseDown={onClose}
            className="p-1 px-3 py-1.5 rounded-xl bg-bg-dark border border-border-dark text-text-muted hover:text-white-pure text-xs tracking-wider font-semibold hover:border-text-muted/30 transition-all cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Detail Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {/* Quick Info Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-bg-dark/50 p-4 rounded-2xl border border-border-dark flex items-center gap-3">
              <div className="p-2.5 bg-lime-brand/10 text-lime-brand rounded-xl">
                <User size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Instructor</div>
                <div className="text-sm font-display font-extrabold text-white-pure flex items-center gap-1.5 flex-wrap">
                  <span>{skill.instructor}</span>
                  {skill.verifiedInstructor && (
                    <span className="inline-flex px-1 text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded" title="Verified instructor (ID/cert check complete)">
                      🛡️ Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-bg-dark/50 p-4 rounded-2xl border border-border-dark flex items-center gap-3">
              <div className="p-2.5 bg-orange-brand/10 text-orange-brand rounded-xl">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Ward Area</div>
                <div className="text-sm font-display font-extrabold text-white-pure">{skill.ward} Ward</div>
              </div>
            </div>

            <div className="bg-bg-dark/50 p-4 rounded-2xl border border-border-dark flex items-center gap-3">
              <div className="p-2.5 bg-sky-brand/10 text-sky-brand rounded-xl">
                <Calendar size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Availability</div>
                <span className="text-xs font-sans text-white-pure/90 font-medium">{skill.availability}</span>
              </div>
            </div>

            <div className="bg-bg-dark/50 p-4 rounded-2xl border border-border-dark flex items-center gap-3">
              <div className="p-2.5 bg-purple-brand/10 text-purple-brand rounded-xl">
                <DollarSign size={20} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Exchange Price</div>
                <div className="text-sm font-display font-extrabold text-white-pure">KSh {skill.price.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Description Block */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2 font-bold">About this lesson</h4>
            <div className="bg-bg-dark/30 p-4 rounded-2xl border border-border-dark/60">
              <p className="text-xs sm:text-sm text-white-pure/90 font-sans font-medium leading-relaxed">
                {skill.description}
              </p>
            </div>
          </div>

          {/* Instructor Verification Trust & Proof Block */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2 font-bold">Instructor Trust Check</h4>
            {skill.verifiedInstructor ? (
              <div className="bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Shield size={16} className="shrink-0" />
                  <span className="text-xs font-display font-black uppercase tracking-wide">
                    Verified Instructor (ID & Cert Checked)
                  </span>
                </div>
                <p className="font-sans text-xs text-white-pure/90 font-medium leading-normal">
                  Our administrators have analyzed official identification and industry qualifications for this mentor. Their status is marked active.
                </p>
                {skill.verificationProof && (
                  <div className="font-mono text-[10px] text-emerald-300 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/15 leading-relaxed">
                    🎓 <span className="text-text-muted">Verified Credentials & Proof:</span> <strong className="text-white-pure">{skill.verificationProof}</strong>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-500/[0.03] p-4 rounded-2xl border border-amber-500/15 flex items-start gap-3">
                <Shield size={16} className="text-amber-500/70 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block text-xs font-sans font-bold text-amber-500/90 leading-tight">Identity & Skill Verification Status Pending</span>
                  <p className="text-[10px] text-text-muted mt-1 leading-normal font-sans">
                    This mentor hasn't uploaded government ID or certification proof to obtain a verified badge yet. Direct chat verification is recommended.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Location details */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-2 font-bold">Classroom Location</h4>
            <p className="text-xs sm:text-sm text-text-muted inline-flex items-center gap-2 font-sans">
              <MapPin size={14} className="text-orange-brand shrink-0" />
              <span>{skill.location}</span>
            </p>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-[#171715] p-5 rounded-2xl border border-border-dark/60">
            <h5 className="font-display font-black text-xs uppercase tracking-wide text-white-pure mb-3 flex items-center gap-2">
              <Shield size={14} className="text-lime-brand" /> Price Safeguard Information
            </h5>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-border-dark pb-2">
                <span className="text-text-muted">Direct Peer rate:</span>
                <span className="text-white-pure font-bold">KSh {skill.price.toLocaleString()} / full cohort training</span>
              </div>
              <div className="flex justify-between border-b border-border-dark pb-2">
                <span className="text-text-muted">Middleman / Admin fee:</span>
                <span className="text-lime-brand font-bold">KSh 0 (100% Free Peer Network)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-white-pure font-bold">Total Payable directly:</span>
                <span className="text-white-pure font-bold font-display text-sm">KSh {skill.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Preloaded Local Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-border-dark pb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold">Reviews & Ratings</h4>
              <div className="flex items-center text-amber-400 font-mono text-xs font-black gap-1">
                <Star size={12} fill="currentColor" /> {skill.rating.toFixed(1)} / 5.0
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-bg-dark/40 p-3.5 rounded-xl border border-border-dark/60 text-xs text-text-muted font-sans p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white-pure">Kevin N. (Resident)</span>
                  <div className="flex text-amber-400">★★★★★</div>
                </div>
                <p className="font-medium text-white-pure/80">Excellent sessions! The instructor was extremely helpful and we did plenty of practical work.</p>
              </div>

              <div className="bg-bg-dark/40 p-3.5 rounded-xl border border-border-dark/60 text-xs text-text-muted font-sans p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white-pure">Grace A. (Student)</span>
                  <div className="flex text-amber-400">★★★★☆</div>
                </div>
                <p className="font-medium text-white-pure/80">Totally worth the budget. Found an amazing cohort of friends and built visual projects.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA options footer */}
        <div className="p-6 border-t border-border-dark bg-[#0f0f0e] flex flex-col sm:flex-row gap-3">
          <button
            onMouseDown={handleCopyPhone}
            className="flex-1 py-3 px-4 rounded-xl bg-card-dark border border-border-dark text-xs font-display font-bold uppercase tracking-wider text-white-pure hover:border-lime-brand/50 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy size={14} /> Copy Phone Number
          </button>

          <a
            href={getWhatsAppLink(skill.phone, skill.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-display font-black uppercase tracking-wider text-white-pure transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={14} fill="currentColor" /> Open WhatsApp Chat
          </a>

          <a
            href={`mailto:mainaphinee@gmail.com?subject=${encodeURIComponent(`Interested in ${skill.name} on Skill Mtaani`)}&body=${encodeURIComponent(`Hi ${skill.instructor},\n\nI saw your course "${skill.name}" on Skill Mtaani. I would love to learn more and discuss schedule/payments!`)}`}
            className="py-3 px-4 rounded-xl bg-card-dark border border-border-dark text-xs text-text-text-muted hover:text-white-pure transition-colors inline-flex items-center justify-center cursor-pointer"
            title="Email Instructor"
          >
            <Mail size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
