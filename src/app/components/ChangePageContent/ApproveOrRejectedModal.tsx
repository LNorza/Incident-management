import { Ban, CircleCheck } from 'lucide-react'
import { API_BASE_URL } from '../../../utils'
import { toast } from 'sonner'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    action: string | undefined
    changeId: string | undefined
}

export const ApproveOrRejectedModal = ({ onClose, action, changeId }: Props) => {
    const approveChangeRequest = () => {
        const url = `${API_BASE_URL}/change-requests-approve/${changeId}`

        fetch(url, {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then(() => {
                onClose()
                toast.success('Solicitud de cambio aprobada correctamente')
            })
            .catch((error) => {
                console.error('Error:', error)
                toast.error('Error al aprobar la solicitud de cambio')
            })
    }

    const rejectChangeRequest = () => {
        const url = `${API_BASE_URL}/change-requests-reject/${changeId}`

        fetch(url, {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then(() => {
                onClose()
                toast.success('Solicitud de cambio rechazada correctamente')
            })
            .catch((error) => {
                console.error('Error:', error)
                toast.error('Error al rechazar la solicitud de cambio')
            })
    }

    return (
        <>
            <div className={style.titleModal}>
                {action == 'Aprove' ? <CircleCheck /> : <Ban />}
                <h2>{action == 'Aprove' ? 'Aprobar' : 'Rechazar'}</h2>
            </div>

            <div className={style.modalDetail}>
                <div className={style.modalDeleteText}>
                    <span className={style.pQuestion}>
                        ¿Estás seguro de que quieres {action == 'Aprove' ? 'aprobar' : 'rechazar'} la solicitud de
                        cambio?
                    </span>
                    <span className={style.p2}>
                        {action == 'Aprove'
                            ? 'Una vez aprobada, se seguirá el procedimiento de compra de la pieza de repuesto.'
                            : 'Una vez rechazada, se rechazará la incidencia relacionada con la solciitud de cambio.'}
                    </span>
                </div>

                <div className={`${style.modalButtonContainer}  ${style.delete}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>

                    {action == 'Aprove' ? (
                        <button className={style.saveButton} onClick={approveChangeRequest}>
                            Aprobar
                        </button>
                    ) : (
                        <button className={style.saveButton} onClick={rejectChangeRequest}>
                            Rechazar
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
