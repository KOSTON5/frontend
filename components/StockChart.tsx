import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";

interface StockDataProps {
  stockData: { stockName: string; currentPrice: number; tradingVolume: number; fluctuationRate: number }[];
  isLoading: boolean;
}

const StockChart = ({ stockData, isLoading }: StockDataProps) => {


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