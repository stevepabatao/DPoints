import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";

// ✅ Type for the icon component
type IconType = React.ComponentType<{ size?: number; color?: string }>;

interface Props {
  title: string;
  pointsRequired: number;
  description: string;
  icon: IconType;
  qrValue?: string;
  onUsePoints?: () => void;
  onScan?: () => void;
  index?: number;
  imageUrl?: string; // ✅ Add image URL
}

const gradients: readonly [string, string][] = [
  ["#4DB6AC", "#81C784"],
  ["#FFD3A5", "#FD6585"],
  ["#00BFA5", "#1DE9B6"],
  ["#FF6B6B", "#FFD93D"],
  ["#43C6AC", "#191654"],
  ["#667EEA", "#764BA2"],
];

export default function RewardCard({
  title,
  pointsRequired,
  description,
  icon: Icon,
  qrValue,
  onUsePoints,
  onScan,
  index = 0,
  imageUrl,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const shineAnim = useRef(new Animated.Value(-1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 4500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const translateX = shineAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-300, 300],
  });

  const colors = gradients[index % gradients.length];

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touch}
      >
        <View style={styles.cardWrapper}>
          <ImageBackground
            source={{ uri: imageUrl }}
            style={[styles.card, { alignItems: "center", justifyContent: "center" }]}
            imageStyle={{ borderRadius: 20 }}
          >
            {/* Gradient overlay */}
            <LinearGradient
              colors={colors.map(c => c + "99") as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
            />
            <View style={styles.glassOverlay} />

            {/* Icon */}
            <View style={styles.iconWrap}>
              <Icon size={36} color="#fff" />
            </View>

            {/* Title & Points */}
            <View style={[styles.info, { alignItems: "center", marginBottom: 8 }]}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.sub}>{pointsRequired} pts</Text>
            </View>

            {/* Description */}
            <Text style={[styles.sub, { marginBottom: 16, textAlign: "center" }]}>
              {description}
            </Text>

            {/* QR Code */}
            {qrValue && (
              <View style={styles.qrWrapper}>
                <QRCode value={qrValue} size={140} />
              </View>
            )}

            {/* Buttons */}
            <TouchableOpacity style={styles.primary} onPress={onUsePoints}>
              <Text style={styles.primaryText}>Use Points</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondary} onPress={onScan}>
              <Text style={styles.secondaryText}>Scan to Earn</Text>
            </TouchableOpacity>

            {/* Shine Animation */}
            <Animated.View style={[styles.shine, { transform: [{ translateX }] }]}>
              <LinearGradient
                colors={["rgba(255,255,255,0)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touch: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  cardWrapper: {
    borderRadius: 20,
    overflow: "hidden",
  },
  card: {
    padding: 18,
    borderRadius: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.15 : 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    position: "relative",
    width: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  info: { flex: 1, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700", color: "#fff" },
  sub: { fontSize: 18, color: "#E0F7F3", marginTop: 4, fontWeight: "500" },
  qrWrapper: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  primary: {
    marginTop: 12,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  primaryText: { color: "#007AFF", fontWeight: "700", fontSize: 16 },
  secondary: {
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  secondaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  shine: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
});














