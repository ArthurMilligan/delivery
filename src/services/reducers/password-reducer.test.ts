import { passwordReducer } from './password-reducer'
import * as types from '../constans/password-constans'
const initialState = {
    isResetEmailSent: false,
    forgotPasswordRequest: false,
    forgotPasswordRequestFailed: false,
    isPasswordReset: false,
    resetPasswordRequest: false,
    resetPasswordRequestFailed: false,
}

describe('password-reducer', () => {
    it('should return the initial state', () => {
        expect(passwordReducer(undefined, {} as any)).toEqual(initialState)
    })
    describe('forgot password', () => {
        it('should start forgot password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.FORGOT_PASSWORD
                })
            ).toEqual({
                ...initialState,
                forgotPasswordRequest: true,
                forgotPasswordRequestFailed: false,
            })
        })
        it('should fail forgot password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.FORGOT_PASSWORD_FAILED
                })
            ).toEqual({
                ...initialState,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: true,
            })
        })
        it('should success forgot password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.FORGOT_PASSWORD_SUCCESS
                })
            ).toEqual({
                ...initialState,
                isResetEmailSent: true,
                forgotPasswordRequest: false,
                forgotPasswordRequestFailed: false,
            })
        })
        it('should end forgot password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.FORGOT_PASSWORD_SUCCESS
                })
            ).toEqual({ ...initialState, isResetEmailSent: true, })
        })
    })
    describe('reset password', () => {
        it('should start reset password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.RESET_PASSSWORD
                })
            ).toEqual({
                ...initialState,
                resetPasswordRequest: true,
                resetPasswordRequestFailed: false,
            })
        })
        it('should fail reset password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.RESET_PASSSWORD_FAILED
                })
            ).toEqual({
                ...initialState,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: true,
            })
        })
        it('should reset password success', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.RESET_PASSSWORD_SUCCESS
                })
            ).toEqual({
                ...initialState,
                isPasswordReset: true,
                resetPasswordRequest: false,
                resetPasswordRequestFailed: false,
            })
        })
        it('should end reset password', () => {
            expect(
                passwordReducer(initialState, {
                    type: types.RESET_PASSSWORD_END
                })
            ).toEqual({
                ...initialState
            })
        })
    })


})