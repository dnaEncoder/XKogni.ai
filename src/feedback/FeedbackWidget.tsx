// @ts-nocheck
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFeedbackKit } from "./FeedbackKitProvider";
import { usePagePath } from "./usePagePath";
import { createComment, listPageComments, resolveComment } from "./feedbackApi";

function hashString(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

function nearestHeadingText(el) {
  let node = el;
  while (node && node !== document.body) {
    if (/^H[1-6]$/.test(node.tagName)) return node.textContent.trim().slice(0, 120);
    let sibling = node.previousElementSibling;
    while (sibling) {
      if (/^H[1-6]$/.test(sibling.tagName)) return sibling.textContent.trim().slice(0, 120);
      sibling = sibling.previousElementSibling;
    }
    node = node.parentElement;
  }
  return "";
}

function domPathFor(el) {
  const parts = [];
  let node = el;
  let depth = 0;
  while (node && node !== document.body && depth < 8) {
    const parent = node.parentElement;
    const index = parent ? Array.from(parent.children).indexOf(node) : 0;
    parts.unshift(`${node.tagName}:${index}`);
    node = parent;
    depth += 1;
  }
  return parts.join(">");
}

// Re-derive anchorId hash for every live element so a stored comment can
// be re-attached to the exact node it left on, instead of trusting stale
// page-relative x/y percentages that drift whenever the page reflows.
function buildAnchorMap(pagePath) {
  const map = new Map();
  const all = document.body.querySelectorAll("*");
  for (const el of all) {
    if (el.closest("[data-fbkit-ui]")) continue;
    const textSnapshot = (el.textContent || "").trim().slice(0, 160);
    const hash = hashString(`${pagePath}|${domPathFor(el)}|${textSnapshot.slice(0, 80)}`);
    if (!map.has(hash)) map.set(hash, el);
  }
  return map;
}

// Walk one step up the ancestor chain, refusing to ever land on <body> or
// <html> — this is the "top" boundary of the inspect-element-style picker.
function clampedParent(node) {
  const parent = node.parentElement;
  if (!parent || parent === document.body || parent === document.documentElement) return node;
  return parent;
}

function walkUp(el, depth) {
  let node = el;
  for (let i = 0; i < depth; i += 1) {
    const next = clampedParent(node);
    if (next === node) break;
    node = next;
  }
  return node;
}

function describeElement(el) {
  const tag = el.tagName.toLowerCase();
  const cls = typeof el.className === "string" && el.className.trim() ? `.${el.className.trim().split(/\s+/)[0]}` : "";
  const heading = nearestHeadingText(el);
  const base = `${tag}${cls}`;
  return heading ? `${base} — ${heading}` : base;
}

export function FeedbackWidget() {
  const { reviewerName, setReviewerName } = useFeedbackKit();
  const pagePath = usePagePath();

  const [mode, setMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [pending, setPending] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [overlaySize, setOverlaySize] = useState({ width: 0, height: 0 });
  const [pinPositions, setPinPositions] = useState({});
  const [nameDraft, setNameDraft] = useState(reviewerName);
  const [pickerTarget, setPickerTarget] = useState(null);
  const [pickerDepth, setPickerDepth] = useState(0);
  const [pickerRect, setPickerRect] = useState(null);

  const pickerEl = pickerTarget ? walkUp(pickerTarget, pickerDepth) : null;

  useEffect(() => {
    if (!menuOpen) return undefined;
    function handleOutsideClick(e) {
      if (!e.target.closest("[data-fbkit-ui]")) setMenuOpen(false);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  function toggleMode() {
    setMode((m) => {
      const next = !m;
      if (next) setMenuOpen(false);
      return next;
    });
  }

  useEffect(() => {
    let cancelled = false;
    listPageComments(pagePath)
      .then((list) => {
        if (!cancelled) setComments(list.filter((c) => c.status !== "resolved"));
      })
      .catch(() => {
        if (!cancelled) setComments([]);
      });
    return () => {
      cancelled = true;
    };
  }, [pagePath]);

  const recomputeOverlay = useCallback(() => {
    setOverlaySize({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    });

    if (!comments.length) {
      setPinPositions({});
      return;
    }

    const anchorMap = buildAnchorMap(pagePath);
    const next = {};
    for (const c of comments) {
      const el = c.anchorId ? anchorMap.get(c.anchorId) : null;
      if (el) {
        const rect = el.getBoundingClientRect();
        next[c.id] = {
          left: rect.left + window.scrollX + 4,
          top: rect.top + window.scrollY + 4,
        };
      } else if (c.x != null && c.y != null) {
        next[c.id] = {
          left: (c.x / 100) * document.documentElement.scrollWidth,
          top: (c.y / 100) * document.documentElement.scrollHeight,
        };
      }
    }
    setPinPositions(next);
  }, [comments, pagePath]);

  useEffect(() => {
    recomputeOverlay();
    const timer = setTimeout(recomputeOverlay, 600);
    if (document.fonts?.ready) document.fonts.ready.then(recomputeOverlay);

    let debounceTimer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(recomputeOverlay, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });

    window.addEventListener("resize", recomputeOverlay);
    return () => {
      clearTimeout(timer);
      clearTimeout(debounceTimer);
      observer.disconnect();
      window.removeEventListener("resize", recomputeOverlay);
    };
  }, [recomputeOverlay]);

  useEffect(() => {
    setViewing(null);
  }, [pagePath]);

  // Clear any in-progress hover pick whenever a popover opens or feedback
  // mode turns off, so a stale highlight box never lingers on screen.
  useEffect(() => {
    if (!mode || pending || viewing) setPickerTarget(null);
  }, [mode, pending, viewing]);

  // Inspect-element-style hover: track the deepest element under the
  // cursor as the picker's starting point (depth resets to the leaf on
  // every new hover position).
  useEffect(() => {
    if (!mode || pending || viewing) return undefined;

    function handleMouseMove(e) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || el === document.body || el === document.documentElement || el.closest("[data-fbkit-ui]")) {
        setPickerTarget(null);
        return;
      }
      setPickerTarget(el);
      setPickerDepth(0);
    }
    function handleMouseLeave() {
      setPickerTarget(null);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mode, pending, viewing]);

  // Arrow keys walk the highlighted element up/down the ancestor chain
  // (like widening/narrowing a DevTools element-picker selection);
  // Escape drops the current hover pick without leaving feedback mode.
  useEffect(() => {
    if (!mode || pending || viewing || !pickerTarget) return undefined;

    function handleKeyDown(e) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPickerDepth((d) => d + 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setPickerDepth((d) => Math.max(0, d - 1));
      } else if (e.key === "Escape") {
        setPickerTarget(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, pending, viewing, pickerTarget]);

  // Keep the highlight box glued to the picked element as the page
  // scrolls or resizes, not just when the mouse moves.
  useEffect(() => {
    if (!pickerEl) {
      setPickerRect(null);
      return undefined;
    }
    function updateRect() {
      const r = pickerEl.getBoundingClientRect();
      setPickerRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    updateRect();
    window.addEventListener("scroll", updateRect, true);
    window.addEventListener("resize", updateRect);
    return () => {
      window.removeEventListener("scroll", updateRect, true);
      window.removeEventListener("resize", updateRect);
    };
  }, [pickerEl]);

  useEffect(() => {
    if (!mode) return undefined;

    function handleClick(e) {
      if (e.target.closest("[data-fbkit-ui]")) return;
      e.preventDefault();
      e.stopPropagation();

      const target = pickerEl || e.target;
      const textSnapshot = (target.textContent || "").trim().slice(0, 160);
      const elementLabel = nearestHeadingText(target) || target.tagName.toLowerCase();
      const anchorId = hashString(`${pagePath}|${domPathFor(target)}|${textSnapshot.slice(0, 80)}`);
      const x = (e.pageX / document.documentElement.scrollWidth) * 100;
      const y = (e.pageY / document.documentElement.scrollHeight) * 100;

      setPending({ clientX: e.clientX, clientY: e.clientY, x, y, anchorId, elementLabel, textSnapshot });
      setNote("");
      setSubmitError("");
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [mode, pagePath, pickerEl]);

  async function handleSubmitNote(e) {
    e.preventDefault();
    if (!note.trim() || !pending) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const created = await createComment({
        reviewerName: reviewerName || null,
        pagePath,
        pageLabel: document.title || pagePath,
        anchorId: pending.anchorId,
        elementLabel: pending.elementLabel,
        textSnapshot: pending.textSnapshot,
        note: note.trim(),
        x: pending.x,
        y: pending.y,
      });
      setComments((prev) => [...prev, created]);
      setPending(null);
      setNote("");
    } catch (err) {
      setSubmitError(err.message || "Could not save this note.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResolve(comment) {
    try {
      await resolveComment(comment.id);
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
      setViewing(null);
    } catch {
      // Leave the popover open; the reviewer can retry.
    }
  }

  function handleSaveName() {
    setReviewerName(nameDraft);
    setMenuOpen(false);
  }

  return (
    <div className="fbkitRoot" data-fbkit-ui>
      {menuOpen && (
        <div className="fbkitMenuPanel">
          <div className="fbkitMenuHeader">
            <span>Feedback</span>
          </div>
          <label className="fbkitNameLabel" htmlFor="fbkit-reviewer-name">
            Your name (optional)
          </label>
          <input
            id="fbkit-reviewer-name"
            className="fbkitNameInput"
            type="text"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveName();
            }}
            placeholder="e.g. Suhas"
          />
          <button type="button" className="fbkitLinkButton" onClick={handleSaveName}>
            Save name
          </button>
          <button
            type="button"
            className={`fbkitMenuItem${mode ? " fbkitMenuItem--active" : ""}`}
            onClick={toggleMode}
          >
            <span>Feedback mode</span>
            <span className="fbkitMenuItemState">{mode ? "On" : "Off"}</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className={`fbkitToggle${mode ? " fbkitToggle--on" : ""}`}
        onClick={() => setMenuOpen((o) => !o)}
      >
        Feedback{mode ? " · On" : ""}
      </button>

      {createPortal(
        <div className="fbkitPinLayer" data-fbkit-ui style={{ width: overlaySize.width, height: overlaySize.height }}>
          {comments.map((c, i) => {
            const pos = pinPositions[c.id];
            if (!pos) return null;
            return (
              <div
                key={c.id ?? i}
                className="fbkitPin"
                style={{ left: pos.left, top: pos.top }}
                onClick={(e) => {
                  e.stopPropagation();
                  setViewing({ comment: c, clientX: e.clientX, clientY: e.clientY });
                }}
              >
                {i + 1}
              </div>
            );
          })}
        </div>,
        document.body
      )}

      {mode &&
        pickerEl &&
        pickerRect &&
        !pending &&
        !viewing &&
        createPortal(
          <>
            <div
              className="fbkitPickerBox"
              data-fbkit-ui
              style={{ top: pickerRect.top, left: pickerRect.left, width: pickerRect.width, height: pickerRect.height }}
            />
            <div
              className="fbkitPickerLabel"
              data-fbkit-ui
              style={{ top: Math.max(pickerRect.top - 26, 4), left: pickerRect.left }}
            >
              {describeElement(pickerEl)} · ↑/↓ parent/child
            </div>
          </>,
          document.body
        )}

      {pending &&
        createPortal(
          <div className="fbkitPopoverBackdrop" data-fbkit-ui onClick={() => setPending(null)}>
            <form
              className="fbkitPopover"
              style={{ left: pending.clientX, top: pending.clientY }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmitNote}
            >
              <p className="fbkitPopoverLabel">{pending.elementLabel || "Selected element"}</p>
              <textarea
                autoFocus
                placeholder="What should change here?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
              {submitError && <p className="fbkitError">{submitError}</p>}
              <div className="fbkitPopoverActions">
                <button type="button" className="fbkitLinkButton" onClick={() => setPending(null)}>
                  Cancel
                </button>
                <button type="submit" className="fbkitBtn" disabled={submitting || !note.trim()}>
                  {submitting ? "Saving…" : "Save note"}
                </button>
              </div>
            </form>
          </div>,
          document.body
        )}

      {viewing &&
        createPortal(
          <div className="fbkitPopoverBackdrop" data-fbkit-ui onClick={() => setViewing(null)}>
            <div
              className="fbkitPopover fbkitViewPopover"
              style={{ left: viewing.clientX, top: viewing.clientY }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="fbkitPopoverLabel">{viewing.comment.elementLabel || "Selected element"}</p>
              <p className="fbkitViewNote">{viewing.comment.note}</p>
              <p className="fbkitViewMeta">
                {viewing.comment.reviewerName || "Local reviewer"}
                {viewing.comment.createdAt ? ` · ${new Date(viewing.comment.createdAt).toLocaleString()}` : ""}
              </p>
              <div className="fbkitPopoverActions">
                <button type="button" className="fbkitLinkButton" onClick={() => handleResolve(viewing.comment)}>
                  Mark resolved
                </button>
                <button type="button" className="fbkitBtn" onClick={() => setViewing(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
