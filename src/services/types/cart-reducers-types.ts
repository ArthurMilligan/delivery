export interface ICartState {
  bun: IBun;
  ingredients: Array<IIngredient>;
  totalPrice: number;
}
interface IBun {
  ingredient_id: string;
  name: string;
  price: number;
  thumbnail: string;
}
export interface IIngredient {
  id: string;
  ingredient_id: string;
  name: string;
  price: number;
  thumbnail: string;
}
