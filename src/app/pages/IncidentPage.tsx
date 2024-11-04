import { useState } from 'react'
import { CustomSelect } from '../../ui'
import {
    API_BASE_URL,
    getIncidentStateOptions,
    getIncidentTypeOptions,
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

    const [incident, setIncident] = useState<string>('ALL')
    const [incidentOptions, setIncidentOptions] = useState<IOptions[]>([])
    const [incidentId, setIncidentId] = useState<string | undefined>(undefined)

    const [typeIncident] = useState<IOptions[]>(getIncidentTypeOptions)
    const [statusIncident] = useState<IOptions[]>(getIncidentStateOptions)

    const handleSelect = (selected: { label: string; value: string }) => {
        setIncident(selected.value)
        setRefreshTable(true)
    }

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
                                    value={incident}
                                    options={typeIncident}
                                    onSelect={handleSelect}
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
                                        value={incident}
                                        options={statusIncident}
                                        onSelect={handleSelect}
                                        placeholder="Todos"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={style.actioncontainer}>
                            <span className={style.hideText}>add</span>
                            <button onClick={onOpenModal} className={style.button}>
                                <Plus /> Agregar
                            </button>
                        </div>
                    </article>
                </section>

                <section>
                    <IncidentTable
                        refresh={refreshTable}
                        building={incident}
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
