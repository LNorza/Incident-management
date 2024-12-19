import React from 'react'
import styles from '../style/customInput.module.css'

interface Props {
    icon?: React.ReactNode
    name?: string
    placeholder?: string
    type?: string
    value?: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    isFormInput?: boolean
}

export const CustomTextArea = ({ isFormInput, onChange, ...props }: Props) => {
    return (
        <textarea
            {...props}
            className={`${styles.textarea} ${isFormInput ? styles.form : ''}`}
            onChange={onChange || (() => {})}
        />
    )
}
