import { useState } from 'react'
import { IOptions, UserModalType } from '../../utils'
import { CustomSelect } from '../../ui'
import style from '../style/deviceContainer.module.css'
import { Plus } from 'lucide-react'
import { UserTable } from '../components'
import { UserModal } from '../components/UserPageContent/UserModal'

export const UserPage = () => {
    const [users, setUsers] = useState<string>('ALL')
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState<UserModalType>('AddUser')
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [refreshTable, setRefreshTable] = useState(false)
    const [usersOptions, setUsersOptions] = useState<IOptions[]>([])

    const handleSelect = (selected: { label: string; value: string }) => {
        setUsers(selected.value)
        setRefreshTable(true)
    }

    const onOpenModal = () => {
        // setTypeModal('Agrega el tipo si es que hay')
        // setDeviceId(undefined)
        setShowModal(true)
    }

    const onCloseModal = () => {
        // setDeviceId(undefined)
        // setDeleteName('')
        setRefreshTable(true)
        setShowModal(false)
    }

    const handleEditModal = (deviceId: string) => {
        // setTypeModal('EditDevice')
        // setDeviceId(deviceId)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (deviceId: string, deviceName: string) => {
        // setTypeModal('DeleteDevice')
        // setDeviceId(deviceId)
        // setDeleteName(deviceName)
        setRefreshTable(false)
        setShowModal(true)
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Usuarios</h2>
                    <article>
                        <span>Edificio</span>
                        <div className={style.actionSection}>
                            <CustomSelect
                                value={users}
                                options={usersOptions}
                                onSelect={handleSelect}
                                placeholder="Todos"
                            />
                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <UserTable
                        refresh={refreshTable}
                        building={users}
                        editDevice={handleEditModal}
                        deleteDevice={handleDeleteModal}
                    />
                </section>
            </div>

            <UserModal
                isOpen={showModal}
                onClose={onCloseModal}
                type={typeModal}
                // deviceId={deviceId}
                // deleteName={deleteName}
                // deleteFunction={deleteDevice}
            />
        </>
    )
}
