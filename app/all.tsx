import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import AssetSummary from "../components/AssetSummary";
import TransactionHistory from "../components/TransactionHistory";

export default function DummyScreen() {
  // Dummy

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F6", alignItems: "center", justifyContent: "center" },
});