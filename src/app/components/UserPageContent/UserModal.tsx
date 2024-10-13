import { DeviceModalType, UserModalType } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddDeviceModal } from '../DevicePageContent'
import { AddUserModal } from './AddUserModal'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: UserModalType
    deviceId?: string
    deleteName?: string
    // deleteFunction: () => void
}

export const UserModal = ({ isOpen, type, deviceId, deleteName, onClose }: Props) => {
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
                            <AddDeviceModal onClose={onClose} deviceId={deviceId} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
