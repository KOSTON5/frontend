import { View, StyleSheet, Text } from "react-native";
import {useEffect, useState} from "react";
import AssetSummary from "../components/AssetSummary";
import TransactionHistory from "../components/TransactionHistory";

export default function MyPageScreen() {
  // User info
  const url = "http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/api/users/information";
  const [userId,setUserId] = useState("알수없음");
  // TODO: 서버에서 가져올 데이터
  const [totalAsset, setTotalAsset] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);

  // TODO : After CORS issue
  // useEffect(()=>{
  //   const fetchUserId = async () => {
  //     try {
  //       const response = await fetch(url)
  //       const data = await response.json();
  //       setUserId(data);
  //     } catch (err) {
  //       console.log("error occur while fetching user info:",err);
  //     }
  //   }
  //
  //   // fetch user info
  //   fetchUserId();
  // }, []);

  // transparency
  const txUrl = "";
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(txUrl);
        const data = await response.json();
        setTransactionHistory(data);
      } catch (err) {
        console.log("error while fetch tx:",err);
      }
    }

    fetchTransaction();
  }, []);

  return (
    <View style={styles.container}>
      {/* 자산 정보 */}
      <AssetSummary id={userId} totalAsset={totalAsset} cashBalance={cashBalance} rateOfReturn={rateOfReturn} />
      {/* 거래 내역 */}
      <TransactionHistory txHistory={transactionHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center", justifyContent: "center" },
});