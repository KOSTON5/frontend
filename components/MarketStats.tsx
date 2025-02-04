import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

interface MarketDataProps {
  marketData: { id: number; name: string; price: number; displacement: number }[];
}

const MarketStats = ({ marketData }: MarketDataProps) => {
  const translateXAnime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateXAnime, {
        toValue: -300,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>실시간 지수</Text>
      <Animated.View style={[styles.marketContainer, { transform: [{ translateX: translateXAnime }] }]}>
        {marketData.map((item) => (
          <View key={item.id} style={styles.marketBox}>
            <Text style={styles.marketText}>{item.name}</Text>
            <Text>{item.price.toLocaleString()}원</Text>
            <Text style={{ color: item.displacement >= 0 ? "red" : "blue" }}>
              {item.displacement}%
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 150, backgroundColor: "white", width: "100%", marginTop: 5},
  titleText: { fontSize: 20, fontWeight: "bold", marginLeft: 20, marginTop: 20 },
  marketContainer: { flexDirection: "row", paddingHorizontal: 20, marginTop: 10 },
  marketBox: {
    backgroundColor: "#F2F4F6",
    padding: 15,
    borderRadius: 15,
    width: 130,
    alignItems: "center",
    marginRight: 15,
  },
  marketText: { fontSize: 16, fontWeight: "bold", color: "black" },
});

export default MarketStats;