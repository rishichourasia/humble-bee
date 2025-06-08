import * as Location from "expo-location";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

type LocationContextType = {
  location: { latitude: number; longitude: number } | null;
  setLocation: () => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation(null);
        Alert.alert(
          "Location permission not granted.",
          "Please manully input the coordinates",
          [
            {
              text: "OK",
              style: "default",
              onPress: () => {
                setLocationPermission(false);
              },
            },
          ]
        );
        return;
      }
      setLocationPermission(true);
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{ location, setLocation, locationPermission }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
