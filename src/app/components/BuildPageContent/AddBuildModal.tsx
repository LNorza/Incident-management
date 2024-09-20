import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { CustomCheckBox, CustomSelect } from "../../../ui";
import CustomInput from "../../../ui/components/CustomInput";
import style from "../../style/modal.module.css";
import { Building } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AddBuildModal = ({ isOpen, onClose }: Props) => {
    const { onInputChange } = useForm({});
    const [shareBuilding, setShareBuilding] = useState(false);

    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.modalInfoContainer}>
                        <div className={style.titleModal}>
                            <Building size={30} />
                            <h2>Agregar edificio</h2>
                        </div>
                        <div className={style.modalDetail}>
                            <section>
                                ¿El edificio comparte departamento?
                                <CustomCheckBox
                                    checked={shareBuilding} // Controla el estado
                                    setChecked={setShareBuilding} // Actualiza el estado
                                />
                            </section>

                            {shareBuilding != false && (
                                <>
                                    <section>
                                        Edificio
                                        <CustomSelect />
                                    </section>

                                    <section>
                                        ¿El edificio se encuentra en las opciones?
                                        <CustomCheckBox />
                                    </section>
                                </>
                            )}

                            <section>
                                Nombre
                                <CustomInput
                                    name="name"
                                    placeholder="Escribe nombre aqui..."
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="nameBuilding"
                                />
                            </section>

                            <div className={style.modalButtonContainer}>
                                <button className={style.cancelButton}>Cancelar</button>

                                <button className={style.saveButton}>Guardar</button>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
    return <div>AddBuildModal</div>;
};
