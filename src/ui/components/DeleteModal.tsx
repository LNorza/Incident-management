import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import style from '../../app/style/modal.module.css'
import { API_BASE_URL, Incident } from '../../utils'
import { useForm } from '../../hooks'
import { useEffect } from 'react'

interface Props {
    onClose: () => void
    name?: string
    incidentId?: string | undefined
    deleteFunction: () => void
}

export const DeleteModal = ({ onClose, name, incidentId, deleteFunction }: Props) => {
    const { onInputChange, onTextAreaChange, formState, updateFields } = useForm<Incident>({
        folio: '',
        department_name: '',
        location_id: '',
        description: '',
        device_id: {
            _id: '',
            name: '',
            type: '',
            brand: '',
            specs: {},

            location_id: {
                _id: '',
                name: '',
                building_id: {
                    _id: '',
                    name: '',
                    description: '',
                    isShared: false,
                    departments: [
                        {
                            department_id: '',
                            build_manager: {
                                _id: '',
                                name: '',
                            },
                            _id: '',
                        },
                    ],
                    totalDevices: 0,
                },
            },
            status: '',
            purchaseDate: '',
            warrantyYears: 0,
            deviceModel: '',
        },
        date: '',
        incident_type: '',
        period: 0,
        status: '',
        updated_at: '',
        created_at: '',
        technician_id: '',
        arrival_time: '',
        time_duration: '',
        comments: '',
        priority: '',
        work: '',
        _id: '',
    })

    const fetchIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                credentials: 'include',
            })
            const data = await response.json()
            updateFields(data)
        } catch (error) {
            console.error('Error fetching device:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await deleteFunction()
            toast.success(`${name} eliminado exitosamente`)
            onClose()
        } catch (error) {
            toast.error('Hubo un error al eliminar el elemento')
        }
    }

    useEffect(() => {
        fetchIncident()
    }, [])

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
                    <span className={style.p1}>¿Estás seguro de que deseas eliminar {name}?</span>
                    <span className={style.p2}>Si eliminas {name} se borrará permanentemente</span>
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
