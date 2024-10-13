import { useEffect, useState } from 'react'
import { IOptions, IUser } from '../../../utils'
import { API_BASE_URL, getUserDepartment } from '../../../utils/api'
import { getUserPositionOptions } from '../../../utils/selectOptions/userOptions'
import { CustomInput, CustomSelect } from '../../../ui'
import { useForm } from '../../../hooks'
import { toast } from 'sonner'
import { Users2 } from 'lucide-react'
import style from '../../style/modal.module.css'

interface Props {
    onClose: () => void
    userData?: IUser
}

export const AddUserModal = ({ userData, onClose }: Props) => {
    const [departmentId, setDepartmentId] = useState<string | undefined>(undefined)
    const [positionOptionsState] = useState<IOptions[]>(getUserPositionOptions)
    const [position, setPosition] = useState<string | undefined>(undefined)

    const { onInputChange, formState, updateFields } = useForm({
        name: '',
        email: '',
        username: '',
        password: '',
        position: '',
    })

    const fetchDepartment = async () => {
        try {
            const id = await getUserDepartment()
            setDepartmentId(id ?? undefined)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDepartment()
    }, [])

    useEffect(() => {
        if (userData) {
            console.log(userData)
            updateFields({
                name: userData.name,
                email: userData.email,
                username: userData.username,
            })
            setPosition(positionOptionsState.find((option) => option.label === userData.position)?.value)
        }
    }, [userData])

    const validateForm = () => {
        if (!formState.name) {
            toast.error('No se ha ingresado el nombre del usuario')
            return false
        }
        if (!formState.email) {
            toast.error('No se ha ingresado el correo electrónico')
            return false
        }
        if (!formState.username) {
            toast.error('No se ha ingresado el nombre de usuario')
            return false
        }
        if (!formState.password && !userData) {
            toast.error('No se ha ingresado la contraseña')
            return false
        }
        if (!position) {
            toast.error('No se ha seleccionado el puesto')
            return false
        }
        return true
    }

    const getUserRole = () => {
        if (position === 'LAB_CHIEF') return 'ADMIN_LAB'
        if (position === 'TEACHER') return 'ONLY_READ'
    }

    const saveDevice = () => {
        const isValid = validateForm()
        if (!isValid) return

        const userDataToSend = {
            name: formState.name,
            email: formState.email,
            username: formState.username,
            password: formState.password,
            position: position,
            role: getUserRole(),
            department_id: departmentId,
            imageUrl: '',
        }

        try {
            const method = userData ? 'PUT' : 'POST'
            const url = `${userData ? `${API_BASE_URL}/users/${userData._id}` : `${API_BASE_URL}/register`}`

            fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(userDataToSend),
            }).then((response) => {
                if (response.ok) {
                    toast.success(`${!userData ? 'Usuario agregado' : 'Usuario actualizado'}`)
                    onClose()
                }
            })
        } catch (error) {
            console.error('Error:', error)
            toast.success(`${!userData ? 'Error al agregar el usuario' : 'Error al editar el usuario '}`)
        }
    }

    return (
        <>
            <div className={style.titleModal}>
                <Users2 size={34} />
                <h2>{!userData ? 'Agregar Usuario' : 'Editar Usuario'}</h2>
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
                                    placeholder="Ingresa la contraseña"
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
                                    value={position}
                                    placeholder="Selecciona el puesto"
                                    options={positionOptionsState}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setPosition(selected.value)
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
                    <button className={style.saveButton} onClick={saveDevice}>
                        Guardar
                    </button>
                </div>
            </div>
        </>
    )
}
