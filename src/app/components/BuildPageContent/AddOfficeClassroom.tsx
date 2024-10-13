import { useEffect, useState } from 'react'
import { OfficeProps } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { CustomInput, CustomSelect, CustomCheckBox } from '../../../ui'
import { useForm } from '../../../hooks'
import { toast } from 'sonner'
import { Building } from 'lucide-react'
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
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const [needManager, setNeedManager] = useState(false)
    // const [manager, setManager] = useState<string | null>(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetchDepartment()
    }, [])

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id)
        } catch (err) {
            console.error(err)
        }
    }

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
            department_id: departmentId,
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
                <h2>{edit ? 'Editar sublocalización' : 'Agregar sublocalización'}</h2>
            </div>
            <div className={style.modalBody}>
                <div className={style.modalBodyForms}>
                    <div className={style.rowModal}>
                        <section>
                            Nombre de la sublocalización
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="name"
                                    value={formState.name}
                                    placeholder="Ingresa el nombre"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="nameOffice"
                                />
                            </div>
                        </section>

                        <section>
                            Tipo
                            <div className={style.formInput}>
                                <CustomSelect
                                    options={typesOptions}
                                    onSelect={handleTypeChange}
                                    value={selectedType?.value}
                                    placeholder="Selecciona el tipo"
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Descripción
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="description"
                                    value={formState.description}
                                    placeholder="Ingresa la descripción"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="descriptionOffice"
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            ¿La sublocalización tiene responsable?
                            <CustomCheckBox checked={needManager} setChecked={setNeedManager} />
                        </section>

                        <section className={`${needManager ? '' : style.disabled}`}>
                            Responsable
                            <div className={style.formInput}>
                                <CustomSelect
                                    placeholder="Selecciona al responsable"
                                    options={[]}
                                    onSelect={() => {}}
                                />
                            </div>
                        </section>
                    </div>
                </div>
                <div className={`${style.modalButtonContainer} ${style.add}`}>
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
