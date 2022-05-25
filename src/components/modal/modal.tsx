import { useCallback, useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IModalProps } from '../../utils/types';

const modal = document.getElementById('modal');

const Modal: FC<IModalProps> = (props) => {
  const pressEscListener = useCallback(() => {
    props.onClose();
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', pressEscListener, false);
    return () => {
      document.removeEventListener('keydown', pressEscListener, false);
    };
  }, []);
  if (!modal) {
    console.log('нет элемента с id modal');
    return <p></p>;
  }
  return createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={style.modal}>
        <span className={`${style.icon} mt-15 mr-10`}>
          <CloseIcon type='primary' onClick={() => props.onClose()} />
        </span>
        {props.children}
      </div>
    </>,
    modal
  );
};

export default Modal;
