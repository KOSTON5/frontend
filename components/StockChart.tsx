import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";

const StockChart = () => {

  // TODO : HTTP requesting
  // 부모가 보내는게 더 좋을까?
  const apiURL = "";
  const [data,setData] = useState(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await fetch(apiURL);
        const result = await response.json();
      } catch (err) {
        console.error("failed to fetch:",err)
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>실시간 차트</Text>
      {/* TODO: 실제 차트 라이브러리 적용 */}
      <View style={styles.chartPlaceholder}>
        {isLoading === false ? <Text>로딩완료</Text>: <Text style={{ color: "#888" }}>차트 데이터 로딩 중...</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", width: "100%", marginTop: 5 },
  titleText: { fontSize: 20, fontWeight: "bold", marginLeft: 20, marginTop: 20 },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#F2F4F6",
    borderRadius: 15,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StockChart;