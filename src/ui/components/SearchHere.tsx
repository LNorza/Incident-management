import { Search } from "lucide-react";
import "../style/search.css";

export const SearchHere = () => {
    return (
        <div className="search-container">
            <Search />
            <input type="text" placeholder="Busca aquí..." />
        </div>
    );
};
