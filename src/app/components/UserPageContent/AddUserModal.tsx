import { useEffect, useState, useCallback } from 'react'
import { Device, IOptions, IUser } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { CustomInput, CustomSelect } from '../../../ui'
import { useForm } from '../../../hooks'
import { toast } from 'sonner'
import { Laptop } from 'lucide-react'
import style from '../../style/modal.module.css'

interface Props {
    deviceId?: string | undefined
    onClose: () => void
}

export const AddUserModal = ({ deviceId, onClose }: Props) => {
    const [deviceType, setDeviceType] = useState<string | undefined>('')
    const [isShared, setIsShared] = useState<boolean | undefined>(false)
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)
    const [userPositionValue, setUserPositionValue] = useState<string | undefined>(undefined)

    const [userPosition] = useState<IOptions[]>([
        { label: 'Puesto 1', value: 'Puesto 1' },
        { label: 'Puesto 2', value: 'Puesto 2' },
        { label: 'Puesto 3', value: 'Puesto 3' },
    ])

    const { onInputChange, formState } = useForm<IUser>({
        id: 0,
        name: '',
        email: '',
        username: '',
        password: '',
        position: '',
        role: '',
        department_id: '',
        imageUrl: '',
    })

    const handleSelectType = (selected: IOptions) => {
        // setSelectedDeviceType(selected)
        // setDeviceType(selected.value)
    }

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id ?? undefined)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchBuildings = useCallback(async () => {
        // if (departmentId) {
        //     try {
        //         const response = await fetch(`${API_BASE_URL}/buildings-search?departmentId=${departmentId}`, {
        //             credentials: 'include',
        //         })
        //         const data = await response.json()
        //         setBuildingsOptions(
        //             data.map((building: { _id: string; name: string }) => ({
        //                 label: building.name,
        //                 value: building._id,
        //             })),
        //         )
        //     } catch (error) {
        //         console.error('Error fetching buildings:', error)
        //     }
        // }
    }, [departmentId])

    // const fetchOffices = useCallback(async () => {
    //     if (building) {
    //         try {
    //             const response = await fetch(
    //                 `${API_BASE_URL}/locations-search?buildingId=${buildingId}&departmentId=${departmentId}`,
    //                 {
    //                     credentials: 'include',
    //                 },
    //             )
    //             const data = await response.json()
    //             setOfficesOptions(
    //                 data.map((office: { _id: string; name: string }) => ({
    //                     label: office.name,
    //                     value: office._id,
    //                 })),
    //             )
    //         } catch (error) {
    //             console.error('Error fetching offices:', error)
    //         }
    //     }
    // }, [building])

    // const fetchDevice = async () => {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
    //             credentials: 'include',
    //         })
    //         const data = await response.json()
    //         setDeviceData(data)
    //     } catch (error) {
    //         console.error('Error fetching device:', error)
    //     }
    // }

    // useEffect(() => {
    //     fetchDepartment()
    // }, [])

    // useEffect(() => {
    //     fetchOffices()
    // }, [buildingId, fetchOffices])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await fetchBuildings()
    //         if (deviceId) {
    //             await fetchDevice()
    //         }
    //     }
    //     fetchData()
    // }, [deviceId, departmentId, fetchBuildings])
    // useEffect(() => {
    //     if (deviceId) {
    //         setLocation(locationEdit)
    //     }
    // }, [building])

    // const saveDevice = () => {
    //     if (!formState.name) {
    //         toast.error('No se ha ingresado el nombre del dispositivo')
    //         return
    //     }
    //     if (!deviceType) {
    //         toast.error('No se ha seleccionado el tipo de dispositivo')
    //         return
    //     }
    //     if (!buyDate) {
    //         toast.error('No se ha ingresado la fecha de compra')
    //         return
    //     }
    //     if (!selectedDeviceType) {
    //         toast.error('No se ha seleccionado el tipo de dispositivo')
    //         return
    //     }

    //     const commonSpecs = {
    //         name: formState.name,
    //         type: selectedDeviceType.value,
    //         status: 'ACTIVE',
    //         deviceModel: formState.model,
    //         brand: brand,
    //         purchaseDate: buyDate,
    //         warrantyYears: warrantyYears,
    //         location_id: location,
    //     }

    //     try {
    //         const method = deviceId ? 'PUT' : 'POST'
    //         const url = `${API_BASE_URL}/devices${deviceId ? `/${deviceId}` : ''}`

    //         fetch(url, {
    //             method,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify(deviceData),
    //         }).then((response) => {
    //             if (response.ok) {
    //                 toast.success(`${!deviceId ? 'Dispositivo agregado' : 'Dispositivo actualizado'}`)
    //                 onClose()
    //             }
    //         })
    //     } catch (error) {
    //         console.error('Error:', error)
    //         toast.success(`${!deviceId ? 'Error al agregar el dispositivo' : 'Error al editar el dispositivo'}`)
    //     }
    // }

    return (
        <>
            <div className={style.titleModal}>
                <Laptop size={34} />
                {/* <h2>{!deviceId ? 'Agregar Usuario' : 'Editar equipo'}</h2> */}
                <h2>Agregar Usuario</h2>
            </div>
            <div className={style.modalDetail}>
                <div className={style.columnModal}>
                    <div className={style.rowModal}>
                        <section>
                            Nombre
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="name"
                                    value={formState.name}
                                    placeholder="Ingresa el nombre"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="nameUser"
                                />
                            </div>
                        </section>
                        <section>
                            Correo Electrónico
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="email"
                                    value={formState.email}
                                    placeholder="Ingresa el correo"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="emailUser"
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Usuario
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="username"
                                    value={formState.username}
                                    placeholder="Ingresa el nombre de usuario"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="username"
                                />
                            </div>
                        </section>
                        <section>
                            Contraseña
                            <div className={style.formInput}>
                                <CustomInput
                                    isFormInput
                                    name="password"
                                    value={formState.password}
                                    placeholder="ingresa la contraseña"
                                    type="password"
                                    onChange={onInputChange}
                                    autoComplete="password"
                                />
                            </div>
                        </section>
                    </div>

                    <div className={style.rowModal}>
                        <section>
                            Puesto
                            <div className={style.formInput}>
                                <CustomSelect
                                    value={userPositionValue}
                                    placeholder="Selecciona el puesto"
                                    options={userPosition}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setUserPositionValue(selected.value)
                                    }}
                                />
                            </div>
                        </section>
                    </div>
                </div>
                <div className={` ${style.modalButtonContainer} ${style.add}`}>
                    <button onClick={onClose} className={style.cancelButton}>
                        Cancelar
                    </button>
                    {/* <button className={style.saveButton} onClick={saveDevice}> */}
                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    )
}
