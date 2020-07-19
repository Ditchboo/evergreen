import {OrderLine} from "./order-line";
import {Customer} from "./customer";

export interface CreateOrder {
  customer?: Customer;
  products: OrderLine[];
  cardToken?: string;
  collectionSlot?: any;
}
