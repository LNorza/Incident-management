import { useId, useState } from "react";
import style from "../style/select.module.css";

export const CustomSelect = () => {
    const id = useId(); // Genera un ID único
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Seleccione una opción"); // Texto inicial

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option); // Actualizar el texto seleccionado
        setIsOpen(false); // Cerrar el menú después de seleccionar
    };

    return (
        <div className={style.select}>
            <div className={`${style.selected} ${isOpen ? style.active : ""}`} onClick={toggleOptions}>
                <span>{selectedOption}</span> {/* Mostrar el texto seleccionado */}
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className={style.arrow}>
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
            </div>

            {isOpen && (
                <div className={style.options}>
                    {/* En el title se puede poner las opciones que hay */}
                    <div title="option-1">
                        <input
                            id={`option-${id}`}
                            name="option"
                            type="radio"
                            onClick={() => handleOptionClick("Option 1")}
                        />
                        <label className={style.option} htmlFor={`option-${id}`} data-txt="option-1" />
                    </div>
                    <div title="option-2">
                        <input
                            id={`option-${id}`}
                            name="option"
                            type="radio"
                            onClick={() => handleOptionClick("Option 2")}
                        />
                        <label className={style.option} htmlFor={`option-${id}`} data-txt="option-2" />
                    </div>
                    <div title="option-3">
                        <input
                            id={`option-${id}`}
                            name="option"
                            type="radio"
                            onClick={() => handleOptionClick("Option 3")}
                        />
                        <label className={style.option} htmlFor={`option-${id}`} data-txt="option-3" />
                    </div>
                </div>
            )}
        </div>
    );
};
