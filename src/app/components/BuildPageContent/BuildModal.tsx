import { AddBuildModal } from './AddBuildModal'
import { BuildModalType, BuildingProps, OfficeProps } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddOfficeClassroom } from './AddOfficeClassroom'

interface Props {
    isOpen: boolean
    type?: BuildModalType
    buildingId?: string
    buildingData?: BuildingProps
    officeData?: OfficeProps
    onClose: () => void
}

export const BuildModal = ({ isOpen, type, buildingId, buildingData, officeData, onClose }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.modalInfoContainer}>
                        {type === 'AddBuild' && <AddBuildModal onClose={onClose} />}
                        {type === 'AddOfficeClass' && <AddOfficeClassroom onClose={onClose} buildingId={buildingId} />}
                        {type === 'EditBuild' && <AddBuildModal onClose={onClose} buildingData={buildingData} />}
                        {type === 'EditOfficeClass' && <AddOfficeClassroom onClose={onClose} officeData={officeData} />}
                    </section>
                </div>
            )}
        </>
    )
}
