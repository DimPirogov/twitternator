import { Button } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItem } from "@rneui/themed";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import Icon  from "react-native-vector-icons/AntDesign"

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../store/api/usersApi";
import { Toast, useToast } from "react-native-toast-notifications";

function UserList({ navigation }) {
  const { data, refetch, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  let nr = 0;
  // console.log(data);

  return (
    <View>
      <View>
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
                  <ListItem.Title
                    onPress={() => {
                    navigation.navigate("UserInfo", { user: item });
                    }}
                  >
                    {`${item.firstName} ${item.lastName} `}
                    <Icon
                      name="login"
                      size={20}>
                    </Icon>
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Content>
                  <Icon.Button
                    name="idcard"
                    size={20}
                    onPress={() => navigation.navigate("UserEdit", { user: item })}
                  >Ändra</Icon.Button>
                </ListItem.Content>
                <ListItem.Content >
                  <Icon.Button
                    name='deleteuser'
                    backgroundColor="red"
                    size={20}
                    onPress={() => {deleteUser(item.id);
                      Toast.show(`Användaren ${item.firstName} ${item.lastName} är Raderad!`, {
                        type: "succes",
                        placement: "top",
                        duration: 4000,
                        animationType: "slide-in",
                      });
                    }}
                  ></Icon.Button>
                </ListItem.Content>
              </ListItem>
            )}
          />
        )}
      </View>
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
  button: {
    margin: 12,
  }
});

export default UserList;
