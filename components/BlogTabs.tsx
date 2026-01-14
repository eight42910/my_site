"use client";

import { useState } from "react";
import BlogRow from "./BlogRow";
import type { Post } from "../lib/content";

const tabs = [
  { id: "ai", label: "Logic (AI/Tech)", accent: "text-accentTech", vibe: "font-mono" },
  { id: "wine", label: "Sensibility (Wine)", accent: "text-accentWine", vibe: "font-serif" }
] as const;

export default function BlogTabs({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("ai");
  const filtered = posts.filter((post) => post.category === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors sm:text-xs ${
              active === tab.id
                ? `border-fg ${tab.accent} bg-fg/5`
                : "border-transparent text-muted hover:border-border hover:text-fg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={`mt-10 ${tabs.find((tab) => tab.id === active)?.vibe ?? ""}`}>
        {filtered.map((post) => (
          <BlogRow
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            readingMinutes={post.readingMinutes}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
}
