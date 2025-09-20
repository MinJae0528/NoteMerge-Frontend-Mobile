import React from "react";
import { View, Text, ScrollView } from "react-native";

const NotesPresenter = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-black text-2xl font-bold mb-6">노트</Text>
      <View className="bg-[#F3F4F6] rounded-xl p-4 mb-4">
        <Text className="text-[#374151]">📄 메모 1</Text>
      </View>
      <View className="bg-[#F3F4F6] rounded-xl p-4 mb-4">
        <Text className="text-[#374151]">📄 메모 2</Text>
      </View>
      <View className="bg-[#F3F4F6] rounded-xl p-4">
        <Text className="text-[#374151]">📄 메모 3</Text>
      </View>
    </ScrollView>
  );
};

export default NotesPresenter;
