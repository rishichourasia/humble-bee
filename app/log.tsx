import { NearbyCropComponent } from "@/components/screens/NearbyCropScreen/NearbyComponent";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function NearbyCrops() {
  return (
    <View style={styles.container}>
      <NearbyCropComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
