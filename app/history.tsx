import { HistoryComponent } from "@/components/screens/History/HistoryComponent";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <HistoryComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
