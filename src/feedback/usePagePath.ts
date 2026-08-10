// @ts-nocheck
import { useEffect, useState } from "react";

// Router-agnostic current-path tracker. Works with no router at all (path
// never changes), and also picks up client-side navigation from any router
// that uses the History API, without depending on react-router directly.
let patched = false;
function ensurePatched() {
  if (patched || typeof window === "undefined") return;
  patched = true;
  for (const method of ["pushState", "replaceState"]) {
    const original = window.history[method];
    window.history[method] = function patchedHistoryMethod(...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event("fbkit:navigation"));
      return result;
    };
  }
  window.addEventListener("popstate", () => window.dispatchEvent(new Event("fbkit:navigation")));
}

export function usePagePath() {
  ensurePatched();
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    function handleNav() {
      setPath(window.location.pathname);
    }
    window.addEventListener("fbkit:navigation", handleNav);
    return () => window.removeEventListener("fbkit:navigation", handleNav);
  }, []);

  return path;
}
