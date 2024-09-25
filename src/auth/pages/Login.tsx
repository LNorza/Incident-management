import { useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import style from "../style/authStyle.module.css";
import { useForm } from "../../hooks/useForm";
import { CustomInput } from "../../ui";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

interface LoginForm {
    username: string;
    password: string;
}

const logoLogin = "/assets/logoLogin.svg";

export const Login = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const { login } = authContext || {}; // Manejo de contexto

    const { username, password, formState, onInputChange } = useForm<LoginForm>({
        username: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                if (login) {
                    login(formState);
                }
                navigate("/build");
            } else {
                console.error("Error al iniciar sesión:", data.message);
            }
        } catch (error) {
            toast.error("Error al iniciar sesión");
        }
    };

    return (
        <div className={`${style.authContainer}`}>
            <section className={`${style.mainAuthContainer}`}>
                <img src={logoLogin} alt="Logo de login" />

                <form className={`${style.formAuth}`} onSubmit={handleSubmit}>
                    <div className={`${style.inputContainer}`}>
                        <CustomInput
                            icon={<User />}
                            name="username"
                            placeholder="Nombre de usuario"
                            type="text"
                            value={username}
                            onChange={onInputChange}
                            autoComplete="username"
                        />
                    </div>

                    <div className={`${style.inputContainer}`}>
                        <CustomInput
                            icon={<Lock />}
                            name="password"
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={onInputChange}
                            autoComplete="password"
                        />
                    </div>

                    <div className={`${style.formButton}`}>
                        <button type="submit">INICIAR SESIÓN</button>
                        <a href="">¿Olvidaste tú contraseña?</a>
                    </div>
                </form>
            </section>
        </div>
    );
};
