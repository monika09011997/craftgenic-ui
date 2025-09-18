// hooks.ts

import { useMutation } from '@tanstack/react-query';
import { fetchRequestOtp, fetchVerifyOtp } from './api';

export const useRequestOtp = () => {
    // Return the entire mutation object
    return useMutation({
        mutationFn: ({ enteredName, identifier }: { enteredName:string, identifier: string }) => fetchRequestOtp(enteredName, identifier),
    });
};

export const useVerifyOtp = () => {
    // It's often better to handle navigation/snackbars in the component,
    // but you can keep them here as default behavior.
    // Callbacks passed from the component will override these.
    
    // Return the entire mutation object
    return useMutation({
        mutationFn: ({ identifier, otp }: { identifier: string; otp: string }) =>
            fetchVerifyOtp( identifier, otp),
    });
};