import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "feedback.db"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS feedback_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reviewer_name TEXT,
    page_path TEXT NOT NULL,
    page_label TEXT,
    anchor_id TEXT,
    element_label TEXT,
    text_snapshot TEXT,
    note TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    x REAL,
    y REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS feedback_comments_page_path_idx ON feedback_comments (page_path);
`);

export function mapComment(row) {
  return {
    id: row.id,
    reviewerName: row.reviewer_name,
    pagePath: row.page_path,
    pageLabel: row.page_label,
    anchorId: row.anchor_id,
    elementLabel: row.element_label,
    textSnapshot: row.text_snapshot,
    note: row.note,
    status: row.status,
    x: row.x,
    y: row.y,
    createdAt: row.created_at,
  };
}

export default db;
