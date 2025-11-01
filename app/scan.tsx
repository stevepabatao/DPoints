// app/scan.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { usePointsContext } from "@/context/PointsContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { addPoints } = usePointsContext();
  const router = useRouter();

  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    // Mock: parse code and award points (you can tie to backend)
    const earned = 20;
    addPoints(earned);

    Alert.alert("Success", `+${earned} points added`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Camera permission required</Text>
        <TouchableOpacity style={styles.btn} onPress={() => requestPermission()}>
          <Text style={styles.btnText}>Grant</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />

      <View style={styles.overlay}>
        <View style={styles.frame} />
        <Text style={styles.hint}>Scan QR to earn points</Text>
      </View>

      <TouchableOpacity style={styles.close} onPress={() => router.back()}>
        <Ionicons name="close" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  btn: { marginTop: 12, padding: 10, backgroundColor: "#00BFA5", borderRadius: 8 },
  btnText: { color: "#fff", fontWeight: "700" },

  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
  frame: { width: 280, height: 280, borderWidth: 3, borderColor: "#00BFA5", borderRadius: 18 },
  hint: { color: "#fff", marginTop: 12, fontWeight: "600" },

  close: { position: "absolute", top: 54, left: 20, backgroundColor: "rgba(0,0,0,0.6)", padding: 10, borderRadius: 20 },
});






