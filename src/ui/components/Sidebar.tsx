import {Building2, House, LogOut, User} from "lucide-react";
import {useNavigate} from "react-router-dom";
import style from "../style/sidebar.module.css";
const logo = "/assets/logoLogin.svg";

export const Sidebar = () => {
	const navigate = useNavigate();

	const handleLogOut = async () => {
		try {
			const response = await fetch("http://localhost:3000/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			if (response.ok) {
				navigate("/login");
				console.log("Logout exitoso");
			} else {
				const data = await response.json();
				console.error("Error en el logout:", data.message);
			}
		} catch (error) {
			console.error("Error de red o del servidor:", error);
		}
	};

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
				<li onClick={handleLogOut}>
					<LogOut />
					Cerrar Sesión
				</li>
			</ul>
		</section>
	);
};
