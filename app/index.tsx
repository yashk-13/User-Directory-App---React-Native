import React from "react";
import { View, ActivityIndicator, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useThemeContext";
import { UserList } from "@/components/UserList";
import { useFetchUsers } from "@/components/FetchUser";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
  const { theme } = useTheme();
  const {
    loading,
    loadingMore,
    filteredUsers,
    searchQuery,
    handleSearch,
    loadMoreUsers,
  } = useFetchUsers();

  return (
    <View className="flex-1">
      <LinearGradient
        colors={
          theme === "dark" ? ["#46f3fc", "#4a327f"] : ["#FCA5A5", "#C084FC"]
        }
        className="flex-1"
      >
        <SafeAreaView className="flex-1" edges={["bottom"]}>
          <TextInput
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search users..."
            placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
            className={`
              mx-4 mt-4 p-3
              rounded-xl
              ${
                theme === "dark"
                  ? "bg-gray-800/80 text-white border-gray-700"
                  : "bg-white/90 text-gray-900 border-gray-200"
              }
              border
              text-base
              shadow-sm
            `}
          />

          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator
                size="large"
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </View>
          ) : (
            <UserList
              users={filteredUsers}
              onLoadMore={loadMoreUsers}
              loadingMore={loadingMore}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
