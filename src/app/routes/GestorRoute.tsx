import { Navigate, Route, Routes } from "react-router-dom";
import BuildingPage from "../pages/BuildingPage";
import { Navbar, Sidebar } from "../../ui";

export const GestorRoute = () => {
    return (
        <>
            <Sidebar />
            <Navbar />

            <div className="container">
                <Routes>
                    <Route path="build" element={<BuildingPage />} />

                    {/* Routa default */}
                    <Route path="/" element={<Navigate to={"/build"} />} />
                </Routes>
            </div>
        </>
    );
};
