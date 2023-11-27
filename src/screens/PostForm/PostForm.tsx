import { Button, Text } from "@rneui/base";
import { Input, Icon } from "@rneui/themed";
import { useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { useToast } from "react-native-toast-notifications";

import { useCreatePostMutation } from "../../store/api/postsApi";

function PostForm({ navigation, route }) {
  const loggedInAs = useSelector((state: any) => state.auth.loggedInAs);
  const user = route?.params?.user || loggedInAs;
  const toast = useToast();
  const lastNameRef = useRef(null);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const [postText, setPostText] = useState("");
  const [createdBy, setCreatedBy] = useState(`${user?.firstName} ${user?.lastName}`);
  const [createdDate,
          setCreatedDate] = useState(new Date().toLocaleDateString());
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitPost = () => {
    console.log(`text: ${postText}, owner: ${createdBy}, date: ${createdDate}`);
    if (postText !== "") {
      setFeedback(`Hej ${loggedInAs.firstName} ${loggedInAs.lastName}, välkommen!`);
      setSubmitted(true);
      setTimeout(() => {
        setFeedback("");
      }, 3000);
      createPost({
        post: {
          postText,
          createdBy,
          createdDate,
        },
      })
        .then(() => {
          navigation.navigate("PostList"),
          toast.show(`Användaren ${loggedInAs.firstName} ${loggedInAs.lastName} skapade en post!`, {
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
      setFeedback("Fyll i texten");
      setTimeout(() => {
        setFeedback("");
      }, 3000);
      toast.show("Fyll i text", {
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
        <Text h4>{`${user?.firstName} ${user?.lastName}`}</Text>
        <SafeAreaView>
          <Input
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            onChangeText={setPostText}
            value={postText}
            disabled={isLoading}
            placeholder="Skriv ett inlägg"
            leftIcon={{ type: "font-awesome", name: "comment" }}
          />
          <Button
            title="Skapa ett inlägg"
            disabled={isLoading}
            loading={isLoading}
            onPress={submitPost}
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

export default PostForm;
