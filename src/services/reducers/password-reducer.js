import { FORGOT_PASSWORD, FORGOT_PASSWORD_END, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, RESET_PASSSWORD, RESET_PASSSWORD_END, RESET_PASSSWORD_FAILED, RESET_PASSSWORD_SUCCESS } from "../actions/password-actions"

const initialState = {
    isResetEmailSent: false,
    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,
    isPasswordReset: false,
    resetPasswordRequest: false,
    resetPasswordRequestFailed: false
}
export const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD:
            return ({
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false
            })
        case FORGOT_PASSWORD_SUCCESS:
            return ({
                ...state,
                isResetEmailSent: true,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: false
            })
        case FORGOT_PASSWORD_FAILED:
            return ({
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: true
            })
        case FORGOT_PASSWORD_END:
            return ({
                ...state,
                isResetEmailSent: false
            })
        case RESET_PASSSWORD:
            return ({
                ...state,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false
            })
        case RESET_PASSSWORD_SUCCESS:
            return ({
                ...state,
                isPasswordReset: true,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: false
            })
        case RESET_PASSSWORD_FAILED:
            return ({
                ...state,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: true
            })
        case RESET_PASSSWORD_END:
            return ({
                ...state,
                isPasswordReset: false
            })
        default:
            return state
    }
}