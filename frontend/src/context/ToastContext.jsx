import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info", duration = 3500) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* DaisyUI Toast Container (มุมขวาบน) */}
      {toasts.length > 0 && (
        <div className="toast toast-top toast-end z-50 p-4 space-y-2 pointer-events-none">
          {toasts.map((toast) => {
            let iconColor = "text-neutral-300";
            let Icon = Info;

            if (toast.type === "success") {
              iconColor = "text-emerald-400";
              Icon = CheckCircle2;
            } else if (toast.type === "error") {
              iconColor = "text-rose-400";
              Icon = AlertCircle;
            } else if (toast.type === "warning") {
              iconColor = "text-amber-400";
              Icon = AlertTriangle;
            }

            return (
              <div
                key={toast.id}
                role="alert"
                className="bg-neutral-900/95 text-white border border-neutral-700/70 backdrop-blur-md shadow-2xl rounded-2xl p-4 flex items-center justify-between gap-3 min-w-[280px] max-w-md pointer-events-auto transition-all duration-300 animate-in fade-in slide-in-from-top-3"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
                  <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="btn btn-ghost btn-xs btn-circle text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
