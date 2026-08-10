import db, { mapComment } from "./db.mjs";

const statusFilter = process.argv[2] === "--all" ? null : "open";
const rows = statusFilter
  ? db.prepare("SELECT * FROM feedback_comments WHERE status = ? ORDER BY created_at ASC").all(statusFilter)
  : db.prepare("SELECT * FROM feedback_comments ORDER BY created_at ASC").all();

const comments = rows.map(mapComment);

if (!comments.length) {
  console.log(statusFilter ? "No open feedback." : "No feedback yet.");
  process.exit(0);
}

for (const c of comments) {
  console.log(`#${c.id} [${c.status}] ${c.pagePath} — ${c.elementLabel || "unlabeled section"}`);
  console.log(`  ${c.note}`);
  console.log(`  — ${c.reviewerName || "local reviewer"}, ${c.createdAt}`);
  console.log("");
}
