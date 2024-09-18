import { Plus } from "lucide-react";
import { BuildContent } from "../components";
import style from "../style/BuildContainer.module.css";

export const BuildingPage = () => {
    return (
        <>
            <div className={`${style.container}`}>
                <section className={`${style.headerBuild}`}>
                    <span>Edificios</span>
                    <button className={`${style.buildButton}`}>
                        <Plus strokeWidth={1.75} />
                        Agregar
                    </button>
                </section>
                <BuildContent />
            </div>
        </>
    );
};
