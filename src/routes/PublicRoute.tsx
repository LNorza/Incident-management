// PublicRoute.tsx
import {Navigate} from "react-router-dom";

interface PublicRouteProps {
	children: JSX.Element;
}

export const PublicRoute = ({children}: PublicRouteProps) => {
	const token = localStorage.getItem("token");

	return !token ? children : <Navigate to="/" />;
};
