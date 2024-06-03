// VideoList.js
import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNavBar from '../components/BottomNavBar';

const VideoList = ({ route }) => {
  const { sectionTitle } = route.params;
  const navigation = useNavigation();

  // Set up the state for the video list
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [videolist, setVideolist] = useState([
    {
      title: "title1",
      id: "video1",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
      likes: 3,
      notes: 3,
    },
    {
      title: "title2",
      id: "video2",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
      likes: 5,
      notes: 1,
    },
    {
      title: "title3",
      id: "video3",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
      likes: 8,
      notes: 2,
    },
  ]);
  const handleVideoPress = (video) => {
    // Navigate to the VideoPlayer screen
    navigation.navigate('VideoPlayer', { video});
  };

  const renderHeader = () => (
    <View>
      <View style={styles.lAHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.lABackButton}>←</Text>
        </TouchableOpacity>
        {!showSearchBar && (
          <Text style={styles.lAHeaderText}>{sectionTitle} </Text>
        )}
        <TouchableOpacity style={styles.lASearchButtonContainer} onPress={() => setShowSearchBar(!showSearchBar)}>
          <Ionicons name="search" style={styles.lASearchButton}/>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.lASearchFilterContainer} onPress={() => setsearchfilterVisible(true)}>
          <MaterialCommunityIcons name="dots-vertical" size= {30} style={styles.lAFilterIcon}/>
        </TouchableOpacity>        
      </View>
      {showSearchBar && (
        <View style={styles.aCSearchBarOverlay1}>
          <TextInput 
            style={styles.aCSearchInput} 
            placeholder="Search..."
            placeholderTextColor="#aaa"
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        
        <ScrollView contentContainerStyle={styles.paddingBottom}>
      <FlatList
        data={videolist}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
            {/* Thumbnail */}
            
            <View style={styles.videotext}>
              <View style={styles.logoandtitle}>
                {/* Logo and Logo Title */}
                <View style={styles.logoContainer}>
                  {/* Replace 'logo' with the actual image */}
                  <Image source={{ uri: item.logo }} style={styles.logo} />
                  <Text style={styles.logoTitle}>{item.logotitle}</Text>
                </View>

                <View>
                  {/* Video Title */}
                  <Text style={styles.videoTitle}>{item.title}</Text>
                  {/* Terms */}
                  <View style={styles.termsContainer}>
                    {item.term.map((term, index) => (
                      <TouchableOpacity key={index} style={styles.term}>
                        <Text style={styles.termText}>{term}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleVideoPress(item)}>
              <View style={styles.thumbnail} />
            </TouchableOpacity>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.likes} ♡ Like</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{item.notes} ✎ 筆記</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>📑 推薦</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>📥 推薦</Text>
                </TouchableOpacity>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />
      
       <Modal
        transparent={true}
        visible={searchfilterVisible}
        onRequestClose={() => setsearchfilterVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>搜尋篩選器</Text>
            <View style={styles.modalContent}>
              <View style={styles.modalItem}>
                <Text>排序方式</Text>
                <View style={styles.modalselect}>
                  <Text>相關性</Text>
                  <Ionicons
                    name="chevron-down-sharp"
                    size={25}
                    color={"grey"}
                  />
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>科目</Text>
                <View style={styles.modalselect}>
                  <Text>英文</Text>
                  <Ionicons
                    name="chevron-down-sharp"
                    size={25}
                    color={"grey"}
                  />
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>上載日期</Text>
                <View style={styles.modalselect}>
                  <Text>不限時間</Text>
                  <Ionicons
                    name="chevron-down-sharp"
                    size={25}
                    color={"grey"}
                  />
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>片長</Text>
                <View style={styles.modalselect}>
                  <Text>不限</Text>
                  <Ionicons
                    name="chevron-down-sharp"
                    size={25}
                    color={"grey"}
                  />
                </View>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonNo}
                onPress={() => setsearchfilterVisible(false)}
              >
                <Text style={styles.modalButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButtonYes}
                onPress={() => setsearchfilterVisible(false)}
              >
                <Text style={styles.modalButtonText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView> 
      
      <BottomNavBar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    
  },
  scrollViewContainer:{
    padding: 14,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  videoItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 5,
   
    
  },
  thumbnail: {
    width: 350,
    height: 200,
    marginHorizontal: 10,
    backgroundColor: 'grey', // Placeholder for thumbnail
    borderRadius: 25,
    borderColor: '#D3D3D3',
    borderWidth: 3,
  },
  videotext: {
    marginRight: 30,
    marginBottom: 15,
  },
  logoandtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 10, // Added margin to push the logo and title closer
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgrey', // Placeholder for logo
  },
  logoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  termsContainer: {
    flexDirection: 'row',
  },
  term: {
    paddingHorizontal: 10,
  },
  termText: {
    color: '#00A3A3',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    padding: 7,
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#00A3A3',
    fontSize: 12,
  },
  lAHeader:{ 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    width: '100%',
    },
    lABackButton: {
        fontSize: 24,
        color: '#48bcbc',
    },
    lAHeaderText: {
        textAlign: 'center',
        color: '#48bcbc',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    lASearchButtonContainer: {
        zIndex: 2,
        position: 'absolute',
        right: 55, 
    },
    lASearchButton: {
        fontSize: 24,
        color: '#48bcbc',
    },
    lASearchFilterContainer: {
        zIndex:-1,
    },
    lAFilterIcon:{
        marginLeft: 20,
        color:"#00A3A3",
    },
    aCSearchBarOverlay1: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: -3,
        paddingLeft: 120, // Adjust this value to leave space for the back button
        paddingTop: 13, // Adjust this value if needed to align the search bar with the header
        backgroundColor:'white',
        paddingRight: 50,
        zIndex: -1,
        flexDirection: 'row',
        alignItems: 'center',
      },
    aCSearchInput: {
        flex: 1,
        backgroundColor: '#ecf4f4',
        height: 45,
        borderWidth: 0, // Remove border width to avoid the line
        borderBottomWidth: 0, // Ensure bottom border is removed
        borderRadius: 20, // Apply high border radius for rounded corners
        borderColor: 'transparent', // Set border color to transparent
        paddingLeft: 20,
        paddingRight: 30, // Add padding to the right to make space for the icon
    },
    paddingBottom: {
        paddingBottom: 140,
        
    },
});

export default VideoList;
