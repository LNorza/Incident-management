import { Search } from 'lucide-react'
import style from '../style/search.module.css'

export const SearchHere = () => {
    return (
        <div className={`${style.searchContainer}`}>
            <Search />
            <input type="text" placeholder="Busca aquí..." autoComplete="search" />
        </div>
    )
}
