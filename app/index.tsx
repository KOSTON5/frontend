import {View, StyleSheet, Text} from "react-native";
import {useState} from "react";

function HomeScreen() {

  // Code for handle event(predssing, scrolling, etc ... )
  // Can use any react hooks ( e.g. useState, useMemo ... )
  // how could I handle global states>?? Is there any way for help this?

  return (
      <View style={styles.container}>
        {/* first section */}
        <View style={[styles.firstSection]}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>새롭게 등장한 서비스</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>빠르고 쉬운 투자! 말한마디로 금융서비스를 시작해볼까요?</Text>
            <View style={styles.speechTail}></View>
          </View>
          <View>
            {/* MTS 에셋 협의 필요, 일렬로 늘어놔야함*/}
            <Text>음성기반 MTS 사용하기</Text>
          </View>
        </View>

        {/* second section */ }
        <View style={[styles.section, ]}>
          <Text style={{fontSize:20, fontWeight:"bold"}}>실시간 통계</Text>
          <View>
            {/* TODO : horizontal scroll */}
          </View>
        </View>

        {/* third section */}
        <View style={styles.section}>
          <Text style={{fontSize:20,fontWeight:"bold"}}>실시간 차트</Text>
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
  },
  section: {
    flex: 1, // 3개의 영역이 동일하게 분배됨
    backgroundColor: "white", // 하얀 배경
    width: "100%", // 가로 전체 차지
    marginTop: 30
  },
  speechBubble: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    maxWidth: 250,
    alignSelf: "center",
    position: "relative",
  },
  speechText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  speechTail: {
    position: "absolute",
    bottom: -10, // 말풍선 아래쪽 꼬리
    left: "80%", // tail position determined by this !
    marginLeft: -10, // 꼬리 정렬
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    transform: [{ rotate: "45deg" }],
  }
});

export default HomeScreen;