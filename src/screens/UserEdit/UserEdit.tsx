import { Button } from "@rneui/base";
import { Input } from "@rneui/themed";
import { useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
//import i18n from "../../../i18n";

import { useUpdateUserMutation, useGetUserQuery } from "../../store/api/usersApi";

function UserEdit({ route, navigation }) {
  const toast = useToast();
  const lastNameRef = useRef(null);
  const user = route?.params?.user

  const {data, isLoading } = useGetUserQuery(user.id);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const submitChange = () => {
    console.log(`firstName: ${firstName}, lastName: ${lastName}`);
    if (firstName !== "" && lastName !== "") {
      setFeedback(`Hej ${firstName} ${lastName}, välkommen!`);
      setSubmitted(true);
      setFirstName("");
      setLastName("");
      const id = user.id;
      setTimeout(() => {
        setFeedback("");
      }, 3000);
      updateUser({
        user: {
          id,
          firstName,
          lastName,
        },
      })
        .then(() => {
          navigation.navigate("UserLists"),
          toast.show(`Användaren ${firstName} ${lastName} är ändrad!`, {
            type: "succes",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          });
        })
        .catch((error) => {
          toast.show(error, { type: "danger" });
        });
    } else {
      setSubmitted(false);
      setFeedback("Fyll i rutorna");
      setTimeout(() => {
        setFeedback("");
      }, 3000);
      toast.show("Fyll i rutorna", {
        type: "warning",
        placement: "top",
        duration: 4000,
        animationType: "slide-in",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <View style={styles.parentContainer}>
        <Text>UserForm</Text>
        <SafeAreaView>
          <Input
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            onChangeText={setFirstName}
            value={firstName}
            disabled={isLoading}
            placeholder={user.firstName}
          />
          <Input
            ref={lastNameRef}
            returnKeyType="send"
            onSubmitEditing={() => submitChange()}
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder={user.lastName}
          />
          <Button
            title="Ändra Användare"
            //title={i18n.t("CreateUser")}
            disabled={isLoading}
            loading={isLoading}
            onPress={submitChange}
          />
          <Text style={{ color: submitted ? "#3c425c" : "#ed4e59" }}>
            {feedback}
          </Text>
        </SafeAreaView>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Twitternator")}
        />
      </View>
    </TouchableWithoutFeedback>
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
  input: {
    height: 40,
    margin: 12,
    padding: 10,
  },
});

export default UserEdit;
