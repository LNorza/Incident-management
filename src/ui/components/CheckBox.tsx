import { useId } from "react";
import style from "../style/checkbox.module.css";

interface Props {
    checked?: boolean; // Prop para indicar si está seleccionado
    setChecked?: (checked: boolean) => void; // Función para manejar el cambio
}

export const CustomCheckBox = ({ checked, setChecked = () => false }: Props) => {
    const id = useId(); // Genera un ID único

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked; // Obtiene el valor del checkbox
        setChecked(value); // Llama a setChecked con el nuevo valor
    };

    return (
        <>
            <input
                type="checkbox"
                id={`checkboxInput-${id}`}
                className={style.checkboxInput}
                checked={checked} // Controla el estado del checkbox
                onChange={handleChange} // Maneja el cambio
            />
            <label htmlFor={`checkboxInput-${id}`} className={style.toggleSwitch}></label>
        </>
    );
};
