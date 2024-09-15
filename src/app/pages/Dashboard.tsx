import { CalendarRange, UserRound } from "lucide-react";
import { AreaChart, IncidentsOfMonth } from "../components";
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
                        <h2>Perfil</h2>
                        <p className={`${style.pSubTitle}`}>Información de usuario</p>
                    </div>

                    <div className={`${style.smallCard}`}>
                        <div className={`${style.smallCardUser}`}>
                            <div className={`${style.smallCardUserIcon}`}>
                                <UserRound color="#feaf5a" size={64} />
                            </div>

                            <div>
                                <h2>Usuario</h2>
                                <p className={`${style.pSubTitle}`}>Lionel Andrés Messi Cuccittini</p>
                            </div>
                        </div>
                        <div className={`${style.smallCardPeriod}`}>
                            <div className={`${style.smallCardPeriodIcon}`}>
                                <CalendarRange color="#feaf5a" size={64} />
                            </div>

                            <div>
                                <h2>Periodo</h2>
                                <p className={`${style.pSubTitle}`}>AGO-DEC 2024</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className={`${style.container} animate__animated animate__fadeInDown`}>
                <section className={`${style.middleCard}`}>
                    <div>
                        <h2>Incidencias en este mes</h2>
                        <p className={`${style.pSubTitle}`}>Resumen general</p>
                    </div>
                </section>
                <section className={`${style.largeCard}`}>
                    <div>
                        <h2>Incidencias</h2>
                        <p className={`${style.pSubTitle}`}>Incidencias ocurridas</p>
                        <AreaChart />
                    </div>
                </section>
            </section>
        </>
    );
};
