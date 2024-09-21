import { Building, ChevronDown, Ellipsis, Pencil, Plus, Trash2 } from "lucide-react";
import style from "../../style/BuildContainer.module.css";
import { BuildModalType } from "../../../utils";
import { useState } from "react";

interface Props {
    setTypeModal: (modalType: BuildModalType) => void;
}

export const BuildContent = ({ setTypeModal }: Props) => {
    const [showInfo, setShowInfo] = useState(false);

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    };
    return (
        <section className={`${style.dropdownContainer}`}>
            <article onClick={handleShowInfo} className={`${style.dropdownBuild}`}>
                {/* Title of dropdown */}
                <section className={`${style.dropdownTitle} ${style.dropdownTitlePadding}`}>
                    <span>
                        <Building strokeWidth={1.75} />
                        Edificio A
                    </span>
                    <button className={`${style.buildButton}`}>
                        <ChevronDown />
                    </button>
                </section>

                {/* Dropdown content */}
                <section className={`${style.dropDownInfoContainer} ${showInfo ? style.showInfo : ""}`}>
                    <div className={`${style.dropdownTitle}`}>
                        <span>
                            Total de Equipos: <span className={`${style.p2}`}>38</span>
                        </span>
                        <div className={`${style.dropdownTitle}`}>
                            <button className={`${style.buildButton}`}>
                                <Pencil />
                                Editar edificio
                            </button>
                            <button className={`${style.buildButton}`}>
                                <Trash2 />
                                Borrar edificio
                            </button>
                        </div>
                    </div>

                    <ul className={`${style.buildInfo}`}>
                        <li>
                            Oficinas/Salones
                            <button onClick={() => setTypeModal("AddOfficeClass")} className={`${style.buildButton}`}>
                                <Plus />
                                Agregar oficina/salon
                            </button>
                        </li>
                        <li>
                            Salon Sa
                            <div>
                                <span>
                                    Equipos: <span className={`${style.p2}`}>36</span>
                                </span>
                                <Ellipsis />
                            </div>
                        </li>
                        <li>
                            {" "}
                            Oficina Marisol
                            <div>
                                <span>
                                    Equipos: <span className={`${style.p2}`}>2</span>
                                </span>
                                <Ellipsis />
                            </div>
                        </li>
                    </ul>
                </section>
            </article>
        </section>
    );
};
