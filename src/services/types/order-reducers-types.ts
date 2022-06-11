export interface IOrderState {
  orderDetails: IOrderDetails;
  orderRequest: boolean;
  orderRequestFailed: boolean;
}
export interface IOrderDetails {
  number: number;
  name: string;
}
