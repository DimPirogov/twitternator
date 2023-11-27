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

import { useCreateUserMutation } from "../../store/api/usersApi";

function UserForm({ navigation }) {
  const toast = useToast();
  const lastNameRef = useRef(null);

  const [createUser, { isLoading }] = useCreateUserMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = () => {
    console.log(`firstName: ${firstName}, lastName: ${lastName}`);
    if (firstName !== "" && lastName !== "") {
      setFeedback(`Hej ${firstName} ${lastName}, välkommen!`);
      setSubmitted(true);
      setTimeout(() => {
        setFeedback("");
      }, 3000);
      createUser({
        user: {
          firstName,
          lastName,
        },
      })
        .then(() => {
          navigation.navigate("UserLists"),
          toast.show(`Användaren ${firstName} ${lastName} är skapad!`, {
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
            placeholder="Förnamn"
          />
          <Input
            ref={lastNameRef}
            returnKeyType="send"
            onSubmitEditing={() => submitHandler()}
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Efternamn"
          />
          <Button
            title="Skapa Användare"
            //title={i18n.t("CreateUser")}
            disabled={isLoading}
            loading={isLoading}
            onPress={submitHandler}
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

export default UserForm;
