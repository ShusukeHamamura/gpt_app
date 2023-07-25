import { useCallback } from "react";

export const useSignup = () => {
  const signup = useCallback((id, password) => {
    console.log(id, password);
  }, []);
  return { signup };
};
