import { useState } from "react";
import { BuildContent, BuildModal } from "../components";
import { Plus } from "lucide-react";
import style from "../style/BuildContainer.module.css";
import { BuildModalType } from "../../utils";

export const BuildingPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState<BuildModalType>();

    const handleTypeModal = (modalType: BuildModalType) => {
        setTypeModal(modalType);
        onOpenModal();
    };

    const onOpenModal = () => {
        setShowModal(true);
    };
    const onCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className={`${style.container}`}>
                <section className={`${style.headerBuild}`}>
                    <span>Edificios</span>
                    <button onClick={() => handleTypeModal("AddBuild")} className={`${style.buildButton}`}>
                        <Plus strokeWidth={1.75} />
                        Agregar
                    </button>
                </section>
                <BuildContent setTypeModal={handleTypeModal} />
            </div>

            <BuildModal isOpen={showModal} type={typeModal} onClose={onCloseModal} />
        </>
    );
};
