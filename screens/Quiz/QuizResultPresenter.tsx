import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const QuizResultPresenter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { result, quizTitle } = route.params as {
    result: any;
    quizTitle: string;
  };
  const auth = useAuth();

  // API 결과에서 데이터 추출
  const correctCount = result?.correct_count || 0;
  const totalQuestions = result?.total_questions || 0;
  const accuracy = result?.accuracy || 0;
  const isPass = accuracy >= 70;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => (navigation as any).navigate("Quiz")}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <ScrollView className="flex-1">
        <View className="p-4 space-y-8 bg-[#FFFFFF]">
          {/* 헤더 */}
          <View className="text-center">
            <Text className="text-2xl font-bold text-[#000000] mb-2">
              {quizTitle}
            </Text>
            <View className="w-16 h-1 bg-[#FACC15] mx-auto rounded-full mb-4"></View>
            <Text className="text-[#9CA3AF]">퀴즈 완료!</Text>
          </View>

          {/* 결과 카드 */}
          <View className="bg-[#FFFFFF] p-6 rounded-xl shadow-sm border border-[#F3F4F6] space-y-4">
            <View className="text-center">
              <Text className="text-3xl font-bold text-[#FACC15] mb-2">
                {Math.round(accuracy)}%
              </Text>
              <Text className="text-[#374151] text-lg">
                {correctCount} / {totalQuestions} 문제 정답
              </Text>
            </View>

            <View className="bg-[#F8F9FA] rounded-lg p-4">
              <Text
                className={`text-center font-semibold text-lg ${
                  isPass ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPass ? "🎯 훌륭합니다!" : "📚 다시 도전해보세요!"}
              </Text>
              <Text className="text-[#6B7280] text-center mt-2">
                {isPass
                  ? "잘 이해하고 계시네요!"
                  : "조금 더 공부하면 완벽할 거예요!"}
              </Text>
            </View>
          </View>

          {/* 액션 버튼들 */}
          <View className="space-y-3">
            <TouchableOpacity
              className="bg-[#FACC15] rounded-lg p-4"
              onPress={() => (navigation as any).navigate("Quiz")}
            >
              <Text className="text-black font-bold text-center text-lg">
                다른 퀴즈 풀기
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#F3F4F6] rounded-lg p-4"
              onPress={() => (navigation as any).navigate("Notes")}
            >
              <Text className="text-[#374151] font-semibold text-center text-lg">
                노트 다시 보기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizResultPresenter;
