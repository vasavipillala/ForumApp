import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Skeleton = ({
  width = "100%",
  height = 20,
  radius = 10,
  style = {},
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200], // shimmer slide range
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: "#E2E2E2",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={["#ffffff10", "#ffffff60", "#ffffff10"]}
          style={{ flex: 1 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
