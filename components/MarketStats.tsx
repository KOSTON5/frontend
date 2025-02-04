import { View, Text, StyleSheet, Animated, Easing, Dimensions } from "react-native";
import { useEffect, useRef } from "react";

interface MarketDataProps {
  marketData: { id: number; name: string; price: number; displacement: number }[];
}

const { width } = Dimensions.get("window"); // 화면 너비 가져오기

const MarketStats = ({ marketData }: MarketDataProps) => {
  const translateXAnime = useRef(new Animated.Value(0)).current;
  const duplicatedData = [...marketData, ...marketData]; // 데이터를 2배로 확장

  useEffect(() => {
    const startAnimation = () => {
      translateXAnime.setValue(0); // 초기 위치로 리셋

      Animated.loop(
        Animated.timing(translateXAnime, {
          toValue: -width, // 화면 너비만큼 이동
          duration: 9000, // 부드러운 애니메이션 지속 시간 (조절 가능)
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>실시간 지수</Text>
      <View style={styles.scrollingContainer}>
        <Animated.View
          style={[
            styles.marketContainer,
            { transform: [{ translateX: translateXAnime }] },
          ]}
        >
          {duplicatedData.map((item, index) => (
            <View key={index} style={styles.marketBox}>
              <Text style={styles.marketText}>{item.name}</Text>
              <Text>{item.price.toLocaleString()}원</Text>
              <Text style={{ color: item.displacement >= 0 ? "red" : "blue" }}>
                {item.displacement}%
              </Text>
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: "white",
    width: "100%",
    marginTop: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
  },
  scrollingContainer: {
    width: "100%",
    overflow: "hidden", // 화면을 벗어나는 부분 숨기기
  },
  marketContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  marketBox: {
    backgroundColor: "#F2F4F6",
    padding: 15,
    borderRadius: 15,
    width: 140,
    alignItems: "center",
    marginRight: 15,
    marginTop: 10
  },
  marketText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default MarketStats;