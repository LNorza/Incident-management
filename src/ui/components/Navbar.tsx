import { Bell, ChevronDown, CircleUser } from "lucide-react";
import { SearchHere } from "./SearchHere";
import style from "../style/navbar.module.css";

export const Navbar = () => {
    return (
        <section className={`${style.navbar}`}>
            <SearchHere />
            <div className={`${style.navbarIcons}`}>
                <Bell />

                <div>
                    <CircleUser />
                    <ChevronDown />
                </div>
            </div>
        </section>
    );
};
