import { useCallback, useEffect, useState } from 'react'
// import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { Plus } from 'lucide-react'
import { ServicesModal, ServicesTable } from '../components'
import { API_BASE_URL, getUserRole, IServices, ServicesType } from '../../utils'

export const ServicesPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    const [typeModal, setTypeModal] = useState<ServicesType | undefined>(undefined)
    const [serviceData, setServiceData] = useState<IServices | undefined>(undefined)
    const [serviceId, setServiceId] = useState<string | undefined>(undefined)
    const [deleteName, setDeleteName] = useState<string>('')
    const [userRole, setUserRole] = useState<string | null>(null)

    const fetchRole = useCallback(async () => {
        const role = await getUserRole()
        setUserRole(role)
    }, [])

    const onOpenModal = () => {
        setTypeModal('AddService')
        setServiceData(undefined)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleEditModal = (serviceData: IServices) => {
        setTypeModal('EditService')
        setServiceData(serviceData)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (serviceId: string, serviceName: string) => {
        setTypeModal('DeleteService')
        setServiceId(serviceId)
        setDeleteName(serviceName)
        setRefreshTable(false)
        setShowModal(true)
    }

    const InfoModal = (serviceData: IServices) => {
        setTypeModal('InfoService')
        setServiceData(serviceData)
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setRefreshTable(true)
        setShowModal(false)
    }

    useEffect(() => {
        fetchRole()
    }, [fetchRole])

    const deleteSparePart = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar el servicio')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Catalogo de servicios</h2>
                    <article>
                        {/* <span>Equipo</span> */}
                        <div className={style.actionSection}>
                            {/* <CustomSelect
                                menu
                                value={device}
                                options={deviceOptions}
                                onSelect={(selected: { label: string; value: string }) => {
                                    setDevice(selected.value)
                                }}
                            /> */}
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
                    <ServicesTable
                        refresh={refreshTable}
                        editService={handleEditModal}
                        deleteService={handleDeleteModal}
                        infoService={InfoModal}
                    />
                </section>

                <ServicesModal
                    isOpen={showModal}
                    onClose={onCloseModal}
                    typeModal={typeModal}
                    servicesData={serviceData}
                    name={deleteName}
                    deleteFunction={deleteSparePart}
                />
            </div>
        </>
    )
}
