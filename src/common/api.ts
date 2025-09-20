import { apiClient } from "../shared/api";
import { OtpResponse, VerifyResponse } from "./types";

export const fetchRequestOtp = async(enteredName: string, identifier: string): Promise<OtpResponse> => {
    try {
    const response = await apiClient.post<OtpResponse>(`/api/auth/request-otp`, { enteredName, identifier });
    return response.data;
    } catch (error) {
        // Here, we are doing something useful with the error.
        console.error("Failed to fetch products:", error); 
        throw error; // Then we re-throw it.
    }

}

export const fetchVerifyOtp = async( identifier: string, otp: string): Promise<VerifyResponse> => {
    try {
    const response = await apiClient.post<VerifyResponse>(`/api/auth/verify-otp`, { identifier, otp });
    return response.data;
    } catch (error) {
        // Here, we are doing something useful with the error.
        console.error("Failed to fetch products:", error); 
        throw error; // Then we re-throw it.
    }

}


