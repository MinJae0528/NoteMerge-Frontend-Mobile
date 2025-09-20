import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarPresenter = () => {
  return (
    <View className="flex-1 bg-white p-4">
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
  );
};

export default CalendarPresenter;
