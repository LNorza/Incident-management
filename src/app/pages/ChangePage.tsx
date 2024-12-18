import { useState } from 'react'
import { ChangeModal, ChangeTable } from '../components'
import { ChangeModalType } from '../../utils'
import style from '../style/deviceContainer.module.css'

export const ChangePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState<ChangeModalType>()
    const [refreshTable, setRefreshTable] = useState(false)
    const [actionModal, setActionModal] = useState<string | undefined>('')
    const [changeId, setChangeId] = useState<string | undefined>()

    const handleTypeModal = (id: string, type: ChangeModalType = 'InfoChange', action?: string) => {
        setActionModal(action)
        setChangeId(id)
        setTypeModal(type)
        setShowModal(true)
    }

    // const onOpenModal = () => {
    //     setTypeModal('InfoChange')
    //     setShowModal(true)
    // }

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
                    <ChangeTable refresh={refreshTable} typeChangeModal={handleTypeModal} />
                </section>
            </div>

            <ChangeModal
                isOpen={showModal}
                changeId={changeId}
                onClose={onCloseModal}
                type={typeModal}
                actionModal={actionModal}
            />
        </>
    )
}
