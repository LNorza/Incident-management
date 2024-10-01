import { useState } from 'react'
import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { DeviceTable } from '../components'
import { Plus } from 'lucide-react'
import { DeviceModal } from '../components/DevicePageContent/DeviceModal'

export const DevicePage = () => {
    //State de edificios temporal para el select
    const [showModal, setShowModal] = useState(false)

    const [optionTemp, setOptionTemp] = useState([
        { label: 'Edificio 1', value: '1' },
        { label: 'Edificio 2', value: '2' },
        { label: 'Edificio 3', value: '3' },
    ])

    const onOpenModal = () => {
        setShowModal(true)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    //Funcion para manejar el select (Temporal)
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
                            <CustomSelect textDefault="Todos" options={optionTemp} onSelect={handleSelect} />
                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <DeviceTable />
                </section>
            </div>

            <DeviceModal isOpen={showModal} onClose={onCloseModal} />
        </>
    )
}
