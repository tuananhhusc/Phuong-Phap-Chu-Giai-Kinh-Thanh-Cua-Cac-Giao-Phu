"use client";

import { useEffect, useState, useCallback } from "react";
import { List, X, BookOpen } from "lucide-react";
import type { TOCItem } from "@/lib/utils";

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active section via Intersection Observer
  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first entry that is intersecting from top
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
        setMobileOpen(false);
      }
    },
    []
  );

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Count h2-level items for numbering
  let h2Count = 0;
  const numberedItems = items.map((item) => {
    let cleanText = item.text;
    
    if (item.level === 2) {
      h2Count++;
      // Strip "1. " or "2. " from the beginning
      cleanText = item.text.replace(/^\d+\.\s+/, "");
      return { ...item, text: cleanText, number: h2Count };
    }
    
    if (item.level === 3) {
      // Strip "1.1. " or "2.3. " from the beginning
      cleanText = item.text.replace(/^\d+\.\d+\.\s+/, "");
      return { ...item, text: cleanText, number: undefined };
    }
    
    return { ...item, text: cleanText, number: undefined };
  });

  const tocContent = (
    <nav aria-label="Mục lục bài viết" className="toc-nav">
      {/* TOC Header */}
      <div className="toc-header">
        <div className="toc-header-icon">
          <BookOpen size={16} strokeWidth={1.5} />
        </div>
        <h2 className="toc-header-title">
          Mục Lục
        </h2>
      </div>

      {/* TOC Items */}
      <ul className="toc-list">
        {numberedItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className={`toc-link ${
                item.level === 3 ? "toc-link-h3" : "toc-link-h2"
              } ${activeId === item.id ? "active" : ""}`}
            >
              {item.level === 2 && (
                <span className="toc-number">{item.number}</span>
              )}
              <span className="toc-text">{item.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden xl:block toc-desktop-wrapper"
        id="toc-desktop"
      >
        {tocContent}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-20 right-6 z-50 w-12 h-12 bg-burgundy-700 text-cream-50 rounded-full shadow-lg flex items-center justify-center hover:bg-burgundy-800 transition-all duration-300 hover:scale-105"
        aria-label="Mở mục lục"
        id="toc-mobile-toggle"
      >
        <List size={20} />
      </button>

      {/* Mobile Overlay */}
      <div
        className={`toc-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer - Changed to left side */}
      <div
        className={`toc-drawer ${mobileOpen ? "open" : ""}`}
        id="toc-mobile-drawer"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-spectral font-bold text-burgundy-700 text-lg">
            Mục Lục
          </h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-burgundy-700 transition-colors"
            aria-label="Đóng mục lục"
          >
            <X size={20} />
          </button>
        </div>
        {tocContent}
      </div>
    </>
  );
}
