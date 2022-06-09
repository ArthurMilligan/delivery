import { Location } from 'history';
import { SetStateAction } from 'react';

export interface ImapIngredient {
  id: string;
  count: number;
}
export interface IOrderProps {
  orderNumber: number;
  orderDate: Date;
  burgerName: string;
  burgerIngredientsId: Array<string>;
  id: string;
  redirect: string;
  status?: string;
}
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

export interface IUserInformation {
  email: string;
  name: string;
}
export interface IProfileNavigationProps {
  url: string;
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
