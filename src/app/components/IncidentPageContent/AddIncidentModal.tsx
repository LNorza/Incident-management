import { useEffect, useState } from 'react'
import { IOptions, IUser } from '../../../utils'
import { API_BASE_URL, getUserDepartment, getUserRole } from '../../../utils/api'
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

export const AddIncidentModal = ({ userData, onClose }: Props) => {
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
                    {/* <button className={style.saveButton} onClick={saveDevice}> */}
                    <button className={style.saveButton}>Guardar</button>
                </div>
            </div>
        </>
    )
}
