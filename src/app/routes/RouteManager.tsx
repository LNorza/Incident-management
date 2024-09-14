import { Navigate, Route, Routes } from "react-router-dom";
import { BuildingPage } from "../pages/BuildingPage";
import { Navbar, Sidebar } from "../../ui";
import { Dashboard } from "../pages";
import style from "../style/appContainer.module.css";

export const RouteManager = () => {
    return (
        <>
            <Sidebar />
            <Navbar />

            <div className={`${style.container}`}>
                <Routes>
                    <Route path="home" element={<Dashboard />} />
                    <Route path="build" element={<BuildingPage />} />

                    {/* DefaultRoute */}
                    <Route path="/*" element={<Navigate to={"/home"} />} />
                </Routes>
            </div>
        </>
    );
};
