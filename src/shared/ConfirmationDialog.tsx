"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { Loader2 } from "lucide-react";

interface ConfirmationProps {
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    if (isConfirming) return;

    flushSync(() => setIsConfirming(true));

    try {
      await onConfirm();
    } catch (error) {
      console.error(error);
      flushSync(() => setIsConfirming(false));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
      onClick={isConfirming ? undefined : onCancel}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {isConfirming ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90">
            <Loader2 size={32} className="animate-spin text-red-500" />
            <p className="text-sm font-medium text-gray-700">Please wait...</p>
          </div>
        ) : null}

        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-base font-medium text-gray-900">
            Confirm action
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-sm leading-relaxed text-gray-600">{message}</p>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isConfirming}
            className="h-9 rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-600 transition hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isConfirming}
            className="flex h-9 min-w-[88px] items-center justify-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
          >
            {isConfirming ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
