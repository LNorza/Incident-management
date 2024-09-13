import { Building2, House, LogOut, User } from "lucide-react";
import style from "../style/sidebar.module.css";

const logo = "/assets/logoLogin.svg";

export const Sidebar = () => {
    return (
        <section className={`${style.sidebar}`}>
            <img src={logo} alt="Logo" />
            <ul>
                <li>
                    <House />
                    Inicio
                </li>
                <li>
                    <User />
                    Perfil
                </li>
                <li>
                    <Building2 />
                    Edificios
                </li>
                <li>
                    <LogOut />
                    Cerrar Sesión
                </li>
            </ul>
        </section>
    );
};
