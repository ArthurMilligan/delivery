import style from './modal-overlay.module.css';
import { FC } from 'react';
import { IModalOverlayProps } from '../../utils/types';

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
  return <div className={style.overflow} onClick={() => props.onClose()}></div>;
};

export default ModalOverlay;
