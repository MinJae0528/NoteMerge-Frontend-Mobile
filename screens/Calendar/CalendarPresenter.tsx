import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import TopTabs from "../../components/TopTabs";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { Calendar } from "react-native-calendars";

const CalendarPresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => (navigation as any).navigate("Home")}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <TopTabs
        active="Calendar"
        onSelect={(key) => (navigation as any).navigate(key)}
      />
      <View className="flex-1 p-4">
        <Text className="text-black text-2xl font-bold mb-6">캘린더</Text>
        <Calendar
          theme={{
            calendarBackground: "#FFFFFF",
            textSectionTitleColor: "#000000",
            dayTextColor: "#374151",
            todayTextColor: "#FACC15",
            selectedDayBackgroundColor: "#F3F4F6",
            monthTextColor: "#000000",
          }}
          markedDates={{
            "2025-09-21": { selected: true, selectedColor: "green" },
            "2025-09-20": { selected: true, selectedColor: "red" },
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarPresenter;
