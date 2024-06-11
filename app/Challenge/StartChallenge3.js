import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';

const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;

const StartChallenge3 = () => {

  const navigation = useNavigation();
  //const { id } = route.params; // fetch the ID from previous page


  
  const [users, setUsers] = useState([
    { id: '1', name: '陳小明', isSelected: false },
    { id: '2', name: '陳小明', isSelected: false },
    { id: '3', name: '陳小明', isSelected: false },
    { id: '4', name: '陳小明', isSelected: false },
    { id: '5', name: '陳小明', isSelected: false },
    { id: '6', name: '陳小明', isSelected: false },
    { id: '7', name: '陳小明', isSelected: false },
    { id: '8', name: '陳小明', isSelected: false },
    { id: '9', name: '陳小明', isSelected: false },
    { id: '10', name: '陳小明', isSelected: false },
    { id: '11', name: '陳小明', isSelected: false },
    { id: '12', name: '陳小明', isSelected: false },
  ]);


  



  return(
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.finishHeading}>完成</Text>
        <Text style={styles.finishMessage}>你已成功發出挑戰</Text>
        <View style={styles.zCCardUserIcons}>
            {Array(6).fill().map((_, index) => (
                <Image key={index} source={require('../pictures/Account Icon Black.png')} style={styles.zCProfileImage} />
            ))}
        </View>
        <Text style={styles.finishUsers}>及其它26人</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={()=>navigation.navigate('ChallengeScreen')}>
            <Text style={styles.confirmButtonText}>確認</Text>
        </TouchableOpacity>
      </View>
      <BottomNavBar />
    </View>



  )
};


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  finishHeading:{
    textAlign:'center',
    marginTop: 30,
    color:'#45bfbf',
    fontSize: 18,
    fontWeight:'bold'
  },
  finishMessage: {
    textAlign:'center',
    marginTop: 200,
    color:'#45bfbf',
    fontSize: 30,
    fontWeight:'bold',
  },
  zCCardUserIcons: {
    flexDirection: 'row',
    alignSelf:'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 30,
},
zCProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: -30,
    borderWidth: 2,
    borderColor: '#fffcec',
},
finishUsers:{
  alignSelf:'center',
  marginTop: 20,
},
confirmButton:{
  width: '25%',
  paddingVertical: 13,
  paddingHorizontal: 30,
  backgroundColor:'#45bfbf',
  alignSelf: 'center',
  borderRadius: 20,
  marginTop: 30,
},

confirmButtonText:{
  textAlign:'center',
  color: 'white',
},


});

export default StartChallenge3;