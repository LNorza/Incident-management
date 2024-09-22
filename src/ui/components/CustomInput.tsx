import React, { InputHTMLAttributes } from 'react'
import styles from '../style/customInput.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
    name?: string
    placeholder?: string
    type?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    autocomplete?: string
    isFormInput?: boolean
}

export const CustomInput = ({ icon, isFormInput, ...props }: Props) => {
    return (
        <div className={styles.inputContainer}>
            <span className={styles.inputIcon}>{icon}</span>
            <input {...props} className={`${styles.inputField} ${isFormInput ? styles.form : ''}`} />
        </div>
    )
}
