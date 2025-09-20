import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const QuizPresenter = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-black text-2xl font-bold mb-6">퀴즈</Text>
      <View className="bg-[#F3F4F6] rounded-xl p-4 mb-6">
        <Text className="text-[#374151]">
          Q1. React Native에서 스타일링을 위한 라이브러리는?
        </Text>
      </View>
      <TouchableOpacity className="bg-[#FACC15] rounded-lg p-3 mb-3">
        <Text className="text-black font-bold">① NativeWind</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-[#F3F4F6] rounded-lg p-3 mb-3">
        <Text className="text-[#374151]">② Bootstrap</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-[#F3F4F6] rounded-lg p-3 mb-3">
        <Text className="text-[#374151]">③ Material UI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuizPresenter;
