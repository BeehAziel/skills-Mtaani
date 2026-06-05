/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Heart, Share2, Send, Flame } from "lucide-react";
import { CommunityPost, User } from "../types";

interface CommunityWallProps {
  posts: CommunityPost[];
  currentUser: User | null;
  onAddPost: (content: string) => void;
  onToggleLike: (postId: string) => void;
  onShowToast: (message: string) => void;
  onOpenLogin: () => void;
}

export default function CommunityWall({
  posts,
  currentUser,
  onAddPost,
  onToggleLike,
  onShowToast,
  onOpenLogin,
}: CommunityWallProps) {
  const [newPostText, setNewPostText] = useState("");
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [postReplies, setPostReplies] = useState<Record<string, { author: string; content: string; date: string }[]>>({
    "post-1": [
      { author: "George M.", content: "Awesome! Web dev is high in demand right now, hope to attend next week.", date: "1 hour ago" },
      { author: "Kev Design", content: "That cohort was epic, great job Alex!", date: "30 mins ago" }
    ],
    "post-2": [
      { author: "Purity W.", content: "Are slots still open Mama? I just sent a chat.", date: "4 hours ago" }
    ]
  });

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    if (!currentUser) {
      onShowToast("Please log in to share a community post!");
      onOpenLogin();
      return;
    }

    onAddPost(newPostText);
    setNewPostText("");
    onShowToast("Announcement posted successfully! 🚀");
  };

  const handleShareClick = (post: CommunityPost) => {
    const textToCopy = `"${post.content}" - shared by ${post.userName} on Skill Mtaani.`;
    navigator.clipboard.writeText(textToCopy);
    onShowToast("Post text copied to clipboard! Share it with friends.");
  };

  const handleSendReply = (postId: string) => {
    if (!replyText.trim()) return;
    if (!currentUser) {
      onShowToast("Please log in to post a reply!");
      onOpenLogin();
      return;
    }

    const currentReplies = postReplies[postId] || [];
    setPostReplies({
      ...postReplies,
      [postId]: [
        ...currentReplies,
        {
          author: currentUser.fullName,
          content: replyText,
          date: "Just now"
        }
      ]
    });

    setReplyText("");
    setReplyingToId(null);
    onShowToast("Reply added to discussion!");
  };

  return (
    <section className="py-12 relative">
      <div className="absolute top-[20%] right-[0%] w-[300px] h-[300px] bg-orange-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-dark">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-brand/10 border border-orange-brand/20 text-xs font-mono text-orange-brand uppercase tracking-wider mb-2">
              <Flame size={12} fill="currentColor" /> Live Feed
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white-pure uppercase tracking-tight">
              Community Wall
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Ask questions, join cohorts, see who's offering free workshops, and connect with other Kasarani youth.
            </p>
          </div>
        </div>

        {/* Post Composition Form */}
        <div className="bg-card-dark p-5 rounded-2xl border border-border-dark mb-8 shadow-xl">
          <form onSubmit={handleComposeSubmit}>
            <div className="flex gap-4">
              {/* User Avatar */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm text-bg-dark shrink-0 ${
                currentUser ? currentUser.avatarColor : "bg-[#252525] text-text-muted"
              }`}>
                {currentUser ? currentUser.avatarInitials : "👤"}
              </div>

              <div className="flex-1">
                <textarea
                  id="community-compose-textarea"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder={
                    currentUser
                      ? `What's happening in your neighborhood today, ${currentUser.fullName}?`
                      : "Login to share a community update or ask a skill sharing question..."
                  }
                  className="w-full bg-bg-dark border border-border-dark rounded-xl p-3.5 text-sm text-white-pure placeholder-text-muted focus:outline-none focus:border-orange-brand transition-all duration-300 resize-none h-24"
                />

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] font-mono text-text-muted">
                    {newPostText.length} characters
                  </span>

                  <button
                    id="community-post-submit-btn"
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-brand hover:bg-orange-brand/90 text-white-pure font-display font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Post Update <Send size={12} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Communities Feed Container */}
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {posts.map((post) => {
              const repliesList = postReplies[post.id] || [];

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card-dark p-5 rounded-2xl border border-border-dark shadow-md"
                >
                  {/* Top Bar: User details */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-display font-black text-xs text-bg-dark ${post.userAvatarColor}`}>
                        {post.userAvatarInitials}
                      </div>
                      <div>
                        <h4 className="text-white-pure text-sm font-display font-bold">
                          {post.userName}
                        </h4>
                        <span className="text-[10px] font-mono text-text-muted">
                          {post.timestamp}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded bg-bg-dark border border-border-dark text-[10px] font-mono text-orange-brand uppercase tracking-wider">
                      ★ Active Resident
                    </span>
                  </div>

                  {/* Body Text */}
                  <p className="mt-4 text-xs sm:text-sm text-white-pure/90 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                    {post.content}
                  </p>

                  {/* Interactive Button Group */}
                  <div className="flex items-center gap-6 mt-5 pt-3.5 border-t border-border-dark/60 select-none">
                    <button
                      id={`like-btn-${post.id}`}
                      onClick={() => onToggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                        post.likedByUser ? "text-orange-brand" : "text-text-muted hover:text-white-pure"
                      }`}
                    >
                      <Heart size={14} fill={post.likedByUser ? "currentColor" : "none"} className={post.likedByUser ? "scale-110" : ""} />
                      <span>{post.likes} Likes</span>
                    </button>

                    <button
                      id={`reply-btn-${post.id}`}
                      onClick={() => {
                        setReplyingToId(replyingToId === post.id ? null : post.id);
                        setReplyText("");
                      }}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-text-muted hover:text-white-pure cursor-pointer transition-colors"
                    >
                      <MessageSquare size={14} />
                      <span>{repliesList.length + post.replies} Replies</span>
                    </button>

                    <button
                      id={`share-btn-${post.id}`}
                      onClick={() => handleShareClick(post)}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-text-muted hover:text-white-pure cursor-pointer ml-auto transition-colors"
                      title="Copy sharing link"
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Replies Block */}
                  {repliesList.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border-dark/30 space-y-3 pl-6">
                      {repliesList.map((rep, idx) => (
                        <div key={idx} className="bg-bg-dark/50 p-3 rounded-xl border border-border-dark/40 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-display font-bold text-white-pure">{rep.author}</span>
                            <span className="text-[9px] font-mono text-text-muted">{rep.date}</span>
                          </div>
                          <p className="text-text-muted font-medium font-sans">{rep.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Expandable Compose-Reply Field */}
                  <AnimatePresence>
                    {replyingToId === post.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-border-dark/30"
                      >
                        <div className="flex gap-2">
                          <input
                            id={`reply-input-${post.id}`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type your reply here..."
                            type="text"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSendReply(post.id);
                            }}
                            className="flex-1 bg-bg-dark border border-border-dark rounded-xl px-4 py-2 text-xs text-white-pure placeholder-text-muted focus:outline-none focus:border-orange-brand"
                          />
                          <button
                            id={`reply-submit-btn-${post.id}`}
                            onClick={() => handleSendReply(post.id)}
                            className="bg-orange-brand hover:bg-orange-brand/90 px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-white-pure cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
