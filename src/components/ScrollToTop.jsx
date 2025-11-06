import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ smooth = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
    } catch (e) {
      // fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname, smooth]);

  return null;
}
