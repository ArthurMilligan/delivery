import { REGISTRATION, REGISTRATION_SUCCESS } from './../constans/auth-constans';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { registration } from './auth-actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const initialState = {
  isAuth: false,
  userInformation: {
    email: '',
    name: '',
  },
  registrationInfo: {
    registrationRequest: false,
    registrationRequestFailed: false,
  }
}

describe('registration', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch' as any).mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true, status: 'ok', user: { email: 'email', name: 'name' } }),
      ok: true
    })
  })
  afterEach(() => jest.restoreAllMocks())
  test('registration return', () => {
    const expectedActions = [
      { type: REGISTRATION },
      { type: REGISTRATION_SUCCESS, email: 'email', name: 'name' }
    ]
    const store = mockStore(initialState)
    return store
      .dispatch<any>(registration({ email: 'email', name: 'name', password: 'password' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
}) 