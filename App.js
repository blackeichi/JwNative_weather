import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
  };
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>서울</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weatherbox}
      >
        <View style={styles.day}>
          <Text style={styles.temper}>27°</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temper}>27°</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>{" "}
        <View style={styles.day}>
          <Text style={styles.temper}>27°</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>{" "}
        <View style={styles.day}>
          <Text style={styles.temper}>27°</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>{" "}
        <View style={styles.day}>
          <Text style={styles.temper}>27°</Text>
          <Text style={styles.weather}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5AD18F",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "800",
    color: "white",
  },
  weatherbox: {
    flex: 3,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    marginTop: 50,
    flex: 1,
  },
  temper: {
    color: "white",
    fontSize: 100,
  },
  weather: {
    color: "white",
    fontSize: 40,
  },
});
