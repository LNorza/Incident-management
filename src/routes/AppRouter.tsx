// AppRouter.tsx
import {Route, Routes} from "react-router-dom";
import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";
import {Login} from "../auth";
import {GestorRoute} from "../app";

export const AppRouter = () => {
	return (
		<Routes>
			{/* Ruta pública para login */}
			<Route
				path="login/*"
				element={
					<PublicRoute>
						<Login />
					</PublicRoute>
				}
			/>

			{/* Ruta privada para gestor */}
			<Route
				path="/*"
				element={
					<PrivateRoute>
						<GestorRoute />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
