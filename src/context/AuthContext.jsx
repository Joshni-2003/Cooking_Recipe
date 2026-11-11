
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        try {
            const savedUser = localStorage.getItem('portalUser');

            return savedUser ? JSON.parse(savedUser) : null;

        } catch (error) {
            console.error('Unable to load user:', error);
            return null;
        }

    });

    // Login function
    function login(email, role, name = '') {

        const userData = {
            name: name.trim(),
            username: name.trim(),
            email: email.trim().toLowerCase(),
            role: role
        };

        setUser(userData);

        localStorage.setItem(
            'portalUser',
            JSON.stringify(userData)
        );

    }

    // Logout function
    function logout() {

        setUser(null);

        localStorage.removeItem('portalUser');

    }

    return (

        <AuthContext.Provider
            value={{ user, login, logout }}
        >
            {children}
        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}
