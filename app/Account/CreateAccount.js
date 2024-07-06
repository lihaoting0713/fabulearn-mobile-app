import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function CreateAccount() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [mail, setmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const register = async (mail,first_name,last_name) => {
    try{ 
    const url = "https://schools.fabulearn.net/api/register";
    const form = new FormData();
    form.append("platform", "bliss")
    form.append("email", mail);
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    const response = await fetch(url, {
      method: "POST",
      body: form,
    });
    const data = await response.json();
    console.log(data);
    if(data.success==true){
      alert("註冊成功");
      navigation.goBack();
    }
    else{
      alert(data.error);
    }
  }
  catch (error) {
    console.error(error);
    alert("註冊失敗");
  }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={40} color="#00A3A3" />
            </TouchableOpacity>
            <Text style={styles.title}>創建帳號</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>名稱</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={first_name}
                onChangeText={setfirst_name}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>姓氏</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={last_name}
                onChangeText={setlast_name}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>郵件</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={mail}
                onChangeText={setmail}
              />
            </View>
          </View>


          <View style={styles.buttonscontainer}>
            <TouchableOpacity style={styles.resetButton}>
              <Text style={styles.resetButtonText}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={()=>{
              register(mail,first_name,last_name);
            }}>
              <Text style={styles.confirmButtonText}>確定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F7FFFE",
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  content: {
    alignItems: "center",
    width: "100%",
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    color: "#00A3A3",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  buttonscontainer: {
    width: "100%",
    marginTop: 100,
    flexDirection: "row",
  },
  resetButton: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: "#fd5c63",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    flex: 1,
    width: "100%",
    height: 50,
    backgroundColor: "#00A3A3",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateAccount;
