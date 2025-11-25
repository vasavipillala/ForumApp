import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../redux/reducer/userSlice";
import { getPosts } from "../redux/reducer/postSlice";
import BackgroundColor from "../components/BackGroundColour";
import Skeleton from "../components/Skeleton";

export default function PostsListScreen({ navigation }) {
  const dispatch = useDispatch();

  const { users, loading: usersLoading } = useSelector((state) => state.user);
  const { posts, loading: postsLoading } = useSelector((state) => state.post);

  const loading = usersLoading || postsLoading;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;

    const lower = search.toLowerCase();

    return posts.filter((post) => {
      const user = users.find((u) => u.id === post.userId);
      return (
        post.title.toLowerCase().includes(lower) ||
        user?.username?.toLowerCase().includes(lower)
      );
    });
  }, [search, posts, users]);

  const getUserName = (id) => {
    const user = users.find((u) => u.id === id);
    return user ? user.username : "Unknown";
  };

  // ⭐ Skeleton UI while loading
  if (loading) {
    return (
      <BackgroundColor>
        <View style={styles.container}>
          <Skeleton width="60%" height={28} radius={8} style={{ marginBottom: 20 }} />

          <Skeleton height={45} radius={10} style={{ marginBottom: 20 }} />

          {/* 6 skeleton cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.card}>
              <Skeleton width={120} height={16} radius={6} style={{ marginBottom: 10 }} />
              <Skeleton width="90%" height={20} radius={6} />
            </View>
          ))}
        </View>
      </BackgroundColor>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("User", { userId: item.userId })}
      >
        <Text style={styles.username}>@{getUserName(item.userId)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("Post", {
            postId: item.id,
            userId: item.userId,
            userName: getUserName(item.userId),
          })
        }
      >
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BackgroundColor>
      <StatusBar backgroundColor={"white"} />

      <View style={styles.container}>
        <Text style={styles.header}>Forum Posts</Text>

        <TextInput
          placeholder="Search posts or username..."
          placeholderTextColor="#999"
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 25 }}
        />
      </View>
    </BackgroundColor>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 38,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#222",
  },

  search: {
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  username: {
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    lineHeight: 22,
  },
});
