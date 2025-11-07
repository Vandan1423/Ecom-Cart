import { useState, useCallback, useMemo } from "react";
import { ToastContext } from "./ToastContext.jsx";
import ToastView from "./ToastView.jsx";
import "../../styles/Toast/Toast.css";

export default function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (opts) => {
            const {
                type = "info",
                message = "",
                title = "",
                duration = 3000,
            } = opts || {};
            const id = `${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 7)}`;
            const toast = { id, type, message, title, duration };
            setToasts((prev) => [toast, ...prev].slice(0, 5));
            if (duration > 0) {
                setTimeout(() => removeToast(id), duration);
            }
            return id;
        },
        [removeToast]
    );

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastView toasts={toasts} onDismiss={removeToast} />
        </ToastContext.Provider>
    );
}
