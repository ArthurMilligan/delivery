import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { registration } from '../../services/actions/auth-actions';
import { IRegistrationState } from '../../utils/types';
import Styles from './registration.module.css';

const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isRequest = useSelector((store) => store.auth.registrationInfo.registrationRequest);
  const loginOnClick = useCallback(() => {
    history.replace({ pathname: '/login' });
  }, [history]);
  const [registrationData, setRegistrationData] = useState<IRegistrationState>({
    email: '',
    password: '',
    name: '',
  });
  const registrationOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registration({ ...registrationData }));
  };
  if (isRequest) {
    return <Loading />;
  }
  return (
    <div className={Styles.registrationBlock}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <form className={Styles.registrationForm} onSubmit={registrationOnSubmit}>
        <div className='mt-6'>
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRegistrationData({ ...registrationData, name: e.target.value })}
            value={registrationData.name}
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className='mt-6'>
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegistrationData({
                ...registrationData,
                email: e.target.value,
              })
            }
            value={registrationData.email}
            type={'email'}
            placeholder={'Email'}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className='mt-6'>
          <PasswordInput
            value={registrationData.password}
            name={'password'}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRegistrationData({
                ...registrationData,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className='mt-6'>
          <Button type='primary' size='medium'>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className='mt-20'>
        <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</span>
        <Button type='secondary' size='medium' onClick={loginOnClick}>
          Войти
        </Button>
      </div>
    </div>
  );
};
export default Registration;
