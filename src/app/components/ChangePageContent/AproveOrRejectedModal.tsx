import { Ban, CircleCheck, Trash2 } from 'lucide-react'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    action: string | undefined
}

export const AproveOrRejectedModal = ({ onClose, action }: Props) => {
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
                        <button className={style.saveButton}>Aprobar</button>
                    ) : (
                        <button className={style.saveButton}>Rechazar</button>
                    )}
                </div>
            </div>
        </>
    )
}
