import { useCallback, useEffect, useState } from 'react'
import { CustomSelect } from '../../ui'
import {
    API_BASE_URL,
    getIncidentStateOptions,
    getIncidentTypeOptions,
    getUserRole,
    IncidentModalType,
    IncidentState,
    IOptions,
} from '../../utils'
import { IncidentModal, IncidentTable } from '../components'

import { Plus } from 'lucide-react'
import style from '../style/deviceContainer.module.css'

export const IncidentPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState<IncidentModalType>()
    const [refreshTable, setRefreshTable] = useState(false)
    const [deleteName, setDeleteName] = useState<string>('')
    const [incidentStatus, setIncidentStatus] = useState<IncidentState>()
    const [nameAction, setNameAction] = useState('')

    const [incidentId, setIncidentId] = useState<string | undefined>(undefined)
    const [userRole, setUserRole] = useState<string | null>(null)

    const [typeIncidentOptions] = useState<IOptions[]>(getIncidentTypeOptions('ALL'))
    const [statusIncidentOptions] = useState<IOptions[]>(getIncidentStateOptions('ALL'))
    const [typeIncident, setTypeIncident] = useState<string>('ALL')
    const [statusIncident, setstatusIncident] = useState<string>('ALL')

    const fetchRole = useCallback(async () => {
        const role = await getUserRole()
        setUserRole(role)
    }, [])

    const onOpenModal = () => {
        setTypeModal('AddIncident')
        setIncidentId(undefined)
        setShowModal(true)
    }

    const handletypeModal = (
        id: string,
        type: IncidentModalType = 'EditIncident',
        incidentStatus?: IncidentState,
        nameAction?: string,
    ) => {
        setTypeModal(type)
        if (type == 'FinishedIncident') {
            setTypeModal('FinishedIncident')
            setNameAction(nameAction || '')
            setRefreshTable(false)
        }
        if (type == 'InfoIncident') {
            setTypeModal('InfoIncident')
            setIncidentStatus(incidentStatus)
            setRefreshTable(false)
        }
        if (type == 'AssignedIncident') {
            setTypeModal('AssignedIncident')
            setIncidentStatus(incidentStatus)
            setNameAction(nameAction || '')
            setRefreshTable(false)
        }
        setIncidentId(id)
        setRefreshTable(false)
        setShowModal(true)
    }

    const handleDeleteModal = (id: string, incidentName: string) => {
        setTypeModal('DeleteIncident')
        setIncidentId(id)
        setDeleteName(incidentName)
        setRefreshTable(false)
        setShowModal(true)
    }

    const onCloseModal = () => {
        setIncidentId(undefined)
        setIncidentStatus(undefined)
        setDeleteName('')
        setRefreshTable(true)
        setShowModal(false)
    }

    const deleteIncident = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/incidents/${incidentId}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Error al borrar la incidencia')
            onCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchRole()
        }
        fetchData()
    }, [])

    return (
        <>
            <div className={style.container}>
                <section className={style.header}>
                    <h2>Incidencias</h2>
                    <article className={style.actionArticle}>
                        <div className={style.actioncontainer}>
                            <span>Tipo</span>
                            <div>
                                <CustomSelect
                                    menu
                                    value={typeIncident}
                                    options={typeIncidentOptions}
                                    onSelect={(selected: { label: string; value: string }) => {
                                        setTypeIncident(selected.value)
                                    }}
                                    placeholder="Todos"
                                />
                            </div>
                        </div>
                        <div className={style.actioncontainer}>
                            <div>
                                <span>Estado</span>
                                <div>
                                    <CustomSelect
                                        menu
                                        value={statusIncident}
                                        options={statusIncidentOptions}
                                        onSelect={(selected: { label: string; value: string }) => {
                                            setstatusIncident(selected.value)
                                        }}
                                        placeholder="Todos"
                                    />
                                </div>
                            </div>
                        </div>
                        {userRole == 'ADMIN_DEPARTMENT' && (
                            <div className={style.actioncontainer}>
                                <span className={style.hideText}>add</span>
                                <button onClick={onOpenModal} className={style.button}>
                                    <Plus /> Agregar
                                </button>
                            </div>
                        )}
                    </article>
                </section>

                <section>
                    <IncidentTable
                        refresh={refreshTable}
                        typeIncident={typeIncident}
                        statusIncident={statusIncident}
                        typeincidentModal={handletypeModal}
                        deleteIncident={handleDeleteModal}
                    />
                </section>
            </div>

            <IncidentModal
                isOpen={showModal}
                onClose={onCloseModal}
                type={typeModal}
                incidentId={incidentId}
                deleteName={deleteName}
                status={incidentStatus}
                nameAction={nameAction}
                deleteFunction={deleteIncident}
            />
        </>
    )
}
