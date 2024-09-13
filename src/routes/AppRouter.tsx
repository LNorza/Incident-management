import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../auth";
import { GestorRoute } from "../app";

export const AppRouter = () => {
    const logged = true; // Simula el estado de autenticación

    return (
        <Routes>
            {/* Ruta pública para login */}
            <Route
                path="login/*"
                element={
                    <PublicRoute logged={logged}>
                        <Login />
                    </PublicRoute>
                }
            />

            {/* Ruta privada para gestor */}
            <Route
                path="/*"
                element={
                    <PrivateRoute logged={logged}>
                        <GestorRoute />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
