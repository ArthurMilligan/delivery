import { authReducer } from './auth-reducer'
import * as types from '../constans/auth-constans'
const initialState = {
    isAuth: false,
    userInformation: {
        email: '',
        name: '',
    },
    registrationInfo: {
        registrationRequest: false,
        registrationRequestFailed: false,
    },
    loginInfo: {
        loginRequest: false,
        loginRequestFailed: false,
        loginRequestSuccess: false,
    },
    getUserInfo: {
        getUserRequest: false,
        getUserRequestFailed: false,
    },
    updateUserInfo: {
        updateUserRequest: false,
        updateUserRequestFailed: false,
    },
    updateTokenInfo: {
        updateTokenRequest: false,
        updateTokenRequestFailed: false,
    },
};
describe('auth-reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {} as any)).toEqual(initialState)
    })
    describe('registration', () => {
        it('should start registration', () => {
            expect(
                authReducer(initialState, {
                    type: types.REGISTRATION
                })
            ).toEqual({
                ...initialState,
                registrationInfo: {
                    registrationRequest: true,
                    registrationRequestFailed: false,
                }
            })
        })
        it('should register success and add user', () => {
            expect(
                authReducer(initialState, {
                    type: types.REGISTRATION_SUCCESS,
                    email: 'email',
                    name: 'name'
                })
            ).toEqual({
                ...initialState,
                isAuth: true,
                registrationInfo: {
                    registrationRequest: false,
                    registrationRequestFailed: false,
                },
                userInformation: {
                    email: 'email',
                    name: 'name',
                }
            })
        })
        it('should register fail', () => {
            expect(
                authReducer(initialState, {
                    type: types.REGISTRATION_FAILED
                })
            ).toEqual({
                ...initialState,
                registrationInfo: {
                    registrationRequest: false,
                    registrationRequestFailed: true,
                }
            })
        })
    })
    describe('login', () => {
        it('should start login', () => {
            expect(
                authReducer(initialState, {
                    type: types.LOGIN
                })
            ).toEqual({
                ...initialState,
                loginInfo: {
                    loginRequest: true,
                    loginRequestFailed: false,
                    loginRequestSuccess: false,
                }
            })
        })
        it('should success login', () => {
            expect(
                authReducer(initialState, {
                    type: types.LOGIN_SUCCESS,
                    email: 'email',
                    name: 'name'
                })
            ).toEqual({
                ...initialState,
                isAuth: true,
                loginInfo: {
                    loginRequest: false,
                    loginRequestFailed: false,
                    loginRequestSuccess: true,
                },
                userInformation: {
                    email: 'email',
                    name: 'name',
                },
            })
        })
        it('should fail login', () => {
            expect(
                authReducer(initialState, {
                    type: types.LOGIN_FAILED
                })
            ).toEqual({
                ...initialState,
                loginInfo: {
                    loginRequest: false,
                    loginRequestFailed: true,
                    loginRequestSuccess: false,
                }
            })
        })
        it('should end login', () => {
            expect(
                authReducer(initialState, {
                    type: types.LOGIN_END
                })
            ).toEqual({
                ...initialState,
                loginInfo: {
                    loginRequest: false,
                    loginRequestFailed: false,
                    loginRequestSuccess: false,
                }
            })
        })
    })
    describe('get user info', () => {
        it('should start get user info', () => {
            expect(
                authReducer(initialState, {
                    type: types.GET_USER_INFORMATION
                })
            ).toEqual({
                ...initialState,
                getUserInfo: {
                    getUserRequest: true,
                    getUserRequestFailed: false,
                }
            })
        })
        it('should success get user info', () => {
            expect(
                authReducer(initialState, {
                    type: types.GET_USER_INFORMATION_SUCCESS,
                    email: 'email',
                    name: 'name'
                })
            ).toEqual({
                ...initialState,
                isAuth: true,
                userInformation: {
                    email: 'email',
                    name: 'name',
                },
                getUserInfo: {
                    getUserRequest: false,
                    getUserRequestFailed: false,
                },
            })
        })
        it('should failed get user info', () => {
            expect(
                authReducer(initialState, {
                    type: types.GET_USER_INFORMATION_FAILED
                })
            ).toEqual({
                ...initialState,
                getUserInfo: {
                    getUserRequest: false,
                    getUserRequestFailed: true,
                },
            })
        })
    })
    describe('update user info', () => {
        it('should start update user info', () => {
            expect(
                authReducer(initialState, {
                    type: types.UPDATE_USER_INFORMATION
                })
            ).toEqual({
                ...initialState,
                updateUserInfo: {
                    updateUserRequest: true,
                    updateUserRequestFailed: false,
                }
            })
        })
        it('should fail update user info', () => {
            expect(
                authReducer(initialState, {
                    type: types.UPDATE_USER_INFORMATION_FAILED
                })
            ).toEqual({
                ...initialState,
                updateUserInfo: {
                    updateUserRequest: false,
                    updateUserRequestFailed: true,
                }
            })
        })
        it('should success update user info', () => {
            expect(
                authReducer(initialState, {
                    type: types.UPDATE_USER_INFORMATION_SUCCESS,
                    email: 'email',
                    name: 'name'
                })
            ).toEqual({
                ...initialState,
                isAuth: true,
                userInformation: {
                    email: 'email',
                    name: 'name',
                },
                updateUserInfo: {
                    updateUserRequest: false,
                    updateUserRequestFailed: false,
                }
            })
        })
    })
    describe('upadte token', () => {
        it('should start update token', () => {
            expect(
                authReducer(initialState, {
                    type: types.UPDATE_TOKEN
                })
            ).toEqual({
                ...initialState,
                updateTokenInfo: {
                    updateTokenRequest: true,
                    updateTokenRequestFailed: false,
                },
            })
        })
        it('should fail update token', () => {
            expect(
                authReducer(initialState, {
                    type: types.UPDATE_TOKEN_FAILED
                })
            ).toEqual({
                ...initialState,
                updateTokenInfo: {
                    updateTokenRequest: false,
                    updateTokenRequestFailed: true,
                },
            })
        })
        it('should success update token', () => {
            expect(
                authReducer(initialState, {
                    type: types.UPDATE_TOKEN_SUCCESS
                })
            ).toEqual({
                ...initialState,
                updateTokenInfo: {
                    updateTokenRequest: false,
                    updateTokenRequestFailed: false,
                },
            })
        })
    })
    it('logout', () => {
        expect(
            authReducer(initialState, {
                type: types.LOGOUT
            })
        ).toEqual({
            ...initialState,
            isAuth: false,
            userInformation: {
                email: '',
                name: '',
            },
        })
    })
})
