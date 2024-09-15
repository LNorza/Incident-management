import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
	children: JSX.Element;
	isAuthenticated: boolean | null;
}

export const PrivateRoute = ({children, isAuthenticated}: PrivateRouteProps) => {
	return isAuthenticated ? children : <Navigate to="/login" />;
};
