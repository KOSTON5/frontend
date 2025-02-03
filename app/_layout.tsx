import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#F2F4F6" },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#888",
      }}
    >
      {/* 홈 페이지 */}
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "홈",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      {/* 검색 */}
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "검색", // ✅ 중복된 "홈" 대신 "검색"으로 변경
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      {/* 마이페이지 */}
      <Tabs.Screen
        name="mypage"
        options={{
          headerShown: false,
          title: "마이페이지",
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
      {/* 전체보기 */}
      <Tabs.Screen
        name="all"
        options={{
          headerShown: false,
          title: "전체보기",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />, // ✅ 적절한 아이콘 변경
        }}
      />
    </Tabs>
  );
}