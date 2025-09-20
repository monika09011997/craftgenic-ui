import { OtpResponse, VerifyResponse } from "./types";
import axios from "axios";


export const fetchRequestOtp = async(enteredName: string, identifier: string): Promise<OtpResponse> => {
    try {
    const response = await axios.post<OtpResponse>(`/api/auth/request-otp`, { enteredName, identifier });
    return response.data;
    } catch (error) {
        throw error;
    } 

}

export const fetchVerifyOtp = async( identifier: string, otp: string): Promise<VerifyResponse> => {
    try {
    const response = await axios.post<VerifyResponse>(`/api/auth/verify-otp`, { identifier, otp });
    return response.data;
    } catch (error) {
        throw error;
    } 

}


