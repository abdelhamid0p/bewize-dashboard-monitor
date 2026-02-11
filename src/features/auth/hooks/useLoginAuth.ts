import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { login } from '@/features/auth/services/auth_service';

export const useLoginAuth = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state: { auth: any }) => state.auth);

  const handleLogin = (email: string, password: string) => {
    dispatch(login(email, password));
  };

  return {
    loading,
    error,
    handleLogin,
  };
};