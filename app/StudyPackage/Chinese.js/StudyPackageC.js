import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../../components/BottomNavBar'; // Import the BottomNavBar component
import StudyPackageNavBar from '../StudyPackageNavBar';
import { SvgUri } from "react-native-svg";


function StudyPackageC() {
  const navigation = useNavigation();

  const [showSearchBar, setShowSearchBar] = useState(false);
 

 
 

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollViewContent}>
      <View style={styles.top}>
        {showSearchBar ? (
          <View style={styles.searchBarContainer}>
            <TouchableOpacity onPress={() => setShowSearchBar(false)}>
              <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={10}/>
            </TouchableOpacity>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor="#999999"
            />
          </View>
        ) : (
          <>
            <Ionicons name="search" size={30} style={{ opacity: 0 }} />

            <View style={styles.titleContainer}>
              <Text style={styles.title}>學習包</Text>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() => setShowSearchBar(true)}
                style={styles.searchIcon}
              >
                <Ionicons name="search" size={30} color="#00A3A3" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setsearchfilterVisible(true)}>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <StudyPackageNavBar/>
       

        <View style={styles.progressContainer}>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>已觀看影片</Text>
                <Text style={styles.statValue}>10/250</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statLabel}>已完成練習</Text>
                <Text style={styles.statValue}>60/300</Text>
            </View>
            <Text style={styles.detailLink}>詳情</Text>
        </View>

      
        
        <View>

        <TouchableOpacity style={styles.workContainer} onPress={() => navigation.navigate('Writing')} >
              <View style={styles.workItem}>
                  <Image 
                      style ={styles.workIcon}
                      source={require('../../pictures/Account Icon.png')}
                      />
                  <Text style={styles.workLabel}>
                      {`寫作`}
                  </Text>
              </View>  
          </TouchableOpacity>



          <TouchableOpacity style={styles.workContainerLast} onPress={() => navigation.navigate('Reading')}>
              <View style={styles.workItem}>
                  <Image 
                      style ={styles.workIcon}
                      source={require('../../pictures/Account Icon.png')}
                      />
                  <Text style={styles.workLabel}>
                      {`閱讀`}
                  </Text>
              </View>  
          </TouchableOpacity>
          

        </View>
      </ScrollView>
      <BottomNavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollViewContent: {
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00A3A3",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreIcon: {
    marginLeft: 5,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginLeft: 10,
  },
  subjectContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  subjectContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  subject: {
    width: 400,
    height: 120,
    backgroundColor: "#20B2AA",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  subjectItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subjectItem: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    marginBottom: 8,
  },
  selectedCircle: {
    borderColor: 'red', // or any color to highlight
    borderWidth: 4,
  },
  subjectText: {
    // Your styles here
  },
  selectedText: {
    color: 'blue', // or any color to highlight
  },
  subjectText: {
    marginTop: 5,
    fontSize: 12,
    color: "white",
  },
  videoItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  thumbnail: {
    width: 350,
    height: 200,
    marginHorizontal: 10,
    backgroundColor: "grey", // Placeholder for thumbnail
    borderRadius: 25,
    borderColor: "#D3D3D3",
    borderWidth: 3,
  },
  videotext: {
    marginRight: 30,
  },
  logoandtitle: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginRight: 10, // Added margin to push the logo and title closer
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgrey", // Placeholder for logo
  },
  logoTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  termsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  term: {
    paddingHorizontal: 10,
  },
  termText: {
    color: "#00A3A3",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalContent: {
    width: "100%",
    marginBottom: 20,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalselect: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButtonNo: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fd5c63",
    marginHorizontal: 10,
    borderRadius: 30,
  },
  modalButtonYes: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#00A3A3",
    marginHorizontal: 10,
    borderRadius: 30,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  progressContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#47c3c3',
    padding: 20,
    borderRadius: 10,
    margin: 15,
  },
  statItem: {
    alignItems: 'flex-start',
},
statLabel: {
    fontSize: 14,
    color: '#ffffff',
},
statValue: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
},
detailLink: {
    fontSize: 14,
    color: '#ffffff',
},
workContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffcec',
    padding: 20,
    borderRadius: 10,
    height: '22%',
    margin: 15,
  },

  workItem: {
    flexDirection:'row',
    alignItems: 'center',
},
workIcon: {
    width: 40,
    height: 40,
},
workLabel: {
    fontSize: 20,
    color: '#47c3c3',
    fontWeight:'bold',
    padding: 10,
    marginLeft: 10,
},
workContainerLast:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fffcec',
  padding: 20,
  borderRadius: 10,
  height: '22%',
  margin: 15,
  marginBottom:200,
 
},

});

export default StudyPackageC;
