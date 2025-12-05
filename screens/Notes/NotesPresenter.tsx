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
import TopTabs from "../../components/TopTabs";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { noteAPI } from "../../services/api";

const NotesPresenter = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn) {
      loadNotes();
    }
  }, [auth.isLoggedIn]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await noteAPI.getNotes();
      const notesArr = Array.isArray(response?.data?.notes)
        ? response.data.notes
        : [];
      setNotes(notesArr);
    } catch (error) {
      console.error("노트 로딩 오류:", error);
      Alert.alert("오류", "노트를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: number, noteTitle: string) => {
    Alert.alert("노트 삭제", `"${noteTitle}" 노트를 정말 삭제하시겠습니까?`, [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          try {
            await noteAPI.deleteNote(noteId);
            setNotes((prevNotes) =>
              prevNotes.filter((note) => (note.note_id || note.id) !== noteId)
            );
            Alert.alert("성공", "노트가 삭제되었습니다.");
          } catch (error) {
            console.error("노트 삭제 오류:", error);
            Alert.alert("오류", "노트 삭제에 실패했습니다.");
          }
        },
      },
    ]);
  };

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
          <Text className="text-lg font-bold mb-4 text-[#000000]">내 자료</Text>

          {loading ? (
            <View className="flex items-center justify-center h-64">
              <ActivityIndicator size="large" color="#FACC15" />
              <Text className="text-[#374151] mt-4">노트를 불러오는 중...</Text>
            </View>
          ) : (
            <View className="space-y-2">
              {notes.map((note) => {
                const noteId = note.note_id || note.id;
                const noteTitle = note.title || note.name;

                return (
                  <TouchableOpacity
                    key={noteId}
                    className="flex-row items-center gap-3 p-3 rounded-lg bg-[#F3F4F6]"
                    onPress={() =>
                      (navigation as any).navigate("NoteDetail", { noteId })
                    }
                  >
                    <View className="flex-1">
                      <Text className="font-medium text-[#000000] text-base">
                        {noteTitle}
                      </Text>
                    </View>
                    <TouchableOpacity
                      className="px-3 py-1 bg-[#9CA3AF] rounded"
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(noteId, noteTitle);
                      }}
                    >
                      <Text className="text-[#FFFFFF] text-sm font-medium">
                        🗑️ 삭제
                      </Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}

              {notes.length === 0 && (
                <View className="text-center py-8">
                  <Text className="text-[#9CA3AF]">노트가 없습니다.</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotesPresenter;
