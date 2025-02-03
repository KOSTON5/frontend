import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useState} from "react";

function MyPageScreen() {

  const id = "임정환";
  // TODO : fetch from server
  const [totalAsset, setTotalAsset] = useState(0);
  const [cashBalance, setCashBalance] = useState(0);
  const [rateOfReturn, setRateOfReturn] = useState(0);
  const [selectedTab, setSelectedTab] = useState("전체");

  return (
    <View style={styles.container}>
      <View style={[styles.firstSection]}>
        <Text style={{fontSize:20, fontWeight: "bold", marginTop: 20, marginLeft: 20}}>{id}님 자산현황</Text>
        <View style={{marginTop:15, marginLeft:50}}>
          <View style={styles.assetContainer}>
            <Text style={styles.assetLabel}>총자산</Text>
            <Text style={styles.assetLabel}>{totalAsset}</Text>
            <Text style={[styles.assetLabel,{fontWeight : "bold"}]}>원</Text>
          </View>
          <View style={styles.assetContainer}>
            <Text style={styles.assetLabel}>예수금</Text>
            <Text style={styles.assetLabel}>{cashBalance}</Text>
            <Text style={[styles.assetLabel,{fontWeight : "bold"}]}>원</Text>
          </View>
          <View style={styles.assetContainer}>
            <Text style={styles.assetLabel}>수익률</Text>
            <Text style={[styles.assetLabel, {color : "red", fontWeight : "bold"}]}>{rateOfReturn}%</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={{fontSize:20, fontWeight:"bold", marginTop: 20, marginLeft: 20}}>거래내역</Text>
        <View style={{flexDirection:"row", marginTop: 20}}>
          {["전체", "입출금", "입출고", "매매"].map((tabName) => (
            <TouchableOpacity
              key={tabName}
              style={[
                styles.tab,
                selectedTab === tabName && styles.selectedTab
              ]}
              onPress={() => setSelectedTab(tabName)}
            >
              <Text style={[
                { color: "#898686" },
                selectedTab === tabName && { color: "black", fontWeight: "bold" } // 선택된 탭 글자 강조
              ]}>
                {tabName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // 화면 전체 차지
    backgroundColor: "F2F4F6", // 부모 배경 검정색 유지
    alignItems: "center",
    justifyContent: "center"
  },
  firstSection : {
    flex: 1, // 3개의 영역이 동일하게 분배됨
    backgroundColor: "white", // 하얀 배경
    width: "100%", // 가로 전체 차지
    paddingTop: 60,
      height: 50
  },
  section: {
    flex: 3, // 3개의 영역이 동일하게 분배됨
    backgroundColor: "white", // 하얀 배경
    width: "100%", // 가로 전체 차지
    marginTop: 20
  },
  tab : {
    flex: 1, // 각 요소가 동일한 크기를 가지도록 설정
    alignItems: "center", // 가운데 정렬
    paddingVertical: 10,
    borderColor : "white",
    borderBottomColor : "#898686",
    borderWidth : 1,
  },
  assetLabel : {
    marginTop : 10,
    fontSize : 16,
    marginLeft : 30
  },
  assetContainer : {
    flexDirection : "row",
    alignItems : "center"
  },
  selectedTab: {
    borderBottomColor: "black", // 선택된 탭 강조
    borderBottomWidth: 3,
  },
});

export default MyPageScreen;