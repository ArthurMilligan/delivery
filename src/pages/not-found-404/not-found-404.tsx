import { FC } from 'react';
import Styles from './not-found-404.module.css';

const NotFound404: FC = () => {
  return (
    <div className={Styles.notFoundBlock}>
      <img src={require('../../images/404.png')} alt='тут должна быть картинка' />
      <span className='text text_type_main-large'>Что-то пошло не так(</span>
    </div>
  );
};
export default NotFound404;
