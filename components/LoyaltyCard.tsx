import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { ArrowLeft } from "lucide-react-native";

interface LoyaltyCardProps {
  rewardTitle: string;
  points: number;
  qrValue: string;
  onBack: () => void;
}

export default function LoyaltyCard({ rewardTitle, points, qrValue, onBack }: LoyaltyCardProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ArrowLeft size={18} color="#2563eb" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.rewardTitle}>{rewardTitle}</Text>

        <View style={styles.pointsBox}>
          <Text style={styles.pointsLabel}>Your Points</Text>
          <Text style={styles.pointsValue}>{points}</Text>
          <QRCode value={qrValue} size={180} />
          <Text style={styles.qrHint}>Scan this QR to redeem your reward</Text>
        </View>

        <TouchableOpacity onPress={onBack} style={styles.returnButton}>
          <Text style={styles.returnButtonText}>Back to Rewards</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backText: {
    marginLeft: 5,
    color: "#2563eb",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 24,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f1f1",
  },
  rewardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 16,
  },
  pointsBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  pointsLabel: {
    color: "#4b5563",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: "900",
    color: "#2563eb",
    marginBottom: 16,
  },
  qrHint: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },
  returnButton: {
    backgroundColor: "#2563eb",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

