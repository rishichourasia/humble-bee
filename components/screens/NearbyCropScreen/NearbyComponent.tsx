import mockCropCalenderData, {
  getDistanceFromLatLonInKm,
} from "@/constants/helper";
import { useLocation } from "@/hooks/location-context";
import moment from "moment";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { RenderCropCard } from "./RenderCropCard";

export const NearbyCropComponent = () => {
  const today = moment();
  const { location } = useLocation() as any;

  const isInFlowering = (crop: any) =>
    today.isSameOrAfter(moment(crop.flowering_start, "YYYY-MM-DD")) &&
    today.isSameOrBefore(moment(crop.flowering_end, "YYYY-MM-DD"));

  const currentlyFlowering = mockCropCalenderData
    .filter(isInFlowering)
    .sort((a, b) => {
      if (!location) return 0;
      const distA = getDistanceFromLatLonInKm(
        location.latitude,
        location.longitude,
        a.location.latitude,
        a.location.longitude
      );
      const distB = getDistanceFromLatLonInKm(
        location.latitude,
        location.longitude,
        b.location.latitude,
        b.location.longitude
      );
      return distA - distB;
    });

  const upcomingCrops = mockCropCalenderData
    .filter((crop) => !isInFlowering(crop))
    .sort((a, b) =>
      moment(a.flowering_start, "YYYY-MM-DD").diff(
        moment(b.flowering_start, "YYYY-MM-DD")
      )
    );

  return (
    <ScrollView style={styles.container}>
      {currentlyFlowering.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Currently flowering</Text>
          <RenderCropCard cropArray={currentlyFlowering} />
        </>
      )}
      {upcomingCrops.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Upcoming crops</Text>
          <RenderCropCard cropArray={upcomingCrops} />
        </>
      )}
    </ScrollView>
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
