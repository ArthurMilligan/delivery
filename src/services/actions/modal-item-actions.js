export const ADD_ITEM_INFORMATION = 'ADD_ITEM_INFORMATION';
export const DELETE_ITEM_INFORMATION = 'DELETE_ITEM_INFORMATION';
export const ADD_ITEM_INFORMATION_ACTION_CREATOR = (
  name,
  calories,
  proteins,
  fat,
  carbohydrates
) => {
  return {
    type: ADD_ITEM_INFORMATION,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
  };
};
