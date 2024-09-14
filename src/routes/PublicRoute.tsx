import {Navigate} from "react-router-dom";

interface PublicRouteProps {
	children: JSX.Element;
	isAuthenticated: boolean;
}

export const PublicRoute = ({children, isAuthenticated}: PublicRouteProps) => {
	return !isAuthenticated ? children : <Navigate to="/" />;
};
