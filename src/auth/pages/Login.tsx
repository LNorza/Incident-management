import { useNavigate } from 'react-router-dom'
import { Lock, User } from 'lucide-react'
import { useForm } from '../../hooks/useForm'
import { CustomInput } from '../../ui'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import style from '../style/authStyle.module.css'

interface LoginForm {
    username: string
    password: string
}

const logoLogin = '/assets/logoLogin.svg'

export const Login = () => {
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const { username, password, formState, onInputChange } = useForm<LoginForm>({
        username: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (login) {
            login(formState)
            navigate('/build')
        }
    }

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
                            password
                        />
                    </div>

                    <div className={`${style.formButton}`}>
                        <button type="submit">INICIAR SESIÓN</button>
                        <a href="">¿Olvidaste tú contraseña?</a>
                    </div>
                </form>
            </section>
        </div>
    )
}
