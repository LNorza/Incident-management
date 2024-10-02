import { useState } from 'react'
import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { DeviceTable } from '../components'
import { Plus } from 'lucide-react'
import { DeviceModal } from '../components/DevicePageContent/DeviceModal'

export const DevicePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    const optionTemp = [
        { label: 'Todos', value: 'ALL' },
        { label: 'Edificio A', value: 'BUILDING_A' },
        { label: 'Edificio B', value: 'BUILDING_B' },
        { label: 'Edificio C', value: 'BUILDING_C' },
    ]

    const onOpenModal = () => {
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
        setRefreshTable((prev) => !prev) // Alterna el valor de refreshTable
    }

    const handleSelect = (selected: { label: string; value: string }) => {
        console.log(selected)
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Equipos</h2>
                    <article>
                        <span>Edificio</span>
                        <div className={style.actionSection}>
                            <CustomSelect value={optionTemp[0].value} options={optionTemp} onSelect={handleSelect} />
                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <DeviceTable refresh={refreshTable} />
                </section>
            </div>

            <DeviceModal isOpen={showModal} onClose={onCloseModal} />
        </>
    )
}
