import { useState } from 'react'
import { CustomInput, CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { Plus } from 'lucide-react'
import { DeviceTable, SparePartsTable } from '../components'

export const SparePartsPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    // const [typeModal, setTypeModal] = useState<>()
    const onOpenModal = () => {
        // setTypeModal('AddDevice')
        // setDeviceId(undefined)
        setShowModal(true)
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Piezas de respuesto</h2>
                    <article>
                        <span>Equipo</span>
                        <div className={style.actionSection}>
                            <CustomInput
                                placeholder="Buscar equipo"
                                // value={search}
                                onChange={(e) => e.target.value}
                            />
                            {/* <CustomSelect menu value={building} options={buildingsOptions} onSelect={handleSelect} /> */}
                            {/* {userRole === 'TECHNICIAN' ? (
                                <></>
                            ) : (
                                <button onClick={onOpenModal} className={style.button}>
                                    <Plus /> Agregar
                                </button>
                            )} */}

                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <SparePartsTable
                    // refresh={refreshTable}
                    // building={building}
                    // editDevice={handleEditModal}
                    // deleteDevice={handleDeleteModal}
                    />
                </section>

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
