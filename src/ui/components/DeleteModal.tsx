import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import style from '../../app/style/modal.module.css'

interface Props {
    onClose: () => void
    name?: string
    deleteFunction: () => void
}

export const DeleteModal = ({ onClose, name, deleteFunction }: Props) => {
    const handleDelete = async () => {
        try {
            await deleteFunction()
            toast.success(`${name} eliminado exitosamente`)
            onClose()
        } catch (error) {
            toast.error('Hubo un error al eliminar el elemento')
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <h2>Eliminar</h2>
            </div>

            <div className={style.modalDetail}>
                <div className={style.modalBodyIcon}>
                    <Trash2 size={100} color="#A9DFD8" />
                </div>
                <div className={style.modalDeleteText}>
                    <span className={style.p1}>¿Estás seguro de que deseas eliminar el {name}?</span>
                    <span className={style.p2}>Si eliminas el {name} se borrará permanentemente</span>
                </div>

                <div className={`${style.modalButtonContainer}  ${style.delete}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>

                    <button onClick={handleDelete} className={style.saveButton}>
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    )
}
