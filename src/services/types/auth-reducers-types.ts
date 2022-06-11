export interface IAuthState {
  isAuth: boolean;
  userInformation: IUserInformation;
  registrationInfo: IRegistrationInfo;
  loginInfo: ILoginInfo;
  getUserInfo: IGetUserInfo;
  updateUserInfo: IUpdateUserInfo;
  updateTokenInfo: IUpdateTokenInfo;
}
export interface IUserInformation {
  email: string;
  name: string;
}
export interface IRegistrationInfo {
  registrationRequest: boolean;
  registrationRequestFailed: boolean;
}
export interface ILoginInfo {
  loginRequest: boolean;
  loginRequestFailed: boolean;
  loginRequestSuccess: boolean;
}
export interface IGetUserInfo {
  getUserRequest: boolean;
  getUserRequestFailed: boolean;
}
export interface IUpdateUserInfo {
  updateUserRequest: boolean;
  updateUserRequestFailed: boolean;
}
export interface IUpdateTokenInfo {
  updateTokenRequest: boolean;
  updateTokenRequestFailed: boolean;
}
