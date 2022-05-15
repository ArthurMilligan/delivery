import { checkResponse } from "../../utils/check-response";
import { baseUrl } from "../../utils/url";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie"
export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const LOGIN = "LOGIN"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"

export const GET_USER_INFORMATION = 'GET_USER_INFORMATION'
export const GET_USER_INFORMATION_SUCCESS = 'GET_USER_INFORMATION_SUCCESS'
export const GET_USER_INFORMATION_FAILED = 'GET_USER_INFORMATION_FAILED'

export const UPDATE_TOKEN = 'UPDATE_TOKEN'
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS'
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED'

export const UPDATE_USER_INFORMATION = 'UPDATE_USER_INFORMATION'
export const UPDATE_USER_INFORMATION_SUCCESS = 'UPDATE_USER_INFORMATION_SUCCESS'
export const UPDATE_USER_INFORMATION_FAILED = 'UPDATE_USER_INFORMATION_FAILED'

export const LOGOUT = "LOGOUT"

const registrationUrl = baseUrl + '/auth/register'
const loginUrl = baseUrl + '/auth/login'
const userInformationUrl = baseUrl + '/auth/user'
const updateTokenUrl = baseUrl + '/auth/token'
const logoutUrl = baseUrl + '/auth/logout'


export const registration = ({ email, password, name }) => dispatch => {
    const requestBody = {
        email: email,
        password: password,
        name: name
    }
    dispatch({ type: REGISTRATION })
    fetch(registrationUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(checkResponse)
        .then(res => {
            console.log(res)
            if (res && res.success) {
                dispatch({
                    type: REGISTRATION_SUCCESS,
                    name: res.user.name,
                    email: res.user.email,
                })
            } else {
                dispatch({
                    type: REGISTRATION_FAILED
                })
            }
            return res
        })
        .then(res => {
            if (res.refreshToken && res.accessToken) {
                document.cookie = setCookie(`refreshToken`, res.refreshToken)
                document.cookie = setCookie(`accessToken`, res.accessToken)
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: REGISTRATION_FAILED
            })
        })
}

export const login = ({ email, password }) => dispatch => {
    const requestBody = {
        email: email,
        password: password
    }
    dispatch({ type: LOGIN })
    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(checkResponse)
        .then(res => {
            console.log(res)
            if (res && res.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    name: res.user.name,
                    email: res.user.email,
                })
            } else {
                dispatch({
                    type: LOGIN_FAILED
                })
            }
            return res
        })
        .then(res => {
            if (res.refreshToken && res.accessToken) {
                document.cookie = setCookie(`refreshToken`, res.refreshToken)
                document.cookie = setCookie(`accessToken`, res.accessToken)
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: LOGIN_FAILED
            })
        })
}

export const getUserInformation = () => dispatch => {
    const token = getCookie('accessToken');
    if (!token) {
        dispatch({
            type: GET_USER_INFORMATION_FAILED
        })
    } else {
        dispatch({ type: GET_USER_INFORMATION })
        fetch(userInformationUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },

        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_INFORMATION_SUCCESS,
                        name: res.user.name,
                        email: res.user.email,

                    })
                } else {
                    dispatch({
                        type: GET_USER_INFORMATION_FAILED
                    })
                }
                return res
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: GET_USER_INFORMATION_FAILED
                })
            })
    }
}

export const updateUserInformation = ({ email, name, password }) => dispatch => {
    const token = getCookie('accessToken');
    if (!token) {
        dispatch({
            type: UPDATE_USER_INFORMATION_FAILED
        })
    } else {
        dispatch({ type: UPDATE_USER_INFORMATION })
        fetch(userInformationUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ email, name, password })

        })
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_INFORMATION_SUCCESS,
                        name: res.user.name,
                        email: res.user.email,
                    })
                } else {
                    dispatch({
                        type: UPDATE_USER_INFORMATION_FAILED
                    })
                }
                return res
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: UPDATE_USER_INFORMATION_FAILED
                })
            })
    }
}

export const updateToken = () => dispatch => {
    const token = getCookie('refreshToken');
    dispatch({ type: UPDATE_TOKEN })
    fetch(updateTokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
        .then(checkResponse)
        .then(res => {
            console.log(res)
            if (res && res.success) {
                dispatch({
                    type: UPDATE_TOKEN_SUCCESS,
                })
            } else {
                dispatch({
                    type: UPDATE_TOKEN_FAILED
                })
            }
            return res
        })
        .then(res => {
            if (res.refreshToken && res.accessToken) {
                document.cookie = setCookie(`refreshToken`, res.refreshToken)
                document.cookie = setCookie(`accessToken`, res.accessToken)
            }

        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: UPDATE_TOKEN_FAILED
            })
        })

}

export const logout = () => dispatch => {
    const token = getCookie('refreshToken')
    deleteCookie('accessToken')
    fetch(logoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
    })
        .then(checkResponse)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: LOGOUT,
                })
                deleteCookie('refreshToken')
            }
        })
        .catch(err => {
            console.log(err)
        })
}