import { CalendarRange } from "lucide-react";
import { IncidentsOfMonth } from "../components";
import style from "../style/cardContainer.module.css";

export const Dashboard = () => {
    return (
        <>
            <section className={`${style.container} animate__animated animate__fadeInDown`}>
                <section className={`${style.largeCard}`}>
                    <div>
                        <h2>Incidencias en este mes</h2>
                        <p className={`${style.pSubTitle}`}>Resumen general</p>
                    </div>

                    <IncidentsOfMonth />
                </section>

                <section className={`${style.middleCard}`}>
                    <div>
                        <h2>Usuario</h2>
                        <p>Alan Meza Valenzuela</p>
                    </div>

                    <div className={`${style.smallCard}`}>
                        <CalendarRange color="#feaf5a" size={84} />
                        <p>Periodo</p>
                        <h2>AGO-DEC 2024</h2>
                    </div>
                </section>
            </section>
        </>
    );
};
