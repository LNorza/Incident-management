import { useCallback, useEffect, useState } from 'react'
import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { Plus } from 'lucide-react'
import { SparePartModal, SparePartsTable } from '../components'
import { getDeviceTypeOptions, getUserRole, IOptions, ISpareParts, SparePartsType, API_BASE_URL } from '../../utils'

export const SparePartsPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    const [typeModal, setTypeModal] = useState<SparePartsType | undefined>(undefined)
    const [sparePartData, setSparePartData] = useState<ISpareParts | undefined>(undefined)
    const [spareId, setSpareId] = useState<string | undefined>(undefined)
    const [deleteName, setDeleteName] = useState<string>('')
    const [userRole, setUserRole] = useState<string | null>(null)
    const [deviceOptions] = useState<IOptions[]>([{ label: 'Todos', value: 'ALL' }, ...getDeviceTypeOptions])
    const [device, setDevice] = useState<string>(deviceOptions[0].value)

    const fetchRole = useCallback(async () => {
        const role = await getUserRole()
        setUserRole(role)
    }, [])

    const onOpenModal = () => {
        setTypeModal('AddSparePart')
        setSparePartData(undefined)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleEditModal = (spareData: ISpareParts) => {
        setTypeModal('EditSparePart')
        setSparePartData(spareData)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (spareId: string, spareName: string) => {
        setTypeModal('DeleteSparePart')
        setSpareId(spareId)
        setDeleteName(spareName)
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setRefreshTable(true)
        setShowModal(false)
    }

    useEffect(() => {
        fetchRole()
    }, [])

    const deleteSparePart = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/spare-parts/${spareId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar la pieza de repuesto')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

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
                    <SparePartsTable
                        refresh={refreshTable}
                        device={device}
                        editSparePart={handleEditModal}
                        deleteSparePart={handleDeleteModal}
                    />
                </section>

                <SparePartModal
                    isOpen={showModal}
                    onClose={onCloseModal}
                    typeModal={typeModal}
                    sparePartData={sparePartData}
                    name={deleteName}
                    deleteFunction={deleteSparePart}
                />
            </div>
        </>
    )
}
