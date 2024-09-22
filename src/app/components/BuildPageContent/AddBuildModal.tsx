/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { CustomCheckBox, CustomInput, CustomSelect } from '../../../ui'
import { useForm } from '../../../hooks'
import { Building } from 'lucide-react'
import { BuildingProps } from '../../../utils'
import style from '../../style/modal.module.css'
import { toast } from 'sonner'
import { getUserDepartment } from '../../../utils/api/userData'
import API_BASE_URL from '../../../utils/api/apiConfig'

interface Props {
    onClose: () => void
    buildingData?: BuildingProps
}

export const AddBuildModal = ({ buildingData, onClose }: Props) => {
    const { onInputChange, formState, setFormState } = useForm({ name: '', description: '' })
    const [shareBuilding, setShareBuilding] = useState(false)
    const [existBuilding, setExistBuilding] = useState(true)
    const showInput = !shareBuilding || (shareBuilding && !existBuilding)
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const [sharedBuildings, setSharedBuildings] = useState<{ label: string; value: string }[]>([])
    const [selectedBuilding, setSelectedBuilding] = useState<{ value: string; label: string } | null>(null)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetchDepartment()
        fetchSharedBuildings()
        if (buildingData) {
            setFormState({ name: buildingData.name, description: buildingData.description })
            setEdit(true)
        }
    }, [])

    const handleBuildingSelect = (building: { value: string; label: string }) => {
        setSelectedBuilding(building)
    }

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchSharedBuildings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/buildings-search?isShared=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Error al obtener edificios compartidos')
            }
            const data = await response.json()
            const mappedBuildings = data.map((building: any) => ({
                value: building._id,
                label: building.name,
            }))

            setSharedBuildings(mappedBuildings)
        } catch (error) {
            console.error('Error al obtener edificios compartidos', error)
        }
    }

    const handleSubmit = async () => {
        const buildingDataToSend = {
            name: formState.name,
            description: formState.description,
            isShared: edit ? buildingData?.isShared : shareBuilding,
            department_id: edit ? buildingData?.department_id : departmentId,
        }
        if (edit) {
            try {
                const response = await fetch(`${API_BASE_URL}/buildings/${buildingData?._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(buildingDataToSend),
                })
                if (response.ok) {
                    toast.success(`${formState.name} editado exitosamente`)
                    onClose()
                }
            } catch (error) {
                toast.error('Error al editar edificio')
                console.error(error)
                return
            }
        } else if (!shareBuilding || (shareBuilding && !existBuilding)) {
            try {
                const response = await fetch(`${API_BASE_URL}/buildings`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(buildingDataToSend),
                })

                if (response.ok) {
                    toast.success(`${formState.name} agregado exitosamente`)
                    onClose()
                }
            } catch (error) {
                toast.error('Error al agregar edificio')
                console.error(error)
            }
        } else {
            try {
                const sharedBuildingData = {
                    departmentId: departmentId,
                }
                const response = await fetch(`${API_BASE_URL}/buildings-department/${selectedBuilding?.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(sharedBuildingData),
                })

                if (response.ok) {
                    toast.success(`${selectedBuilding?.label} agregado exitosamente`)
                    onClose()
                }
            } catch (error) {
                toast.error('Error al agregar edificio')
                console.error(error)
            }
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <Building size={30} />
                {edit ? <h2>Editar edificio</h2> : <h2>Agregar edificio</h2>}
            </div>
            <div className={style.modalDetail}>
                {!edit && (
                    <section>
                        ¿El edificio comparte departamento?
                        <CustomCheckBox checked={shareBuilding} setChecked={setShareBuilding} />
                    </section>
                )}

                {shareBuilding && (
                    <>
                        <section>
                            Edificio
                            <CustomSelect options={sharedBuildings} onSelect={handleBuildingSelect} />
                        </section>

                        <section>
                            ¿El edificio se encuentra en las opciones?
                            <CustomCheckBox checked={existBuilding} setChecked={setExistBuilding} />
                        </section>
                    </>
                )}

                {showInput && (
                    <section>
                        Nombre
                        <CustomInput
                            isFormInput
                            name="name"
                            value={formState.name}
                            placeholder="Escribe nombre aquí..."
                            type="text"
                            onChange={onInputChange}
                            autoComplete="nameBuilding"
                        />
                    </section>
                )}

                <div className={style.modalButtonContainer}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>

                    <button onClick={handleSubmit} className={style.saveButton}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
