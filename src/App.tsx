/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Plus, 
  Menu, 
  X, 
  ChevronUp, 
  GraduationCap, 
  MessageSquare, 
  BookOpen 
} from "lucide-react";

import { Skill, Mentor, User, CommunityPost } from "./types";
import { INITIAL_SKILLS, INITIAL_POSTS, WARDS } from "./data";

// Extracted Sub-Components
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import SkillCard from "./components/SkillCard";
import MentorSection from "./components/MentorSection";
import CommunityWall from "./components/CommunityWall";
import AuthModal from "./components/AuthModal";
import SkillDetailModal from "./components/SkillDetailModal";
import SkillFormModal from "./components/SkillFormModal";
import ProfileDropdown from "./components/ProfileDropdown";

export default function App() {
  // --- STATE ---
  const [skills, setSkills] = useState<Skill[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string>("All Wards");

  // Navigations / Active sections
  const [activeTab, setActiveTab] = useState<"skills" | "mentors" | "community">("skills");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals Toggles
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [detailModalSkill, setDetailModalSkill] = useState<Skill | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Edit State
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Scroll to Top indicators
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  // Refs
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const mentorsSectionRef = useRef<HTMLDivElement>(null);
  const communitySectionRef = useRef<HTMLDivElement>(null);

  // --- INITIALIZATION ---
  useEffect(() => {
    // Skills loading
    const localSkills = localStorage.getItem("skillmtaani_skills");
    if (localSkills) {
      setSkills(JSON.parse(localSkills));
    } else {
      setSkills(INITIAL_SKILLS);
      localStorage.setItem("skillmtaani_skills", JSON.stringify(INITIAL_SKILLS));
    }

    // Comms Loading
    const localPosts = localStorage.getItem("skillmtaani_posts");
    if (localPosts) {
      setPosts(JSON.parse(localPosts));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem("skillmtaani_posts", JSON.stringify(INITIAL_POSTS));
    }

    // Registered users loading
    const localUsers = localStorage.getItem("skillmtaani_users");
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      const demoUsers: User[] = [
        {
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
        }
      ];
      setUsers(demoUsers);
      localStorage.setItem("skillmtaani_users", JSON.stringify(demoUsers));
    }

    // Active session loading
    const activeSession = localStorage.getItem("skillmtaani_session");
    if (activeSession) {
      setCurrentUser(JSON.parse(activeSession));
    }

    // Scroll tracker
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- TOAST NOTIFIER HELPER ---
  const handleShowToast = (message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // --- LOCAL PERSISTENCE SYNCERS ---
  const syncSkills = (updatedSkills: Skill[]) => {
    setSkills(updatedSkills);
    localStorage.setItem("skillmtaani_skills", JSON.stringify(updatedSkills));
  };

  const syncPosts = (updatedPosts: CommunityPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("skillmtaani_posts", JSON.stringify(updatedPosts));
  };

  const syncUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    localStorage.setItem("skillmtaani_users", JSON.stringify(updatedUsers));
  };

  // --- HANDLERS ---

  // Auth Operations
  const handleUserAdd = (newUser: User) => {
    const updated = [...users, newUser];
    syncUsers(updated);
  };

  const handleAuthSuccess = (userToLog: User) => {
    setCurrentUser(userToLog);
    localStorage.setItem("skillmtaani_session", JSON.stringify(userToLog));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("skillmtaani_session");
    setProfileOpen(false);
    handleShowToast("Kwaheri! Logged out successfully.");
  };

  // Filter clearers
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedWard("All Wards");
    handleShowToast("All search and category filters cleared.");
  };

  // Compose Community Announcers
  const handleAddCommunityPost = (content: string) => {
    if (!currentUser) return;
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userAvatarInitials: currentUser.avatarInitials,
      userAvatarColor: currentUser.avatarColor,
      content,
      timestamp: "Just now",
      likes: 0,
      replies: 0,
      shares: 0,
      likedByUser: false,
    };
    const updated = [newPost, ...posts];
    syncPosts(updated);
  };

  // Connect & Like announcements
  const handleToggleLike = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const liked = !post.likedByUser;
        return {
          ...post,
          likedByUser: liked,
          likes: liked ? post.likes + 1 : Math.max(0, post.likes - 1)
        };
      }
      return post;
    });
    syncPosts(updated);
  };

  // Post Skill (Submit new or edit existing)
  const handlePostSkillSubmit = (formData: Omit<Skill, "id" | "rating" | "reviewsCount" | "emoji"> & { id?: string }) => {
    // Find category emoji lookup helper
    import("./data").then((data) => {
      const catObj = data.CATEGORIES.find((c) => c.value === formData.category);
      const chosenEmoji = catObj ? catObj.emoji : "💼";

      // Color stripes lookup
      const possibleColors = ["Lime", "Orange", "Sky Blue", "Purple"];
      const randomStripe = possibleColors[Math.floor(Math.random() * possibleColors.length)];

      if (formData.id) {
        // --- EDITING EXISTING SKILL ---
        const updated = skills.map((sk) => {
          if (sk.id === formData.id) {
            return {
              ...sk,
              ...formData,
              emoji: chosenEmoji,
            } as Skill;
          }
          return sk;
        });

        syncSkills(updated);
        handleShowToast(`"${formData.name}" revised successfully!`);
        
        // revise corresponding community announcement content
        const announceUpdate = posts.map((p) => {
          if (p.content.includes(`(Skill ID: ${formData.id})`) || p.content.includes(`"${skNameOriginal(formData.id)}"`)) {
            return {
              ...p,
              content: `✏️ CLASS REVISION: I've updated the info for my skill-sharing program "${formData.name}" in ${formData.ward}! Details updated on the skills dashboard. KSh ${formData.price.toLocaleString()}`
            };
          }
          return p;
        });
        syncPosts(announceUpdate);
      } else {
        // --- CREATING NEW SKILL ---
        const newSk: Skill = {
          id: `skill-${Date.now()}`,
          name: formData.name,
          instructor: formData.instructor,
          ward: formData.ward,
          location: formData.location,
          category: formData.category,
          description: formData.description,
          phone: formData.phone,
          price: formData.price,
          rating: 4.5 + Math.random() * 0.5, // dynamic star placeholder
          reviewsCount: Math.floor(Math.random() * 3) + 1,
          emoji: chosenEmoji,
          availability: formData.availability,
          instructorId: currentUser?.id,
          stripeColor: randomStripe,
          verifiedInstructor: formData.verifiedInstructor,
          verificationProof: formData.verificationProof
        };

        const updated = [newSk, ...skills];
        syncSkills(updated);

        // Also update corresponding user profile lists
        if (currentUser) {
          const userUpdatedSkills = [...(currentUser.skills || []), newSk.id];
          const revisedUser = { ...currentUser, skills: userUpdatedSkills };
          setCurrentUser(revisedUser);
          localStorage.setItem("skillmtaani_session", JSON.stringify(revisedUser));
          
          // update user in registered array
          const revisedUsersList = users.map(u => u.id === currentUser.id ? revisedUser : u);
          syncUsers(revisedUsersList);
        }

        handleShowToast(`Hongera! Successfully posted "${formData.name}" to Kasarani 🚀`);

        // AUTO-CREATE COMMUNITY POST
        const autoComm: CommunityPost = {
          id: `post-auto-${Date.now()}`,
          userId: currentUser?.id || "guest-instructor",
          userName: formData.instructor,
          userAvatarInitials: currentUser?.avatarInitials || "KI",
          userAvatarColor: currentUser?.avatarColor || "bg-[#FF5C28]",
          content: `🌟 NEW SKILL POSTED: "I've just advertised my local workshop ${formData.name} in ${formData.ward} Ward. Perfect for youth wanting to pick up new trade projects. Let's grow together! KSh ${formData.price}"`,
          timestamp: "Just now",
          likes: 2,
          replies: 0,
          shares: 0,
          likedByUser: false,
        };
        const updatedPosts = [autoComm, ...posts];
        syncPosts(updatedPosts);
      }

      setEditingSkill(null);
    });
  };

  const skNameOriginal = (id: string | undefined): string => {
    if (!id) return "";
    const skRef = skills.find(s => s.id === id);
    return skRef ? skRef.name : "";
  };

  // Delete Skill handler
  const handleDeleteSkill = (skillId: string) => {
    const updated = skills.filter((sk) => sk.id !== skillId);
    syncSkills(updated);
    
    // update current user lists
    if (currentUser) {
      const skillsLeft = (currentUser.skills || []).filter(id => id !== skillId);
      const revisedUser = { ...currentUser, skills: skillsLeft };
      setCurrentUser(revisedUser);
      localStorage.setItem("skillmtaani_session", JSON.stringify(revisedUser));
      
      const revisedUsersList = users.map(u => u.id === currentUser.id ? revisedUser : u);
      syncUsers(revisedUsersList);
    }

    handleShowToast("Skill sharing advertisement deleted successfully.");
  };

  const handleEditSkillTrigger = (skillToEdit: Skill) => {
    setEditingSkill(skillToEdit);
    setProfileOpen(false); // Close profile modal
    setFormModalOpen(true); // Open posting form
  };

  // Scroll to targeted section
  const handleScrollToSection = (ref: React.RefObject<HTMLDivElement | null>, tabName: "skills" | "mentors" | "community") => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handlePostSkillBtnClick = () => {
    if (!currentUser) {
      handleShowToast("Please sign in or register to publish a skill!");
      setAuthModalOpen(true);
    } else {
      setEditingSkill(null);
      setFormModalOpen(true);
    }
  };

  const handleAvatarClick = () => {
    if (!currentUser) {
      setAuthModalOpen(true);
    } else {
      setProfileOpen(true);
    }
  };

  const handleScrollToTopAction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FILTERED SKILLS MATHS ---
  const filteredSkills = skills.filter((sk) => {
    const matchesSearch =
      sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sk.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? sk.category === selectedCategory : true;
    const matchesWard = selectedWard === "All Wards" ? true : sk.ward === selectedWard;

    return matchesSearch && matchesCategory && matchesWard;
  });

  return (
    <div className="min-h-screen bg-bg-dark text-white-pure selection:bg-lime-brand/35 selection:text-white-pure">
      
      {/* 1. COMPACT FIXED FLOATING HEADER & NAV */}
      <header className="sticky top-0 z-40 bg-card-dark/80 backdrop-blur-md border-b border-border-dark py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={handleScrollToTopAction}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-lime-brand text-bg-dark font-display font-black text-xl flex items-center justify-center shrink-0">
              S
            </div>
            <span className="font-display font-black text-lg uppercase tracking-tight text-white-pure">
              Skill<span className="text-lime-brand group-hover:text-amber-300 transition-colors">Mtaani</span>
            </span>
          </div>

          {/* DESKTOP INTEGRATED NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-display font-bold uppercase tracking-wider text-text-muted">
            <button
              onClick={() => handleScrollToSection(skillsSectionRef, "skills")}
              className={`hover:text-white-pure transition-colors cursor-pointer ${activeTab === "skills" ? "text-lime-brand font-black" : ""}`}
            >
              Classes
            </button>
            <button
              onClick={() => handleScrollToSection(mentorsSectionRef, "mentors")}
              className={`hover:text-white-pure transition-colors cursor-pointer ${activeTab === "mentors" ? "text-purple-brand font-black" : ""}`}
            >
              Mentors
            </button>
            <button
              onClick={() => handleScrollToSection(communitySectionRef, "community")}
              className={`hover:text-white-pure transition-colors cursor-pointer ${activeTab === "community" ? "text-orange-brand font-black" : ""}`}
            >
              Community Wall
            </button>
          </nav>

          {/* RIGHT ACTION DOCK */}
          <div className="flex items-center gap-3">
            <button
              id="header-post-skill-btn"
              onClick={handlePostSkillBtnClick}
              className="hidden sm:inline-flex px-4.5 py-2 rounded-xl bg-lime-brand hover:opacity-90 text-bg-dark font-display font-black text-xs uppercase tracking-wider items-center gap-1.5 cursor-pointer transition-all active:scale-95 shadow-md"
            >
              <Plus size={14} /> Post Skill
            </button>

            {/* Profile Menu Trigger Initials Avatar */}
            <button
              id="auth-profile-trigger-btn"
              onMouseDown={handleAvatarClick}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm text-bg-dark cursor-pointer transition-all border border-white-pure/5 hover:border-lime-brand shadow ${
                currentUser ? currentUser.avatarColor : "bg-[#202020] text-text-muted"
              }`}
              title={currentUser ? `Profile: ${currentUser.fullName}` : "Login or Register on Skill Mtaani"}
            >
              {currentUser ? currentUser.avatarInitials : "👤"}
            </button>

            {/* Hamburger Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-border-dark text-text-muted hover:text-white-pure hover:bg-card-dark transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAVIGATION SIDEBAR EXPANSION */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-border-dark space-y-3.5"
            >
              <div className="flex flex-col gap-3 font-display font-black text-sm uppercase tracking-wider">
                <button
                  onClick={() => handleScrollToSection(skillsSectionRef, "skills")}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#151515] hover:text-lime-brand"
                >
                  📚 Skill Classes
                </button>
                <button
                  onClick={() => handleScrollToSection(mentorsSectionRef, "mentors")}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#151515] hover:text-purple-brand"
                >
                  🎓 Senior Mentors
                </button>
                <button
                  onClick={() => handleScrollToSection(communitySectionRef, "community")}
                  className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#151515] hover:text-orange-brand"
                >
                  🔥 Community Wall Feed
                </button>
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handlePostSkillBtnClick();
                  }}
                  className="w-full text-center py-2.5 px-3 rounded-lg bg-lime-brand text-bg-dark font-black"
                >
                  + Post Skill Advertisement
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. MAIN APP CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden">
        
        {/* Dynamic ambient header tag banner */}
        <Hero 
          totalSkills={skills.length}
          onPostClick={handlePostSkillBtnClick}
          onExploreClick={() => skillsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        />

        {/* 3. EXPERT SKILLS INTEGRATED DASHBOARD GRID */}
        <div 
          ref={skillsSectionRef} 
          className="pt-16 pb-12 ScrollTriggerSelector"
        >
          {/* Headings and Filtering controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-border-dark">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lime-brand/10 border border-lime-brand/20 text-xs font-mono text-lime-brand uppercase tracking-wider mb-2">
                <BookOpen size={12} /> Peer to Peer Exchange
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white-pure uppercase tracking-tight">
                Skill Workshops & Lessons
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                Connect with local tutors who have real commercial trade experience in Kasarani.
              </p>
            </div>

            {/* Dual Search & Ward Filtering Tools */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              
              {/* REAL-TIME TEXT SEARCH FIELD */}
              <div className="relative flex-1 sm:w-64 min-w-[200px]">
                <Search className="absolute left-3.5 top-3 text-text-muted" size={16} />
                <input
                  id="main-skills-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search classes, tutors, keywords..."
                  className="w-full bg-card-dark border border-border-dark rounded-xl pl-10 pr-4 py-2.5 text-xs text-white-pure placeholder-text-muted focus:outline-none focus:border-lime-brand transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3.5 text-[10px] uppercase font-mono text-text-muted hover:text-white-pure"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* WARD DROPDOWN CONTROL */}
              <div className="relative shrink-0 flex items-center bg-card-dark border border-border-dark rounded-xl px-3 py-1 text-xs font-mono text-white-pure">
                <MapPin size={12} className="text-orange-brand mr-2" />
                <select
                  id="main-ward-filter-select"
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="bg-transparent border-none py-1.5 focus:outline-none focus:ring-0 text-xs font-display font-extrabold uppercase text-white-pure cursor-pointer"
                >
                  <option value="All Wards">All Wards</option>
                  {WARDS.map((w) => (
                    <option key={w} value={w}>{w} Ward</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Interactive Category filter chips */}
          <Categories 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            skills={skills}
          />

          {/* SKILLS CARDS GRID DECK */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-text-muted">
              <span>Showing <strong>{filteredSkills.length}</strong> matching skill courses</span>
              {(selectedCategory || selectedWard !== "All Wards" || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-lime-brand hover:underline"
                >
                  Reset all filters
                </button>
              )}
            </div>

            {/* Conditional Empty layout */}
            {filteredSkills.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center bg-card-dark rounded-3xl border border-dashed border-border-dark flex flex-col items-center justify-center p-6 space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-orange-brand/10 text-orange-brand flex items-center justify-center font-display font-black text-xl">
                  ?
                </div>
                <div>
                  <h4 className="font-display font-black text-lg text-white-pure uppercase tracking-tight">No Workshops Found</h4>
                  <p className="text-xs text-text-muted mt-1 max-w-sm mx-auto">
                    We didn't find any lessons matching your exact search filters. Try clearing some queries or post one yourself!
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-xl bg-white-pure text-bg-dark font-display font-bold text-xs uppercase"
                >
                  Clear Search Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((sk, index) => (
                    <SkillCard 
                      key={sk.id}
                      skill={sk}
                      onLearnMore={setDetailModalSkill}
                      index={index}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* 4. SENIOR MENTORS SECTION BLOCK */}
        <div ref={mentorsSectionRef}>
          <MentorSection />
        </div>

        {/* 5. LIVE INTERACTIVE COMMUNITY WALL */}
        <div ref={communitySectionRef}>
          <CommunityWall 
            posts={posts}
            currentUser={currentUser}
            onAddPost={handleAddCommunityPost}
            onToggleLike={handleToggleLike}
            onShowToast={handleShowToast}
            onOpenLogin={() => setAuthModalOpen(true)}
          />
        </div>

      </main>

      {/* 6. PLATFORM FOOTER BANNER ACTIONS */}
      <footer className="border-t border-border-dark py-12 px-6 bg-card-dark text-center text-xs text-text-muted space-y-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-lime-brand text-bg-dark font-display font-black text-xs flex items-center justify-center">S</div>
            <span className="font-display font-black text-white-pure text-sm tracking-tight uppercase">Skill Mtaani Kasarani</span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-bold text-text-muted uppercase">
            <button onClick={() => handleScrollToSection(skillsSectionRef, "skills")} className="hover:text-white-pure">Classes</button>
            <button onClick={() => handleScrollToSection(mentorsSectionRef, "mentors")} className="hover:text-white-pure">Mentors</button>
            <button onClick={() => handleScrollToSection(communitySectionRef, "community")} className="hover:text-white-pure">Community Feed</button>
          </div>
        </div>

        <div className="pt-6 border-t border-border-dark/60 text-[10px] flex flex-col sm:flex-row justify-between text-left sm:text-center text-text-muted/60 max-w-7xl mx-auto gap-3">
          <span>&copy; {new Date().getFullYear()} Skill Mtaani Platform. Made with 💛 for youth in Clay City, Mwiki, Njiru, Ruai and Kasarani.</span>
          <span>"Learn. Teach. Grow Pamoja" 🌟</span>
        </div>
      </footer>

      {/* 7. FLOATING SCROLL TO TOP BOUNCING BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.15, transition: { yoyo: Infinity, duration: 0.4 } }}
            onClick={handleScrollToTopAction}
            className="fixed bottom-6 right-6 p-4 rounded-xl bg-lime-brand text-bg-dark hover:bg-white-pure border border-border-dark cursor-pointer shadow-2xl z-40 transition-colors"
            title="Scroll back to top"
          >
            <ChevronUp size={20} className="animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 8. SINGLE GLOBAL TOAST PORTAL */}
      <div className="fixed bottom-6 left-6 z-50 space-y-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-card-dark text-white-pure rounded-xl border border-border-dark shadow-2xl flex items-center gap-3.5 pointer-events-auto"
            >
              <div className="w-2.5 h-2.5 bg-lime-brand rounded-full animate-ping shrink-0" />
              <p className="text-xs font-mono font-medium leading-normal">{t.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- FLOATING MODALS MANAGERS --- */}

      {/* AUTHENTICATION LOGIN / REGISTER MODAL */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onShowToast={handleShowToast}
        users={users}
        onAddUser={handleUserAdd}
      />

      {/* FORM MODAL (POST SKILL / EDIT SKILL) */}
      <SkillFormModal 
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSubmit={handlePostSkillSubmit}
        onShowToast={handleShowToast}
        currentUser={currentUser}
        editingSkill={editingSkill}
      />

      {/* SKILL DETAIL MODAL popup */}
      <SkillDetailModal 
        skill={detailModalSkill}
        onClose={() => setDetailModalSkill(null)}
        onShowToast={handleShowToast}
        currentUser={currentUser}
      />

      {/* PROFILE DROPDOWN DASHBOARD SLIDERS */}
      <ProfileDropdown 
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        currentUser={currentUser}
        skills={skills}
        onLogout={handleLogout}
        onEditSkill={handleEditSkillTrigger}
        onDeleteSkill={handleDeleteSkill}
      />

    </div>
  );
}
