import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FC, useState } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { updateToken, updateUserInformation } from '../../services/actions/auth-actions';
import { IUserInformation } from '../../utils/types';
import Loading from '../loading/loading';

const ProfileInfo: FC = () => {
  const startData = useSelector((store) => store.auth.userInformation);
  const updateStatusFailed = useSelector((store) => store.auth.updateUserInfo.updateUserRequestFailed);
  const isGetRequest = useSelector((store) => store.auth.getUserInfo.getUserRequest);
  const isUpdateRequest = useSelector((store) => store.auth.updateUserInfo.updateUserRequest);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<IUserInformation>(startData);
  const [password, setPassword] = useState<string>('');
  const [isChanged, setIsChanged] = useState<boolean>(false);

  if (updateStatusFailed) {
    dispatch(updateToken());
    dispatch(updateUserInformation({ ...userData, password }));
  }

  const cancelOnClick = () => {
    setUserData({ ...userData, ...startData });
    setPassword('');
    setIsChanged(false);
  };

  const saveOnClick = () => {
    dispatch(updateUserInformation({ ...userData, password }));
    setPassword('');
    setIsChanged(false);
  };
  if (isGetRequest || isUpdateRequest) {
    return <Loading />;
  }
  return (
    <>
      <div className='mb-6'>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserData({ ...userData, name: e.target.value });
            setIsChanged(true);
          }}
          icon={'EditIcon'}
          value={userData.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className='mb-6'>
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserData({ ...userData, email: e.target.value });
            setIsChanged(true);
          }}
          icon={'EditIcon'}
          value={userData.email}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setIsChanged(true);
          }}
          icon={'EditIcon'}
          value={password}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      {isChanged ? (
        <div className='mt-6'>
          <Button type='secondary' size='medium' onClick={saveOnClick}>
            Сохранить
          </Button>
          <Button type='secondary' size='medium' onClick={cancelOnClick}>
            Отмена
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default ProfileInfo;
