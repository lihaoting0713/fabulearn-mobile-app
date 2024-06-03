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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar'; // Import the BottomNavBar component
import LanguageAwareness from "./LanguageAwareness";

function StudyPackage() {
  const navigation = useNavigation();

  const [showSearchBar, setShowSearchBar] = useState(false);

  const [subjectlist, setSubjectlist] = useState([
    { text: "中文", id: "subject1" },
    { text: "英文", id: "subject2" },
    { text: "數學", id: "subject3" },
    { text: "科學", id: "subject4" },
    { text: "共通能力", id: "subject5" },
  ]);

  const [videolist, setVideolist] = useState([
    {
      title: "title1",
      id: "video1",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
    },
    {
      title: "title2",
      id: "video2",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
    },
    {
      title: "title3",
      id: "video3",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>


        <FlatList
          data={videolist}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => 
            <>
        <View style={styles.top}>
          {showSearchBar ? (
            <View style={styles.searchBarContainer}>
              <TouchableOpacity onPress={() => setShowSearchBar(false)}>
                <Ionicons name="arrow-back" size={30} color="#00A3A3" />
              </TouchableOpacity>
              <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor="#999999"
              />
            </View>
          ) : (
            <>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={30}
                style={{ marginRight: 5, opacity: 0 }}
              />

              <Ionicons name="search" size={30} style={{ opacity: 0 }} />

              <View style={styles.titleContainer}>
                <Text style={styles.title}>影片庫</Text>
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

        

        <View style={styles.subjectContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.subjectContent}
          >
            <View style={styles.subject}>
              <View style={styles.subjectItemContainer}>
                <FlatList
                  data={subjectlist}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.subjectItem}>
                      <TouchableOpacity>
                      <View style={styles.circle}>{/* Add icon here */}</View>
                      </TouchableOpacity>
                      <Text style={styles.subjectText}>{item.text}</Text>
                    </View>
                  )}
                  horizontal
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
          </ScrollView>

          
        </View>
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

        <TouchableOpacity style={styles.workContainer} onPress={() => navigation.navigate('LanguageAwareness')}>
            <View style={styles.workItem}>
                <Image 
                    style ={styles.workIcon}
                    source={require('../pictures/Account Icon.png')}
                    />
                <Text style={styles.workLabel}>
                    {`Language\nAwareness`}
                </Text>
            </View>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.workContainer}>
            <View style={styles.workItem}>
                <Image 
                    style ={styles.workIcon}
                    source={require('../pictures/Account Icon.png')}
                    />
                <Text style={styles.workLabel}>
                    {`Language\nAwareness`}
                </Text>
            </View>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.workContainer}>
            <View style={styles.workItem}>
                <Image 
                    style ={styles.workIcon}
                    source={require('../pictures/Account Icon.png')}
                    />
                <Text style={styles.workLabel}>
                    {`Grammar`}
                </Text>
            </View>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.workContainer}>
            <View style={styles.workItem}>
                <Image 
                    style ={styles.workIcon}
                    source={require('../pictures/Account Icon.png')}
                    />
                <Text style={styles.workLabel}>
                    {`Reading and\nWriting`}
                </Text>
            </View>  
        </TouchableOpacity>

        <TouchableOpacity style={styles.workContainer}>
            <View style={styles.workItem}>
                <Image 
                    style ={styles.workIcon}
                    source={require('../pictures/Account Icon.png')}
                    />
                <Text style={styles.workLabel}>
                    {`Phrases, clauses\nand sentences`}
                </Text>
            </View>  
        </TouchableOpacity>

            </>
          }  
        />
      <BottomNavBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollView: {
    width: "100%",
    flex: 1,
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
    height: '11.5%',
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

});

export default StudyPackage;
