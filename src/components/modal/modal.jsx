import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import style from './modal.module.css'
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modal = document.getElementById('modal')

const Modal = (props) => {
    const closeModal = () => {
        props.setIsModalOpen(false)
    }

    const pressEscListener = useCallback((event) => {
        let newState = true
        if (event.key === "Escape") {
            newState = false
        }
        props.setIsModalOpen(newState);
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", pressEscListener, false);
        return () => {
            document.removeEventListener("keydown", pressEscListener, false);
        };
    }, []);

    return createPortal(
        <>
            <ModalOverlay setIsModalOpen={props.setIsModalOpen} />
            <div className={style.modal}>
                <span className={`${style.icon} mt-15 mr-10`}>
                    <CloseIcon type="primary" onClick={() => { closeModal() }} />
                </span>
                {props.children}
            </div>
        </>,
        modal)
}

Modal.propTypes = {
    setIsModalOpen: PropTypes.func.isRequired
}

export default Modal