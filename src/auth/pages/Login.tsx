import { Lock, User } from "lucide-react";
// import "../style/authStyle.css";
import style from "../style/authStyle.module.css";

const logoLogin = "/assets/logoLogin.svg";

export const Login = () => {
    return (
        <div className={`${style.authContainer}`}>
            <section className={`${style.mainAuthContainer}`}>
                <img src={logoLogin} alt="" />

                <form className={`${style.formAuth}`}>
                    <div className={`${style.formInput}`}>
                        <User />
                        <input type="text" placeholder="Nombre de usuario" />
                    </div>

                    <div className={`${style.formInput}`}>
                        <Lock />
                        <input type="password" placeholder="Contraseña" />
                    </div>

                    <div className={`${style.formButton}`}>
                        <button type="submit">Iniciar Sesión</button>
                        <a href="">¿Olvidaste tú contraseña?</a>
                    </div>
                </form>
            </section>
        </div>
    );
};
