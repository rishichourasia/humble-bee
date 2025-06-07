import mockCropCalenderData from "@/constants/helper";
import { useLocation } from "@/hooks/location-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

export default function LogScreen() {
  const today = moment();
  const { location, setLocation } = useLocation() as any;

  const isInFlowering = (crop: any) =>
    today.isSameOrAfter(moment(crop.flowering_start, "YYYY-MM-DD")) &&
    today.isSameOrBefore(moment(crop.flowering_end, "YYYY-MM-DD"));

  const currentlyFlowering = mockCropCalenderData.filter(isInFlowering);
  const upcomingCrops = mockCropCalenderData
    .filter((crop) => !isInFlowering(crop))
    .sort((a, b) =>
      moment(a.flowering_start, "YYYY-MM-DD").diff(
        moment(b.flowering_start, "YYYY-MM-DD")
      )
    );

  console.log("Log console here---", location);

  return (
    <ScrollView style={styles.container}>
      {currentlyFlowering.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Currently flowering</Text>
          {currentlyFlowering.map((crop) => {
            let distance = null;
            if (location && crop.location.latitude && crop.location.longitude) {
              distance = getDistanceFromLatLonInKm(
                location.latitude,
                location.longitude,
                crop.location.latitude,
                crop.location.longitude
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
                  <MaterialCommunityIcons name="bee" size={16} color="#888" />{" "}
                  Hive Density:{" "}
                  <Text style={styles.hiveDensity}>
                    {crop.recommended_hive_density} Hives/Acre
                  </Text>
                </Text>
                {distance !== null && (
                  <Text style={styles.distance}>
                    Distance: {distance.toFixed(1)} km
                  </Text>
                )}
              </View>
            );
          })}
        </>
      )}
      {upcomingCrops.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Upcoming crops</Text>
          {upcomingCrops.map((crop) => {
            let distance = null;
            if (location && crop.location.latitude && crop.location.longitude) {
              distance = getDistanceFromLatLonInKm(
                location.latitude,
                location.longitude,
                crop.location.latitude,
                crop.location.longitude
              );
            }
            return (
              <View key={crop.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons
                    name="flower-outline"
                    size={24}
                    color="#888"
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
                  <MaterialCommunityIcons name="bee" size={16} color="#888" />{" "}
                  Hive Density:{" "}
                  <Text style={styles.hiveDensity}>
                    {crop.recommended_hive_density} Hives/Acre
                  </Text>
                </Text>
                {distance !== null && (
                  <Text style={styles.distance}>
                    Distance: {distance.toFixed(1)} km
                  </Text>
                )}
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
  );
}

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
