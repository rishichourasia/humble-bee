import { clearLocalStorage } from "@/constants/helper";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const HistoryComponent = () => {
  const [hiveData, setHiveData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("hiveData");
        setHiveData(data ? JSON.parse(data) : []);
      } catch (e) {
        Alert.alert("Error", "Failed to load hive data.");
      }
    };
    fetchData();
  });

  const handleClearHistory = async () => {
    setLoading(true);
    const success = await clearLocalStorage();
    setLoading(false);
    if (success) {
      Alert.alert("Success", "History cleared!");
      setHiveData([]);
    } else {
      Alert.alert("Error", "Failed to clear history.");
    }
  };

  const renderHiveData = (hiveArr: any) => {
    return hiveArr.map((item: any) => (
      <View key={item.hiveId} style={styles.card}>
        <View style={styles.cardHeader}>
          <FontAwesome5
            name="box"
            size={18}
            color="#e68a00"
            style={styles.icon}
          />
          <Text style={styles.hiveId}>Hive ID: {item.hiveId}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="date-range"
            size={16}
            color="#888"
            style={styles.icon}
          />
          <Text style={styles.label}>{item.date}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="bee"
            size={16}
            color="#e68a00"
            style={styles.icon}
          />
          <Text style={styles.label}>
            Colonies: <Text style={styles.value}>{item.colonies}</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="location-on"
            size={16}
            color="#e68a00"
            style={styles.icon}
          />
          <Text style={styles.label}>
            {item.location?.latitude}, {item.location?.longitude}
          </Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {hiveData.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearHistory}
          disabled={loading}
        >
          <Text style={styles.clearButtonText}>
            {loading ? "Clearing..." : "Clear History"}
          </Text>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.container}>
        {hiveData.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 32, color: "#888" }}>
            No hive data found.
          </Text>
        )}
        {renderHiveData(hiveData)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#e68a00",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  hiveId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 15,
    color: "#666",
  },
  value: {
    color: "#222",
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#fff",
    borderColor: "#e68a00",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 16,
  },
  clearButtonText: {
    color: "#e68a00",
    fontWeight: "bold",
    fontSize: 16,
  },
});
