import { Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

const App = () => {
  const [stocks, setStocks] = useState([
    { id: "1", name: "Apple", symbol: "AAPL", price: 150 },
    { id: "2", name: "Tesla", symbol: "TSLA", price: 850 },
    { id: "3", name: "Amazon", symbol: "AMZN", price: 3300 },
    { id: "4", name: "삼성전자", symbol: "SAMS", price: 55},
    { id: "5", name: "LG전자", symbol: "LGES", price: 30},
  ]);
  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredStocks(
      stocks.filter(
        (stock) =>
          stock.name.toLowerCase().includes(text.toLowerCase()) ||
          stock.symbol.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const StockList = () => (
    <FlatList
      data={filteredStocks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSelectedStock(item)} style={styles.stockItem}>
          <Text style={styles.stockName}>{item.name} ({item.symbol})</Text>
          <Text style={styles.stockPrice}>${item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );

  const StockDetail = () => (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>{selectedStock.name} ({selectedStock.symbol})</Text>
      <Text style={styles.detailPrice}>현재가: ${selectedStock.price}</Text>
      <Button title="Back to List" onPress={() => setSelectedStock(null)} />
    </View>
  );

  const Assist = () => (
    <View style={styles.listContainer}>
      <TextInput
      placeholder="AI와 음성을 이용할 수 있어요!"
      value={search}
      style={styles.searchInput}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>KOSCOM AI 트레이딩</Text>
      {selectedStock ? (
        <StockDetail />
      ) : (
        <View style={styles.listContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="찾고자하는 종목을 입력해주세요"
            value={search}
            onChangeText={handleSearch}
          />
          <StockList />
        </View>
      )}
      <Assist></Assist>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  stockName: {
    fontSize: 18,
    fontWeight: "500",
  },
  stockPrice: {
    fontSize: 16,
    color: "#4caf50",
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailPrice: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;
