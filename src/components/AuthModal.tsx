/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { X, Mail, Lock, User, Phone, MapPin, CheckSquare, ShieldCheck } from "lucide-react";
import { User as UserType } from "../types";
import { CATEGORIES, WARDS } from "../data";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserType) => void;
  onShowToast: (message: string) => void;
  users: UserType[];
  onAddUser: (user: UserType) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  onShowToast,
  users,
  onAddUser,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [ward, setWard] = useState(WARDS[0]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  // Simple Helper to Auto-Fill Demo Accounts
  const handleQuickDemoClick = () => {
    if (isLogin) {
      setEmail("demouser"); // will be evaluated as username
      setPassword("Demo@123");
      onShowToast("Demo credentials filled! Clicks 'Sign In' to proceed.");
    } else {
      setIsLogin(true);
      setEmail("demouser");
      setPassword("Demo@123");
      onShowToast("Switched to Login & Filled Demo Credentials.");
    }
  };

  // Validators
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      if (!email.trim() || !password.trim()) {
        onShowToast("Please enter either username/email and password.");
        return;
      }

      // Check against Demo User or registered array
      const searchKey = email.trim().toLowerCase();
      
      // Let's check matching user
      let matchedUser: UserType | undefined = undefined;

      if (searchKey === "demouser" || searchKey === "demouser@gmail.com") {
        if (password === "Demo@123") {
          matchedUser = {
            id: "user-demo",
            fullName: "Demo Resident",
            email: "demouser@gmail.com",
            username: "demouser",
            phone: "+254712345678",
            ward: "Kasarani",
            joinDate: "June 2026",
            avatarColor: "bg-[#C5F135]",
            avatarInitials: "DR",
            skills: [],
            bookmarks: []
          };
        } else {
          onShowToast("Invalid password for demouser.");
          return;
        }
      } else {
        // Find in custom local registered users
        matchedUser = users.find(
          (u) =>
            (u.email.toLowerCase() === searchKey || u.username.toLowerCase() === searchKey) &&
            password === "Demo@123" // simplification or strict matches
        );

        if (!matchedUser) {
          // Check standard demo accounts fallback
          const standardUser = users.find(u => u.username.toLowerCase() === searchKey || u.email.toLowerCase() === searchKey);
          if (standardUser) {
            matchedUser = standardUser;
          } else {
            onShowToast("Account not found. Tip: Register a new account or use 'demouser'!");
            return;
          }
        }
      }

      if (matchedUser) {
        onSuccess(matchedUser);
        onShowToast(`Karibu tena, ${matchedUser.fullName}! 👋`);
        onClose();
      }
    } else {
      // Register Validations
      if (!fullName.trim() || !email.trim() || !username.trim() || !password.trim() || !phone.trim() || !ward) {
        onShowToast("All fields are required!");
        return;
      }

      if (!email.includes("@")) {
        onShowToast("Please enter a valid email address containing '@'!");
        return;
      }

      const existingEmail = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase()) || email.trim().toLowerCase() === "demouser@gmail.com";
      if (existingEmail) {
        onShowToast("An account with this email already exists!");
        return;
      }

      if (username.trim().length < 3) {
        onShowToast("Username must be at least 3 characters long!");
        return;
      }

      const existingUsername = users.some((u) => u.username.toLowerCase() === username.trim().toLowerCase()) || username.trim().toLowerCase() === "demouser";
      if (existingUsername) {
        onShowToast("Username is already taken. Try another one.");
        return;
      }

      if (password.length < 8) {
        onShowToast("Password must be at least 8 characters long!");
        return;
      }

      // Kenya phone validate: Begins with 07, 01, or +254
      const phoneClean = phone.trim();
      const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
      if (!phoneRegex.test(phoneClean)) {
        onShowToast("Phone number must match Kenyan format (+254... or 07... / 01...)");
        return;
      }

      if (!termsAccepted) {
        onShowToast("You must accept our Local Skill Sharing Terms & Conditions.");
        return;
      }

      // Create Initials
      const initials = fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "KV";

      const tailwindColors = [
        "bg-[#C5F135]", // Lime
        "bg-[#FF5C28]", // Orange
        "bg-[#3AAFFF]", // Sky
        "bg-[#8B5CF6]", // Purple
      ];
      const randomColor = tailwindColors[Math.floor(Math.random() * tailwindColors.length)];

      const newUser: UserType = {
        id: `user-${Date.now()}`,
        fullName: fullName.trim(),
        email: email.trim(),
        username: username.trim().toLowerCase(),
        phone: phoneClean,
        ward,
        joinDate: "June 2026",
        avatarColor: randomColor,
        avatarInitials: initials,
        skills: [],
        bookmarks: [],
        verified: true
      };

      onAddUser(newUser);
      onSuccess(newUser);
      onShowToast(`Safi! Account created! Welcome ${newUser.fullName} 🚀`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-card-dark rounded-3xl border border-border-dark overflow-hidden shadow-2xl relative"
      >
        {/* Header/Close */}
        <div className="p-6 pb-3 border-b border-border-dark flex items-center justify-between">
          <h3 className="font-display font-black text-xl uppercase tracking-tight text-white-pure">
            {isLogin ? "Resident Sign In" : "Register Cohort Profile"}
          </h3>
          <button
            onMouseDown={onClose}
            className="p-1 px-2.5 rounded-lg bg-bg-dark border border-border-dark text-text-muted hover:text-white-pure text-xs cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Demo Callout */}
        <div className="mx-6 mt-4 p-3.5 bg-lime-brand/10 rounded-xl border border-lime-brand/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-lime-brand uppercase tracking-wider font-bold">Quick Demo Access</div>
            <div className="text-xs text-white-pure/80 font-mono mt-0.5">demouser / Demo@123</div>
          </div>
          <button
            onClick={handleQuickDemoClick}
            type="button"
            className="px-3 py-1 rounded bg-lime-brand text-bg-dark font-display font-black text-[10px] uppercase cursor-pointer hover:opacity-90 active:scale-95 transition-transform"
          >
            Fill Key 🔑
          </button>
        </div>

        {/* Action Form */}
        <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5 font-bold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 text-text-muted" size={16} />
                  <input
                    id="register-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Kelvin Kamau"
                    className="w-full bg-bg-dark border border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-muted"
                  />
                </div>
              </div>

              {/* Grid 2-columns (Username & Ward) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-text-muted mb-1.5 font-bold">Username</label>
                  <div className="relative">
                    <input
                      id="register-username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="kamau_kev"
                      className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-muted"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-text-muted mb-1.5 font-bold">Ward Area</label>
                  <select
                    id="register-ward"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full bg-bg-dark border border-border-dark rounded-xl px-3 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand"
                  >
                    {WARDS.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-mono uppercase text-text-muted mb-1.5 font-bold">Phone Number (Kasarani contact)</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 text-text-muted" size={16} />
                  <input
                    id="register-phone"
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +254 712 345 678"
                    className="w-full bg-bg-dark border border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-muted"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email / username */}
          <div>
            <label className="block text-xs font-mono uppercase text-text-muted mb-1.5 font-bold">
              {isLogin ? "Email or Username" : "Email Address"}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-text-muted" size={16} />
              <input
                id="auth-email-username"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isLogin ? "demouser or email@example.com" : "e.g. kelvin@gmail.com"}
                className="w-full bg-bg-dark border border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-muted"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-mono uppercase text-text-muted mb-1.5 font-bold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-text-muted" size={16} />
              <input
                id="auth-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg-dark border border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-xs text-white-pure focus:outline-none focus:border-lime-brand placeholder-text-muted"
              />
            </div>
          </div>

          {/* Auth Extras Checkboxes */}
          {isLogin ? (
            <div className="flex items-center justify-between pt-1 select-none text-[11px] sm:text-xs text-text-muted font-mono font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="login-remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border-dark bg-bg-dark focus:ring-lime-brand text-lime-brand"
                />
                Remember Me
              </label>
              <span className="hover:text-white-pure hover:underline cursor-pointer">Forgot Password?</span>
            </div>
          ) : (
            <div className="pt-1 select-none text-[11px] sm:text-xs text-text-muted font-mono font-medium">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  id="register-terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded border-border-dark bg-bg-dark focus:ring-lime-brand text-lime-brand mt-0.5"
                />
                <span>
                  Accept Skill Mtaani <u>Terms & Conditions</u> allowing public sharing & ward connection tools.
                </span>
              </label>
            </div>
          )}

          {/* Form Actions */}
          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full py-3 rounded-xl bg-lime-brand hover:opacity-95 text-bg-dark font-display font-black uppercase text-xs tracking-wider inline-flex items-center justify-center gap-1 cursor-pointer transition-opacity shadow-md"
          >
            {isLogin ? "Sign In to Account 🚪" : "Complete Registration 🚀"}
          </button>

          {/* Toggle Tab link */}
          <div className="text-center pt-3 select-none">
            <span className="text-xs text-text-muted font-mono">
              {isLogin ? "New to Skill Mtaani? " : "Already have an account? "}
            </span>
            <button
              id="auth-toggle-tab-btn"
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                // clear some states
                setPassword("");
              }}
              className="text-xs font-display font-bold text-lime-brand hover:underline cursor-pointer uppercase tracking-wider ml-1"
            >
              {isLogin ? "Sign Up Free" : "Login Instead"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
