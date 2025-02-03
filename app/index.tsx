import {Animated, Dimensions, Easing, StyleSheet, Text, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import AnimatedSpeechBubble from "../components/AnimatedSpeechBubble";
import LlmButton from "../components/LlmButton";
import MarketStats from "../components/MarketStats";
import StockChart from "../components/StockChart";
import OverlayChat from "../components/overlaychat";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  // Conveyor Belt Animation
  const translateXAnime = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateXAnime, {
        toValue: -width,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Market Data
  const [marketData] = useState([
    { id: 1, name: "나스닥", price: 20000, displacement: -0.4 },
    { id: 2, name: "코스피", price: 30000, displacement: +0.8 },
    { id: 3, name: "S&P 500", price: 10000, displacement: +1.7 },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.titleText}>새롭게 등장한 서비스</Text>
        <AnimatedSpeechBubble />
        <LlmButton setVisible={setVisible}/>
      </View>
      <MarketStats marketData={marketData}/>
      <StockChart />
      <OverlayChat visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center" },
  firstSection: { height: 270, backgroundColor: "white", width: "100%", paddingTop: 60 },
  titleText: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
});