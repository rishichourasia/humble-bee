import AsyncStorage from "@react-native-async-storage/async-storage";

const mockCropCalenderData = [
  {
    id: "crop_007",
    name: "Cotton",
    flowering_start: "2025-09-01",
    flowering_end: "2025-09-30",
    location: { latitude: 18.6073123, longitude: 73.7681453 },
    recommended_hive_density: 16,
  },
  {
    id: "crop_001",
    name: "Mustard",
    flowering_start: "2025-06-01",
    flowering_end: "2025-06-15",
    location: { latitude: 18.6073123, longitude: 73.7736453 },
    recommended_hive_density: 4,
  },
  {
    id: "crop_002",
    name: "Sunflower",
    flowering_start: "2025-06-01",
    flowering_end: "2025-06-15",
    location: { latitude: 18.6028123, longitude: 73.7736453 },
    recommended_hive_density: 6,
  },
  {
    id: "crop_003",
    name: "Wheat",
    flowering_start: "2025-06-15",
    flowering_end: "2025-06-25",
    location: { latitude: 18.6028123, longitude: 73.7681453 },
    recommended_hive_density: 8,
  },
  {
    id: "crop_004",
    name: "Rice",
    flowering_start: "2025-07-01",
    flowering_end: "2025-07-30",
    location: { latitude: 18.5983123, longitude: 73.7681453 },
    recommended_hive_density: 10,
  },
  {
    id: "crop_005",
    name: "Maize",
    flowering_start: "2025-07-01",
    flowering_end: "2025-07-30",
    location: { latitude: 18.5983123, longitude: 73.7626453 },
    recommended_hive_density: 12,
  },
  {
    id: "crop_006",
    name: "Sarsaparilla",
    flowering_start: "2025-08-01",
    flowering_end: "2025-08-30",
    location: { latitude: 18.6028123, longitude: 73.7626453 },
    recommended_hive_density: 14,
  },
];

export default mockCropCalenderData;

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
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

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error("Failed to clear AsyncStorage:", e);
    return false;
  }
};
