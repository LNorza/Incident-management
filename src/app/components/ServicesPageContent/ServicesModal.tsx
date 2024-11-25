import { ServicesType, IServices } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddServicesModal } from './AddServicesModal'
import { DeleteModal } from '../../../ui'
import { InfoServicesModal } from './InfoServicesModal'

interface Props {
    isOpen: boolean
    typeModal?: ServicesType
    servicesData?: IServices
    name?: string
    deleteFunction: () => void
    onClose: () => void
}

export const ServicesModal = ({ isOpen, onClose, typeModal, servicesData, name, deleteFunction }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {typeModal === 'AddService' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddServicesModal onClose={onClose} />
                        </section>
                    )}
                    {typeModal === 'EditService' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddServicesModal onClose={onClose} serviceData={servicesData} />
                        </section>
                    )}
                    {typeModal === 'DeleteService' && (
                        <section className={style.modalInfoContainer}>
                            <DeleteModal onClose={onClose} name={name} deleteFunction={deleteFunction} />
                        </section>
                    )}
                    {typeModal === 'InfoService' && (
                        <section className={style.largeModalInfoContainer}>
                            <InfoServicesModal onClose={onClose} serviceData={servicesData} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
