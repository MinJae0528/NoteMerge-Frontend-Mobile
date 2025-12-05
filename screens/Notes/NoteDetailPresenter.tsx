import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import { useNavigation, useRoute } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { noteAPI } from "../../services/api";

const NoteDetailPresenter = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noteId } = route.params as { noteId: number };
  const auth = useAuth();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn) {
      loadNote();
    }
  }, [auth.isLoggedIn, noteId]);

  const loadNote = async () => {
    try {
      setLoading(true);
      const response = await noteAPI.getNoteDetail(noteId);

      // 응답 구조에 맞춰 데이터 추출
      let noteData = null;
      if (response?.data?.note) {
        noteData = response.data.note;
      } else if (response?.data) {
        noteData = response.data;
      } else if (response?.note) {
        noteData = response.note;
      } else if (response && !response.success) {
        noteData = response;
      }

      if (noteData) {
        setNote(noteData);
      } else {
        Alert.alert("오류", "노트를 찾을 수 없습니다.");
        (navigation as any).goBack();
      }
    } catch (error) {
      console.error("노트 로딩 오류:", error);
      Alert.alert("오류", "노트를 불러오는데 실패했습니다.");
      (navigation as any).goBack();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader
          onPressLeft={() => (navigation as any).goBack()}
          onPressRight={() => (navigation as any).navigate("MyInfo")}
        />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FACC15" />
          <Text className="text-[#374151] mt-4">노트를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!note) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <AppHeader
          onPressLeft={() => (navigation as any).goBack()}
          onPressRight={() => (navigation as any).navigate("MyInfo")}
        />
        <View className="flex-1 justify-center items-center">
          <Text className="text-6xl mb-4">❌</Text>
          <Text className="text-xl font-semibold text-[#374151] mb-2">
            노트를 찾을 수 없습니다
          </Text>
          <TouchableOpacity
            className="px-6 py-3 bg-[#FACC15] rounded-lg mt-4"
            onPress={() => (navigation as any).navigate("Notes")}
          >
            <Text className="text-[#000000] font-semibold text-center">
              노트 목록으로 돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppHeader
        onPressLeft={() => (navigation as any).goBack()}
        onPressRight={() => (navigation as any).navigate("MyInfo")}
      />
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-black text-2xl font-bold mb-2">
            {note.title}
          </Text>
          <Text className="text-[#6B7280] text-sm mb-6">
            {note.created_at
              ? new Date(note.created_at).toLocaleDateString("ko-KR")
              : "날짜 없음"}
          </Text>

          <View className="bg-[#F8F9FA] rounded-xl p-4">
            <Text className="text-[#374151] text-base leading-6">
              {note.summary || note.content || "내용이 없습니다."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NoteDetailPresenter;
