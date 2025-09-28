import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../components/AppHeader";
import TopTabs from "../../components/TopTabs";
import useAuth from "../../hooks/useAuth";

const HomePresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => (navigation as any).navigate("Home")}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <TopTabs
        active="Notes"
        onSelect={(key) => (navigation as any).navigate(key)}
      />
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-black text-2xl font-bold mb-4">홈</Text>
          <Pressable
            className="bg-[#F3F4F6] rounded-xl p-4 mb-4"
            onPress={() => (navigation as any).navigate("Notes")}
          >
            <Text className="text-[#374151]">요약본</Text>
          </Pressable>
          <Pressable
            className="bg-[#F3F4F6] rounded-xl p-4 mb-4"
            onPress={() => (navigation as any).navigate("Quiz")}
          >
            <Text className="text-[#374151]">퀴즈</Text>
          </Pressable>
          <Pressable
            className="bg-[#F3F4F6] rounded-xl p-4"
            onPress={() => (navigation as any).navigate("Calendar")}
          >
            <Text className="text-[#374151]">출석체크</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePresenter;
