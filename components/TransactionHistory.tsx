import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";

interface TxHistoryProps {
  txHistory: {
    orderId: number;
    stockName: string;
    ticker: string;
    price: number;
    quantity: number;
    orderType: string; // "매수" 또는 "매도"
    orderDate: string;
  }[];
}

const TransactionHistory = ({ txHistory }: TxHistoryProps) => {
  const [selectedTab, setSelectedTab] = useState("전체");

  const filterHistory = txHistory.filter((item)=>{
    if(selectedTab == "전체")
      return true;
    return item.orderType === selectedTab;
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>거래내역</Text>

      {/* 탭 메뉴 */}
      <View style={styles.tabContainer}>
        {["전체", "입출금", "입출고", "매매"].map((tabName) => (
          <TouchableOpacity
            key={tabName}
            style={[styles.tab, selectedTab === tabName && styles.selectedTab]}
            onPress={() => setSelectedTab(tabName)}
          >
            <Text style={[styles.tabText, selectedTab === tabName && styles.selectedTabText]}>
              {tabName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 거래내역 리스트 - FlatList로 스크롤 가능하게 변경 */}
      <FlatList
        data={txHistory}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {/* 날짜 및 거래유형 */}
            <Text style={styles.dateText}>{item.orderDate} · 국내증권</Text>

            {/* 종목명 */}
            <Text style={styles.stockName}>{item.stockName}</Text>

            {/* 주문 정보 (매수/매도, 가격, 수량) */}
            <View style={styles.orderInfo}>
              <Text style={[styles.orderType, item.orderType === "BUY" ? styles.buyText : styles.sellText]}>
                {item.orderType === "BUY" ? "매수" : "매도"}
              </Text>
              <Text style={styles.price}>{item.price.toLocaleString()} KRW</Text>
              <Text style={styles.quantity}>{item.quantity}주</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", width: "100%", marginTop: 5 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },

  tabContainer: { flexDirection: "row", marginTop: 20 },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#898686",
    borderBottomWidth: 1,
  },
  listContainer: {flexDirection : "column"},
  selectedTab: { borderBottomColor: "black", borderBottomWidth: 3 },
  tabText: { color: "#898686" },
  selectedTabText: { color: "black", fontWeight: "bold" },

  listContainer: { paddingBottom: 20 },
  listItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },

  dateText: { fontSize: 14, color: "#666" },
  stockName: { fontSize: 18, fontWeight: "bold", marginTop: 5 },

  orderInfo: { flexDirection: "row", justifyContent: "space-between", marginTop: 5, alignItems: "center" },
  orderType: { fontSize: 16, fontWeight: "bold" },
  buyText: { color: "red" },  // 매수 색상
  sellText: { color: "blue" }, // 매도 색상

  price: { fontSize: 16 },
  quantity: { fontSize: 16, color: "#666" },
});

export default TransactionHistory;