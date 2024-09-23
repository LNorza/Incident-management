import { useForm } from '../../../hooks'
import { useEffect, useState } from 'react'
import { CustomInput, CustomSelect } from '../../../ui'
import { toast } from 'sonner'
import { OfficeProps } from '../../../utils'
import { Building } from 'lucide-react'
import API_BASE_URL from '../../../utils/api/apiConfig'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    buildingId?: string | undefined
    officeData?: OfficeProps
}
interface LocationForm {
    name: string
    description: string
}

export const AddOfficeClassroom = ({ buildingId, officeData, onClose }: Props) => {
    const { formState, onInputChange, setFormState } = useForm<LocationForm>({
        name: '',
        description: '',
    })
    const [selectedType, setSelectedType] = useState<{ value: string; label: string } | null>(null)
    const typesOptions = [
        { value: 'office', label: 'Oficina' },
        { value: 'classroom', label: 'Salón' },
    ]
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (officeData) {
            setFormState({ name: officeData.name, description: officeData.description })
            setSelectedType({ value: officeData.type, label: officeData.type === 'office' ? 'Oficina' : 'Salón' })
            setEdit(true)
        }
    }, [officeData, setFormState])

    const handleTypeChange = (selectedType: { value: string; label: string }) => {
        setSelectedType(selectedType)
    }

    const handleSave = async () => {
        if (!formState.name) {
            toast.error('Ingresa un nombre')
            return
        }
        if (!selectedType) {
            toast.error('Selecciona un tipo')
            return
        }
        const locationData = {
            name: formState.name,
            description: formState.description,
            type: selectedType?.value,
            building_id: buildingId,
        }
        console.log(locationData)
        try {
            const response = await fetch(`${API_BASE_URL}${edit ? `/locations/${officeData?._id}` : '/locations'}`, {
                method: `${edit ? 'PUT' : 'POST'}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(locationData),
            })

            if (response.ok) {
                toast.success(`${formState.name} ${edit ? 'editado' : 'creado'} correctamente`)
                onClose()
            }
        } catch (error) {
            toast.error(`Error al ${edit ? 'editar' : 'crear'} oficina/salón`)
            console.error(error)
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <Building size={30} />
                <h2>{edit ? 'Editar oficina/salón' : 'Agregar oficina/salón'}</h2>
            </div>

            <div className={style.modalDetail}>
                <section>
                    Nombre
                    <CustomInput
                        isFormInput
                        name="name"
                        value={formState.name}
                        placeholder="Escribe el nombre aqui..."
                        type="text"
                        onChange={onInputChange}
                        autoComplete="nameOffice"
                    />
                </section>

                <section>
                    Tipo
                    <CustomSelect options={typesOptions} onSelect={handleTypeChange} value={selectedType?.value} />
                </section>

                <section>
                    Descripción
                    <CustomInput
                        isFormInput
                        name="description"
                        value={formState.description}
                        placeholder="Escribe la descripción aqui..."
                        type="text"
                        onChange={onInputChange}
                        autoComplete="descriptionOffice"
                    />
                </section>

                <div className={style.modalButtonContainer}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>

                    <button onClick={handleSave} className={style.saveButton}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
