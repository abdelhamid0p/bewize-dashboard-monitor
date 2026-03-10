import { useGetStudentDetailsQuery } from '../api/studentDetailsApi';

export const useStudentDetails = (studentId: string) => {
  const { data, isLoading, isError, error } = useGetStudentDetailsQuery(studentId);
  return {
    student: data,
    isLoading,
    isError,
    error,
  };
};
