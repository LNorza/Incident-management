import { SparePartsType } from '../../../utils'
import style from '../../style/modal.module.css'
import { AddSparePartModal } from './AddSparePartModal'

interface Props {
    isOpen: boolean
    onClose: () => void
    typeModal?: SparePartsType
}

export const SparePartModal = ({ isOpen, onClose, typeModal = 'AddSparePart' }: Props) => {
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
                </div>
            )}
        </>
    )
}
