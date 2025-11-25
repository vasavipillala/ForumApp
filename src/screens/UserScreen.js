import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUsersById } from "../redux/reducer/userSlice";
import BackgroundColor from "../components/BackGroundColour";
import Skeleton from "../components/Skeleton";

export default function UserScreen({ route }) {
  const userId = route.params.userId;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.selectedUser);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getUsersById({ userId }));
  }, [userId]);

  if (loading || !user) {
    return (
      <BackgroundColor>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.headerCard}>
            <View style={{ alignItems: "center" }}>
              <Skeleton width={90} height={90} radius={45} />
              <Skeleton width={140} height={22} radius={6} style={{ marginTop: 18 }} />
              <Skeleton width={100} height={18} radius={6} style={{ marginTop: 10 }} />
            </View>
          </View>
          <View style={styles.card}>
            <Skeleton width={120} height={20} radius={6} style={{ marginBottom: 15 }} />
            <Skeleton width="80%" height={16} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton width="70%" height={16} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton width="60%" height={16} radius={6} />
          </View>
          <View style={styles.card}>
            <Skeleton width={100} height={20} radius={6} style={{ marginBottom: 15 }} />
            <Skeleton width="75%" height={16} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton width="60%" height={16} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton width="50%" height={16} radius={6} />
          </View>
          <View style={styles.card}>
            <Skeleton width={120} height={20} radius={6} style={{ marginBottom: 15 }} />
            <Skeleton width="70%" height={16} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton width="65%" height={16} radius={6} />
          </View>
        </ScrollView>
      </BackgroundColor>
    );
  }

  return (
    <BackgroundColor>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <Text style={styles.item}>📧 {user.email}</Text>
          <Text style={styles.item}>🌐 {user.website}</Text>
          <Text style={styles.item}>📞 {user.phone}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.item}>{user.company.name}</Text>
          <Text style={styles.subItem}>{user.company.catchPhrase}</Text>
          <Text style={styles.subItem}>{user.company.bs}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.item}>
            {user.address.street}, {user.address.suite}
          </Text>
          <Text style={styles.item}>
            {user.address.city} - {user.address.zipcode}
          </Text>
        </View>

      </ScrollView>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 38,
    paddingHorizontal: 16,
  },

  headerCard: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 18,
    elevation: 4,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },

  username: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },

  item: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },

  subItem: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
});
