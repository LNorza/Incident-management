import React, { ReactNode, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./authReducer";
import { IUser } from "../../utils/interface/user";
import { types } from "./types";

// Define las props del AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Inicializa el estado desde localStorage
const init = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    return {
        user: user || { username: "", password: "" },
        logged: !!user,
    };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, init());

    const login = (user: IUser) => {
        localStorage.setItem("user", JSON.stringify(user)); // Almacena el usuario en localStorage
        dispatch({ type: types.login, payload: user });
    };

    const logout = () => {
        dispatch({ type: types.logout });
        localStorage.removeItem("user"); // Elimina el usuario de localStorage
    };

    return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>;
};
