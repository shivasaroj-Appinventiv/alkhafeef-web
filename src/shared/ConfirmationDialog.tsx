interface ConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
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
            className="h-9 rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-600 transition hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-9 rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;