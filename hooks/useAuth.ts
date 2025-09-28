import { useMemo, useState } from "react";

// 임시 훅: 실제 앱에서는 토큰/스토리지/서버 검증으로 교체
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 토글러/액션은 추후 로그인 플로우에 연결
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);
}
