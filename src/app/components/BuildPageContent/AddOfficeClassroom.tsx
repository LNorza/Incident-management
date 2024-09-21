import { useState } from "react";
import { useForm } from "../../../hooks";
import { CustomCheckBox, CustomInput, CustomSelect } from "../../../ui";
import { Building } from "lucide-react";
import style from "../../style/modal.module.css";

interface Props {
    onClose: () => void;
}

export const AddOfficeClassroom = ({ onClose }: Props) => {
    const { onInputChange } = useForm({});
    const [shareBuilding, setShareBuilding] = useState(false);

    return (
        <>
            <div className={style.titleModal}>
                <Building size={30} />
                <h2>Agregar oficina/salón</h2>
            </div>

            <div className={style.modalDetail}>
                <section>
                    Nombre
                    <CustomInput
                        name="name"
                        placeholder="Escribe el nombre aqui..."
                        type="text"
                        onChange={onInputChange}
                        autoComplete="nameOffice"
                    />
                </section>

                <section>
                    Tipo
                    <CustomSelect />
                </section>

                <section>
                    Descripción
                    <CustomInput
                        name="description"
                        placeholder="Escribe la descripción aqui..."
                        type="text"
                        onChange={onInputChange}
                        autoComplete="descriptionOffice"
                    />
                </section>

                <div className={style.modalButtonContainer}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>

                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    );
};
