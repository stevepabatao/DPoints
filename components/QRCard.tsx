// components/QRCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRCard({ title, code }: { title: string; code: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.qrWrap}>
        <QRCode value={code} size={160} />
      </View>

      <Text style={styles.hint}>Show this QR to a partner to redeem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12, color: "#0f172a" },
  qrWrap: { backgroundColor: "#f8fafb", padding: 12, borderRadius: 12 },
  hint: { marginTop: 10, color: "#6b7280", fontSize: 13, textAlign: "center" },
});

