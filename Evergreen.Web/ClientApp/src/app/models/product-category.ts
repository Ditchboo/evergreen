import {Product} from "./product";

export interface ProductCategory {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  products?: Product[];
}
