import { useState } from 'react'
import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'

export const UserPage = () => {
    const [users, setUsers] = useState<string>('ALL')
    const [refreshTable, setRefreshTable] = useState(false)
    const [usersOptions, setUsersOptions] = useState<{ label: string; value: string }[]>([])

    const handleSelect = (selected: { label: string; value: string }) => {
        console.log(selected)
        setUsers(selected.value)
        setRefreshTable(true)
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Equipos</h2>
                    <article>
                        <span>Edificio</span>
                        <div className={style.actionSection}>
                            <CustomSelect value={users} options={usersOptions} onSelect={handleSelect} />
                            {/* <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button> */}
                        </div>
                    </article>
                </section>

                <section>hola</section>

                {/* <section>
                    <DeviceTable
                        refresh={refreshTable}
                        building={building}
                        editDevice={handleEditModal}
                        deleteDevice={handleDeleteModal}
                    />
                </section> */}
            </div>
        </>
    )
}
