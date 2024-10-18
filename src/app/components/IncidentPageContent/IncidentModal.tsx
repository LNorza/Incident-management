import { DeviceModalType, IncidentModalType } from '../../../utils'
import { DeleteModal } from '../../../ui'
import style from '../../style/modal.module.css'
import { AddDeviceModal } from '../DevicePageContent'
import { AddIncidentModal } from './AddIncidentModal'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: IncidentModalType
    deviceId?: string
    deleteName?: string
    deleteFunction: () => void
}

export const IncidentModal = ({
    isOpen,
    type = 'AddIncident',
    deviceId,
    deleteName,
    deleteFunction,
    onClose,
}: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {type === 'AddIncident' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddIncidentModal onClose={onClose} />
                        </section>
                    )}
                    {type === 'EditIncident' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddDeviceModal onClose={onClose} deviceId={deviceId} />
                        </section>
                    )}
                    {type === 'DeleteIncident' && (
                        <section className={style.modalInfoContainer}>
                            <DeleteModal onClose={onClose} name={deleteName} deleteFunction={deleteFunction} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
