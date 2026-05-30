"use client";

import { useState, useEffect } from "react";
import { Facebook, Twitter, Link as LinkIcon, Check, Share2 } from "lucide-react";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && !!navigator.share) {
      setIsShareSupported(true);
    }
  }, []);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "https://giaophu-exegesis.vercel.app";
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "width=600,height=400");
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent("Phương Pháp Chú Giải Kinh Thánh Của Các Giáo Phụ - Nghiên cứu thần học chuyên sâu");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Phương Pháp Chú Giải Kinh Thánh Của Các Giáo Phụ",
          text: "Nghiên cứu chuyên sâu về nền tảng thần học và di sản chú giải thời Giáo phụ.",
          url: getShareUrl(),
        });
      } catch (err) {
        console.log("Web Share cancelled or failed:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-6">
      <span className="font-spectral font-semibold text-burgundy-900 text-lg">
        Chia sẻ bài viết này
      </span>
      <div className="flex items-center gap-3">
        {/* Native Mobile Share Button */}
        {isShareSupported && (
          <button
            onClick={handleNativeShare}
            className="sm:hidden flex items-center gap-2 py-2 px-4 rounded-full bg-cream-100 text-burgundy-700 hover:bg-burgundy-700 hover:text-cream-50 transition-colors border border-cream-200 hover:border-burgundy-700 text-sm font-medium"
            title="Chia sẻ nhanh"
          >
            <Share2 size={16} />
            Chia sẻ
          </button>
        )}

        <button
          onClick={handleShareFacebook}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-cream-100 text-burgundy-700 hover:bg-burgundy-700 hover:text-cream-50 transition-colors border border-cream-200 hover:border-burgundy-700"
          title="Chia sẻ qua Facebook"
        >
          <Facebook size={18} />
        </button>
        <button
          onClick={handleShareTwitter}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-cream-100 text-burgundy-700 hover:bg-burgundy-700 hover:text-cream-50 transition-colors border border-cream-200 hover:border-burgundy-700"
          title="Chia sẻ qua X (Twitter)"
        >
          <Twitter size={18} />
        </button>
        <button
          onClick={handleCopyLink}
          className="relative w-10 h-10 flex items-center justify-center rounded-full bg-cream-100 text-burgundy-700 hover:bg-burgundy-700 hover:text-cream-50 transition-colors border border-cream-200 hover:border-burgundy-700"
          title="Copy đường dẫn"
        >
          {copied ? <Check size={18} className="text-green-600 animate-fade-in" /> : <LinkIcon size={18} />}
          
          {copied && (
            <span 
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-cream-100 border border-cream-200 text-xs text-burgundy-700 rounded shadow-md whitespace-nowrap animate-fade-in font-medium" 
              style={{ animationDuration: '0.15s' }}
            >
              Đã chép link!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
