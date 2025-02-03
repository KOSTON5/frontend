import {View, StyleSheet, Text} from "react-native";
import {useEffect, useState} from "react";
import {Audio} from "expo-av";

function HomeScreen() {

  // Code for handle event(predssing, scrolling, etc ... )
  // Can use any react hooks ( e.g. useState, useMemo ... )
  // how could I handle global states>?? Is there any way for help this?

  // TODO : API endpoint
  const kospiTopTen = "";

  const [data,setData] = useState([]); // array for stocks
  const [loading, setLoading] = useState(true) // loading check
  // http requests
  useEffect(()=>{
    fetch(kospiTopTen)
        .then((res)=> res.json())
        .then((json)=>{
          setData(json);
          setLoading(false);
        })
        .catch((err)=>console.error("Error while fetching data:",err));
  })

  return (
      <View style={styles.container}>
        {/* first section */}
        <View style={[styles.firstSection]}>
          <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 20, marginLeft: 20}}>새롭게 등장한 서비스</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>빠르고 쉬운 투자🚀 말한마디로 금융서비스를 시작해볼까요?</Text>
            <View style={styles.speechTail}></View>
          </View>
          <View>
            {/* TODO : MTS Asset */}
            <Text style={[styles.llmBox, {fontWeight: "bold"}]}>음성기반 MTS 사용하기</Text>
          </View>
        </View>

        {/* second section */ }
        <View style={[styles.section, ]}>
          <Text style={{fontSize:20, fontWeight:"bold", marginTop: 20, marginLeft: 20}}>실시간 통계</Text>
          <View>
            {/* TODO : horizontal scroll */}
          </View>
        </View>

        {/* third section */}
        <View style={styles.section}>
          <Text style={{fontSize:20,fontWeight:"bold", marginTop:20,marginLeft:20}}>실시간 차트</Text>
          { /* TODO : vertical scroll */}
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
    paddingTop: 60
  },
  section: {
    flex: 1, // 3개의 영역이 동일하게 분배됨
    backgroundColor: "white", // 하얀 배경
    width: "100%", // 가로 전체 차지
    marginTop: 20
  },
  speechBubble: {
    backgroundColor: "#F2F4F6",
    padding: 15,
    borderRadius: 10,
    maxWidth: 330,
    position: "relative",
    marginTop: 15,
    marginLeft: 20
  },
  speechText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  speechTail: {
    position: "absolute",
    bottom: -10, // 말풍선 아래쪽 꼬리
    left: "10%", // tail position determined by this !
    marginLeft: -10, // 꼬리 정렬
    width: 20,
    height: 20,
    backgroundColor: "#F2F4F6",
    transform: [{ rotate: "45deg" }],
  },
  llmBox: {
    marginTop: 20,
    marginLeft: 30
  }
});

export default HomeScreen;