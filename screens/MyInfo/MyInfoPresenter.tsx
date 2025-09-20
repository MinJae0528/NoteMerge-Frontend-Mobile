import React from "react";
import { View, Text } from "react-native";

const MyInfoPresenter = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-black text-2xl font-bold mb-6">내 정보</Text>
      <View className="bg-[#F3F4F6] rounded-xl p-4 mb-4">
        <Text className="text-[#374151]">닉네임: 사용자</Text>
      </View>
      <View className="bg-[#F3F4F6] rounded-xl p-4">
        <Text className="text-[#374151]">진행 현황</Text>
      </View>
    </View>
  );
};

export default MyInfoPresenter;
