import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, fetchOrders } from "./api";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearCart } from "../cart/slice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { OrderPayload } from "./types";
import { selectCurrentUser } from "../common/userSlice";

export const useFetchOrders = () => {
    const user = useAppSelector(selectCurrentUser);

    console.log(user)

    const hook = useQuery({
        queryKey: ['order_list', user?.identifier], // It's good practice to include the userId in the queryKey
        queryFn: () => {
            // Add a check here. This satisfies TypeScript.
            if (!user?.identifier) {
                // This part will never actually run because of the 'enabled' flag,
                // but it's needed for type safety.
                throw new Error('User is not logged in.');
            }
            return fetchOrders(user.identifier);
        },
        enabled: !!user, // This correctly enables/disables the query
    });

    return {
        orderList: hook.data,
        orderLoadingStatus: hook.isLoading,
        ...hook,
    };
};

export const useCreateOrders = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const hook = useMutation({
        mutationFn: (payload: OrderPayload) =>
            createOrder(payload),
        onSuccess: () => {
            dispatch(clearCart());
            navigate(`/order-success`);
        },
        onError: (error) => {
            // 3. Show a snackbar on error instead of an alert
            enqueueSnackbar(error.message || 'Checkout failed. Please try again.', {
                variant: 'error'
            });
        },
    });

    return { 
    checkout: hook.mutate,
    createOrderData: hook.data,
    isCheckingOut: hook.isPending, // Also return the loading state
  };
};