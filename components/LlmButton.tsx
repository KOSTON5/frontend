import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from "react-native";
import LottieView from "lottie-react-native";
// import * as wasi from "node:wasi";

const LlmButton = ({ setVisible }: { setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <View style={styles.llmContainer}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <LottieView
            source={require('../assets/images/recordinglottie.json')} // Ensure this file exists
            autoPlay
            loop={true} // Loop animation while recording
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <Text style={styles.llmText}>터치하여 대화하듯 MTS 사용해보기</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  llmContainer: { flexDirection: "row", marginTop: 10, marginLeft: 40, alignItems: "center" },
  llmButton: { width: 40, height: 40 },
  llmText: { marginLeft: 21, fontSize: 16, fontWeight: "bold" },
});

export default LlmButton;