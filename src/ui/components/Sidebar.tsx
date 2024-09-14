import { Building2, House, LogOut, User } from "lucide-react";
import style from "../style/sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

const logo = "/assets/logoLogin.svg";

export const Sidebar = () => {
    const location = useLocation();
    return (
        <section className={`${style.sidebar}`}>
            <div className={`${style.sidebarImage}`}>
                <img src={logo} alt="Logo" />
            </div>
            <ul>
                <Link
                    to="/home"
                    className={`${location.pathname === "/home" ? `${style.sidebarSelected}` : ""} non-selected`}
                >
                    <li>
                        <House />
                        Inicio
                    </li>
                </Link>

                <Link
                    to="/profile"
                    className={`${location.pathname === "/profile" ? `${style.sidebarSelected}` : ""} non-selected`}
                >
                    <li>
                        <User />
                        Perfil
                    </li>
                </Link>

                <Link
                    to="/build"
                    className={`${location.pathname === "/build" ? `${style.sidebarSelected}` : ""} non-selected`}
                >
                    <li>
                        <Building2 />
                        Edificios
                    </li>
                </Link>

                <Link
                    to="/login"
                    className={`${location.pathname === "/login" ? `${style.sidebarSelected}` : ""} non-selected`}
                >
                    <li>
                        <LogOut />
                        Cerrar Sesión
                    </li>
                </Link>
            </ul>
        </section>
    );
};
