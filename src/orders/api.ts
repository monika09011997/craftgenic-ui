import { Order, OrderPayload, OrderResponse } from "./types";
import axios from "axios";


export const fetchOrders = async (userId: string ): Promise<Order[]> => {
 try {
        const response = await axios.get<Order[]>(
            `http://localhost:5001/api/orders/${userId}`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// api.ts
export const createOrder = async (orderPayload: OrderPayload): Promise<OrderResponse> => {
    console.log('1. createOrder function started.');
    try {
        console.log('2. About to make axios.post request to /api/orders/create');
        
        const response = await axios.post<OrderResponse>(
            "http://localhost:5001/api/orders/create", 
            orderPayload
        );
        
        console.log('3. axios.post was successful.');
        return response.data;
    } catch (error) {
        console.error('4. An error occurred in createOrder:', error);
        throw error;
    }
};