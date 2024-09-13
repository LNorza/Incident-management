import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
    logged: boolean;
}

// Rutas privadas que requieren autenticación
export const PrivateRoute = ({ children, logged }: Props) => {
    return logged ? <>{children}</> : <Navigate to="/login" />;
};
