import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";

const AnimatedSpeechBubble = () => {
  const shakeAnime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnime, {
          toValue: 2,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnime, {
          toValue: -2,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnime, {
          toValue: 0,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateY: shakeAnime }] }}>
      <View style={styles.speechBubble}>
        <Text style={styles.speechText}>빠르고 쉬운 투자🚀 말한마디로 금융서비스를 시작해볼까요?</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  speechBubble: {
    backgroundColor: "#F2F4F6",
    padding: 15,
    borderRadius: 10,
    maxWidth: 350,
    marginTop: 15,
    marginLeft: 25,
  },
  speechText: { fontSize: 16, fontWeight: "bold" },
});

export default AnimatedSpeechBubble;