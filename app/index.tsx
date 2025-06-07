import { useLocation } from "@/hooks/location-context";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import moment from "moment";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [hiveId, setHiveId] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [colonies, setColonies] = useState("");
  const [loading, setLoading] = useState(false);
  const { location, setLocation } = useLocation() as any;

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const getUserLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    // Handle form submission logic here

    await getUserLocation();
    console.log("location---", location);

    alert(
      `Hive ID: ${hiveId}\nDate: ${moment(date).format(
        "DD/MM/YY"
      )}\nColonies: ${colonies}`
    );
  };
  console.log("location---", location);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Hive ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Hive ID"
          placeholderTextColor="#aaa"
          value={hiveId}
          onChangeText={setHiveId}
        />
        <Text style={styles.label}>Date of placement</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker((prev) => !prev)}
          style={styles.input}
        >
          <Text>{date ? moment(date).format("DD/MM/YY") : "Select Date"}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.label}>Number of bee colonies</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          placeholderTextColor="#aaa"
          value={colonies}
          onChangeText={setColonies}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    color: "#e68a00",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    color: "#181818",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#e68a00",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
