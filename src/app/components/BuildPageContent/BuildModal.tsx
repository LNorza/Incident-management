import { AddBuildModal } from "./AddBuildModal";
import { BuildModalType } from "../../../utils";
import style from "../../style/modal.module.css";
import { AddOfficeClassroom } from "./AddOfficeClassroom";

interface Props {
    isOpen: boolean;
    type?: BuildModalType;
    onClose: () => void;
}

export const BuildModal = ({ isOpen, type, onClose }: Props) => {
    return (
        <>
            {isOpen && (
                <div className={style.container}>
                    <div onClick={onClose} className={style.overlay}></div>
                    <section className={style.modalInfoContainer}>
                        {type === "AddBuild" && <AddBuildModal onClose={onClose} />}
                        {type === "AddOfficeClass" && <AddOfficeClassroom onClose={onClose} />}
                    </section>
                </div>
            )}
        </>
    );
};
