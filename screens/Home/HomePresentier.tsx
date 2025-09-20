import React from "react";
import { View, Text, ScrollView } from "react-native";

const HomePresenter = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-black text-2xl font-bold mb-4">홈</Text>
      <View className="bg-[#F3F4F6] rounded-xl p-4 mb-4">
        <Text className="text-[#374151]">요약본</Text>
      </View>
      <View className="bg-[#F3F4F6] rounded-xl p-4">
        <Text className="text-[#374151]">퀴즈</Text>
      </View>
      <View className="bg-[#F3F4F6] rounded-xl p-4">
        <Text className="text-[#374151]">출석체크</Text>
      </View>
    </ScrollView>
  );
};

export default HomePresenter;
