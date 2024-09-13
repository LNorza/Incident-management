import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Lock, User} from "lucide-react";
import style from "../style/authStyle.module.css";
interface LoginForm {
	username: string;
	password: string;
}

const logoLogin = "/assets/logoLogin.svg";

export const Login = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<LoginForm>({
		username: "",
		password: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				localStorage.setItem("token", data.token);
				navigate("/build");
				console.log("Login exitoso, token recibido:", data.token);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className={`${style.authContainer}`}>
			<section className={`${style.mainAuthContainer}`}>
				<img src={logoLogin} alt="Logo de login" />

				<form className={`${style.formAuth}`}>
					<div className={`${style.formInput}`}>
						<User />
						<input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleInputChange} />
					</div>

					<div className={`${style.formInput}`}>
						<Lock />
						<input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} />
					</div>

					<div className={`${style.formButton}`}>
						<button type="submit" onClick={handleSubmit}>
							Iniciar Sesión
						</button>
						<a href="">¿Olvidaste tú contraseña?</a>
					</div>
				</form>
			</section>
		</div>
	);
};
