import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePointsContext } from "@/context/PointsContext";
import RewardCard from "@/components/RewardCard";
import { Coffee, Gift, Star } from "lucide-react-native";

const REWARDS = [
  {
    id: "1",
    title: "Free Coffee",
    pointsRequired: 100,
    description: "Enjoy a freshly brewed coffee — on us!",
    icon: Coffee,
    imageBackground: "https://images.unsplash.com/photo-1761834614769-0efd23031c8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"
  },
  {
    id: "2",
    title: "₱100 Voucher",
    pointsRequired: 200,
    description: "Get ₱100 off on partner stores.",
    icon: Gift,
    imageBackground: "https://images.unsplash.com/photo-1761898484520-311e0556a99d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774"
  },
  {
    id: "3",
    title: "Star Bonus",
    pointsRequired: 350,
    description: "Unlock an exclusive premium reward.",
    icon: Star,
    imageBackground: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
];

export default function RewardDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { totalPoints, usePoints } = usePointsContext();
  const reward = REWARDS.find((r) => r.id === id);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleUsePoints = () => {
    if (!reward) return;

    const ok = usePoints(reward.pointsRequired);
    if (ok) {
      Alert.alert("🎉 Redeemed!", `You used ${reward.pointsRequired} pts for ${reward.title}`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert(
        "Not enough points",
        `You need ${reward.pointsRequired} pts but only have ${totalPoints} pts`
      );
    }
  };

  if (!reward) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16, color: "#333" }}>Reward not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backTextBtn}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <RewardCard
          title={reward.title}
          pointsRequired={reward.pointsRequired}
          description={reward.description}
          icon={reward.icon}
          qrValue={`USER123|REWARD|${reward.id}|${Date.now()}`}
          onUsePoints={handleUsePoints}
          onScan={() => router.push("/scan" as any)}
          index={parseInt(reward.id, 10) - 1}
          imageUrl={reward.imageBackground}
        />
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8F9",
  },
  back: {
    marginTop: Platform.OS === "android" ? 50 : 70,
    marginLeft: 18,
  },
  backText: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 16,
  },
  scrollContent: {
    paddingBottom: 60,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  backBtn: {
    marginTop: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  backTextBtn: {
    fontWeight: "600",
    color: "#007AFF",
  },
});






