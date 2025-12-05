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
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { quizAPI } from "../../services/api";

const QuizDetailPresenter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { quizId } = route.params as { quizId: number };
  const auth = useAuth();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getQuizDetail(quizId);

      // 응답 구조에 맞춰 데이터 추출
      let quizData = null;
      if (response?.data?.quiz) {
        quizData = response.data.quiz;
      } else if (response?.data) {
        quizData = response.data;
      } else if (response?.quiz) {
        quizData = response.quiz;
      } else if (response && !response.success) {
        quizData = response;
      }

      if (quizData) {
        setQuiz(quizData);
      } else {
        Alert.alert("오류", "퀴즈를 찾을 수 없습니다.");
        (navigation as any).goBack();
      }
    } catch (error) {
      console.error("퀴즈 로딩 오류:", error);
      Alert.alert("오류", "퀴즈를 불러오는데 실패했습니다.");
      (navigation as any).goBack();
    } finally {
      setLoading(false);
    }
  };

  const currentQ = quiz?.questions?.[currentQuestion];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (currentQ?.question_id) {
      setAnswers({
        ...answers,
        [currentQ.question_id.toString()]: currentQ.options[index],
      });
    }
  };

  const handleNext = async () => {
    if (selectedAnswer === null) return;

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // 퀴즈 완료 - API로 제출
      try {
        const response = await quizAPI.submitQuiz(quizId, answers);

        // 응답 구조에 맞춰 결과 데이터 추출
        let resultData = null;
        if (response?.data?.result) {
          resultData = response.data.result;
        } else if (response?.data) {
          resultData = response.data;
        } else if (response?.result) {
          resultData = response.result;
        }

        (navigation as any).navigate("QuizResult", {
          result: resultData,
          quizTitle: quiz.title,
        });
      } catch (error) {
        console.error("퀴즈 제출 오류:", error);
        Alert.alert("오류", "퀴즈 제출에 실패했습니다.");
      }
    }
  };

  const isLastQuestion = currentQuestion === quiz?.questions?.length - 1;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader
          onPressLeft={() => (navigation as any).goBack()}
          onPressRight={() => (navigation as any).navigate("MyInfo")}
        />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FACC15" />
          <Text className="text-[#374151] mt-4">퀴즈를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!quiz) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader
          onPressLeft={() => (navigation as any).goBack()}
          onPressRight={() => (navigation as any).navigate("MyInfo")}
        />
        <View className="flex-1 justify-center items-center">
          <Text className="text-6xl mb-4">❌</Text>
          <Text className="text-xl font-semibold text-[#374151] mb-2">
            퀴즈를 찾을 수 없습니다
          </Text>
          <TouchableOpacity
            className="px-6 py-3 bg-[#FACC15] rounded-lg mt-4"
            onPress={() => (navigation as any).navigate("Quiz")}
          >
            <Text className="text-[#000000] font-semibold text-center">
              퀴즈 목록으로 돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => (navigation as any).goBack()}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <ScrollView className="flex-1">
        <View className="p-4 space-y-8 bg-[#FFFFFF]">
          {/* 헤더 */}
          <View className="flex-row justify-between items-center">
            <TouchableOpacity
              className="text-[#374151]"
              onPress={() => (navigation as any).goBack()}
            >
              <Text className="text-[#374151] font-medium">← 뒤로가기</Text>
            </TouchableOpacity>
            <Text className="text-sm text-[#9CA3AF]">
              {quiz?.questions.length || 0}문항
            </Text>
          </View>

          {/* 퀴즈 제목 */}
          <View className="text-center">
            <Text className="text-2xl font-bold text-[#000000] mb-2">
              {quiz?.title}
            </Text>
            <View className="w-16 h-1 bg-[#FACC15] mx-auto rounded-full mb-4"></View>
            <Text className="text-[#9CA3AF]">
              문제 {currentQuestion + 1} / {quiz?.questions.length}
            </Text>
          </View>

          {/* 퀴즈 폼 */}
          <View className="space-y-8">
            <View className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#F3F4F6] space-y-4">
              {/* 문제 번호와 제목 */}
              <View className="border-b border-[#F3F4F6] pb-4">
                <Text className="text-lg font-semibold text-[#000000] leading-relaxed">
                  {currentQuestion + 1}. {currentQ?.question}
                </Text>
              </View>

              {/* 답변 영역 - 객관식 */}
              <View className="pt-2">
                <View className="space-y-3">
                  {currentQ?.options.map(
                    (option: string, optionIndex: number) => (
                      <TouchableOpacity
                        key={`${currentQ.question_id}-option-${optionIndex}`}
                        className={`flex-row items-center p-3 rounded-lg border-2 ${
                          selectedAnswer === optionIndex
                            ? "border-[#FACC15] bg-[#FACC15]/10"
                            : "border-[#E5E7EB] bg-[#F9FAFB]"
                        }`}
                        onPress={() => handleAnswerSelect(optionIndex)}
                      >
                        <View
                          className={`w-5 h-5 rounded-full border-2 mr-3 ${
                            selectedAnswer === optionIndex
                              ? "border-[#FACC15] bg-[#FACC15]"
                              : "border-[#9CA3AF]"
                          }`}
                        >
                          {selectedAnswer === optionIndex && (
                            <View className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></View>
                          )}
                        </View>
                        <Text className="text-[#374151] text-base leading-relaxed flex-1">
                          {optionIndex + 1}. {option}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>
            </View>

            {/* 제출 버튼 */}
            <View className="text-center pt-6">
              <TouchableOpacity
                className={`px-8 py-3 rounded-lg font-bold text-lg ${
                  selectedAnswer !== null
                    ? "bg-[#FACC15] text-[#000000]"
                    : "bg-[#E5E7EB] text-[#9CA3AF]"
                }`}
                onPress={handleNext}
                disabled={selectedAnswer === null}
              >
                <Text
                  className={`font-bold text-lg ${
                    selectedAnswer !== null
                      ? "text-[#000000]"
                      : "text-[#9CA3AF]"
                  }`}
                >
                  {isLastQuestion ? "퀴즈 제출하기" : "다음 문제"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizDetailPresenter;
