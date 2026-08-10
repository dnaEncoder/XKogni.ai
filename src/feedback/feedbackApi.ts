// @ts-nocheck
async function feedbackFetch(path, { method = "GET", body } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  let response;
  try {
    response = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error(`Could not reach the local feedback server: ${err.message}`);
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) {
    const message = json?.error?.message || `Feedback server returned ${response.status} for ${path}`;
    throw new Error(message);
  }
  return json;
}

export async function listPageComments(pagePath) {
  const json = await feedbackFetch(`/api/feedback/comments?pagePath=${encodeURIComponent(pagePath)}`);
  return json.comments || [];
}

export async function createComment(comment) {
  const json = await feedbackFetch("/api/feedback/comments", { method: "POST", body: comment });
  return json.comment;
}

export async function resolveComment(id) {
  const json = await feedbackFetch(`/api/feedback/comments/${id}`, {
    method: "PATCH",
    body: { status: "resolved" },
  });
  return json.comment;
}
