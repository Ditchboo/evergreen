import {OrderLine} from "./order-line";

export interface Order {
  collectionDate: any;
  customerFirstName: string;
  customerLastName: string;
  orderId: number;
  products: OrderLine[];
}
