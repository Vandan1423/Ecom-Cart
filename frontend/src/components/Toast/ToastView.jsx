export default function ToastView({ toasts, onDismiss }) {
    if (!toasts || toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((t) => (
                <div key={t.id} className={`toast toast-${t.type}`}>
                    <div className="toast-content">
                        {t.title ? (
                            <div className="toast-title">{t.title}</div>
                        ) : null}
                        <div className="toast-message">{t.message}</div>
                    </div>
                    <button
                        className="toast-close"
                        onClick={() => onDismiss(t.id)}
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
}