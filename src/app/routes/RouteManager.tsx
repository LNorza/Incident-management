import {Navigate, Route, Routes} from "react-router-dom";
import BuildingPage from "../pages/BuildingPage";
import {Navbar, Sidebar} from "../../ui";

export const RouteManager = () => {
	return (
		<>
			<Sidebar />
			<Navbar />

			<div className="container">
				<Routes>
					<Route path="build" element={<BuildingPage />} />

					{/* DefaultRoute */}
					<Route path="/" element={<Navigate to={"/build"} />} />
				</Routes>
			</div>
		</>
	);
};
