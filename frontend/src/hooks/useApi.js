import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = "http://localhost:4000/api";

function useApi() {
    const { token } = useAuth();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (endpoint, options = {}) => {
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
                    message =
                        errorData.error ||
                        errorData.message ||
                        message;
                } catch {
                    // Response did not contain JSON
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
    }, [token]);

    return { data, loading, error, request };
}

export default useApi;