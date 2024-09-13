import { Lock, User } from "lucide-react";
import "../style/authStyle.css";

const logoLogin = "/assets/logoLogin.svg";

export const Login = () => {
    return (
        <div className="authContainer">
            <section className="mainAuthContainer">
                <img src={logoLogin} alt="" />

                <form className="formAuth">
                    <div className="formInput">
                        <User />
                        <input type="text" placeholder="Nombre de usuario" />
                    </div>

                    <div className="formInput">
                        <Lock />
                        <input type="password" placeholder="Contraseña" />
                    </div>

                    <div className="formButton">
                        <button type="submit">Iniciar Sesión</button>
                        <a href="">¿Olvidaste tú contraseña?</a>
                    </div>
                </form>
            </section>
        </div>
    );
};
