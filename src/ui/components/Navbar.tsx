import { SearchHere } from './SearchHere'
import { ProfileOptions } from './ProfileModal'
import style from '../style/navbar.module.css'

export const Navbar = () => {
    return (
        <section className={`${style.navbar}`}>
            <SearchHere />
            <ProfileOptions />
        </section>
    )
}
