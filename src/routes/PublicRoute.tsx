import React from "react";
import { Navigate } from "react-router-dom"; // Asegúrate de importar Navigate si lo estás utilizando

interface Props {
    children: React.ReactNode;
    logged: boolean;
}

// Rutas públicas para usuarios no autenticados
export const PublicRoute = ({ children, logged }: Props) => {
    return !logged ? <>{children}</> : <Navigate to="/" />;
};
