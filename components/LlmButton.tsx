import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, } from "react-native";
// import * as wasi from "node:wasi";

const LlmButton = ({ setVisible }: { setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <View style={styles.llmContainer}>
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Image source={require("../assets/images/mic.png")} style={styles.llmButton} />
        </TouchableOpacity>
        <Text style={styles.llmText}>터치하여 대화하며 MTS 사용해보기</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  llmContainer: { flexDirection: "row", marginTop: 20, marginLeft: 40, alignItems: "center" },
  llmButton: { width: 40, height: 40 },
  llmText: { marginLeft: 25, fontSize: 16, fontWeight: "bold" },
});

export default LlmButton;