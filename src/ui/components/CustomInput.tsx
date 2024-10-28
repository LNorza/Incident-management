import React, { useState, InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react' // Importamos ambos iconos
import styles from '../style/customInput.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
    password?: boolean
    name?: string
    placeholder?: string
    type?: string
    value?: string
    color?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    autocomplete?: string
    isFormInput?: boolean
}

export const CustomInput = ({ icon, isFormInput, color, password, ...props }: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <div className={` ${styles.inputContainer}  ${icon ? styles.icon : ''}`}>
            {icon && <span className={`${styles.inputIcon} ${icon ? styles.icon : ''}`}>{icon}</span>}
            <input
                {...props}
                type={password && !showPassword ? 'password' : 'text'}
                className={`${styles.inputField} ${isFormInput ? styles.form : ''} ${
                    color != undefined ? `${color == 'g' ? styles.greencolor : styles.redcolor}` : ''
                }`}
            />
            {password && (
                <span className={`${styles.inputIcon} ${styles.password} `} onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff /> : <Eye />}
                </span>
            )}
        </div>
    )
}
