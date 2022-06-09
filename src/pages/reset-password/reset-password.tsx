import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { resetPassword } from '../../services/actions/password-actions';
import { ILocationState, IResetPasswordState } from '../../utils/types';
import Styles from './reset-password.module.css';

const ResetPassword: FC = () => {
  const [resetData, setResetData] = useState<IResetPasswordState>({
    password: '',
    token: '',
  });
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const isPasswordReset = useSelector((store) => store.password.isPasswordReset);
  const isRequest = useSelector((store) => store.password.resetPasswordRequest);
  const dispatch = useDispatch();
  const location = useLocation<ILocationState>();
  const history = useHistory();
  const loginOnClick = useCallback(() => {
    history.replace({ pathname: '/login' });
  }, [history]);
  const resetOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword({ ...resetData }));
  };
  const background = location && location.state && location.state.from;
  const pathname = background && location.state.from ? location.state.from.pathname : '';
  if (!background || pathname !== '/forgot-password') {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password',
        }}
      />
    );
  }
  if (isRequest) {
    return <Loading />;
  }

  return (
    <Route>
      {isPasswordReset ? (
        <Redirect to='/login' />
      ) : (
        <div className={Styles.resetPasswordBlock}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <form className={Styles.resetForm} onSubmit={resetOnSubmit}>
            <div className='mt-6'>
              <Input
                type={visiblePassword ? 'text' : 'password'}
                placeholder={'Введите новый пароль'}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={visiblePassword ? 'HideIcon' : 'ShowIcon'}
                value={resetData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setResetData({ ...resetData, password: e.target.value })}
                onIconClick={() => setVisiblePassword(!visiblePassword)}
              />
            </div>
            <div className='mt-6'>
              <Input
                type={'text'}
                placeholder={'Введите код из письма'}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                value={resetData.token}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setResetData({ ...resetData, token: e.target.value })}
              />
            </div>
            <div className='mt-6'>
              <Button type='primary' size='medium'>
                Сохранить
              </Button>
            </div>
          </form>
          <div className='mt-20'>
            <span className='text text_type_main-default text_color_inactive'>Вспомнили пароль?</span>
            <Button type='secondary' size='medium' onClick={loginOnClick}>
              Войти
            </Button>
          </div>
        </div>
      )}
    </Route>
  );
};
export default ResetPassword;
