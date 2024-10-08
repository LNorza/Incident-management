import { AddDeviceModal } from './AddDeviceModal'
import style from '../../style/modal.module.css'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: string
    deviceId?: string
}

export const DeviceModal = ({ isOpen, deviceId, onClose }: Props) => {
    return (
        <>
            {isOpen && !deviceId && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.largeModalInfoContainer}>
                        <AddDeviceModal onClose={onClose} />
                    </section>
                </div>
            )}
            {isOpen && deviceId && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.largeModalInfoContainer}>
                        <AddDeviceModal onClose={onClose} deviceId={deviceId} />
                    </section>
                </div>
            )}
        </>
    )
}
