import { useState, useRef, useEffect } from 'react'
import { BuildModalType, OfficeProps, BuildingProps } from '../../../utils'
import { API_BASE_URL, getUserRole } from '../../../utils/api'
import { Actions } from '../../../ui'
import { Building, ChevronDown, Pencil, Plus, Trash2 } from 'lucide-react'
import style from '../../style/BuildContainer.module.css'

interface Props {
    building: BuildingProps
    updateLocations?: boolean
    departmentId: string | null
    setTypeModal: (
        modalType: BuildModalType,
        buildingId?: string,
        officeData?: OfficeProps,
        buildingName?: string,
        locationName?: string,
        locationId?: string,
    ) => void
    setUpdateLocations: (update: boolean) => void
}

export const BuildContent = ({ building, updateLocations, setUpdateLocations, departmentId, setTypeModal }: Props) => {
    const [showInfo, setShowInfo] = useState(false)
    const [locations, setLocations] = useState<OfficeProps[]>([])
    const [userRole, setUserRole] = useState<string | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    const handleShowInfo = () => {
        setShowInfo(!showInfo)
        fetchLocations()
    }

    useEffect(() => {
        if (updateLocations) {
            fetchLocations()
        }
        fetchUserRole()
    })

    const fetchUserRole = async () => {
        try {
            const role = await getUserRole()
            setUserRole(role)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchLocations = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/locations-with-devices?building_id=${building._id}`, {
                method: 'GET',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al obtener las ubicaciones')
            const data = await response.json()
            setLocations(data)
            setUpdateLocations(false)
        } catch (error) {
            console.error(error)
        }
    }

    const addDevicesListModal = (locationId: string) => () => {
        setTypeModal('DevicesList', undefined, undefined, undefined, undefined, locationId)
    }

    const isTechnician = userRole === 'ADMIN_TECHNICIANS' || userRole === 'TECHNICIAN'
    const departments = building.departments
    const currentDepartment = building.departments?.find((dept) => dept.department_id === departmentId)

    return (
        <section className={`${style.dropdownContainer}`}>
            <article className={`${style.dropdownBuild}`}>
                {/* Title of dropdown */}
                <section className={`${style.dropdownTitle} ${style.dropdownTitlePadding}`} onClick={handleShowInfo}>
                    <span>
                        <Building strokeWidth={1.75} />
                        {building.name}
                    </span>
                    <button className={`${style.arrowButton} ${showInfo ? style.active : ''} `}>
                        <ChevronDown className={style.arrow} />
                    </button>
                </section>

                {/* Dropdown content */}
                <section
                    className={`${style.dropDownInfoContainer} ${showInfo ? style.showInfo : ''}`}
                    ref={contentRef}
                >
                    <div className={`${style.dropdownTitleOpen}`}>
                        <span className={`${style.totalDevicesText}`}>
                            Responsable:
                            <span className={`${style.p2}`}>
                                {isTechnician ? (
                                    departments.map((dept, index) =>
                                        dept.build_manager ? (
                                            <div key={dept.build_manager._id || index} className={`${style.p2}`}>
                                                {dept.build_manager.name}
                                            </div>
                                        ) : (
                                            <div key={dept._id || index} className={`${style.p2}`}>
                                                Sin responsable asignado
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <span className={`${style.p2}`}>
                                        {` ${currentDepartment?.build_manager?.name}` || 'Sin responsable asignado'}
                                    </span>
                                )}
                            </span>
                        </span>
                        {isTechnician ? (
                            <div className={`${style.dropdownTitleOpen}`}>
                                <span className={`${style.totalDevicesText}`}>
                                    Total de Equipos: <span className={`${style.p2}`}>{building.totalDevices}</span>
                                </span>
                            </div>
                        ) : (
                            <div className={`${style.dropdownTitleOpen}`}>
                                <button
                                    className={`${style.buildButton}`}
                                    onClick={() => setTypeModal('EditBuild', building._id)}
                                >
                                    <Pencil />
                                    Editar edificio
                                </button>

                                <button
                                    className={style.buildButton}
                                    onClick={() =>
                                        setTypeModal('DeleteBuild', building._id, undefined, building.name, undefined)
                                    }
                                >
                                    <Trash2 />
                                    Borrar edificio
                                </button>
                            </div>
                        )}
                    </div>

                    {!isTechnician && (
                        <div className={`${style.dropdownTitleOpen}`}>
                            <span className={`${style.totalDevicesText}`}>
                                Total de Equipos: <span className={`${style.p2}`}>{building.totalDevices}</span>
                            </span>
                            <div className={`${style.dropdownTitleOpen}`}>
                                <button
                                    onClick={() => setTypeModal('AddOfficeClass', building._id)}
                                    className={`${style.buildButton}`}
                                >
                                    <Plus />
                                    Agregar sublocalización
                                </button>
                            </div>
                        </div>
                    )}

                    <ul className={`${style.buildTable}`}>
                        <li className={style.buildTableHeader}>
                            <div className={style.buildTableHeaderName}>
                                <span className={style.buildTableHeaderText}>Sublocalizaciones</span>
                            </div>
                            <div className={style.buildTableHeaderName}>
                                <span className={style.buildTableHeaderText}>Responsable</span>
                            </div>
                            <div
                                className={` ${style.buildTableHeaderActions} ${
                                    isTechnician ? style.buildTableHeaderAdmin : ''
                                }`}
                            >
                                <span className={`${style.buildTableHeaderText}`}>Equipos</span>
                                {!isTechnician && <span className={style.buildTableHeaderText}>Acciones</span>}
                            </div>
                        </li>
                        {locations.map((location) => (
                            <li
                                key={location._id}
                                onClick={addDevicesListModal(location._id)}
                                className={style.buildInfo}
                            >
                                <div className={`${style.buildTableName}`}>{location.name}</div>
                                <div className={`${style.buildTableManager}`}>
                                    {location.location_manager
                                        ? location.location_manager.name
                                        : 'Sin responsable asignado'}
                                </div>
                                <div
                                    className={`${style.buildTableActions} ${
                                        isTechnician ? style.buildTableAdmin : ''
                                    }`}
                                >
                                    <span>
                                        Equipos: <span className={`${style.p2}`}>{location.totalDevices}</span>
                                    </span>
                                    {!isTechnician && (
                                        <div className={style.buildTableActions}>
                                            <Actions
                                                row={''}
                                                parentRef={contentRef}
                                                actions={[
                                                    {
                                                        text: 'Editar',
                                                        icon: Pencil,
                                                        onClick: (row, e: React.MouseEvent<HTMLDivElement>) => {
                                                            e.stopPropagation()
                                                            console.log(row)
                                                            const type = 'EditOfficeClass'
                                                            const officeData = location
                                                            setTypeModal(type, undefined, officeData)
                                                        },
                                                    },
                                                    {
                                                        text: 'Borrar',
                                                        icon: Trash2,
                                                        onClick: (row, e: React.MouseEvent<HTMLDivElement>) => {
                                                            e.stopPropagation()
                                                            console.log(row)
                                                            setTypeModal(
                                                                'DeleteOfficeClass',
                                                                undefined,
                                                                undefined,
                                                                undefined,
                                                                location.name,
                                                                location._id,
                                                            )
                                                        },
                                                    },
                                                ]}
                                            />
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </section>
    )
}
