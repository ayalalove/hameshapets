import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

// נגישות לחלון קופץ: פוקוס נכנס לחלון ונשאר בו, Escape סוגר,
// ובסגירה הפוקוס חוזר לאלמנט שפתח את החלון. גם נועל את גלילת הדף.
export default function useDialog<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const panel = ref.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      opener?.focus();
    };
  }, []);

  return ref;
}
