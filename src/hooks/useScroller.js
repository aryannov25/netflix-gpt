import { useCallback, useRef } from "react";
import { ROW_SCROLL_FRACTION } from "../utils/constants";

export const useScroller = () => {
  const ref = useRef(null);

  const scroll = useCallback((dir) => {
    const el = ref.current;
    if (!el) return;
    const delta = el.clientWidth * ROW_SCROLL_FRACTION * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  const scrollToEnd = useCallback(() => {
    const el = ref.current;
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  }, []);

  return { ref, scroll, scrollToEnd };
};
