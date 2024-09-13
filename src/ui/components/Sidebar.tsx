import { Building2, House, LogOut, User } from "lucide-react";
import "../style/sidebar.css";

export const Sidebar = () => {
    return (
        <section className="sidebar">
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
