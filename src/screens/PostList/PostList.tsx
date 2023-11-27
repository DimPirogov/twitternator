import { Button } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import Icon  from "react-native-vector-icons/AntDesign"

import { useGetPostsQuery } from "../../store/api/postsApi";
import { Toast, useToast } from "react-native-toast-notifications";

function PostList({ navigation }) {
  const { data, refetch, isLoading } = useGetPostsQuery();
  let nr = 0;
  console.log(data);

  return (
    <View style={styles.parentContainer} >
        {isLoading ? (
          <Text>Loading ...</Text>
        ) : (
          <FlatList
            data={data}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            renderItem={({ item }) => (
              <ListItem key={item.id} >
                <ListItem.Content>
                  <ListItem.Title>
                    {item.postText}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                  Från {item.createdBy} den {item.createdDate}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
          />
        )}

      <Button
        style={styles.button}
        title="Ladda om"
        onPress={() => { refetch()}}
      />
      <Button
        style={styles.button}
        title="Go to Home"
        onPress={() => navigation.navigate("Twitternator")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 16,
    margin: 10,
    padding: 20,
  },
  button: {
    margin: 12,
  }
});

export default PostList;
