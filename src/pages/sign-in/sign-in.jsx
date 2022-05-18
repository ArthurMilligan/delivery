import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useHistory} from "react-router-dom";
import Loading from "../../components/loading/loading";
import { login } from "../../services/actions/auth-actions";
import Styles from './sign-in.module.css'
const SignIn = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const isRequest=useSelector(store=>store.auth.loginInfo.loginRequest)
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const registerOnClick = useCallback(
        () => {
            history.replace({ pathname: '/register' });
        },
        [history]
    );
    const forgotPasswordOnClick = useCallback(
        () => {
            history.replace({ pathname: '/forgot-password' });
        },
        [history]
    );
    const loginOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login({ ...loginData }))
    }
    if(isRequest){
        return(<Loading/>)
    }

    return (
        <div className={Styles.signInBlock}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <form className={Styles.signInForm} onSubmit={e => loginOnSubmit(e)}>
                <div className="mt-6">
                    <Input
                        onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                        value={loginData.email}
                        type={'email'}
                        placeholder={'Email'}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className="mt-6">
                    <PasswordInput
                        onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        value={loginData.password}
                        name={'password'} />
                </div>
                <div className="mt-6">
                    <Button type="primary" size="medium">Войти</Button>
                </div>
            </form>
            <div className="mt-20">
                <span className="text text_type_main-default text_color_inactive">
                    Вы — новый пользователь?
                </span>
                <Button type="secondary" size="medium" onClick={registerOnClick}>
                    Зарегистрироваться
                </Button>
            </div>
            <div className="mt-4">
                <span className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                </span>

                <Button type="secondary" size="medium" onClick={forgotPasswordOnClick}>
                    Восстановить пароль
                </Button>
            </div>
        </div>
    )
}

export default SignIn