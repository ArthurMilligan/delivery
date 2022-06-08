import { IItem } from './../actions/items-actions';

export interface IItemsReducerState {
  items: Array<IItem> | [];
  itemsRequest: boolean;
  itemsRequestFailed: boolean;
}
