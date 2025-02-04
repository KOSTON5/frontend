import {View, Text, StyleSheet, Image} from "react-native";

interface AssetSummaryProps {
  name: string;
  totalAsset: number;
  cashBalance: number;
  rateOfReturn: number;
}

const AssetSummary = ({ name, totalAsset, cashBalance, rateOfReturn }: AssetSummaryProps) => {
  // parsing

  return (
    <View style={styles.container}>
      <View style={styles.infoWrapper}>
        <Image style={styles.imageWrapper} source={require("../assets/images/kos.png")}></Image>
        <Text style={styles.title}>반갑습니다, {name} 님</Text>
      </View>
      <View style={styles.assetWrapper}>
        <Text style={{fontWeight:"bold",fontSize:16}}>자산현황</Text>
        <View style={styles.assetContainer}>
          <Text style={{fontSize:16,marginTop:10}}>총자산</Text>
          <Text style={styles.assetLabel}>{totalAsset.toLocaleString()}</Text>
          <Text style={[styles.assetLabel, { fontWeight: "bold" }]}>원</Text>
        </View>
        <View style={styles.assetContainer}>
          <Text style={{fontSize:16,marginTop:10}}>예수금</Text>
          <Text style={styles.assetLabel}>{cashBalance.toLocaleString()}</Text>
          <Text style={[styles.assetLabel, { fontWeight: "bold" }]}>원</Text>
        </View>
        <View style={styles.assetContainer}>
          <Text style={{fontSize:16,marginTop:10}}>수익률</Text>
          <Text style={[styles.assetLabel, { color: "red", fontWeight: "bold" }]}>{rateOfReturn.toLocaleString()}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 250, backgroundColor: "white", width: "100%", paddingTop: 60},
  title: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20},
  assetWrapper: { marginTop: 20, marginLeft: 30},
  assetContainer: { flexDirection: "row", alignItems: "center"},
  assetLabel: { marginTop: 10, fontSize: 16, marginLeft:20},
  imageWrapper: { width:30, height:30, borderRadius:50, marginLeft:25, marginTop:20},
  infoWrapper : { alignItems : "center", flexDirection: "row"}
});

export default AssetSummary;