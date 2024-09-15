import React, {InputHTMLAttributes} from "react";
import styles from "../style/customInput.module.css";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
	icon: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({icon, ...props}) => {
	return (
		<div className={styles.inputContainer}>
			<span className={styles.inputIcon}>{icon}</span>
			<input {...props} className={styles.inputField} />
		</div>
	);
};

export default CustomInput;
