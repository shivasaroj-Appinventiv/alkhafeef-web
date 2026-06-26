"use client";

import { useEffect, useState, type ReactNode } from "react";

export const DIALOG_TRANSITION_MS = 300;

interface AnimatedDialogProps {
  open: boolean;
  onClose?: () => void;
  closeOnBackdropClick?: boolean;
  backdropClassName?: string;
  panelClassName?: string;
  children: ReactNode;
}

export default function AnimatedDialog({
  open,
  onClose,
  closeOnBackdropClick = true,
  backdropClassName = "",
  panelClassName = "",
  children,
}: AnimatedDialogProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);

      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });

      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);

    const timer = window.setTimeout(() => {
      setMounted(false);
    }, DIALOG_TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [open]);

  if (!mounted) return null;

  const handleBackdropClick = () => {
    if (!closeOnBackdropClick || !onClose) return;
    onClose();
  };

  return (
    <div
      className={`dialog-backdrop transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      } ${backdropClassName}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-3 scale-95 opacity-0"
        } ${panelClassName}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
