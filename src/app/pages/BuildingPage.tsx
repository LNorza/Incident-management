import { Building, ChevronDown, Plus } from "lucide-react";
import style from "../style/BuildContainer.module.css";
import { useState } from "react";

export const BuildingPage = () => {
    const [showInfo, setShowInfo] = useState(false);

    const handleShowInfo = () => {
        setShowInfo(!showInfo);
    };

    return (
        <div className={`${style.container}`}>
            <section className={`${style.headerBuild}`}>
                <span>Edificios</span>
                <button className={`${style.buildButton}`}>
                    <Plus strokeWidth={1.75} />
                    Agregar
                </button>
            </section>

            <section className={`${style.dropdownContainer}`}>
                <article onClick={handleShowInfo} className={`${style.dropdownBuild}`}>
                    <div className={`${style.dropdownTitle}`}>
                        <span>
                            <Building strokeWidth={1.75} />
                            Edificio A
                        </span>
                        <button className={`${style.buildButton}`}>
                            <ChevronDown />
                        </button>
                    </div>

                    <div className={`${style.dropDownInfoContainer} ${showInfo ? style.showInfo : ""}`}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo
                            doloribus quaerat, magni numquam repellat reprehenderit.
                        </p>
                    </div>
                </article>
                <article onClick={handleShowInfo} className={`${style.dropdownBuild}`}>
                    <div className={`${style.dropdownTitle}`}>
                        <span>
                            <Building strokeWidth={1.75} />
                            Edificio A
                        </span>
                        <button className={`${style.buildButton}`}>
                            <ChevronDown />
                        </button>
                    </div>

                    <div className={`${style.dropDownInfoContainer} ${showInfo ? style.showInfo : ""}`}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est dolore illo dolores quia nemo
                            doloribus quaerat, magni numquam repellat reprehenderit.
                        </p>
                    </div>
                </article>
            </section>
        </div>
    );
};
