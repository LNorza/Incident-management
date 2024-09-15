import {Bell, ChevronDown, CircleUser} from "lucide-react";
import {SearchHere} from "./SearchHere";
import style from "../style/navbar.module.css";

export const Navbar = () => {
	return (
		<section className={`${style.navbar}`}>
			<SearchHere />
			<div className={`${style.navbarIcons}`}>
				<Bell size={28} />

				<CircleUser size={34} />

				<ChevronDown size={24} />
			</div>
		</section>
	);
};
