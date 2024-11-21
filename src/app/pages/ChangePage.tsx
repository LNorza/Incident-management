import { useState } from 'react'
import style from '../style/deviceContainer.module.css'
import { ChangeTable } from '../components'
// import { SparePartModal, SparePartsTable } from '../components'

export const ChangePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    const onOpenModal = () => {
        // setTypeModal('AddDevice')
        // setDeviceId(undefined)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setRefreshTable(true)
        setShowModal(false)
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Solicitudes de cambios</h2>
                </section>

                <section>
                    <ChangeTable />
                </section>
            </div>
        </>
    )
}
