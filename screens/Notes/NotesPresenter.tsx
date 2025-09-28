import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import TopTabs from "../../components/TopTabs";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const NotesPresenter = () => {
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotesPresenter;
