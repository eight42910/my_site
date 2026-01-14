import { RefObject, useEffect } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

export default function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  active: boolean,
  returnFocusRef?: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
    const first = focusable[0] ?? container;
    const last = focusable[focusable.length - 1] ?? container;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const focusTimer = window.setTimeout(() => {
      first.focus();
    }, 0);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      if (returnFocusRef?.current) {
        returnFocusRef.current.focus();
      } else {
        previouslyFocused?.focus();
      }
    };
  }, [active, containerRef, returnFocusRef]);
}
