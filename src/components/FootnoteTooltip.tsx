"use client";

import { useState } from "react";
import { Info } from "lucide-react";

interface FootnoteTooltipProps {
  id: string;
  text: string;
}

export default function FootnoteTooltip({ id, text }: FootnoteTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <sup className="footnote-ref cursor-help mx-0.5">
        [{id}]
      </sup>
      
      {isOpen && (
        <div className="absolute z-[100] bottom-full left-1/2 -translate-x-1/2 mb-2 w-[85vw] sm:w-80 max-w-xs sm:max-w-md p-3 bg-cream-100 border border-cream-200 rounded-lg shadow-xl text-sm font-source-serif text-gray-800 text-left normal-case leading-snug">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cream-100 border-b border-r border-cream-200 transform rotate-45" />
          <div className="relative flex items-start gap-2 z-10">
            <Info size={16} className="text-burgundy-700 mt-0.5 flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-burgundy-700 hover:underline break-all">$1</a>') }} />
          </div>
        </div>
      )}
    </span>
  );
}
