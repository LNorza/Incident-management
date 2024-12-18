import { DeleteModal } from '../../../ui'
import { IncidentModalType, IncidentState } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddIncidentModal } from './AddIncidentModal'
import { AssignedModal } from './AssignedModal'
import { FinishIncidentModal } from './FinishIncidentModal'
import { IncidentChangeModal } from './IncidentChangeModal'
import { InfoIncidentModal } from './InfoIncidentModal'

interface Props {
    isOpen: boolean
    onClose: () => void
    type?: IncidentModalType
    incidentId?: string
    status?: IncidentState
    nameAction?: string
    deleteName?: string
    deleteFunction: () => void
}

export const IncidentModal = ({
    isOpen,
    type = 'AddIncident',
    incidentId,
    deleteName,
    status,
    nameAction,
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
                    {type === 'ChangeModal' && (
                        <section className={style.largeModalInfoContainer}>
                            <IncidentChangeModal onClose={onClose} incidentId={incidentId} status={status} />
                        </section>
                    )}
                    {type === 'EditIncident' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddIncidentModal onClose={onClose} incidentId={incidentId} />
                        </section>
                    )}
                    {type === 'FinishedIncident' && (
                        <section
                            className={`${
                                nameAction != 'FINISHED' ? style.largeModalInfoContainer : style.modalInfoContainer
                            }`}
                        >
                            <FinishIncidentModal onClose={onClose} incidentId={incidentId} action={nameAction} />
                        </section>
                    )}
                    {type === 'AssignedIncident' && (
                        <section className={style.largeModalInfoContainer}>
                            <AssignedModal onClose={onClose} incidentId={incidentId} action={nameAction} />
                        </section>
                    )}
                    {type === 'InfoIncident' && (
                        <section className={style.largeModalInfoContainer}>
                            {status != undefined ? (
                                <InfoIncidentModal onClose={onClose} incidentId={incidentId} status={status} />
                            ) : (
                                <InfoIncidentModal onClose={onClose} incidentId={incidentId} />
                            )}
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
