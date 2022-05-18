import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import style from './modal.module.css'
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const modal = document.getElementById('modal')

const Modal = (props) => {
    const pressEscListener = useCallback((event) => {
        props.onClose()
    }, []);
    useEffect(() => {
        document.addEventListener("keydown", pressEscListener, false);
        return () => {
            document.removeEventListener("keydown", pressEscListener, false);
        };
    }, []);

    return createPortal(
        <>
            <ModalOverlay onClose={props.onClose} />
            <div className={style.modal}>
                <span className={`${style.icon} mt-15 mr-10`}>
                    <CloseIcon type="primary" onClick={()=>props.onClose()} />
                </span>
                {props.children}
            </div>
        </>,
        modal)
}
Modal.propTypes = {
    onClose:PropTypes.func.isRequired
}

export default Modal