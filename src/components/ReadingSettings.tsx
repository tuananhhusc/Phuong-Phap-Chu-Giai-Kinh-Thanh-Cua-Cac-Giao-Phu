"use client";

import { useState, useEffect, useRef } from "react";
import { Settings2, Type, Sun, Moon, Coffee } from "lucide-react";

export default function ReadingSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(17);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedFontSize = Number(localStorage.getItem("fontSize")) || 17;
    
    setTheme(savedTheme);
    setFontSize(savedFontSize);
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.style.fontSize = `${savedFontSize}px`;

    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(14, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    localStorage.setItem("fontSize", newSize.toString());
    document.documentElement.style.fontSize = `${newSize}px`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 print:hidden" ref={menuRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-cream-100 text-burgundy-700 rounded-full shadow-lg flex items-center justify-center hover:bg-burgundy-700 hover:text-cream-50 transition-all duration-300 border border-cream-200"
        aria-label="Cài đặt giao diện đọc"
        title="Cài đặt giao diện đọc"
      >
        <Settings2 size={20} />
      </button>

      {/* Settings Menu */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-64 bg-cream-100 rounded-xl shadow-2xl border border-cream-200 p-5 font-inter text-gray-800 animate-fade-in" style={{ animationDuration: "0.2s" }}>
          <h3 className="text-sm font-semibold text-burgundy-700 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Settings2 size={16} /> Tùy chỉnh đọc
          </h3>

          {/* Theme Selector */}
          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-2 font-medium">Giao diện (Theme)</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleThemeChange("light")}
                className={`flex-1 py-2 px-1 rounded flex flex-col items-center gap-1 border transition-colors ${theme === "light" ? "border-burgundy-700 bg-cream-50 text-burgundy-700" : "border-cream-200 hover:text-burgundy-700 text-gray-600 bg-cream-100"}`}
                title="Sáng"
              >
                <Sun size={18} />
              </button>
              <button
                onClick={() => handleThemeChange("sepia")}
                className={`flex-1 py-2 px-1 rounded flex flex-col items-center gap-1 border transition-colors ${theme === "sepia" ? "border-burgundy-700 bg-cream-50 text-burgundy-700" : "border-cream-200 hover:text-burgundy-700 text-gray-600 bg-cream-100"}`}
                title="Sepia"
              >
                <Coffee size={18} />
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`flex-1 py-2 px-1 rounded flex flex-col items-center gap-1 border transition-colors ${theme === "dark" ? "border-burgundy-700 bg-cream-50 text-burgundy-700" : "border-cream-200 hover:text-burgundy-700 text-gray-600 bg-cream-100"}`}
                title="Tối"
              >
                <Moon size={18} />
              </button>
            </div>
          </div>

          {/* Font Size Selector */}
          <div>
            <p className="text-xs text-gray-500 mb-2 font-medium">Cỡ chữ (Font Size)</p>
            <div className="flex items-center justify-between border border-cream-200 rounded p-1">
              <button
                onClick={() => handleFontSizeChange(-1)}
                className="w-10 h-8 flex items-center justify-center hover:bg-cream-50 rounded text-gray-600 transition-colors"
                disabled={fontSize <= 14}
              >
                <Type size={14} />
              </button>
              <span className="text-sm font-semibold w-12 text-center text-gray-800">{fontSize}px</span>
              <button
                onClick={() => handleFontSizeChange(1)}
                className="w-10 h-8 flex items-center justify-center hover:bg-cream-50 rounded text-gray-600 transition-colors"
                disabled={fontSize >= 24}
              >
                <Type size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
