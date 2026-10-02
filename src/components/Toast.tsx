import React from 'react';

interface ToastProps {
  toast: { title: string; message: string } | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-white text-[#003629] rounded-2xl shadow-xl border border-[#cbe6d9] p-4 flex items-center gap-3.5 max-w-md">
        <div className="w-9 h-9 rounded-xl bg-[#a9eed4] text-[#003629] flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">check</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#003629] leading-tight">{toast.title}</p>
          <p className="text-xs text-[#404945] mt-0.5 leading-snug">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-full text-[#707974] hover:text-[#181c1b] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};
