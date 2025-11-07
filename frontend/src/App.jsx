import "./App.css";
import Pages from "./pages/Pages";
import ToastProvider from "./components/Toast/ToastProvider.jsx";

export default function App() {
    return (
        <ToastProvider>
            <Pages />
        </ToastProvider>
    );
}
