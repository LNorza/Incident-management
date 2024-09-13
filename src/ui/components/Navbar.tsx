import { Bell, ChevronDown, CircleUser } from "lucide-react";
import { SearchHere } from "./SearchHere";
import "../style/navbar.css";

export const Navbar = () => {
    return (
        <section className="navbar">
            <SearchHere />
            <div className="navbar-icons">
                <Bell />

                <div className="navbar-user">
                    <CircleUser />
                    <ChevronDown />
                </div>
            </div>
        </section>
    );
};
