import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import styles from '../style/customInput.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
    name?: string
    placeholder?: string
    type?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    autocomplete?: string
    isFormInput?: boolean
}

export const CustomInput = ({ icon, type, isFormInput, ...props }: Props) => {
    return (
        <>
            {type === 'description' ? (
                <textarea
                    {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    className={`${styles.textarea} ${isFormInput ? styles.form : ''}`}
                    onChange={(e) => props.onChange(e as React.ChangeEvent<HTMLTextAreaElement>)} // Llamada a onChange general
                />
            ) : (
                <div className={` ${styles.inputContainer}  ${icon ? styles.icon : ''}`}>
                    {icon && <span className={`${styles.inputIcon} ${icon ? styles.icon : ''}`}>{icon}</span>}
                    <input {...props} className={`${styles.inputField} ${isFormInput ? styles.form : ''}`} />
                </div>
            )}
        </>
    )
}
