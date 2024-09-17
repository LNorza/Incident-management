import { CalendarRange, UserRound } from "lucide-react";
import { AreaChart, IncidentsOfMonth, SemiCircleChart } from "../components";
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
                                <h4>Usuario</h4>
                                <p className={`${style.pSubTitle}`}>Lionel Andrés Messi Cuccittini</p>
                            </div>
                        </div>
                        <div className={`${style.smallCardPeriod}`}>
                            <div className={`${style.smallCardPeriodIcon}`}>
                                <CalendarRange color="#feaf5a" size={64} />
                            </div>

                            <div>
                                <h4>Periodo</h4>
                                <p className={`${style.pSubTitle} ${style.pSmall}`}>AGO-DEC 2024</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            <section className={`${style.container} animate__animated animate__fadeInDown`}>
                <section className={`${style.middleCard} `}>
                    <div>
                        <h2>Equipos</h2>
                        <p className={`${style.pSubTitle}`}>Total de equipos</p>
                        <h1 className={`${style.p2}`}>235</h1>
                        <p className={`${style.pMiddleSubTitle}`}>Equipos funcionando</p>
                    </div>
                    <SemiCircleChart />
                </section>
                <section className={`${style.largeCard}`}>
                    <div>
                        <h2>Incidencias</h2>
                        <p className={`${style.pSubTitle}`}>Incidencias ocurridas</p>
                    </div>
                    <AreaChart />
                </section>
            </section>
        </>
    );
};
