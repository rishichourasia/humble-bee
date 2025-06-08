import { useLocation } from "@/hooks/location-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Location from "expo-location";
import moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export const HomeComponent = () => {
  const [hiveId, setHiveId] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [colonies, setColonies] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { location, setLocation, locationPermission } = useLocation() as any;

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
    setError("");

    if (!hiveId || !date || !colonies || !location) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const existing = await AsyncStorage.getItem("hiveData");
      let hiveArray = existing ? JSON.parse(existing) : [];

      if (hiveArray.some((item: any) => item.hiveId === hiveId)) {
        setError("Hive ID already exists. Please use a unique Hive ID.");
        setLoading(false);
        return;
      }

      if (locationPermission) {
        await getUserLocation();
      }

      if (!locationPermission) {
        const lat = location?.latitude;
        const lon = location?.longitude;

        if (
          lat === undefined ||
          lon === undefined ||
          lat === "" ||
          lon === "" ||
          isNaN(Number(lat)) ||
          isNaN(Number(lon))
        ) {
          setError("Latitude and Longitude must be valid numbers.");
          return;
        }
      }

      const newEntry = {
        hiveId,
        date: moment(date).format("DD-MM-YYYY"),
        colonies,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      };
      setLocation(newEntry.location);
      hiveArray.push(newEntry);

      await AsyncStorage.setItem("hiveData", JSON.stringify(hiveArray));
      setLoading(false);
      Alert.alert(
        "Hive data saved",
        `Hive ID: ${newEntry.hiveId}\nDate: ${newEntry.date}\nColonies: ${newEntry.colonies}\nLocation: ${newEntry.location.latitude}, ${newEntry.location.longitude}`
      );
    } catch (e: any) {
      setError("Failed to save hive data.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
            <Text>
              {date ? moment(date).format("DD/MM/YY") : "Select Date"}
            </Text>
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
          {!locationPermission && (
            <>
              <Text style={styles.label}>Latitude</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter latitude"
                placeholderTextColor="#aaa"
                value={location?.latitude?.toString() || ""}
                keyboardType="decimal-pad"
                onChangeText={(text) =>
                  setLocation({
                    ...location,
                    latitude: text,
                  })
                }
              />
              <Text style={styles.label}>Longitude</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter longitude"
                placeholderTextColor="#aaa"
                value={location?.longitude?.toString() || ""}
                keyboardType="decimal-pad"
                onChangeText={(text) =>
                  setLocation({
                    ...location,
                    longitude: text,
                  })
                }
              />
            </>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});
