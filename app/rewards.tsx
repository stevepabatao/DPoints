// app/rewards.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const rewards = [
  { id: "1", title: "Free Coffee", points: 50, description: "Enjoy a freshly brewed coffee." },
  { id: "2", title: "Movie Ticket", points: 100, description: "Watch a movie for free." },
  { id: "3", title: "Shopping Voucher", points: 150, description: "₱500 voucher at partner stores." },
  { id: "4", title: "10% Off Coupon", points: 120, description: "10% off for purchases above ₱500." },
];

export default function RewardsList() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Available Rewards</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={rewards}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/reward/${item.id}` as never)}>
            <Ionicons name="gift-outline" size={34} color="#5A67D8" />
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
            <Text style={styles.points}>{item.points} pts</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { marginTop: 60, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "700" },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8F8FF", borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6 },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardDesc: { fontSize: 13, color: "#666", marginTop: 4 },
  points: { fontWeight: "700", color: "#5A67D8" },
});

