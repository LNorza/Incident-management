import { IUser } from "../../utils/interface/user";
import { types } from "./types";

// Define la interfaz para el estado
interface AuthState {
  logged: boolean;
  user: IUser; // Cambia a un tipo más específico si tienes una estructura de usuario
}

// Define la interfaz para la acción
interface Action {
  type: string;
  payload?: any; // Cambia a un tipo más específico si es necesario
}

// Valor inicial del estado
const initialState: AuthState = {
  logged: false,
  user: { username: "", password: "" },
};

export const AuthReducer = (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
      };

    case types.logout:
      return {
        ...state,
        logged: false,
        user: initialState.user,
      };

    default:
      return state;
  }
};
