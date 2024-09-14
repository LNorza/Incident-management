import {Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";
import {Login} from "../auth";
import {RouteManager} from "../app";
import {useEffect, useState} from "react";

export const AppRouter = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();
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
				navigate("/login");
			}
		} catch (error) {
			console.error("Error verifying token:", error);
			setIsAuthenticated(false);
			navigate("/login");
		}
	};

	useEffect(() => {
		if (location.pathname !== "/login") {
			verifyToken();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate]);

	if (isAuthenticated === null) {
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

			{/* Ruta privada para gestor */}
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
