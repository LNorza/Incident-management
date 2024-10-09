import { IUser } from "../../utils/interface/user";
import { types } from "./types";

// Define la interfaz para el estado
interface AuthState {
  logged: boolean;
  user: IUser;
}

// Define la interfaz para la acción
interface Action {
  type: string;
  payload?: any;
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
