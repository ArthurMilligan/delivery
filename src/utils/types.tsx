import { Location } from 'history';
import { SetStateAction } from 'react';

export interface IResetPasswordState {
  password: string;
  token: string;
}
export interface ISignInState {
  email: string;
  password: string;
}
export interface IRegistrationState extends ISignInState {
  name: string;
}
export interface IModalSwitchProps {
  children?: any;
}
export interface IProtectedRouteProps {
  path?: string;
  children?: any;
}
export interface IProtectedRouteLoginedProps {
  path?: string;
  children?: any;
}
export interface IUserInformation {
  email: string;
  name: string;
}
export interface IProfileNavigationProps {
  url: string;
}
export interface IOrder {
  orderDetails: {
    number: number;
    name: string;
  };
  orderRequest: boolean;
  orderRequestFailed: boolean;
}
export interface IIngredient {
  id: string;
  ingredient_id: string;
  name: string;
  price: number;
  thumbnail: string;
}
export interface IBun {
  ingredient_id: string;
  name: string;
  price: number;
  thumbnail: string;
}
export interface IItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}
export interface IConstructorItemProps {
  text: string;
  price: number;
  thumbnail: string;
  draggable: boolean;
  index?: number;
  type?: 'top' | 'bottom';
  id?: string;
  isLocked?: boolean;
}
export interface IListElementProps {
  id: string;
  img: string;
  name: string;
  price: number;
}
export interface ICart extends IBun {
  id?: string;
}

export interface IModalProps {
  onClose: () => void;
}
export interface IModalOverlayProps extends IModalProps {}
export interface ILocationState {
  from?: { pathname?: string };
  background?: Location;
}
export interface ISwitchPanelProps {
  currentSwitchPanel: string;
  setCurrentSwitchPanel: (value: SetStateAction<string>) => void;
}
