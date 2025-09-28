import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../components/AppHeader";
import useAuth from "../../hooks/useAuth";

const LoginPresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  const handleLogin = () => {
    auth.login(); // 로그인 상태로 변경
    (navigation as any).navigate("Home"); // 홈 화면으로 이동
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-2xl font-bold mb-8">로그인</Text>
        <Pressable
          className="bg-blue-500 rounded-lg p-4 w-full"
          onPress={handleLogin}
        >
          <Text className="text-white text-center font-bold">로그인하기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPresenter;
