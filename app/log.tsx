import { StyleSheet, Text, View } from "react-native";

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Screen</Text>
      <Text style={styles.subtitle}>This is the log screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 28,
    color: "#38434D",
  },
});
