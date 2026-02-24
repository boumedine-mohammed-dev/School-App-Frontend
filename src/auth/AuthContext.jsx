import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [token, setToken] = useState("")
    const [role, setRole] = useState("")
    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/profiles/`, {
                headers: { Authorization: `Token ${token}` }
            }).then((res) => res.json()).then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setRole(data[0].role)
                }
            }).catch((err) => { console.error("Error Fetching profile:", err) })
        }

    }, [token])
    const login = (token, role) => {
        setToken(token)
        setRole(role)
    }
    const logout = () => {
        setRole(null)
        setToken(null)
    }
    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>{children}</AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}