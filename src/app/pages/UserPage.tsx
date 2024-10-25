import { useEffect, useState } from 'react'
import { IOptions, IUser, UserModalType } from '../../utils'
import { CustomSelect } from '../../ui'
import { API_BASE_URL, getUserRole } from '../../utils/api'
import { Plus } from 'lucide-react'
import { UserTable } from '../components'
import { UserModal } from '../components/UserPageContent/UserModal'
import style from '../style/deviceContainer.module.css'
import { getUserPositionOptions, getUserPositionTechniciansOptions } from '../../utils/selectOptions/userOptions'

export const UserPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState<UserModalType>('AddUser')
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [userName, setUserName] = useState<string | undefined>(undefined)
    const [userData, setUserData] = useState<IUser | undefined>(undefined)
    const [refreshTable, setRefreshTable] = useState(false)
    const [position, setPosition] = useState<string>('ALL')
    const [usersOptions, setUserOptions] = useState<IOptions[]>([])

    const fetchUserRole = async () => {
        try {
            const role = await getUserRole()
            if (role === 'ADMIN_TECHNICIANS') {
                setUserOptions([{ label: 'Todos', value: 'ALL' }, ...getUserPositionTechniciansOptions])
            } else {
                setUserOptions([{ label: 'Todos', value: 'ALL' }, ...getUserPositionOptions])
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchUserRole()
    }, [])

    const handleSelect = (selected: { label: string; value: string }) => {
        setPosition(selected.value)
        setRefreshTable(true)
    }

    const onOpenModal = () => {
        setTypeModal('AddUser')
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setUserData(undefined)
        setUserId(undefined)
        setUserName(undefined)
        setRefreshTable(true)
        setShowModal(false)
    }

    const handleEditModal = (userData: IUser) => {
        setTypeModal('EditUser')
        setUserData(userData)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (userId: string, userName: string) => {
        setTypeModal('DeleteUser')
        setUserId(userId)
        setUserName(userName)
        setRefreshTable(false)
        setShowModal(true)
    }

    const deleteUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar el usuario')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Usuarios</h2>
                    <article>
                        <span>Puesto</span>
                        <div className={style.actionSection}>
                            <CustomSelect menu value={position} options={usersOptions} onSelect={handleSelect} />
                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <UserTable
                        refresh={refreshTable}
                        positionFilter={position}
                        editUser={handleEditModal}
                        deleteUser={handleDeleteModal}
                    />
                </section>
            </div>

            <UserModal
                isOpen={showModal}
                onClose={onCloseModal}
                type={typeModal}
                userData={userData}
                deleteName={userName}
                deleteFunction={deleteUser}
            />
        </>
    )
}
