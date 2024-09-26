import { createContext } from "react";
import { IUser } from "../../utils/interface/user";

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
    user: IUser; // Cambia esto a un tipo más específico si tienes una estructura de usuario
    logged: boolean;
    login: (user: any) => void;
    logout: () => void;
}

const defaultAuthContext: AuthContextType = {
    user: { username: "", password: "" },
    logged: false,
    login: () => {},
    logout: () => {},
};

// Crea el contexto de autenticación
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
