import {Building2, House, LogOut, User} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "../style/sidebar.module.css";

const logo = "/assets/logoLogin.svg";

export const Sidebar = () => {
	const location = useLocation();
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
			<img src={logo} alt="Logo" className={`${style.sidebarImage}`} />
			<ul>
				<Link to="/home" className={`${location.pathname === "/home" ? `${style.sidebarSelected}` : `${style.nonSelected}`}`}>
					<li>
						<House />
						Inicio
					</li>
				</Link>

				<Link to="/profile" className={`${location.pathname === "/profile" ? `${style.sidebarSelected}` : `${style.nonSelected}`} `}>
					<li>
						<User />
						Perfil
					</li>
				</Link>

				<Link to="/build" className={`${location.pathname === "/build" ? `${style.sidebarSelected}` : `${style.nonSelected}`} `}>
					<li>
						<Building2 />
						Edificios
					</li>
				</Link>

				<div onClick={handleLogOut} className={`${location.pathname === "/login" ? `${style.sidebarSelected}` : `${style.nonSelected}`} `}>
					<li>
						<LogOut />
						Cerrar Sesión
					</li>
				</div>
			</ul>
		</section>
	);
};
