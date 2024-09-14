import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar } from "../../ui";
import { BuildingPage, Dashboard } from "../pages";
import style from "../style/appContainer.module.css";

export const GestorRoute = () => {
    return (
        <>
            <Sidebar />
            <Navbar />

            <div className={`${style.container}`}>
                <Routes>
                    {/* Rutas de la aplicación */}
                    <Route path="home" element={<Dashboard />} />
                    <Route path="build" element={<BuildingPage />} />

                    {/* Routa default */}
                    <Route path="/*" element={<Navigate to={"/home"} />} />
                </Routes>
            </div>
        </>
    );
};
