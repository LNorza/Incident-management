import { DeviceModalType } from '../../../utils'
import { DeleteModal } from '../../../ui'
import style from '../../style/modal.module.css'
import { AddDeviceModal } from '../DevicePageContent'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: DeviceModalType
    deviceId?: string
    deleteName?: string
    deleteFunction: () => void
}

export const IncidentModal = ({ isOpen, type, deviceId, deleteName, deleteFunction, onClose }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {type === 'AddDevice' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddDeviceModal onClose={onClose} />
                        </section>
                    )}
                    {type === 'EditDevice' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddDeviceModal onClose={onClose} deviceId={deviceId} />
                        </section>
                    )}
                    {type === 'DeleteDevice' && (
                        <section className={style.modalInfoContainer}>
                            <DeleteModal onClose={onClose} name={deleteName} deleteFunction={deleteFunction} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
