import { useCreateDiscountMutation } from '../api/createDiscountApi';

export const useCreateDiscount = () => {
  const [createDiscount, { isLoading, isSuccess, isError, error, data }] = useCreateDiscountMutation();
  return {
    createDiscount,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
};
