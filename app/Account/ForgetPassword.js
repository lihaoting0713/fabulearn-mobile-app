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

function ForgetPassword() {
  const [mail, setmail] = useState("");

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const requestrecovery = async (email) => {
    try {
      const url = "https://schools.fabulearn.net/api/recovery/request";
      const formData = new FormData();
      formData.append("platform", "bliss");
      formData.append("email", email);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("請檢查您的電子郵件以取回密碼");
      } else {
        alert("請檢查您的電子郵件是否正確");
      }
    }
    catch (error) {
      alert('請求密碼時發生錯誤');
    }
  }

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
            <Text style={styles.title}>取回密碼</Text>
            <View style={{ width: 40 }} />
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
            <TouchableOpacity style={styles.confirmButton} onPress={()=>{
                if(mail == ""){
                  alert("請輸入電子郵件");
                }
                else if(mail.indexOf("@") == -1 || mail.indexOf(".") == -1){
                  alert("請輸入有效的電子郵件");
                }
                else{
                requestrecovery(mail)
                }
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

export default ForgetPassword;
