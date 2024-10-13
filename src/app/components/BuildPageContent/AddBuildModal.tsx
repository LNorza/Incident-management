/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { BuildingProps, IOptions } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { CustomCheckBox, CustomInput, CustomSelect } from '../../../ui'
import { useForm } from '../../../hooks'
import { toast } from 'sonner'
import { Building } from 'lucide-react'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    buildingData?: BuildingProps
}

export const AddBuildModal = ({ buildingData, onClose }: Props) => {
    const { onInputChange, formState, setFormState } = useForm({ name: '', description: '' })
    const [shareBuilding, setShareBuilding] = useState(false)
    const [existBuilding, setExistBuilding] = useState(false)
    const showInput = !shareBuilding || (shareBuilding && !existBuilding)
    const [departmentId, setDepartmentId] = useState<string | null>(null)
    const [sharedBuildings, setSharedBuildings] = useState<IOptions[]>([])
    const [selectedBuilding, setSelectedBuilding] = useState<{ value: string; label: string } | undefined>(undefined)
    const [userOptions, setUserOptions] = useState<IOptions[]>([])
    const [user, setUser] = useState<string | undefined>(undefined)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        fetchDepartment()
        fetchSharedBuildings()
        if (buildingData) {
            setFormState({ name: buildingData.name, description: buildingData.description })
            setUser(buildingData.build_manager?._id)
            setEdit(true)
        }
    }, [buildingData, setFormState])

    const handleBuildingSelect = (building: { value: string; label: string }) => {
        setExistBuilding(true)
        setSelectedBuilding(building)
    }

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id)

            await fetchUsers(id)
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

    const fetchUsers = async (id: string | null) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users-options-department/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            if (!response.ok) {
                throw new Error('Error al obtener usuarios')
            }
            const data = await response.json()
            const mappedUserOptions = data.map((user: any) => ({
                value: user._id,
                label: user.name,
            }))
            setUserOptions(mappedUserOptions)
        } catch (error) {
            console.error('Error al obtener usuarios', error)
        }
    }

    const handleSubmit = async () => {
        if (!showInput && !selectedBuilding) {
            toast.error('El edificio es requerido')
            return
        }
        if (!formState.name && showInput) {
            toast.error('El nombre es requerido')
            return
        }
        let url = `${API_BASE_URL}/buildings`
        let method = 'POST'
        const buildingDataToSend = {
            name: formState.name,
            description: formState.description,
            isShared: edit ? buildingData?.isShared : shareBuilding,
            department_id: edit ? buildingData?.department_id : departmentId,
            build_manager: user,
        }
        const departmentIdToSend = {
            departmentId: departmentId,
        }
        let message = `${formState.name} agregado exitosamente`
        let errorMsg = 'Error al agregar edificio'

        if (edit) {
            url = `${API_BASE_URL}/buildings/${buildingData?._id}`
            method = 'PUT'
            message = `${formState.name} editado exitosamente`
            errorMsg = 'Error al editar edificio'
        } else if (shareBuilding && existBuilding) {
            url = `${API_BASE_URL}/buildings-department/${selectedBuilding?.value}`
            method = 'PUT'
            message = `${selectedBuilding?.label} agregado exitosamente`
            errorMsg = 'Error al agregar edificio'
        }

        try {
            const response = await fetch(`${url}`, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(shareBuilding && existBuilding ? departmentIdToSend : buildingDataToSend),
            })
            if (response.ok) {
                toast.success(`${message}`)
                onClose()
            }
        } catch (error) {
            toast.error(`${errorMsg}`)
            console.error(error)
            return
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <Building size={30} />
                {edit ? <h2>Editar edificio</h2> : <h2>Agregar edificio</h2>}
            </div>
            <div className={style.modalBody}>
                <div className={style.modalBodyForms}>
                    {!edit && (
                        <div className={style.rowModal}>
                            <section>
                                ¿El edificio comparte departamento?
                                <CustomCheckBox checked={shareBuilding} setChecked={setShareBuilding} />
                            </section>
                        </div>
                    )}

                    {shareBuilding && (
                        <div className={style.rowModal}>
                            <>
                                <section>
                                    <div className={style.formText}>Edificio</div>
                                    <div className={style.formInput}>
                                        <CustomSelect
                                            value={selectedBuilding?.value}
                                            options={sharedBuildings}
                                            onSelect={handleBuildingSelect}
                                            placeholder="Selecciona el edificio"
                                        />
                                    </div>
                                </section>

                                <section>
                                    ¿El edificio se encuentra en las opciones?
                                    <CustomCheckBox
                                        checked={existBuilding}
                                        setChecked={() => {
                                            if (existBuilding) {
                                                setSelectedBuilding(undefined)
                                            }
                                            setExistBuilding(!existBuilding)
                                        }}
                                    />
                                </section>
                            </>
                        </div>
                    )}

                    <div className={style.rowModal}>
                        <section className={`${existBuilding && shareBuilding ? style.disabled : ''} `}>
                            Nombre del edificio
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="name"
                                    value={formState.name}
                                    placeholder="Ingresa el nombre"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="nameBuilding"
                                />
                            </div>
                        </section>
                        <section>
                            Responsable
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={user}
                                    placeholder="Selecciona al responsable"
                                    options={userOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setUser(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>
                </div>
                <div className={`${style.modalButtonContainer} ${style.add}`}>
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
