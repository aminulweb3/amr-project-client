import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating user authentication
        setTimeout(() => {
            setUser({ email: "dummy@example.com", displayName: "Dummy User" });
            setLoading(false);
        }, 1000);
    }, []);

    const authInfo = {
        user,
        loading,
        // Add other necessary methods (signIn, signOut, etc.) as dummy functions
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;