import React from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useThemeContext";

type UserDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
};

function InfoItem({
  icon,
  label,
  value,
  theme,
}: {
  icon: string;
  label: string;
  value: string;
  theme: string;
}) {
  return (
    <View className="flex-row items-start pb-4 ">
      <Text className="text-2xl mr-3">{icon}</Text>
      <View className="flex  flex-col ">
        <Text
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {label}
        </Text>
        <Text
          className={`text-base ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const [user, setUser] = React.useState<UserDetails | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      // Calculate the original ID (1-10) from our modified ID
      const originalId = Number(id) % 10 || 10;

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${originalId}`
      );
      const data = await response.json();

      // Modify the name to match our list view if it's not one of the original 10 users
      if (Number(id) > 10) {
        const pageIndex = Math.floor(Number(id) / 10);
        data.name = `${data.name} ${pageIndex}`;
      }

      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          size="large"
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className={theme === "dark" ? "text-white" : "text-black"}>
          User not found
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <LinearGradient
        colors={
          theme === "dark" ? ["#000000", "#1a1a1a"] : ["#FCA5A5", "#C084FC"]
        }
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Section with Image */}
          <View className="h-[70vh] relative">
            <Image
              source={{ uri: `https://i.pravatar.cc/800?u=${user.email}` }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", theme === "dark" ? "#000000" : "#FCA5A5"]}
              className="absolute bottom-0 left-0 right-0 h-[30vh]"
            />
            {/* User Name and Verification */}
            <View className="absolute bottom-8 left-4 right-4">
              <View className="flex-row items-center mb-2">
                <Text className="text-white text-3xl font-bold mr-2">
                  {user.name}
                </Text>
                <View className="bg-blue-500 rounded-full p-1">
                  <Text className="text-white text-xs">✓</Text>
                </View>
              </View>
              <Text className="text-gray-200 text-base mb-4">
                {user.company?.catchPhrase}
              </Text>
            </View>
          </View>

          {/* Content Section */}
          <View
            className={`px-4 pt-6 pb-20 ${
              theme === "dark" ? "bg-black" : "bg-white"
            }`}
          >
            {/* Bio Section */}
            <Text
              className={`text-lg mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Working at {user.company?.name}.
              {user.company?.bs ? `Specialized in ${user.company.bs}.` : ""}
            </Text>

            {/* Contact Information */}
            <Text
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Contact Information
            </Text>
            <View className="space-y-4 pb-4">
              <InfoItem
                icon="📧"
                label="Email"
                value={user.email}
                theme={theme}
              />
              <InfoItem
                icon="📱"
                label="Phone"
                value={user.phone}
                theme={theme}
              />
              <InfoItem
                icon="🌐"
                label="Website"
                value={user.website}
                theme={theme}
              />
              <InfoItem
                icon="📍"
                label="Location"
                value={`${user.address?.street}, ${user.address?.suite}, ${user.address?.city}, ${user.address?.zipcode}`}
                theme={theme}
              />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
