import { useCallback, useEffect, useState } from 'react'
import { CustomInput, CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { Plus } from 'lucide-react'
import { SparePartModal, SparePartsTable } from '../components'
import { getDeviceTypeOptions, getUserRole, IOptions } from '../../utils'

export const SparePartsPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)

    const [device, setDevice] = useState<string>()
    const [userRole, setUserRole] = useState<string | null>(null)

    const [deviceOptions] = useState<IOptions[]>(getDeviceTypeOptions)

    const fetchRole = useCallback(async () => {
        const role = await getUserRole()
        setUserRole(role)
    }, [])

    const onOpenModal = () => {
        // setTypeModal('AddDevice')
        // setDeviceId(undefined)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setRefreshTable(true)
        setShowModal(false)
    }

    useEffect(() => {
        fetchRole()
    }, [])

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Piezas de respuesto</h2>
                    <article>
                        <span>Equipo</span>
                        <div className={style.actionSection}>
                            <CustomSelect
                                menu
                                value={device}
                                options={deviceOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setDevice(selected.value)
                                }}
                                placeholder="Todos"
                            />
                            {userRole === 'TECHNICIAN' ? (
                                <></>
                            ) : (
                                <button onClick={onOpenModal} className={style.button}>
                                    <Plus /> Agregar
                                </button>
                            )}
                        </div>
                    </article>
                </section>

                <section>
                    <SparePartsTable />
                </section>

                <SparePartModal isOpen={showModal} onClose={onCloseModal} />
            </div>
        </>
    )
}
