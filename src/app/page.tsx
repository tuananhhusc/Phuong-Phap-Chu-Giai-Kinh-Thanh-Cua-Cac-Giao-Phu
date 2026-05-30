import { getArticleContent } from "@/lib/content";
import { extractTOC, getReadingTime, extractFootnotes } from "@/lib/utils";
import ArticleRenderer from "@/components/ArticleRenderer";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { BookOpen, Clock } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

export default function Home() {
  const content = getArticleContent();
  const tocItems = extractTOC(content);
  const readingTime = getReadingTime(content);
  const footnotes = extractFootnotes(content);

  return (
    <>
      {/* ═══════════ HERO HEADER ═══════════ */}
      <header className="relative overflow-hidden bg-gradient-to-b from-cream-200 via-cream-100 to-cream-50">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%237B2D3B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Ornamental frame */}
          <div className="ornamental-border ornamental-border-bottom text-center">
            {/* Top decorative element */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="block w-12 h-px bg-gold-500" />
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-gold-500"
              >
                <path
                  d="M10 0L12.5 7.5H20L14 12L16 20L10 15L4 20L6 12L0 7.5H7.5L10 0Z"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
              <span className="block w-12 h-px bg-gold-500" />
            </div>

            {/* Meta Info: Category & Reading Time */}
            <div className="animate-fade-in flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6 text-xs font-inter uppercase tracking-[0.15em] text-burgundy-600">
              <span className="inline-flex items-center gap-2">
                <BookOpen size={14} strokeWidth={1.5} />
                Nghiên cứu Thần học
              </span>
              <span className="hidden md:inline-block text-gold-500 opacity-50">|</span>
              <span className="inline-flex items-center gap-2 text-gray-500">
                <Clock size={14} strokeWidth={1.5} />
                Thời gian đọc: ~{readingTime} phút
              </span>
            </div>

            {/* Title */}
            <h1 className="animate-fade-in font-spectral text-3xl md:text-4xl lg:text-[2.7rem] font-bold text-burgundy-900 leading-tight tracking-wide mb-6">
              Phương Pháp Chú Giải Kinh Thánh
              <br />
              <span className="text-burgundy-700">Của Các Giáo Phụ</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-delay font-source-serif text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
              Nền Tảng Thần Học, Cấu Trúc Thông Diễn Học
              <br className="hidden sm:block" />
              Và Di Sản Lịch Sử
            </p>

            {/* Bottom decorative element */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="block w-16 h-px bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-500 text-lg">✝</span>
              <span className="block w-16 h-px bg-gradient-to-l from-transparent to-gold-500" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cream-50 to-transparent" />
      </header>

      {/* ═══════════ MAIN CONTENT WITH LEFT TOC ═══════════ */}
      <main className="academic-layout" id="main-content">
        <div className="academic-layout-inner">
          {/* LEFT TOC Sidebar Column */}
          <aside className="toc-sidebar-column" id="toc-sidebar">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Article Column */}
          <div className="article-column">
            <ArticleRenderer content={content} footnotes={footnotes} />

            {/* Share Buttons */}
            <ShareButtons />

            {/* Footer ornament */}
            <div className="flex items-center justify-center gap-4 mt-16 mb-8">
              <span className="block w-20 h-px bg-gradient-to-r from-transparent to-gold-300" />
              <span className="text-gold-400 text-2xl">⁕</span>
              <span className="text-burgundy-300 text-xl">✝</span>
              <span className="text-gold-400 text-2xl">⁕</span>
              <span className="block w-20 h-px bg-gradient-to-l from-transparent to-gold-300" />
            </div>

            <p className="text-center text-sm text-gray-400 font-source-serif italic mb-8">
              Ad Majorem Dei Gloriam
            </p>
          </div>
        </div>
      </main>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-cream-200 bg-cream-100">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="font-spectral text-sm text-gray-500">
            Nghiên cứu Khoa Chú Giải Kinh Thánh Giáo Phụ
          </p>
          <p className="text-xs text-gray-400 mt-2 font-source-serif">
            Patristic Biblical Exegesis: Nền tảng Thần học &amp; Di sản Lịch sử
          </p>
        </div>
      </footer>

      <ScrollToTop />
    </>
  );
}
