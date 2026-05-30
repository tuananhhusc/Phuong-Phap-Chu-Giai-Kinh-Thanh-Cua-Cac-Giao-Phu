"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-btn ${visible ? "visible" : ""}`}
      aria-label="Cuộn lên đầu trang"
      id="scroll-to-top"
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
}
