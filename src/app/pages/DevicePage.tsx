import { useState, useEffect } from 'react'
import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { DeviceTable } from '../components'
import { Plus } from 'lucide-react'
import API_BASE_URL from '../../utils/api/apiConfig'
import { DeviceModal } from '../components/DevicePageContent/DeviceModal'
import { DeviceModalType } from '../../utils'

export const DevicePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [refreshTable, setRefreshTable] = useState(false)
    const [typeModal, setTypeModal] = useState<DeviceModalType>()
    const [deviceId, setDeviceId] = useState<string | undefined>(undefined)
    const [deleteName, setDeleteName] = useState<string>('')

    const optionTemp = [
        { label: 'Todos', value: 'ALL' },
        { label: 'Edificio A', value: 'BUILDING_A' },
        { label: 'Edificio B', value: 'BUILDING_B' },
        { label: 'Edificio C', value: 'BUILDING_C' },
    ]

    const onOpenModal = () => {
        setTypeModal('AddDevice')
        setDeviceId(undefined)
        setShowModal(true)
    }

    const handleEditModal = (deviceId: string) => {
        setTypeModal('EditDevice')
        setDeviceId(deviceId)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (deviceId: string, deviceName: string) => {
        setTypeModal('DeleteDevice')
        setDeviceId(deviceId)
        setDeleteName(deviceName)
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setDeviceId(undefined)
        setDeleteName('')
        setRefreshTable(true)
        setShowModal(false)
    }

    useEffect(() => {
        if (refreshTable) {
            setRefreshTable(false)
        }
    }, [refreshTable])

    const handleSelect = (selected: { label: string; value: string }) => {
        console.log(selected)
    }

    const deleteDevice = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar edificio')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
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
                    <DeviceTable refresh={refreshTable} editDevice={handleEditModal} deleteDevice={handleDeleteModal} />
                </section>
            </div>

            <DeviceModal
                isOpen={showModal}
                onClose={onCloseModal}
                type={typeModal}
                deviceId={deviceId}
                deleteName={deleteName}
                deleteFunction={deleteDevice}
            />
        </>
    )
}
