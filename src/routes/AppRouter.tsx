import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "../auth";
import { RouteManager } from "../app";
import { useEffect, useState } from "react";

export const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const saveLastPath = () => {
        if (location.pathname !== "/login") {
            localStorage.setItem("lastPath", location.pathname);
        }
    };

    const verifyToken = async () => {
        try {
            const response = await fetch("http://localhost:3000/verify", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            setIsAuthenticated(data.valid);

            if (!data.valid) {
                saveLastPath();
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            setIsAuthenticated(false);
            saveLastPath();
        }
    };

    useEffect(() => {
        if (location.pathname !== "/login") {
            verifyToken();
        } else {
            setIsAuthenticated(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isAuthenticated === true && location.pathname === "/login") {
            const lastPath = localStorage.getItem("lastPath") || "/home";
            navigate(lastPath);
            localStorage.removeItem("lastPath");
        }
    }, [isAuthenticated, navigate, location.pathname]);

    if (isAuthenticated === null) {
        // Mostrar un indicador de carga mientras se verifica la autenticación
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            <Route
                path="login/*"
                element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<Login />} />
                        </Routes>
                    </PublicRoute>
                }
            />
            <Route
                path="/*"
                element={
                    <PrivateRoute>
                        <RouteManager />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
};
