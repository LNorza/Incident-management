import { Plus } from "lucide-react";
import { AddBuildModal, BuildContent } from "../components/BuildPageContent";
import style from "../style/BuildContainer.module.css";
import { useState } from "react";

export const BuildingPage = () => {
    const [showModal, setShowModal] = useState(false);

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
                    <button onClick={onOpenModal} className={`${style.buildButton}`}>
                        <Plus strokeWidth={1.75} />
                        Agregar
                    </button>
                </section>
                <BuildContent />
            </div>

            <AddBuildModal isOpen={showModal} onClose={onCloseModal} />
        </>
    );
};
