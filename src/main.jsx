import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
            <Toaster 
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#10B981',
                        },
                    },
                }}
            />
        </Provider>
    </StrictMode>
);
