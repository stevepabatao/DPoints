import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Coffee, Gift, Star } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePointsContext } from "@/context/PointsContext";

export default function Home() {
  const router = useRouter();
  const { totalPoints } = usePointsContext();

  const rewards = [
    {
      id: 1,
      title: "Free Coffee",
      pointsRequired: 100,
      icon: Coffee,
      code: "reward-1",
      gradient: ["#4DB6AC", "#81C784"], // mint-green gradient
    },
    {
      id: 2,
      title: "₱100 Voucher",
      pointsRequired: 200,
      icon: Gift,
      code: "reward-2",
      gradient: ["#FFD3A5", "#FD6585"], // warm peach-red gradient
    },
    {
      id: 3,
      title: "Star Bonus",
      pointsRequired: 350,
      icon: Star,
      code: "reward-3",
      gradient: ["#4FACFE", "#00F2FE"], // cool blue gradient
    },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <LinearGradient
        colors={["#00BFA5", "#00D4A3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerContainer}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>DPoints</Text>
            <Text style={styles.sub}>Welcome back — here’s your summary</Text>
          </View>

          <TouchableOpacity style={styles.profile}>
            <Ionicons name="person-circle-outline" size={58} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Points card */}
        <View style={styles.pointsWrapper}>
          <View style={styles.pointsCard}>
            <Text style={styles.pointsLabel}>Total Points</Text>
            <Text style={styles.pointsValue}>{totalPoints}</Text>
            <Text style={styles.pointsMeta}>
              Keep collecting — redeem in partner stores
            </Text>
          </View>
        </View>

        {/* Rewards Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          <TouchableOpacity onPress={() => router.push("/rewards-list" as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {rewards.map((r) => (
          <TouchableOpacity
            key={r.id}
            activeOpacity={0.9}
            onPress={() =>
              router.push({ pathname: `/reward/${r.id}`, params: { code: r.code } } as any)
            }
          >
            <LinearGradient
              colors={r.gradient as [string, string]} // ✅ tuple cast fixes TS2769
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.rewardCard}
            >
              <View style={styles.rewardContent}>
                <View
                  style={{
                    backgroundColor: "#fff", // white circle
                    borderRadius: 20,        // half of width/height for perfect circle
                    padding: 12,             // space between icon and circle edge
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <r.icon color="#0f172a" size={75} />
                </View>
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.rewardTitle}>{r.title}</Text>
                  <Text style={styles.rewardPoints}>{r.pointsRequired} pts required</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Scan Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/scan" as any)}
        accessibilityLabel="Scan QR"
      >
        <Ionicons name="qr-code-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F8F9",
  },
  headerContainer: {
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 16 : 60,
    paddingHorizontal: 20,
    paddingBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },
  sub: {
    color: "#E8FDF8",
    marginTop: 4,
    fontSize: 13,
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  pointsWrapper: {
    marginTop: -24,
    paddingHorizontal: 10,
  },
  pointsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  pointsLabel: { color: "#6b7280", fontWeight: "600" },
  pointsValue: {
    fontSize: 42,
    fontWeight: "900",
    marginTop: 6,
    color: "#0f172a",
  },
  pointsMeta: {
    color: "#6b7280",
    marginTop: 8,
    fontSize: 13,
  },
  sectionHeader: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
  },
  seeAll: {
    color: "#00BFA5",
    fontWeight: "700",
  },
  rewardCard: {
    //borderRadius: 16,
    //marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 50,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  rewardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rewardTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0f172a",
  },
  rewardPoints: {
    fontSize: 20,
    color: "#4b5563",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#00BFA5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00BFA5",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
});












