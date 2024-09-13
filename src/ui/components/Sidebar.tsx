// Sidebar.tsx
import {Building2, House, LogOut, User} from "lucide-react";
import {useNavigate} from "react-router-dom";
import "../style/sidebar.css";

export const Sidebar = () => {
	const navigate = useNavigate();

	const handleLogOut = async () => {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch("http://localhost:3000/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				localStorage.removeItem("token");
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
				<li onClick={handleLogOut}>
					<LogOut />
					Cerrar Sesión
				</li>
			</ul>
		</section>
	);
};
