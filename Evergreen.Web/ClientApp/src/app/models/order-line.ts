import {Product} from "./product";

export interface OrderLine {
  productId: number;
  productTitle: string;
  costPerItem: number;
  quantity: number;
}
