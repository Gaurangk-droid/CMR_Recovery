    import { useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function App() {
  const fadeAnim = new Animated.Value(0); // Initial opacity 0
  const slideAnim = new Animated.Value(30); // Initial position below

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        Welcome to the Recovery App
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A", // Dark background
  },
  title: {
    fontSize: 28,
    color: "#38BDF8",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
