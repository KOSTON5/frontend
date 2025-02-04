import {Animated, Dimensions, Easing, StyleSheet, Text, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import AnimatedSpeechBubble from "../components/AnimatedSpeechBubble";
import LlmButton from "../components/LlmButton";
import MarketStats from "../components/MarketStats";
import StockChart from "../components/StockChart";
import OverlayPage from "../components/OverlayPage"

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

  // index
  const [marketData,setMarketData] = useState([
    { "id": 1, "name": "나스닥", "price": 19627.44, "displacement": -0.28 },
    { "id": 2, "name": "코스피", "price": 2453.95, "displacement": -2.52 },
    { "id": 3, "name": "S&P 500", "price": 5947.07, "displacement": -0.50 },
    { "id": 4, "name": "다우존스", "price": 43941.78, "displacement": -0.75 },
    { "id": 5, "name": "코스닥", "price": 717.89, "displacement": -0.78 },
    { "id": 6, "name": "FTSE 100", "price": 8646.88, "displacement": -0.53 },
    { "id": 7, "name": "DAX", "price": 20214.79, "displacement": -0.50 },
    { "id": 8, "name": "CAC 40", "price": 7431.04, "displacement": -0.79 }
  ]);

  // stock
  const url = "http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/api/stock/chart";
  const [stockData,setStockData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setStockData(data.stockComponents);
      } catch (err) {
        console.log("error while fetching stock data:",err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();

    // polling every single second
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.titleText}>새롭게 등장한 서비스</Text>
        <AnimatedSpeechBubble />
        <LlmButton setVisible={setVisible}/>
      </View>
      <MarketStats marketData={marketData}/>
      <StockChart stockData={stockData}  isLoading={isLoading}/>
      <OverlayPage visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center" },
  firstSection: { height: 270, backgroundColor: "white", width: "100%", paddingTop: 60 },
  titleText: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
});