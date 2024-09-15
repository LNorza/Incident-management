import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";
import {Login} from "../auth";
import {RouteManager} from "../app";
import {useEffect, useState} from "react";

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
				navigate("/login");
			}
		} catch (error) {
			console.error("Error verifying token:", error);
			setIsAuthenticated(false);
			saveLastPath();
			navigate("/login");
		}
	};

	useEffect(() => {
		if (location.pathname !== "/login") {
			verifyToken();
		} else {
			setIsAuthenticated(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	useEffect(() => {
		if (isAuthenticated === true && location.pathname === "/login") {
			const lastPath = localStorage.getItem("lastPath") || "/home";
			navigate(lastPath);
			localStorage.removeItem("lastPath");
		}
	}, [isAuthenticated, navigate, location.pathname]);

	if (isAuthenticated === null && location.pathname !== "/login") {
		return <div>Loading...</div>;
	}

	return (
		<Routes>
			{/* Ruta pública para login */}
			<Route
				path="login/*"
				element={
					<PublicRoute isAuthenticated={isAuthenticated}>
						<Login />
					</PublicRoute>
				}
			/>

			{/* Ruta privada para las demás páginas */}
			<Route
				path="/*"
				element={
					<PrivateRoute isAuthenticated={isAuthenticated}>
						<RouteManager />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
