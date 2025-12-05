import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { authAPI, setToken } from "../../services/api";
import useAuth from "../../hooks/useAuth";

const LoginPresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      // 임시로 네트워크 오류를 우회하여 테스트
      if (email === "test@test.com" && password === "123456") {
        // 테스트용 토큰 설정
        await setToken("test-token-123");
        auth.login();
        Alert.alert("성공", "테스트 로그인되었습니다!", [
          {
            text: "확인",
            onPress: () => (navigation as any).navigate("Home"),
          },
        ]);
        setLoading(false);
        return;
      }

      let response;
      if (isLogin) {
        response = await authAPI.login(email, password);
      } else {
        response = await authAPI.register(email, email, password);
      }

      if (response.success) {
        await setToken(response.data.token);
        auth.login(); // 로그인 상태 업데이트
        Alert.alert(
          "성공",
          isLogin ? "로그인되었습니다!" : "회원가입이 완료되었습니다!",
          [
            {
              text: "확인",
              onPress: () => (navigation as any).navigate("Home"),
            },
          ]
        );
      } else {
        Alert.alert(
          "오류",
          response.message || "알 수 없는 오류가 발생했습니다."
        );
      }
    } catch (error: any) {
      console.error("로그인 오류:", error);
      Alert.alert("오류", error.message || "네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView className="flex-1">
        <View className="flex-1 justify-center p-6">
          {/* 로고 */}
          <View className="flex justify-center mb-8">
            <View className="text-center">
              <Text className="text-2xl font-bold text-[#000000]">
                Note <Text className="text-[#000000]">Merge</Text>
              </Text>
              <View className="w-12 h-1 bg-[#FACC15] mx-auto mt-1 rounded-full"></View>
            </View>
          </View>

          {/* 폼 */}
          <View className="space-y-6">
            {/* 이메일 입력 */}
            <View>
              <Text className="block text-sm text-[#000000] mb-1">이메일</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="w-full border border-[#9CA3AF] rounded-md px-3 py-2 text-base bg-[#F3F4F6]"
                placeholder="이메일을 입력하세요"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* 비밀번호 입력 */}
            <View>
              <Text className="block text-sm text-[#000000] mb-1">
                비밀번호
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                className="w-full border border-[#9CA3AF] rounded-md px-3 py-2 text-base bg-[#F3F4F6]"
                placeholder="비밀번호를 입력하세요"
                secureTextEntry
              />
            </View>

            {/* 버튼 */}
            <TouchableOpacity
              className={`w-full rounded-md py-3 ${
                loading ? "bg-[#9CA3AF]" : "bg-[#FACC15]"
              }`}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text className="text-black font-semibold text-center text-base">
                {loading
                  ? isLogin
                    ? "로그인 중..."
                    : "회원가입 중..."
                  : isLogin
                  ? "로그인"
                  : "회원가입"}
              </Text>
            </TouchableOpacity>

            {/* 모드 전환 */}
            <View className="text-center">
              <Text className="text-sm text-[#374151]">
                {isLogin ? (
                  <>
                    계정이 없으신가요?{" "}
                    <Text
                      className="text-[#FACC15] font-medium underline"
                      onPress={() => {
                        setIsLogin(false);
                        setEmail("");
                        setPassword("");
                      }}
                    >
                      회원가입
                    </Text>
                  </>
                ) : (
                  <>
                    이미 계정이 있으신가요?{" "}
                    <Text
                      className="text-[#FACC15] font-medium underline"
                      onPress={() => {
                        setIsLogin(true);
                        setEmail("");
                        setPassword("");
                      }}
                    >
                      로그인
                    </Text>
                  </>
                )}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPresenter;
