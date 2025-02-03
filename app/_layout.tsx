import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {View} from "react-native";

export default function Layout() {
  return (
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor : "#F2F4F6"},
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#888"
      }}
      >
        {/* 홈 페이지 */}
        <Tabs.Screen
            name="index"
            options={{
                headerShown: false,
              title: "홈",
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
              ),
            }}
        />
        {/* 마이페이지 */}
        <Tabs.Screen
            name="mypage"
            options={{
              title: "마이페이지",
                headerShown: false,
              tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person" size={size} color={color} />
              ),
            }}
        />
      </Tabs>
  );
}