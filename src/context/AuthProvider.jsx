import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading,setLoading ] = useState(true)
    useEffect(() => {
        const userGuardado = localStorage.getItem('usuario');
        if (userGuardado) {
        setUsuario(JSON.parse(userGuardado));
        }
        setLoading(false)
    }, []);

    const login = (userData) => {
        setUsuario(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout,loading }}>
        {children}
        </AuthContext.Provider>
    );
};