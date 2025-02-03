import { View, Text, StyleSheet } from "react-native";

const StockChart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>실시간 차트</Text>
      {/* TODO: 실제 차트 라이브러리 적용 */}
      <View style={styles.chartPlaceholder}>
        <Text style={{ color: "#888" }}>차트 데이터 로딩 중...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", width: "100%", marginTop: 20 },
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