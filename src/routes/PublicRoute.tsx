import {Navigate} from "react-router-dom";

interface PublicRouteProps {
	children: JSX.Element;
	isAuthenticated: boolean | null;
}

export const PublicRoute = ({children, isAuthenticated}: PublicRouteProps) => {
	return !isAuthenticated ? children : <Navigate to="/" />;
};
