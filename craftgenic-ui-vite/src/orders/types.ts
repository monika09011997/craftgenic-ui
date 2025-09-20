import { ProductListItem } from "../home/types";

// A placeholder for your Order type
export interface Order {
  orderId: string;
  orderDate: string;
  totalAmount: number;
  items: { name: string, quantity: number }[];
}

export interface OrderPayload {
    items: ProductListItem[],
    totalAmount: number,
    userId: string,
}

export interface OrderResponse {
    message: string,
    order: Order
    error: string | null
}