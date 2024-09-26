import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const authContext = useContext(AuthContext);

    const { logged } = authContext;

    return logged ? children : <Navigate to="/login" />;
};
