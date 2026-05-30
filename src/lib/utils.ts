/**
 * Shared utility functions that can be used in both server and client components.
 * No Node.js-only modules (fs, path, etc.) allowed here.
 */

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTOC(markdown: string): TOCItem[] {
  const lines = markdown.split("\n");
  const toc: TOCItem[] = [];
  let lineIndex = 0;

  let inReferences = false;

  for (const rawLine of lines) {
    lineIndex++;
    // Strip \r from Windows line endings before matching
    const line = rawLine.replace(/\r$/, "");

    // Skip the very first line (title) - we handle it separately in the hero
    if (lineIndex === 1) continue;

    // Also detect "Nguồn trích dẫn"
    if (line.trim() === "Nguồn trích dẫn") {
      toc.push({ id: "nguon-trich-dan", text: "Nguồn trích dẫn", level: 2 });
      inReferences = true;
      continue;
    }

    // Match lines that start section headings (numbered patterns)
    // Only do this if we are not in the references section
    if (!inReferences) {
      // Detect H2-level: "1. Title", "2. Title", etc.
      const h2Match = line.match(
        /^(\d+)\.\s+((?:[A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ].*))$/
      );
      if (h2Match) {
        const text = line.trim();
        const id = generateSlug(text);
        toc.push({ id, text, level: 2 });
        continue;
      }

      // Detect H3-level: "1.1. Title", "5.4. Title", etc.
      const h3Match = line.match(
        /^(\d+\.\d+)\.\s+((?:[A-ZĐÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴ\"].*))$/
      );
      if (h3Match) {
        const text = line.trim();
        const id = generateSlug(text);
        toc.push({ id, text, level: 3 });
        continue;
      }

      // Also detect "Kết Luận"
      if (line.trim() === "Kết Luận") {
        toc.push({ id: "ket-luan", text: "Kết Luận", level: 2 });
      }
    }
  }

  return toc;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 80);
}

export function getReadingTime(text: string): number {
  const wordsPerMinute = 220; // Average reading speed
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function extractFootnotes(markdown: string): Record<string, string> {
  const lines = markdown.split("\n");
  const footnotes: Record<string, string> = {};
  let inReferences = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, "");

    if (line.trim() === "Nguồn trích dẫn") {
      inReferences = true;
      continue;
    }

    if (inReferences && line.trim() !== "") {
      // Match lines like "1. Augustine of Hippo..."
      const match = line.match(/^(\d+)\.\s+(.*)$/);
      if (match) {
        footnotes[match[1]] = match[2];
      }
    }
  }

  return footnotes;
}
