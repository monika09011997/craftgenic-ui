
import axios from "axios";
import { ProductListItem } from "./types";

export const fetchProductsList = async (): Promise<ProductListItem[]> => {
    try {
        const response = await axios.get<ProductListItem[]>(
            "/api/products"
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};