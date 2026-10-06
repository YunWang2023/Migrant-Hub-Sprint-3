import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const AuthContext = createContext(null);

// localStorage can hold the string "undefined" or broken JSON from an
// older build. Without this guard JSON.parse throws while the provider
// is rendering, which white-screens every route.
function readStoredUser() {
    try {
        const saved = localStorage.getItem("user");
        if (!saved || saved === "undefined") {
            return null;
        }
        return JSON.parse(saved);
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

function readStoredToken() {
    const saved = localStorage.getItem("token");
    return saved && saved !== "undefined" ? saved : null;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser);
    const [token, setToken] = useState(readStoredToken);

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    // Check the saved token against the API once on startup. A token that
    // expired while the tab was closed is cleared instead of leaving the
    // user looking logged in until their next request fails.
    useEffect(() => {
        if (!token) {
            return;
        }

        let cancelled = false;

        const verify = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 401) {
                    if (!cancelled) {
                        logout();
                    }
                    return;
                }

                if (!response.ok) {
                    return;
                }

                const result = await response.json();

                if (!cancelled && result?.user) {
                    setUser(result.user);
                    localStorage.setItem("user", JSON.stringify(result.user));
                }
            } catch {
                // Server unreachable. Keep the session; the next real
                // request will surface the problem to the user.
            }
        };

        verify();

        return () => {
            cancelled = true;
        };
    }, [token]);

    const isAuthenticated = Boolean(token);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// The hook lives next to the provider it reads; this only disables a
// Vite fast-refresh hint, not a correctness rule.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}
