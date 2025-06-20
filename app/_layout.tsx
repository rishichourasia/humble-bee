import { LocationProvider } from "@/hooks/location-context";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <LocationProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#e68a00" },
          headerTintColor: "#fff",
          headerTitleStyle: { color: "#fff", fontWeight: "bold" },
          tabBarActiveTintColor: "#FFD600",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: { backgroundColor: "white" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerTitle: "Humble-Bee",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="log"
          options={{
            title: "Nearby Crop",
            headerTitle: "Nearby Crop Opportunities",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerTitle: "History",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </LocationProvider>
  );
}
