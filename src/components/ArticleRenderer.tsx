"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateSlug } from "@/lib/utils";
import DecorativeDivider from "./DecorativeDivider";
import FootnoteTooltip from "./FootnoteTooltip";

interface ArticleRendererProps {
  content: string;
  footnotes?: Record<string, string>;
}

export default function ArticleRenderer({ content, footnotes = {} }: ArticleRendererProps) {
  // Process the markdown: remove the first line (title handled in hero)
  // and convert numbered headings to proper markdown headings
  const processedContent = useMemo(() => {
    const lines = content.split("\n");
    const processed: string[] = [];
    let isFirstParagraph = true;
    let inTable = false;
    let tableLines: string[] = [];
    let skipFirstLine = true;

    let inReferences = false;

    for (let i = 0; i < lines.length; i++) {
      // Strip \r from Windows line endings before regex matching
      const line = lines[i].replace(/\r$/, "");

      // Skip the very first line (article title)
      if (skipFirstLine && i === 0) {
        continue;
      }

      // "Nguồn trích dẫn" as H2
      if (line.trim() === "Nguồn trích dẫn") {
        processed.push("## Nguồn trích dẫn");
        inReferences = true;
        continue;
      }

      // Detect section headings by number pattern and convert to markdown headings
      // Only do this if we are not in the references section
      if (!inReferences) {
        // H2: "1. Title", "2. Title", etc.
        const h2Match = line.match(
          /^(\d+)\.\s+((?:[A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ].*))$/
        );
        if (h2Match) {
          processed.push(`## ${line.trim()}`);
          continue;
        }

        // H3: "1.1. Title", "5.4. Title", etc.
        const h3Match = line.match(
          /^(\d+\.\d+)\.\s+((?:[A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ\"].*))$/
        );
        if (h3Match) {
          processed.push(`### ${line.trim()}`);
          continue;
        }

        // "Kết Luận" as H2
        if (line.trim() === "Kết Luận") {
          processed.push("## Kết Luận");
          continue;
        }
      }

      processed.push(line);
    }

    return processed.join("\n");
  }, [content]);

  return (
    <article className="prose prose-catholic prose-lg max-w-none article-academic" id="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => {
            const text = extractText(children);
            const id = generateSlug(text);
            return (
              <>
                <DecorativeDivider />
                <h2 id={id} className="article-heading-h2" {...props}>
                  {children}
                </h2>
              </>
            );
          },
          h3: ({ children, ...props }) => {
            const text = extractText(children);
            const id = generateSlug(text);
            return (
              <h3 id={id} className="article-heading-h3" {...props}>
                {children}
              </h3>
            );
          },
          p: ({ children, node, ...props }) => {
            // Process footnote superscripts in text
            const processedChildren = processFootnotes(children, footnotes);
            return <p className="leading-relaxed" {...props}>{processedChildren}</p>;
          },
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="article-blockquote"
              {...props}
            >
              {children}
            </blockquote>
          ),
          table: ({ children, ...props }) => (
            <div className="table-wrapper">
              <table
                className="w-full text-sm border-collapse"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="border-b-2 border-burgundy-700" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="font-spectral font-semibold text-burgundy-900 bg-cream-100 px-4 py-3 text-left text-sm"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => {
            const processedChildren = processFootnotes(children, footnotes);
            return (
              <td
                className="px-4 py-3 border-b border-cream-200 text-sm leading-relaxed"
                {...props}
              >
                {processedChildren}
              </td>
            );
          },
          a: ({ href, children, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-burgundy-700 underline decoration-burgundy-200 underline-offset-2 hover:text-burgundy-500 hover:decoration-burgundy-500 transition-colors"
              {...props}
            >
              {children}
            </a>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-gray-900" {...props}>
              {children}
            </strong>
          ),
          ul: ({ children, ...props }) => (
            <ul className="space-y-2 my-4" {...props}>
              {children}
            </ul>
          ),
          li: ({ children, ...props }) => {
            const processedChildren = processFootnotes(children, footnotes);
            return (
              <li className="leading-relaxed" {...props}>
                {processedChildren}
              </li>
            );
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  );
}

// ── Helper Functions ──────────────────────────────────────

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }
  if (React.isValidElement(children)) {
    const props = children.props as Record<string, unknown>;
    if (props?.children) {
      return extractText(props.children as React.ReactNode);
    }
  }
  return String(children ?? "");
}

function processFootnotes(children: React.ReactNode, footnotes: Record<string, string>): React.ReactNode {
  if (typeof children === "string") {
    // Match superscript-style footnote numbers at end of sentences
    // Pattern: digits that appear right after text without space, likely footnote refs
    const parts = children.split(/(\d{1,2})(?=\s|$|\.|,|;)/g);

    if (parts.length <= 1) return children;

    // Only process if we detect actual footnote-like patterns
    // Check if the original text has number patterns that look like footnotes
    const footnotePattern = /(?<=[a-zA-ZÀ-ỹ\.\,\;\)\"])\d{1,2}(?=\s|$)/g;
    const matches = children.match(footnotePattern);

    if (!matches) return children;

    let result = children;
    const processedNums = new Set<string>();

    for (const match of matches) {
      if (processedNums.has(match)) continue;
      processedNums.add(match);
    }

    // Return the text as-is but wrap trailing numbers as superscripts
    const segments: React.ReactNode[] = [];
    let remaining = children;
    let key = 0;

    const regex = /(?<=[a-zA-ZÀ-ỹ\.\,\;\)\"])\d{1,2}(?=\s|$)/g;
    let lastIndex = 0;
    let m: RegExpExecArray | null;

    while ((m = regex.exec(children)) !== null) {
      if (m.index > lastIndex) {
        segments.push(children.slice(lastIndex, m.index));
      }
      
      const footnoteId = m[0];
      const footnoteText = footnotes[footnoteId];
      
      if (footnoteText) {
        segments.push(
          <FootnoteTooltip key={key++} id={footnoteId} text={footnoteText} />
        );
      } else {
        segments.push(
          <sup key={key++} className="footnote-ref">
            [{footnoteId}]
          </sup>
        );
      }
      
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < children.length) {
      segments.push(children.slice(lastIndex));
    }

    return segments.length > 1 ? <>{segments}</> : children;
  }

  if (Array.isArray(children)) {
    return children.map((child, i) => (
      <React.Fragment key={i}>{processFootnotes(child, footnotes)}</React.Fragment>
    ));
  }

  return children;
}
