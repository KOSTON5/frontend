import { View, StyleSheet, Text } from "react-native";
import {useEffect, useState} from "react";
import AssetSummary from "../components/AssetSummary";
import TransactionHistory from "../components/TransactionHistory";

export default function MyPageScreen() {
  // User info
  // 임정환,3
  const userId = 1;
  const url = "http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/api/users/information";
  const [userName,setUserName] = useState("임정환");
  // TODO: 서버에서 가져올 데이터
  const [totalAsset, setTotalAsset] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);

  useEffect(()=>{
    const fetchUserName = async () => {
      try {
        const response = await fetch(url, {
          method : "GET",
          headers : {
            "X-USER-ID" : String(userId)
          }
        })
        const data = await response.json();
        setTotalAsset(Number(data.totalAssets));
        setCashBalance(Number(data.availableBalance));
        setRateOfReturn(Number(data.profitRate));
        console.log("fetch user name end");
      } catch (err) {
        console.log("error occur while fetching user info:",err);
      }
    }

    // fetch user info
    fetchUserName();
  }, []);

  // transaction history
  const txUrl = "http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/api/users/orders";
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(txUrl,{
          headers : {
            "X-USER-ID" : userId
          }
        });
        const data = await response.json();
        setTransactionHistory(data.responses);
        console.log("fetch tx history done:",transactionHistory);
      } catch (err) {
        console.log("error while fetch tx:",err);
      }
    }

    fetchTransaction();
  }, []);

  return (
    <View style={styles.container}>
      {/* 자산 정보 */}
      <AssetSummary
        name={userName}
        totalAsset={20340560}
        cashBalance={10000}
        rateOfReturn={3.12} />
      {/* 거래 내역 */}
      <TransactionHistory txHistory={transactionHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center", justifyContent: "center" },
});