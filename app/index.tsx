import {View, StyleSheet, Text, Animated, Easing, Dimensions} from "react-native";
import { useEffect, useRef, useState } from "react";
import ThirdSection from "./third-section";


const {width} = Dimensions.get("window");

function HomeScreen() {
  // TODO : API endpoint
  const apiEndPoint = "";

  // Up and Down Animating
  const shakeAnime = useRef(new Animated.Value(0)).current;
  const rotateAnime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShake = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnime, {
            toValue: 2, // Up
            duration: 600,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnime, {
            toValue: -2, // Down
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
    };

    startShake();
  }, []);

  // Stock data
  const [stockData, setStockData] = useState([
    { id: 1, name: "Samsung" },
    { id: 2, name: "LG" },
  ]);

  // Conveyor Belt Animation
  const translateXAnime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startConveyorBelt = () => {
      Animated.loop(
        Animated.timing(translateXAnime, {
          toValue: -width, // 화면 너비만큼 왼쪽으로 이동
          duration: 5000, // 이동 속도 (5초)
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startConveyorBelt();
  }, []);

  // Market data
  const [marketData, setMarketData] = useState([
    { id: 1, name: "나스닥", price: 20000, displacement: -0.4 },
    { id: 2, name: "코스피", price: 30000, displacement: +0.8 },
    { id: 3, name: "S&P 500", price: 10000, displacement: +1.7 },
    { id: 4, name: "다우존스", price: 34000, displacement: +0.6 },
    { id: 5, name: "FTSE 100", price: 7500, displacement: -0.2 },
    { id: 6, name: "니케이 225", price: 28500, displacement: +0.9 },
    { id: 7, name: "DAX", price: 15500, displacement: -0.5 },
    { id: 8, name: "CAC 40", price: 7300, displacement: +0.3 },
    { id: 9, name: "SSE 종합", price: 3200, displacement: -1.1 },
    { id: 10, name: "KOSDAQ", price: 900, displacement: +2.4 },
  ]);

  // loading
  const [loading, setLoading] = useState(true);

  // http requests
  useEffect(() => {
    fetch(apiEndPoint)
      .then((res) => res.json())
      .then((json) => {
        setStockData(json);
        setLoading(false);
      })
      .catch((err) => console.error("Error while fetching data:", err));
  }, []);

  return (
    <View style={styles.container}>
      {/* first section */}
      <View style={styles.firstSection}>
        <Text style={styles.titleText}>새롭게 등장한 서비스</Text>
        <Animated.View style={{ transform: [{ translateY: shakeAnime }] }}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
               빠르고 쉬운 투자🚀 말한마디로 금융서비스를 시작해볼까요?
            </Text>
            <View style={styles.speechTail}></View>
          </View>
        </Animated.View>
        <View style={styles.llmContainer}>
          <View style={styles.llmButton}></View>
          <Text style={styles.llmText}>터치하여 음성기반 MTS 사용해보기</Text>
        </View>
      </View>

      {/* second section */}
      <View style={styles.secondSection}>
        <Text style={styles.titleText}>실시간 통계</Text>
        <View style={styles.marketContainer}>
          {marketData.map((item) => {
            return (
              <Animated.View
                style={[
                  styles.marketContainer,
                  { transform: [{ translateX: translateXAnime }] },
                ]}
              >
                {[...marketData, ...marketData].map((item, index) => (
                  <View key={index} style={styles.marketBox}>
                    <Text style={styles.marketText}>{item.name}</Text>
                    <Text style={styles.marketPrice}>
                      {item.price ? `${item.price.toLocaleString()}원` : "-"}
                    </Text>
                    <Text
                      style={[
                        styles.marketDisplacement,
                        { color: item.displacement >= 0 ? "green" : "red" },
                      ]}
                    >
                      {item.displacement}%
                    </Text>
                  </View>
                ))}
              </Animated.View>
            );
          })}
        </View>
      </View>

      {/* third section */}
      <View style={styles.thirdSection}>
        <Text style={styles.titleText}>실시간 차트</Text>
        <View>
          {stockData.map((item) => {
            return <Text key={item.id}>Hello</Text>;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "F2F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  firstSection: {
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    paddingTop: 60,
  },
  secondSection: {
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    marginTop: 20,
  },
  thirdSection: {
    flex: 3,
    backgroundColor: "white",
    width: "100%",
    marginTop: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
  speechBubble: {
    backgroundColor: "#F2F4F6",
    padding: 15,
    borderRadius: 10,
    maxWidth: 350,
    position: "relative",
    marginTop: 15,
    marginLeft: 25,
  },
  speechText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  speechTail: {
    position: "absolute",
    bottom: -10,
    left: "10%",
    marginLeft: -10,
    width: 20,
    height: 20,
    backgroundColor: "#F2F4F6",
    transform: [{ rotate: "45deg" }],
  },
  llmText: {
    marginLeft: 25,
    fontSize: 16,
  },
  llmContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 40,
    alignItems: "center",
  },
  llmButton: {
    backgroundColor: "red",
    width: 40,
    height: 40,
  },
  marketContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 10,
    marginRight: 15
  },
  marketBox: {
    backgroundColor: "#F2F4F6",
    padding: 15,
    borderRadius: 15,
    width: 130,
    alignItems: "center",
    marginRight: 15
  },
  marketText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  marketPrice: {
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
  marketDisplacement: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default HomeScreen;