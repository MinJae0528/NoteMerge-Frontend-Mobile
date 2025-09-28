import React from "react";
import { View, Image, Pressable, Text } from "react-native";

type AppHeaderProps = {
  onPressRight: () => void;
  onPressLeft?: () => void;
};

const AppHeader: React.FC<AppHeaderProps> = ({ onPressRight, onPressLeft }) => {
  return (
    <View
      style={{
        height: 56,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <Pressable onPress={onPressLeft} hitSlop={8}>
        <Image
          source={require("../assets/images/notemerge_logo.png")}
          style={{ width: 120, height: 28, resizeMode: "contain" }}
        />
      </Pressable>

      <Pressable
        onPress={onPressRight}
        hitSlop={8}
        accessibilityLabel="내 정보"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#F3F4F6",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>👤</Text>
      </Pressable>
    </View>
  );
};

export default AppHeader;
