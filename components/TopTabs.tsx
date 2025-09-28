import React from "react";
import { View, Pressable, Text } from "react-native";

type TopTabsProps = {
  active: "Notes" | "Calendar" | "Quiz";
  onSelect: (tab: "Notes" | "Calendar" | "Quiz") => void;
};

const tabs: Array<{ key: TopTabsProps["active"]; label: string }> = [
  { key: "Notes", label: "노트" },
  { key: "Calendar", label: "캘린더" },
  { key: "Quiz", label: "퀴즈" },
];

const TopTabs: React.FC<TopTabsProps> = ({ active, onSelect }) => {
  return (
    <View className="bg-white border-b border-[#E5E7EB]">
      <View style={{ flexDirection: "row" }}>
        {tabs.map((tab, index) => {
          const isActive = active === tab.key;
          const isLast = index === tabs.length - 1;

          return (
            <Pressable
              key={tab.key}
              onPress={() => onSelect(tab.key)}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRightWidth: !isLast ? 1 : 0,
                borderRightColor: !isLast ? "#E5E7EB" : "transparent",
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#000000" : "#6B7280",
                }}
              >
                {tab.label}
              </Text>
              <View
                style={{
                  height: 3,
                  marginTop: 8,
                  backgroundColor: isActive ? "#000000" : "transparent",
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TopTabs;
