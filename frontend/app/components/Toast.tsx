import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 animate-slide-in max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-lg shadow-2xl border border-green-200 p-3 sm:p-4 flex items-center gap-2 sm:gap-3 min-w-[280px] sm:min-w-[300px]">
        <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
        <p className="text-slate-900 font-medium flex-1 text-sm sm:text-base">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-100 rounded transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X size={16} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
}
