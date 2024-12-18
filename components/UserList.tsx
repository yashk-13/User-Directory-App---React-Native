import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/hooks/useThemeContext";
import { useRouter } from "expo-router";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  users: User[];
  onLoadMore: () => void;
  loadingMore: boolean;
};

export function UserList({ users, onLoadMore, loadingMore }: Props) {
  const { theme } = useTheme();
  const router = useRouter();

  const renderItem = ({ item }: { item: User }) => (
    <Pressable
      className={`active:scale-95 transition-all duration-200`}
      onPress={() => router.push(`/${item.id}`)}
    >
      <View
        className={`
          mx-4 my-2 p-4 
          rounded-xl
          ${
            theme === "dark"
              ? "bg-gray-800/80 border-gray-700"
              : "bg-white/90 border-gray-200"
          }
          border
          shadow-sm
        `}
      >
        <Text
          className={`
            text-lg font-bold mb-1
            ${theme === "dark" ? "text-white" : "text-gray-900"}
          `}
        >
          {item.name}
        </Text>
        <Text
          className={`
            text-sm
            ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
          `}
        >
          {item.email}
        </Text>
      </View>
    </Pressable>
  );

  const ListFooterComponent = () => {
    if (!loadingMore) return null;

    return (
      <View className="py-4">
        <ActivityIndicator
          size="small"
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  };

  const ListEmptyComponent = () => (
    <View className="flex-1 justify-center items-center p-4">
      <Text
        className={`
          text-lg text-center
          ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
        `}
      >
        No users found
      </Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      className="w-full"
      contentContainerClassName="py-2"
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
    />
  );
}
