import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../auth/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Uploader, Loader } from 'rsuite'
import { toast } from 'sonner'
import { CustomInput } from '../../ui'
import AvatarIcon from '@rsuite/icons/legacy/Avatar'
import { getUserData } from '../../utils/api'
import { API_BASE_URL } from '../../utils/api'
import { FileType } from 'rsuite/esm/Uploader'
import { IUserData } from '../../utils'
import { useForm } from '../../hooks/useForm'
import style from '../style/profileContainer.module.css'

function previewFile(file: Blob, callback: (value: string | ArrayBuffer | null) => void) {
    const reader = new FileReader()
    reader.onloadend = () => {
        callback(reader.result)
    }
    reader.readAsDataURL(file)
}

export const ProfilePage = () => {
    const [uploading, setUploading] = useState(false)
    const [fileInfo, setFileInfo] = useState<string | null>(null)
    const [userData, setUserData] = useState<IUserData | null>(null)
    const { onInputChange, formState } = useForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    const handleLogOut = async () => {
        if (logout) {
            await logout()
            navigate('/login')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData()
                setUserData(userData)
                if (userData && userData.imageUrl) {
                    setFileInfo(userData.imageUrl)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const handleUpload = async (file: FileType) => {
        setUploading(true)

        const formData = new FormData()
        if (file.blobFile) {
            formData.append('imagen', file.blobFile)
        } else {
            throw new Error('File is undefined')
        }

        try {
            const response = await fetch(`${API_BASE_URL}/update-photo/${userData ? userData._id : ''}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Imagen subida exitosamente:', result)
                toast.success('Imagen subida exitosamente')
                if (result.photoURL) {
                    setFileInfo(result.photoURL)
                }
            } else {
                toast.error('Error al subir la imagen')
            }
        } catch (error) {
            console.error('Error de red o en el servidor:', error)
        } finally {
            setUploading(false)
        }
    }

    const handlePasswordUpdate = async () => {
        const { oldPassword, newPassword, confirmPassword } = formState

        if (!oldPassword || !newPassword || !confirmPassword) {
            return toast.error('Por favor llena todos los campos')
        }
        if (newPassword !== confirmPassword) {
            return toast.error('Las contraseñas no coinciden')
        }

        try {
            const response = await fetch(`${API_BASE_URL}/update-password/${userData?._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPassword, newPassword }),
                credentials: 'include',
            })

            if (response.ok) {
                toast.success('Contraseña actualizada exitosamente')
                setTimeout(() => {
                    handleLogOut()
                }, 1000)
            } else {
                const result = await response.json()
                if (result.message === 'Invalid password') {
                    return toast.error('Contraseña incorrecta')
                } else {
                    toast.error(result.message || 'Error al actualizar la contraseña')
                }
            }
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error)
            toast.error('Error en la solicitud')
        }
    }

    return (
        <div className={style.profileContainer}>
            <h1>Perfil</h1>
            <div className={style.profileCard}>
                <Uploader
                    fileListVisible={false}
                    listType="picture"
                    action=""
                    onUpload={(file) => {
                        if (file.blobFile) {
                            previewFile(file.blobFile, (value: string | ArrayBuffer | null) => {
                                if (typeof value === 'string' || value === null) {
                                    setFileInfo(value)
                                } else {
                                    console.error('Unexpected value type:', value)
                                }
                            })
                        } else {
                            console.error('File is undefined')
                        }
                        handleUpload(file)
                    }}
                >
                    <button style={{ width: 200, height: 200 }}>
                        {uploading && <Loader backdrop center />}
                        {fileInfo ? (
                            <img
                                src={fileInfo}
                                alt="Perfil"
                                width="100%"
                                height="100%"
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                        ) : (
                            <AvatarIcon style={{ fontSize: 80 }} />
                        )}
                    </button>
                </Uploader>
                <div className={style.profileInfoContainer}>
                    <div className={style.profileInfoList}>
                        <div className={style.profileInfo}>
                            <h2 className={style.profileInfoTitle}>Nombre</h2>
                            <span className={style.profileInfoText}>{userData ? userData.name : ''}</span>
                        </div>

                        <div className={style.profileInfo}>
                            <h2 className={style.profileInfoTitle}>Email</h2>
                            <span className={style.profileInfoText}>{userData ? userData.email : ''}</span>
                        </div>

                        <div className={style.profileInfo}>
                            <h2 className={style.profileInfoTitle}>Usuario</h2>
                            <span className={style.profileInfoText}>{userData ? userData.username : ''}</span>
                        </div>
                    </div>

                    <div className={style.profileInfoList}>
                        <div className={style.profileInfo}>
                            <h2 className={style.profileInfoTitle}>Puesto</h2>
                            <span className={style.profileInfoText}>{userData ? userData.position : ''}</span>
                        </div>

                        <div className={style.profileInfo}>
                            <h2 className={style.profileInfoTitle}>Rol</h2>
                            <span className={style.profileInfoText}>{userData ? userData.role : ''}</span>
                        </div>

                        <div className={style.profileInfo}>
                            <h2 className={style.profileInfoTitle}>Departamento</h2>
                            <span className={style.profileInfoText}>{userData ? userData.department.name : ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Actualizar contraseña</h1>
            <div className={style.profileCard}>
                <div className={style.profileInfoContainer}>
                    <div className={style.profileInfoPassword}>
                        <div className={style.profileInfo}>
                            <span className={style.passwordInputText}>Contraseña actual</span>
                            <div className={style.passwordInput}>
                                <CustomInput
                                    placeholder="Ingresa la contraseña actual"
                                    password
                                    name="oldPassword"
                                    value={formState.oldPassword}
                                    onChange={onInputChange}
                                    isFormInput
                                />
                            </div>
                        </div>

                        <div className={style.newPasswordContainer}>
                            <div className={style.profileInfoPassword}>
                                <span className={style.passwordInputText}>Nueva contraseña</span>
                                <div className={style.passwordInput}>
                                    <CustomInput
                                        placeholder="Ingresa la contraseña actual"
                                        password
                                        name="newPassword"
                                        value={formState.newPassword}
                                        onChange={onInputChange}
                                        isFormInput
                                    />
                                </div>
                            </div>

                            <div className={style.profileInfoPassword}>
                                <span className={style.passwordInputText}>Confirmar contraseña</span>
                                <div className={style.passwordInput}>
                                    <CustomInput
                                        placeholder="Ingresa la contraseña actual"
                                        password
                                        name="confirmPassword"
                                        value={formState.confirmPassword}
                                        onChange={onInputChange}
                                        isFormInput
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.passwordButtonContainer}>
                        <span className={style.passwordButtonText}>
                            Una vez actualizada la contraseña la sesión se cerrará
                        </span>
                        <button className={style.updatePasswordButton} onClick={handlePasswordUpdate}>
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
