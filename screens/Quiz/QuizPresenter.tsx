import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import TopTabs from "../../components/TopTabs";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { quizAPI } from "../../services/api";

const QuizPresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn) {
      loadQuizzes();
    }
  }, [auth.isLoggedIn]);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getQuizzes();

      // 응답 구조에 맞춰 데이터 추출
      let quizzesArr = [];
      if (response?.data?.quizzes && Array.isArray(response.data.quizzes)) {
        quizzesArr = response.data.quizzes;
      } else if (response?.data && Array.isArray(response.data)) {
        quizzesArr = response.data;
      } else if (Array.isArray(response?.quizzes)) {
        quizzesArr = response.quizzes;
      } else if (Array.isArray(response)) {
        quizzesArr = response;
      }

      setQuizzes(quizzesArr);
    } catch (error) {
      console.error("퀴즈 로딩 오류:", error);
      Alert.alert("오류", "퀴즈를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartQuiz = (quizId: number) => {
    (navigation as any).navigate("QuizDetail", { quizId });
  };

  const handleDeleteQuiz = async (quizId: number, title: string) => {
    Alert.alert("퀴즈 삭제", `"${title}" 퀴즈를 삭제하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            await quizAPI.deleteQuiz(quizId);
            setQuizzes((prev) =>
              prev.filter((quiz) => (quiz.quiz_id || quiz.id) !== quizId)
            );
            Alert.alert("성공", "퀴즈가 삭제되었습니다.");
          } catch (error) {
            console.error("퀴즈 삭제 오류:", error);
            Alert.alert("오류", "퀴즈 삭제에 실패했습니다.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => (navigation as any).navigate("Home")}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <TopTabs
        active="Quiz"
        onSelect={(key) => (navigation as any).navigate(key)}
      />
      <ScrollView className="flex-1">
        <View className="p-4 space-y-8 bg-[#FFFFFF]">
          {/* 헤더 */}
          <View className="text-center">
            <Text className="text-2xl font-bold text-[#000000] mb-2">
              퀴즈 모아보기
            </Text>
            <View className="w-16 h-1 bg-[#FACC15] mx-auto rounded-full mb-4"></View>
            <Text className="text-[#9CA3AF]">
              총 {quizzes.length}개의 퀴즈가 있습니다
            </Text>
          </View>

          {loading ? (
            <View className="flex items-center justify-center h-64">
              <ActivityIndicator size="large" color="#FACC15" />
              <Text className="text-[#374151] mt-4">퀴즈를 불러오는 중...</Text>
            </View>
          ) : (
            <View className="space-y-6">
              {quizzes.map((quiz) => {
                const quizId = quiz.quiz_id || quiz.id;
                const questionCount =
                  quiz.question_count || quiz.questions?.length || 0;
                const quizDate = quiz.created_at
                  ? new Date(quiz.created_at).toLocaleDateString("ko-KR")
                  : "날짜 없음";

                return (
                  <View
                    key={quizId}
                    className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#F3F4F6]"
                  >
                    <View className="flex-row justify-between items-start">
                      <View className="flex-1">
                        <Text className="text-lg font-bold text-[#000000] mb-2">
                          {quiz.title}
                        </Text>
                        <View className="flex-row flex-wrap gap-4 mb-4">
                          <Text className="text-sm text-[#9CA3AF]">
                            📝 {questionCount}문항
                          </Text>
                          <Text className="text-sm text-[#9CA3AF]">
                            📅 {quizDate}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-col gap-2 ml-4">
                        <TouchableOpacity
                          className="px-4 py-2 bg-[#FACC15] rounded-lg"
                          onPress={() => handleStartQuiz(quizId)}
                        >
                          <Text className="text-[#000000] font-semibold text-center">
                            퀴즈 시작
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="px-4 py-2 bg-[#9CA3AF] rounded-lg"
                          onPress={() => handleDeleteQuiz(quizId, quiz.title)}
                        >
                          <Text className="text-[#FFFFFF] font-medium text-sm text-center">
                            삭제
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}

              {quizzes.length === 0 && (
                <View className="text-center py-16">
                  <Text className="text-6xl mb-4">📝</Text>
                  <Text className="text-xl font-semibold text-[#374151] mb-2">
                    생성된 퀴즈가 없습니다
                  </Text>
                  <Text className="text-[#9CA3AF] mb-6">
                    자료 상세 페이지에서 "AI 퀴즈 생성" 버튼을 눌러 퀴즈를
                    만들어보세요!
                  </Text>
                  <TouchableOpacity
                    className="px-6 py-3 bg-[#FACC15] rounded-lg"
                    onPress={() => (navigation as any).navigate("Notes")}
                  >
                    <Text className="text-[#000000] font-semibold text-center">
                      자료 보러가기
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizPresenter;
