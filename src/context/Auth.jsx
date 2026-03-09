/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = async (data) => {
        try {
            setUser(data);
        } catch (err) {
            console.log("Login storage error:", err);
        }
    };

    const logout = async () => {
        try {
            setUser(null);
        } catch (err) {
            console.log("Logout error:", err);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};