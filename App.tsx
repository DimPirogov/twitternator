import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import UserForm from "./src/screens/UserForm/UserForm";
import PostForm from "./src/screens/PostForm/PostForm";
import { UserInfo } from "./src/screens/UserInfo/UserInfo";
import UserList from "./src/screens/UserList/UserList";
import PostList from "./src/screens/PostList/PostList";
import { persistor, store } from "./src/store/store";
import UserEdit from "./src/screens/UserEdit/UserEdit";
import "./src/firebase-config";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Twitternator</Text>
      <Button
        title="Go to UserList"
        onPress={() => navigation.navigate("UserLists")}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserListStack = createNativeStackNavigator();

const UserListStackScreen = () => {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
      <UserListStack.Screen name="UserEdit" component={UserEdit} />
      <UserListStack.Screen name="PostForm" component={PostForm} />
    </UserListStack.Navigator>
  );
};

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Twitternator"
          component={HomeScreen}
        />
        <Tab.Screen
          name="UserLists"
          component={UserListStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="PostList"
          component={PostList}
        />
        <Tab.Screen name="UserForm" component={UserForm} />
        {loggedInAs && (
          <Tab.Screen
            name="UserInfo"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationWrapper />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
