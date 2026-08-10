import express from "express";
import db, { mapComment } from "./db.mjs";

const PORT = process.env.FEEDBACK_PORT || 4310;
const app = express();
app.use(express.json());

app.get("/api/feedback/comments", (req, res) => {
  const pagePath = typeof req.query.pagePath === "string" ? req.query.pagePath : undefined;
  const rows = pagePath
    ? db.prepare("SELECT * FROM feedback_comments WHERE page_path = ? ORDER BY created_at ASC").all(pagePath)
    : db.prepare("SELECT * FROM feedback_comments ORDER BY created_at ASC").all();
  res.json({ comments: rows.map(mapComment) });
});

app.post("/api/feedback/comments", (req, res) => {
  const body = req.body || {};
  const pagePath = typeof body.pagePath === "string" ? body.pagePath : "";
  const note = typeof body.note === "string" ? body.note.trim() : "";
  if (!pagePath || !note) {
    res.status(400).json({ error: { message: "pagePath and note are required." } });
    return;
  }

  const info = db
    .prepare(
      `INSERT INTO feedback_comments
        (reviewer_name, page_path, page_label, anchor_id, element_label, text_snapshot, note, status, x, y)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'open', ?, ?)`
    )
    .run(
      body.reviewerName || null,
      pagePath,
      body.pageLabel || null,
      body.anchorId || null,
      body.elementLabel || null,
      body.textSnapshot || null,
      note,
      body.x ?? null,
      body.y ?? null
    );

  const row = db.prepare("SELECT * FROM feedback_comments WHERE id = ?").get(info.lastInsertRowid);
  res.json({ comment: mapComment(row) });
});

app.patch("/api/feedback/comments/:id", (req, res) => {
  const id = Number(req.params.id);
  const status = req.body?.status;
  if (!["open", "resolved"].includes(status)) {
    res.status(400).json({ error: { message: "status must be 'open' or 'resolved'." } });
    return;
  }

  db.prepare("UPDATE feedback_comments SET status = ? WHERE id = ?").run(status, id);
  const row = db.prepare("SELECT * FROM feedback_comments WHERE id = ?").get(id);
  if (!row) {
    res.status(404).json({ error: { message: "Comment not found." } });
    return;
  }
  res.json({ comment: mapComment(row) });
});

app.listen(PORT, () => {
  console.log(`Feedback server running at http://localhost:${PORT}`);
});
