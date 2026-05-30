import "server-only";
import fs from "fs";
import path from "path";

export function getArticleContent(): string {
  const filePath = path.join(process.cwd(), "GiaoPhu.md");
  const content = fs.readFileSync(filePath, "utf-8");
  return content;
}

// Re-export shared utilities for convenience in server components
export { extractTOC, generateSlug } from "./utils";
export type { TOCItem } from "./utils";
