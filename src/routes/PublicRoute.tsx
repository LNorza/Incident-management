import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

interface PublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
    const authContext = useContext(AuthContext);
    const { logged } = authContext;

    return !logged ? children : <Navigate to="/" />;
};
