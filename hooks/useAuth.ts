import { useMemo, useState, useEffect } from "react";
import { getToken } from "../services/api";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 앱 시작 시 토큰 확인
    const checkAuthStatus = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
  };

  return useMemo(
    () => ({ isLoggedIn, isLoading, login, logout }),
    [isLoggedIn, isLoading]
  );
}
