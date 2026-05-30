import type { Metadata } from "next";
import { Source_Serif_4, Spectral, Inter } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-source-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spectral = Spectral({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-spectral",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Phương Pháp Chú Giải Kinh Thánh Của Các Giáo Phụ",
  description:
    "Nghiên cứu chuyên sâu về nền tảng thần học, cấu trúc thông diễn học và di sản lịch sử của khoa chú giải Kinh Thánh thời Giáo phụ: từ hệ thống PaRDeS đến Quadriga, từ Origen đến Augustine.",
  keywords: [
    "Giáo phụ",
    "Chú giải Kinh Thánh",
    "Patristic Exegesis",
    "Thần học Công giáo",
    "Quadriga",
    "Origen",
    "Augustine",
  ],
  openGraph: {
    title: "Phương Pháp Chú Giải Kinh Thánh Của Các Giáo Phụ",
    description: "Nghiên cứu chuyên sâu về nền tảng thần học, cấu trúc thông diễn học và di sản lịch sử của khoa chú giải Kinh Thánh thời Giáo phụ.",
    url: "https://giaophu-exegesis.vercel.app",
    siteName: "Chú giải Kinh Thánh Giáo Phụ",
    locale: "vi_VN",
    type: "article",
    authors: ["Ban Nghiên Cứu Thần Học Giáo Phụ"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phương Pháp Chú Giải Kinh Thánh Của Các Giáo Phụ",
    description: "Nghiên cứu chuyên sâu về nền tảng thần học, cấu trúc thông diễn học và di sản lịch sử của khoa chú giải Kinh Thánh thời Giáo phụ.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import ReadingProgress from "@/components/ReadingProgress";
import ReadingSettings from "@/components/ReadingSettings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${sourceSerif.variable} ${spectral.variable} ${inter.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', savedTheme);
                  const savedFontSize = localStorage.getItem('fontSize') || '17';
                  document.documentElement.style.fontSize = savedFontSize + 'px';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-source-serif antialiased bg-cream-50 text-gray-800 transition-colors duration-300">
        <ReadingProgress />
        <ReadingSettings />
        {children}
      </body>
    </html>
  );
}
