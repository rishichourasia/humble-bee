import { getDistanceFromLatLonInKm } from "@/constants/helper";
import { useLocation } from "@/hooks/location-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const RenderCropCard = ({ cropArray }: any) => {
  const { location } = useLocation() as any;

  return cropArray.map((crop: any) => {
    let distance = null;
    if (location && crop.location.latitude && crop.location.longitude) {
      distance = getDistanceFromLatLonInKm(
        location.latitude,
        location.longitude,
        Number(crop.location.latitude),
        Number(crop.location.longitude)
      );
    }
    return (
      <View key={crop.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="flower"
            size={24}
            color="#e68a00"
            style={styles.icon}
          />
          <Text style={styles.cropName}>{crop.name}</Text>
        </View>
        <Text style={styles.label}>
          <MaterialCommunityIcons
            name="calendar-range"
            size={16}
            color="#888"
          />{" "}
          Flowering:{" "}
          <Text style={styles.value}>
            {moment(crop.flowering_start).format("DD MMM")} -{" "}
            {moment(crop.flowering_end).format("DD MMM")}
          </Text>
        </Text>
        <Text style={styles.label}>
          <MaterialCommunityIcons name="bee" size={16} color="#888" /> Hive
          Density:{" "}
          <Text style={styles.hiveDensity}>
            {crop.recommended_hive_density} Hives/Acre
          </Text>
        </Text>

        {distance !== null ? (
          <Text style={styles.distance}>
            Distance: {distance.toFixed(1)} km
          </Text>
        ) : (
          <Text style={styles.distance}>Distance: N/A</Text>
        )}
      </View>
    );
  });
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
  },
  card: {
    backgroundColor: "#f5f5f5",
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
  icon: {
    marginRight: 8,
  },
  cropName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  label: {
    fontSize: 15,
    color: "#666",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    color: "#222",
    fontWeight: "600",
  },
  hiveDensity: {
    color: "#e68a00",
    fontWeight: "bold",
    fontSize: 16,
  },
  distance: {
    color: "#888",
    fontSize: 14,
    marginTop: 4,
  },
});
