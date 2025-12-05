import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { authAPI, noteAPI, quizAPI, removeToken } from "../../services/api";

const MyInfoPresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userStats, setUserStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn) {
      loadUserData();
    }
  }, [auth.isLoggedIn]);

  const loadUserData = async () => {
    try {
      setLoading(true);

      // 사용자 정보와 통계를 병렬로 조회
      const [profileResponse, notesResponse, quizzesResponse] =
        await Promise.all([
          authAPI.getProfile(),
          noteAPI.getNotes(),
          quizAPI.getQuizzes(),
        ]);

      // 사용자 정보 설정
      let userData = null;
      if (
        profileResponse.success &&
        profileResponse.data &&
        profileResponse.data.user
      ) {
        userData = profileResponse.data.user;
      } else if (profileResponse.success && profileResponse.data) {
        userData = profileResponse.data;
      } else if (profileResponse.user) {
        userData = profileResponse.user;
      } else if (profileResponse.username) {
        userData = profileResponse;
      }
      setUserInfo(userData);

      // 통계 계산
      const notes = Array.isArray(notesResponse?.data?.notes)
        ? notesResponse.data.notes
        : [];
      const quizzes = Array.isArray(quizzesResponse?.data?.quizzes)
        ? quizzesResponse.data.quizzes
        : [];

      setUserStats({
        totalNotes: notes.length,
        totalQuizzes: quizzes.length,
      });
    } catch (error) {
      console.error("사용자 데이터 로딩 오류:", error);
      Alert.alert("오류", "사용자 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await removeToken();
          auth.logout(); // 로그아웃 상태 업데이트
          (navigation as any).navigate("Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <AppHeader
        onPressLeft={() => (navigation as any).navigate("Home")}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <ScrollView className="flex-1">
        <View className="p-4">
          {/* 헤더 */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-[#000000] mb-2">
              내 정보
            </Text>
            <Text className="text-[#9CA3AF]">
              계정 정보와 활동 현황을 확인하세요
            </Text>
          </View>

          {loading ? (
            <View className="flex items-center justify-center h-64">
              <ActivityIndicator size="large" color="#FACC15" />
              <Text className="text-[#374151] mt-4">
                사용자 정보를 불러오는 중...
              </Text>
            </View>
          ) : (
            <View className="space-y-8">
              {/* 사용자 정보 카드 */}
              <View className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-[#F3F4F6]">
                <Text className="text-xl font-semibold text-[#000000] mb-6 flex-row items-center">
                  👤 기본 정보
                </Text>

                {userInfo ? (
                  <View className="flex-row justify-between">
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-[#9CA3AF] mb-1">
                        사용자명
                      </Text>
                      <Text className="text-lg font-semibold text-[#000000]">
                        {userInfo.username}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm font-medium text-[#9CA3AF] mb-1">
                        이메일
                      </Text>
                      <Text className="text-lg font-semibold text-[#000000]">
                        {userInfo.email}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm font-medium text-[#9CA3AF] mb-1">
                        가입일
                      </Text>
                      <Text className="text-lg font-semibold text-[#000000]">
                        {userInfo.created_at
                          ? new Date(userInfo.created_at).toLocaleDateString(
                              "ko-KR",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )
                          : "날짜 없음"}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View className="text-center py-8">
                    <Text className="text-[#9CA3AF]">
                      사용자 정보를 불러올 수 없습니다.
                    </Text>
                  </View>
                )}
              </View>

              {/* 활동 통계 카드 */}
              <View className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-[#F3F4F6]">
                <Text className="text-xl font-semibold text-[#000000] mb-6 flex-row items-center">
                  📊 활동 현황
                </Text>

                {userStats ? (
                  <View className="flex-row space-x-4">
                    <View className="flex-1 text-center p-6 bg-gradient-to-br from-[#FACC15]/10 to-[#F59E0B]/10 rounded-xl border border-[#FACC15]/20">
                      <Text className="text-4xl font-bold text-[#F59E0B] mb-2">
                        {userStats.totalNotes}
                      </Text>
                      <Text className="text-base font-medium text-[#374151] mb-1">
                        생성한 노트
                      </Text>
                      <Text className="text-sm text-[#9CA3AF]">
                        총 노트 개수
                      </Text>
                    </View>

                    <View className="flex-1 text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <Text className="text-4xl font-bold text-blue-600 mb-2">
                        {userStats.totalQuizzes}
                      </Text>
                      <Text className="text-base font-medium text-[#374151] mb-1">
                        생성한 퀴즈
                      </Text>
                      <Text className="text-sm text-[#9CA3AF]">
                        총 퀴즈 개수
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View className="text-center py-8">
                    <Text className="text-[#9CA3AF]">
                      활동 통계를 불러오는 중...
                    </Text>
                  </View>
                )}
              </View>

              {/* 로그아웃 버튼 */}
              <View className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-[#F3F4F6]">
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-xl font-semibold text-[#000000] mb-2">
                      계정 관리
                    </Text>
                    <Text className="text-[#9CA3AF] text-sm">
                      계정에서 로그아웃할 수 있습니다
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="px-6 py-3 bg-[#DC2626] rounded-lg"
                    onPress={handleLogout}
                  >
                    <Text className="text-white font-medium flex-row items-center">
                      <Text>🚪</Text>
                      <Text className="ml-2">로그아웃</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyInfoPresenter;
