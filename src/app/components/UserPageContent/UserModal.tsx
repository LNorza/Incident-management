import { IUser, UserModalType } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddUserModal } from './AddUserModal'
import { DeleteModal } from '../../../ui'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: UserModalType
    userData?: IUser
    deleteName?: string
    deleteFunction: () => void
}

export const UserModal = ({ isOpen, type, userData, deleteName, deleteFunction, onClose }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {type === 'AddUser' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddUserModal onClose={onClose} />
                        </section>
                    )}
                    {type === 'EditUser' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddUserModal onClose={onClose} userData={userData} />
                        </section>
                    )}
                    {type === 'DeleteUser' && (
                        <section className={style.modalInfoContainer}>
                            <DeleteModal name={deleteName} deleteFunction={deleteFunction} onClose={onClose} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
