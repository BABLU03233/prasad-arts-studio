import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, titleId, className = '', children, onKeyDown }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!open) return;
    const previousFocus = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  return <dialog ref={ref} className={`modal ${className}`} aria-labelledby={titleId} onKeyDown={onKeyDown}
    onCancel={(event) => { event.preventDefault(); closeRef.current(); }}
    onClick={(event) => { if (event.target === event.currentTarget) closeRef.current(); }}>
    <div className="modal-inner">
      <button type="button" className="icon-button modal-close" aria-label="Close dialog" onClick={onClose}><X /></button>
      {children}
    </div>
  </dialog>;
}
