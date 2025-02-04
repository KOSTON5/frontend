import { View, StyleSheet, Text } from "react-native";
import React, {useEffect, useState} from "react";
import AssetSummary from "../components/AssetSummary";
import TransactionHistory from "../components/TransactionHistory";
import {useFocusEffect} from "expo-router";

export default function MyPageScreen() {
  const userId = 1;
  const url = "http://team5-lb-web-01-27604987-a2222b665e80.kr-fin.lb.naverncp.com/api/users/information";
  const [userName,setUserName] = useState("임정환");
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
      } catch (err) {
        console.log("error occur while fetching user info:",err);
      }
    }

    // fetch user info
    fetchUserName();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchTransaction = async () => {
        try {
          const response = await fetch(txUrl, {
            headers: {
              "X-USER-ID": String(userId),
            },
          });
          const data = await response.json();
          setTransactionHistory(data.responses);
        } catch (err) {
          console.log("error while fetching transactions:", err);
        }
      };

      fetchTransaction();
    }, [])
  );


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
        console.log(data);
        console.log("");
        console.log(data.responses);
        setTransactionHistory(data.responses);
        console.log("tx history");
        console.log(transactionHistory);
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
        totalAsset={totalAsset}
        cashBalance={cashBalance}
        rateOfReturn={rateOfReturn} />
      {/* 거래 내역 */}
      <TransactionHistory txHistory={transactionHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center", justifyContent: "center" },
});