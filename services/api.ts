import AsyncStorage from "@react-native-async-storage/async-storage";

// Android 에뮬레이터에서 호스트 머신에 접근하기 위한 IP
// localhost 대신 10.0.2.2 사용 (Android 에뮬레이터의 호스트 머신 IP)
const API_BASE_URL = "http://10.0.2.2:3000";

// 토큰 관리
export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const setToken = async (token: string) => {
  await AsyncStorage.setItem("token", token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

// API 요청 헬퍼
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API 요청 실패");
    }

    return data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    throw error;
  }
};

// 인증 API
export const authAPI = {
  login: async (username: string, password: string) => {
    return apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  register: async (username: string, email: string, password: string) => {
    return apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
  },

  getProfile: async () => {
    return apiRequest("/api/auth/profile");
  },
};

// 노트 API
export const noteAPI = {
  getNotes: async () => {
    return apiRequest("/api/notes");
  },

  getNoteDetail: async (noteId: number) => {
    return apiRequest(`/api/notes/${noteId}`);
  },

  deleteNote: async (noteId: number) => {
    return apiRequest(`/api/notes/${noteId}`, {
      method: "DELETE",
    });
  },
};

// 퀴즈 API
export const quizAPI = {
  getQuizzes: async () => {
    return apiRequest("/api/quizzes");
  },

  getQuizDetail: async (quizId: number) => {
    return apiRequest(`/api/quizzes/${quizId}?include_questions=true`);
  },

  submitQuiz: async (quizId: number, answers: Record<string, string>) => {
    return apiRequest(`/api/quizzes/${quizId}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers }),
    });
  },

  deleteQuiz: async (quizId: number) => {
    return apiRequest(`/api/quizzes/${quizId}`, {
      method: "DELETE",
    });
  },
};
