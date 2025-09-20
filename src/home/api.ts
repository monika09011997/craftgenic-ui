
import { ProductListItem } from "./types";
import { apiClient } from "../shared/api";

export const fetchProductsList = async (): Promise<ProductListItem[]> => {
    try {
        const response = await apiClient.get<ProductListItem[]>("/api/products");
        return response.data;
    } catch (error) {
        // Here, we are doing something useful with the error.
        console.error("Failed to fetch products:", error); 
        throw error; // Then we re-throw it.
    }
};