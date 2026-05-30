import React from "react";

export default function DecorativeDivider() {
  return (
    <div className="decorative-divider" aria-hidden="true">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-500 opacity-60"
      >
        {/* Fleur-de-lis stylized */}
        <path
          d="M14 2C14 2 12 6 12 8C12 10 13 11 14 12C15 11 16 10 16 8C16 6 14 2 14 2Z"
          fill="currentColor"
        />
        <path
          d="M14 26C14 26 12 22 12 20C12 18 13 17 14 16C15 17 16 18 16 20C16 22 14 26 14 26Z"
          fill="currentColor"
        />
        <path
          d="M2 14C2 14 6 12 8 12C10 12 11 13 12 14C11 15 10 16 8 16C6 16 2 14 2 14Z"
          fill="currentColor"
        />
        <path
          d="M26 14C26 14 22 12 20 12C18 12 17 13 16 14C17 15 18 16 20 16C22 16 26 14 26 14Z"
          fill="currentColor"
        />
        {/* Center cross */}
        <rect x="13" y="10" width="2" height="8" rx="1" fill="currentColor" />
        <rect x="10" y="13" width="8" height="2" rx="1" fill="currentColor" />
        {/* Corner dots */}
        <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="8" cy="20" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}

export function SmallCross() {
  return (
    <span className="inline-block mx-1 text-gold-500 opacity-50" aria-hidden="true">
      ✝
    </span>
  );
}
