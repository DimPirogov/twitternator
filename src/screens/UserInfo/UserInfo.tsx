import { Button, Text } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { logIn, logOut } from "../../store/slices/authSlice";

export const UserInfo = ({ navigation, route }) => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const user = route?.params?.user || loggedInAs;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: any) => state.auth.loggedInAs);

  return (
    <>
      <LinearGradient
        colors={["#FB9800", "#F44336"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.2, y: 0 }}
        style={styles.container}
      >
        <View style={styles.infoContainer}>
          <Text h4>{`${user?.firstName} ${user?.lastName}`}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {loggedInAs?.id === user.id ? (
            <>
              <Button onPress={() => dispatch(logOut())} color="error">
                Logga ut
              </Button>
              <Button onPress={() => navigation.navigate("PostForm", { user: user })}>
                Skriv ett inlägg
              </Button>
            </>
          ) : (
            <>
              <Button onPress={() => dispatch(logIn(user))}>Logga in</Button>
            </>
          )}
        </View>
        <Text>Inloggad som: {loggedInUser?.firstName}</Text>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 36,
  },
  infoContainer: {
    marginBottom: 24,
  },
  actionsContainer: {
    marginBottom: 24,
  },
});
