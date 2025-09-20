
import axios from "axios";
import { ProductListItem } from "./types";

export const fetchProductsList = async (): Promise<ProductListItem[]> => {
    try {
        const response = await axios.get<ProductListItem[]>("/api/products");
        return response.data;
    } catch (error) {
        // Here, we are doing something useful with the error.
        console.error("Failed to fetch products:", error); 
        throw error; // Then we re-throw it.
    }
};