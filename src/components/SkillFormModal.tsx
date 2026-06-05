/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, ClipboardCheck, BookOpen, User, Phone, MapPin, DollarSign, Calendar, Tag } from "lucide-react";
import { Skill, User as UserType } from "../types";
import { CATEGORIES, WARDS } from "../data";

interface SkillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (skillData: Omit<Skill, "id" | "rating" | "reviewsCount" | "emoji"> & { id?: string }) => void;
  onShowToast: (message: string) => void;
  currentUser: UserType | null;
  editingSkill: Skill | null; // If editing
}

export default function SkillFormModal({
  isOpen,
  onClose,
  onSubmit,
  onShowToast,
  currentUser,
  editingSkill,
}: SkillFormModalProps) {
  const [fullName, setFullName] = useState("");
  const [ward, setWard] = useState(WARDS[0]);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [availability, setAvailability] = useState("");
  const [verifiedInstructor, setVerifiedInstructor] = useState(false);
  const [verificationProof, setVerificationProof] = useState("");

  // Sync Form when editing changes
  useEffect(() => {
    if (editingSkill) {
      setFullName(editingSkill.instructor);
      setWard(editingSkill.ward);
      setPhone(editingSkill.phone);
      setLocation(editingSkill.location);
      setSkillName(editingSkill.name);
      setCategory(editingSkill.category);
      setDescription(editingSkill.description);
      setPrice(editingSkill.price);
      setAvailability(editingSkill.availability);
      setVerifiedInstructor(editingSkill.verifiedInstructor || false);
      setVerificationProof(editingSkill.verificationProof || "");
    } else if (currentUser) {
      setFullName(currentUser.fullName);
      setWard(currentUser.ward);
      setPhone(currentUser.phone);
      setLocation("");
      setSkillName("");
      setCategory(CATEGORIES[0].value);
      setDescription("");
      setPrice("");
      setAvailability("");
      setVerifiedInstructor(currentUser.verified || false);
      setVerificationProof(currentUser.verified ? "Verified via registered account credentials" : "");
    }
  }, [editingSkill, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Double check all fields required
    if (
      !fullName.trim() ||
      !ward.trim() ||
      !phone.trim() ||
      !location.trim() ||
      !skillName.trim() ||
      !category.trim() ||
      !description.trim() ||
      price === "" ||
      !availability.trim()
    ) {
      onShowToast("All form fields are strictly required!");
      return;
    }

    // 2. Validate Price Positive Number
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      onShowToast("Price must be a positive number.");
      return;
    }

    // 3. Validate Kenya format
    const phoneClean = phone.trim();
    const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(phoneClean)) {
      onShowToast("Phone number must match Kenyan format (+254... or 07... / 01...)");
      return;
    }

    // Submit state payload
    onSubmit({
      id: editingSkill?.id, // include if editing
      instructor: fullName.trim(),
      ward,
      phone: phoneClean,
      location: location.trim(),
      name: skillName.trim(),
      category,
      description: description.trim(),
      price: parsedPrice,
      availability: availability.trim(),
      verifiedInstructor,
      verificationProof: verifiedInstructor ? (verificationProof.trim() || "National Government ID / Industry Certification provided.") : ""
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-card-dark rounded-3xl border border-border-dark overflow-hidden shadow-2xl relative"
      >
        {/* Banner stripe */}
        <div className="h-2 w-full bg-lime-brand" />

        {/* Header container */}
        <div className="p-6 pb-4 border-b border-border-dark flex items-center justify-between">
          <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white-pure">
            {editingSkill ? "Edit Your Skill Advertisement ✏️" : "Share a Skill with the Community 🚀"}
          </h3>
          <button
            onMouseDown={onClose}
            className="p-1 px-2.5 rounded-lg bg-bg-dark border border-border-dark text-text-muted hover:text-white-pure text-xs tracking-wider cursor-pointer"
          >
            ✕ Cancel
          </button>
        </div>

        {/* Input fields */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Section: Instructor Info */}
          <div className="border-b border-border-dark/60 pb-3 mb-1">
            <h4 className="text-[10px] font-mono uppercase text-lime-brand tracking-widest font-black mb-2 flex items-center gap-1.5Packed">
              <ClipboardCheck size={12} /> Instructor Identity Check
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Full Name</label>
                <input
                  id="form-instructor"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Kelvin"
                  className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Primary Ward</label>
                <select
                  id="form-ward"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2 text-xs text-white-pure focus:outline-none focus:border-lime-brand"
                >
                  {WARDS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Phone Number (M-Pesa / WhatsApp)</label>
                <input
                  id="form-phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +254 712 345 678"
                  className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Classroom Venue Location</label>
                <input
                  id="form-location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. seasons, block 7 door 12"
                  className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444]"
                />
              </div>
            </div>
          </div>

          {/* Section: Skill Details */}
          <div>
            <h4 className="text-[10px] font-mono uppercase text-lime-brand tracking-widest font-black mb-2 flex items-center gap-1.5">
              <BookOpen size={12} /> Course Advertisement details
            </h4>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Skill / Course Name</label>
                <input
                  id="form-skillname"
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. React Front-End & Landing page design"
                  className="w-full bg-bg-dark border border-border-dark rounded-xl px-3.5 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Skill Category</label>
                  <select
                    id="form-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.emoji} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Exchange Cost (KShs total)</label>
                  <input
                    id="form-price"
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 500"
                    className="w-full bg-bg-dark border border-border-dark rounded-xl px-3.5 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Course Scheduling & Timing</label>
                <input
                  id="form-availability"
                  type="text"
                  required
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="e.g. Saturdays 10:00 AM - 1:00 PM"
                  className="w-full bg-bg-dark border border-border-dark rounded-xl px-3.5 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">Comprehensive Lesson Description</label>
                <textarea
                  id="form-description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize what youth will learn in this skill-sharing course. Be clear about prerequisites (e.g. write 'bring your own phone/laptop' if required)."
                  className="w-full bg-bg-dark border border-border-dark rounded-xl p-3.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-muted resize-none h-28"
                />
              </div>
            </div>
          </div>

          {/* Section: Instructor Verification */}
          <div className="bg-[#171715]/40 p-4 rounded-2xl border border-border-dark/60 space-y-3">
            <div className="flex items-start gap-3">
              <input
                id="form-verified"
                type="checkbox"
                checked={verifiedInstructor}
                onChange={(e) => setVerifiedInstructor(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border-dark bg-bg-dark text-lime-brand focus:ring-lime-brand cursor-pointer focus:outline-none"
              />
              <div className="flex-1">
                <label htmlFor="form-verified" className="block text-xs font-display font-extrabold text-white-pure cursor-pointer">
                  Request 'Verified Instructor' Badge 🛡️
                </label>
                <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed font-sans font-medium">
                  Check this if you have provided or are attaching a government ID or professional industry certification index so we can verify your expertise to the community.
                </p>
              </div>
            </div>

            {verifiedInstructor && (
              <div className="pt-2 border-t border-border-dark/60">
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1 font-bold">
                  Government ID / Certification Proof Reference
                </label>
                <textarea
                  id="form-verification-proof"
                  required={verifiedInstructor}
                  rows={2}
                  value={verificationProof}
                  onChange={(e) => setVerificationProof(e.target.value)}
                  placeholder="e.g., National ID, Professional Diploma, or NITA Web Development Grade 1 certified."
                  className="w-full bg-bg-dark border border-border-dark rounded-xl p-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-[#444] resize-none h-16"
                />
              </div>
            )}
          </div>

          {/* Form CTA Buttons */}
          <div className="pt-4 flex gap-3">
            <button
              id="form-submit-btn"
              type="submit"
              className="flex-1 py-3.5 rounded-xl bg-lime-brand hover:opacity-95 text-bg-dark font-display font-black uppercase text-xs tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              {editingSkill ? "Save Changes ✏️" : "+ Post My Skill 🚀"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
