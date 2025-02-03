import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import AssetSummary from "../components/AssetSummary";
import TransactionHistory from "../components/TransactionHistory";

export default function MyPageScreen() {
  const id = "임정환";

  // TODO: 서버에서 가져올 데이터
  const [totalAsset, setTotalAsset] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);

  return (
    <View style={styles.container}>
      {/* 자산 정보 */}
      <AssetSummary id={id} totalAsset={totalAsset} cashBalance={cashBalance} rateOfReturn={rateOfReturn} />

      {/* 거래 내역 */}
      <TransactionHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center", justifyContent: "center" },
});