import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

// In development vite.config.js proxies /api to http://localhost:4000,
// so no absolute URL is hardcoded anywhere in the app.
const API_URL = import.meta.env.VITE_API_URL || "/api";

function useApi() {
    const { token, logout } = useAuth();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (endpoint, options = {}) => {
            setLoading(true);
            setError(null);

            try {
                const headers = {
                    ...options.headers,
                };

                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                const response = await fetch(`${API_URL}${endpoint}`, {
                    ...options,
                    headers,
                });

                if (!response.ok) {
                    let message = "Something went wrong";

                    try {
                        const errorData = await response.json();
                        message = errorData.error || errorData.message || message;
                    } catch {
                        // Response did not contain JSON
                    }

                    // The saved token is no longer accepted, so drop it
                    // instead of staying stuck in a half-logged-in state.
                    if (response.status === 401 && token) {
                        logout();
                    }

                    throw new Error(message);
                }

                if (response.status === 204) {
                    setData(null);
                    return null;
                }

                const result = await response.json();
                setData(result);

                return result;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [token, logout]
    );

    return { data, loading, error, request };
}

export default useApi;
