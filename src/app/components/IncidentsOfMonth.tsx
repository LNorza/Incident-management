import {CircleAlert, RotateCwSquare} from "lucide-react";
import style from "../style/cardContainer.module.css";

export const IncidentsOfMonth = () => {
	const toolIcon = "/assets/toolIcon.png";
	const maintenanceIcon = "/assets/maintanceIcon.png";

	return (
		<div className={`${style.containerCards}`}>
			<div className={`${style.tinyCard}`}>
				<div className={`${style.tinyCardIcon}`}>
					<CircleAlert color="#c84242" size={64} />
				</div>

				<div className={`${style.tinyCardSubtext}`}>
					<h3>15</h3>
					<h4>Incidencias</h4>
					<p className={`${style.p1}`}>+1 incidencia con respecto al mes pasado</p>
				</div>
			</div>

			<div className={`${style.tinyCard}`}>
				<div className={`${style.tinyCardIcon}`}>
					<img src={toolIcon} alt="" />
				</div>

				<div className={`${style.tinyCardSubtext}`}>
					<h3>2</h3>
					<h4>Reparaciones</h4>
					<p className={`${style.p2}`}>+1 reparación con respecto al mes pasado</p>
				</div>
			</div>

			<div className={`${style.tinyCard}`}>
				<div className={`${style.tinyCardIcon}`}>
					<RotateCwSquare color="#f2c8ed" size={64} />
				</div>

				<div className={`${style.tinyCardSubtext}`}>
					<h3>3</h3>
					<h4>Reparaciones en curso</h4>
					<p className={`${style.p3}`}>+2 reparaciones en curso al mismo tiempo</p>
				</div>
			</div>

			<div className={`${style.tinyCard}`}>
				<div className={`${style.tinyCardIcon}`}>
					<img src={maintenanceIcon} alt="" />
				</div>

				<div className={`${style.tinyCardSubtext}`}>
					<h3>15</h3>
					<h4>Mantenimientos</h4>
					<p className={`${style.p4}`}>+4 mantenimientos completados con respecto al mes pasado</p>
				</div>
			</div>
		</div>
	);
};
