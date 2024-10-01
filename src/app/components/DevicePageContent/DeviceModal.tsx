import { AddDeviceModal } from './AddDeviceModal'
import style from '../../style/modal.module.css'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: string
}

export const DeviceModal = ({ isOpen, onClose }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.largeModalInfoContainer}>
                        <AddDeviceModal onClose={onClose} />
                    </section>
                </div>
            )}
        </>
    )
}
