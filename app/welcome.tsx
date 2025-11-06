import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function WelcomeScreen() {
const fadeAnim = useRef(new Animated.Value(0)).current;
const slideAnim = useRef(new Animated.Value(500)).current; // start lower

 useEffect(() => {
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }),
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 6,     // slightly bouncy but smooth
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
    backgroundColor: "#0F172A",
  },
  title: {
    fontSize: 28,
    color: "#38BDF8",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
