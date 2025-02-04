import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";

interface Stock {
  stockName: string;
  currentPrice: number;
  tradingVolume: number;
  fluctuationRate: number;
  leverage?: string; // 2x, 3x 같은 레버리지 표시 (옵션)
  logo?: string; // 로고 이미지 URL (옵션)
}

interface StockDataProps {
  stockData: Stock[];
  isLoading: boolean;
}

const StockChart = ({ stockData, isLoading }: StockDataProps) => {
  return (
    <View style={styles.container}>
      {/* 고정된 타이틀 */}
      <View style={styles.header}>
        <Text style={styles.titleText}>실시간 차트</Text>
      </View>

      {/* 스크롤 가능한 주식 목록 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.stockList}>
          {isLoading ? (
            <Text style={styles.loadingText}>차트 데이터 로딩 중...</Text>
          ) : (
            stockData.map((stock, index) => (
              <View key={index} style={styles.stockItem}>
                {/* 왼쪽: 랭킹 번호 & 레버리지 */}
                <View style={styles.rankContainer}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                  {stock.leverage && (
                    <View style={styles.leverageBadge}>
                      <Text style={styles.leverageText}>{stock.leverage}</Text>
                    </View>
                  )}
                </View>

                {/* 중앙: 로고 + 주식 정보 */}
                <View style={styles.stockInfoContainer}>
                  {stock.logo ? (
                    <Image source={{ uri: stock.logo }} style={styles.stockLogo} />
                  ) : (
                    <View style={styles.defaultLogo} />
                  )}
                  <View>
                    <Text style={styles.stockName}>{stock.stockName}</Text>
                    <Text style={styles.stockPrice}>
                      {stock.currentPrice.toLocaleString()}원{" "}
                      <Text
                        style={[
                          styles.fluctuation,
                          { color: stock.fluctuationRate >= 0 ? "red" : "blue" },
                        ]}
                      >
                        {stock.fluctuationRate > 0
                          ? `+${stock.fluctuationRate}%`
                          : `${stock.fluctuationRate}%`}
                      </Text>
                    </Text>
                  </View>
                </View>

                {/* 오른쪽: 즐겨찾기 (하트) */}
                <View style={styles.favoriteIcon}>
                  <Text>♡</Text> {/* 하트 아이콘 */}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", width: "100%" },

  // 고정된 타이틀 스타일
  header: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  titleText: { fontSize: 20, fontWeight: "bold" },

  // 스크롤 영역 스타일
  scrollContainer: { paddingBottom: 20 },
  stockList: { marginHorizontal: 20, marginTop: 10 },

  stockItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  // 랭킹 & 레버리지 스타일
  rankContainer: { width: 40, alignItems: "center" },
  rankText: { fontSize: 16, fontWeight: "bold", color: "#555" },
  leverageBadge: {
    backgroundColor: "green",
    borderRadius: 20,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginTop: 5,
  },
  leverageText: { color: "white", fontSize: 12, fontWeight: "bold" },

  // 주식 정보 스타일
  stockInfoContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  stockLogo: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  defaultLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  stockName: { fontSize: 16, fontWeight: "bold" },
  stockPrice: { fontSize: 14, color: "#333" },
  fluctuation: { fontSize: 14, fontWeight: "bold" },

  // 즐겨찾기 아이콘 (하트)
  favoriteIcon: { paddingHorizontal: 10 },

  // 로딩 텍스트
  loadingText: { textAlign: "center", color: "#888", fontSize: 16, marginTop: 20 },
});

export default StockChart;