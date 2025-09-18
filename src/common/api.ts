import { OtpResponse, VerifyResponse } from "./types";
import axios from "axios";

export const API_BASE_URL = "http://localhost:5001/api";
export const AUTH_API_URL = `${API_BASE_URL}/auth`;

export const fetchRequestOtp = async(enteredName: string, identifier: string): Promise<OtpResponse> => {
    try {
    const response = await axios.post<OtpResponse>(`${AUTH_API_URL}/request-otp`, { enteredName, identifier });
    return response.data;
    } catch (error) {
        throw error;
    } 

}

export const fetchVerifyOtp = async( identifier: string, otp: string): Promise<VerifyResponse> => {
    try {
    const response = await axios.post<VerifyResponse>(`${AUTH_API_URL}/verify-otp`, { identifier, otp });
    return response.data;
    } catch (error) {
        throw error;
    } 

}


