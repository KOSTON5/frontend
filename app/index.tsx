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

  // mockup data
  const mockUp = [
      {
        "stockName": "삼성전자",
        "currentPrice": 75500,
        "tradingVolume": 15230000,
        "fluctuationRate": 1.2,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-005930.png"
      },
      {
        "stockName": "SK하이닉스",
        "currentPrice": 123500,
        "tradingVolume": 8400000,
        "fluctuationRate": -0.8,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-000660.png"
      },
      {
        "stockName": "LG에너지솔루션",
        "currentPrice": 440000,
        "tradingVolume": 3100000,
        "fluctuationRate": 0.5,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-373220.png"
      },
      {
        "stockName": "삼성바이오로직스",
        "currentPrice": 760000,
        "tradingVolume": 1200000,
        "fluctuationRate": -0.3,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-207940.png"
      },
      {
        "stockName": "현대차",
        "currentPrice": 250000,
        "tradingVolume": 5400000,
        "fluctuationRate": 1.1,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-005380.png"
      },
      {
        "stockName": "LG화학",
        "currentPrice": 630000,
        "tradingVolume": 2300000,
        "fluctuationRate": -1.0,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-051910.png"
      },
      {
        "stockName": "삼성SDI",
        "currentPrice": 600000,
        "tradingVolume": 1800000,
        "fluctuationRate": 0.7,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-005930.png"
      },
      {
        "stockName": "POSCO홀딩스",
        "currentPrice": 410000,
        "tradingVolume": 2900000,
        "fluctuationRate": 1.3,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-005490.png"
      },
      {
        "stockName": "NAVER",
        "currentPrice": 212000,
        "tradingVolume": 4600000,
        "fluctuationRate": -0.5,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-035420.png"
      },
      {
        "stockName": "카카오",
        "currentPrice": 49000,
        "tradingVolume": 7300000,
        "fluctuationRate": 0.9,
        "logo" : "https://thumb.tossinvest.com/image/resized/96x0/https%3A%2F%2Fstatic.toss.im%2Fpng-icons%2Fsecurities%2Ficn-sec-fill-035720.png"
      }
    ]

  useEffect(() => {
    const fetchStockData = async () => {
      try{
        const response = await fetch(url);
        const data = await response.json();
        setStockData(data.stockComponents);
      } catch (err) {
        console.log("error while fetching stock data:",err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();

    // polling every single second
    // setInterval(fetchStockData,1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.firstSection}>
        <Text style={styles.titleText}>새롭게 등장한 서비스</Text>
        <AnimatedSpeechBubble />
        <LlmButton setVisible={setVisible}/>
      </View>
      <MarketStats marketData={marketData}/>
      <StockChart stockData={mockUp}  isLoading={isLoading}/>
      <OverlayChat visible={visible} setVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center" },
  firstSection: { height: 270, backgroundColor: "white", width: "100%", paddingTop: 60 },
  titleText: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
});