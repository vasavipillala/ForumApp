import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUsersById } from "../redux/reducer/userSlice";
import { getPostsById, getComments } from "../redux/reducer/postSlice";
import BackgroundColor from "../components/BackGroundColour";
import Skeleton from "../components/Skeleton";  

export default function PostScreen({ route, navigation }) {
  const { userId, postId } = route.params;
  const userName = route.params.userName;
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state.post.selectedPost);
  const comments = useSelector((state) => state.post.getComments);
  const singleUser = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    dispatch(getPostsById({ postId }));
    dispatch(getUsersById({ userId }));
    dispatch(getComments({ postId }));
  }, []);
  if (!singlePost || !singleUser || comments?.length === 0|| null) {
    return (
      <BackgroundColor>
        <View style={styles.container}>
          <View style={styles.postCard}>
            <View style={styles.row}>
              <Skeleton width={46} height={46} radius={23} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Skeleton width={120} height={14} />
                <Skeleton width={"85%"} height={16} style={{ marginTop: 6 }} />
              </View>
            </View>
            <Skeleton width={"100%"} height={14} style={{ marginTop: 8 }} />
            <Skeleton width={"95%"} height={14} style={{ marginTop: 8 }} />
            <Skeleton width={"90%"} height={14} style={{ marginTop: 8 }} />
          </View>
          <Skeleton width={150} height={18} style={{ marginBottom: 16 }} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.commentBubble}>
              <Skeleton width={"70%"} height={14} />
              <Skeleton width={"100%"} height={14} style={{ marginTop: 6 }} />
              <Skeleton width={"95%"} height={14} style={{ marginTop: 6 }} />
              <Skeleton width={110} height={12} style={{ marginTop: 10 }} />
            </View>
          ))}
        </View>
      </BackgroundColor>
    );
  }
  return (
    <BackgroundColor>
      <View style={styles.container}>
        <View style={styles.postCard}>
          <View style={styles.row}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {singleUser.username?.charAt(0).toUpperCase() ||
                  userName?.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("User", { userId })}
              >
                <Text style={styles.username}>
                  @{singleUser.username || userName}
                </Text>
              </TouchableOpacity>
              <Text style={styles.postTitle}>{singlePost.title}</Text>
            </View>
          </View>
          <Text style={styles.postBody}>{singlePost.body}</Text>
        </View>
        <Text style={styles.heading}>Comments</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentBubble}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentText}>{item.body}</Text>
              <Text style={styles.commentEmail}>{item.email}</Text>
            </View>
          )}
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
  postCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    elevation: 3,
    marginBottom: 22,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#007AFF22",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#007AFF",
  },
  username: {
    color: "#007AFF",
    fontSize: 15,
    fontWeight: "700",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 2,
    color: "#222",
  },
  postBody: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginTop: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  commentBubble: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    elevation: 2,
    marginBottom: 14,
  },
  commentName: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
    color: "#333",
  },
  commentText: {
    color: "#555",
    lineHeight: 20,
    paddingVertical: 2,
  },
  commentEmail: {
    color: "#007AFF",
    fontSize: 13,
    marginTop: 6,
  },
});
