import db from "./db.mjs";

const id = Number(process.argv[2]);
if (!id) {
  console.error("Usage: node feedback-server/resolve.mjs <comment-id>");
  process.exit(1);
}

const info = db.prepare("UPDATE feedback_comments SET status = 'resolved' WHERE id = ?").run(id);
if (info.changes === 0) {
  console.error(`No comment with id ${id}.`);
  process.exit(1);
}

console.log(`Marked #${id} resolved.`);
