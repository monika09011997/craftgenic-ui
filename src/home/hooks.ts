
import { useQuery } from '@tanstack/react-query';
import { fetchProductsList } from './api';

export const useFetchProductList = () => {

    const hook = useQuery({
    queryKey: ['products_list'],
    queryFn: fetchProductsList,
    });

    return {
        productList: hook.data,
        ...hook
    }


}