import { SparePartsType, ISpareParts } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddSparePartModal } from './AddSparePartModal'
import { DeleteModal } from '../../../ui'

interface Props {
    isOpen: boolean
    typeModal?: SparePartsType
    sparePartData?: ISpareParts
    name?: string
    deleteFunction: () => void
    onClose: () => void
}

export const SparePartModal = ({ isOpen, onClose, typeModal, sparePartData, name, deleteFunction }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    {typeModal === 'AddSparePart' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddSparePartModal onClose={onClose} />
                        </section>
                    )}
                    {typeModal === 'EditSparePart' && (
                        <section className={style.largeModalInfoContainer}>
                            <AddSparePartModal onClose={onClose} spareData={sparePartData} />
                        </section>
                    )}
                    {typeModal === 'DeleteSparePart' && (
                        <section className={style.modalInfoContainer}>
                            <DeleteModal onClose={onClose} name={name} deleteFunction={deleteFunction} />
                        </section>
                    )}
                </div>
            )}
        </>
    )
}
