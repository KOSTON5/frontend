import { View, Text, StyleSheet } from "react-native";

interface AssetSummaryProps {
  id: string;
  totalAsset: number;
  cashBalance: number;
  rateOfReturn: number;
}

const AssetSummary = ({ id, totalAsset, cashBalance, rateOfReturn }: AssetSummaryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id}님의 자산</Text>
      <View style={styles.assetWrapper}>
        <View style={styles.assetContainer}>
          <Text style={styles.assetLabel}>총자산</Text>
          <Text style={styles.assetLabel}>{totalAsset}</Text>
          <Text style={[styles.assetLabel, { fontWeight: "bold" }]}>원</Text>
        </View>
        <View style={styles.assetContainer}>
          <Text style={styles.assetLabel}>예수금</Text>
          <Text style={styles.assetLabel}>{cashBalance}</Text>
          <Text style={[styles.assetLabel, { fontWeight: "bold" }]}>원</Text>
        </View>
        <View style={styles.assetContainer}>
          <Text style={styles.assetLabel}>수익률</Text>
          <Text style={[styles.assetLabel, { color: "red", fontWeight: "bold" }]}>{rateOfReturn}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", width: "100%", paddingTop: 60 },
  title: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
  assetWrapper: { marginTop: 20, marginLeft: 50 },
  assetContainer: { flexDirection: "row", alignItems: "center" },
  assetLabel: { marginTop: 10, fontSize: 16, marginLeft: 30 },
});

export default AssetSummary;