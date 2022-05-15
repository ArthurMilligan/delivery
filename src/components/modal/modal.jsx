import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import style from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
const modal = document.getElementById('modal')

const Modal = (props) => {
    const history = useHistory()
    const closeModal = () => {
        history.goBack();
    }
    const pressEscListener = useCallback((event) => {
        history.goBack();
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", pressEscListener, false);
        return () => {
            document.removeEventListener("keydown", pressEscListener, false);
        };
    }, []);

    return createPortal(
        <>
            <ModalOverlay history={history} />
            <div className={style.modal}>
                <span className={`${style.icon} mt-15 mr-10`}>
                    <CloseIcon type="primary" onClick={() => { closeModal() }} />
                </span>
                {props.children}
            </div>
        </>,
        modal)
}

export default Modal