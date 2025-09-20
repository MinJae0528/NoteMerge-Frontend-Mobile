import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainStack from "./stack/MainStack";
// NativeWind CSS 스타일링을 위한 글로벌 CSS 파일 import
// 이 파일을 import해야 React Native 컴포넌트에서 className 속성을 사용할 수 있습니다
import "./global.css";

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
