import { View, Text, StyleSheet, TouchableOpacity,  } from "react-native";
import {useState} from "react";

interface TxHistoryProps {
  txHistory : {
    orderId : number,
    stockName : String,
    ticker : String,
    price : Number,
    quantity : Number,
    orderType : String,
    orderDate : Date
  }[]
}

const TransactionHistory = ({txHistory}:TxHistoryProps) => {
  const [selectedTab, setSelectedTab] = useState("전체");

  const filterHistory = txHistory.filter((item)=>{
    if(selectedTab == "전체")
      return true;
    return item.orderType === selectedTab;
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>거래내역</Text>
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
      <View style={styles.listContainer}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 2, backgroundColor: "white", width: "100%", marginTop: 5 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
  tabContainer: { flexDirection: "row", marginTop: 20 },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderColor: "white",
    borderBottomColor: "#898686",
    borderWidth: 1,
  },
  listContainer: {flexDirection : "column"},
  selectedTab: { borderBottomColor: "black", borderBottomWidth: 3 },
  tabText: { color: "#898686" },
  selectedTabText: { color: "black", fontWeight: "bold" },
});

export default TransactionHistory;