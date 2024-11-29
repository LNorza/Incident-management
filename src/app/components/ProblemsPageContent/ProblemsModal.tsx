import { ProblemsType } from '../../../utils'
import style from '../../style/modal.module.css'
import { InfoIncidentModal } from '../IncidentPageContent'

interface Props {
    isOpen: boolean
    typeModal?: ProblemsType
    incidentId?: string
    onClose: () => void
}

export const ProblemsModal = ({ isOpen, onClose, typeModal, incidentId }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {typeModal === 'InfoProblem' && (
                        <section className={style.largeModalInfoContainer}>
                            <InfoIncidentModal onClose={onClose} incidentId={incidentId} status="RELEASED" />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
