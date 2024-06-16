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
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";




const StartChallenge = () => {

  const navigation = useNavigation();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [selectedCount, setSelectedCount] = useState(0);


  const handleVideoPress = (video) => {
    navigation.navigate('StartChallenge1', {challengeID}); // pass the ID to the next page, have not finished yet
  };

  const toggleMessageSelection = (id) => {
    setVideolist(videolist.map(item => {
      if(item.id ===id) { 
        const isSelected =!item.isSelected;
        setSelectedCount(prevCount => isSelected ? prevCount + 1 : prevCount -1);
        return {...item, isSelected};
    }
    return item;
  }));
};

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
      likes: 3,
      notes: 3,
      isSelected: false,
      challengeID: 2501
      
    },
    {
      title: "title2",
      id: "video2",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
      likes: 5,
      notes: 1,
      isSelected: false,
      challengeID: 2501
    },
    {
      title: "title3",
      id: "video3",
      logo: "",
      logotitle: "數學",
      term: ["#s1-term1", "#s1-term2", "#s1-term3"],
      likes: 8,
      notes: 2,
      isSelected: false,
      
    },
  ]);



  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.lAHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={20} marginLeft={10}/>  
          </TouchableOpacity>
              {!showSearchBar && (
                  <Text style={styles.lAHeaderText}>發起挑戰</Text>
              )}
              <TouchableOpacity style={styles.lASearchButtonContainer} onPress={() => setShowSearchBar(!showSearchBar)}>
                  <Ionicons name="search" style={styles.lASearchButton}/>
              </TouchableOpacity>  
              <TouchableOpacity style={styles.lASearchFilterContainer} onPress={() => setsearchfilterVisible(true)}>
                  <MaterialCommunityIcons name="dots-vertical" size= {30} style={styles.lAFilterIcon}/>
              </TouchableOpacity>
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

        <TouchableOpacity style ={styles.resetButton}>
              <Text style = {styles.resetButtonText}>重置</Text>
        </TouchableOpacity>

      <FlatList
        data={videolist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
            <TouchableOpacity style={styles.selectionIcon} onPress={() => toggleMessageSelection(item.id)}>
              <View style={styles.iconContainer}>
                  <View style={[styles.iconCircle, item.isSelected && styles.circleSelected]}>
                      {item.isSelected && <Octicons name="check" size={20} color="#00A3A3" />}
                  </View>
              </View>
            </TouchableOpacity>

            {/* Thumbnail */}
            <TouchableOpacity>
              <View style={styles.thumbnail} />
            </TouchableOpacity>

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

      <View style={styles.bottomButtonContainer}>
        <Text style= {styles.confirmMessage}>已选 {selectedCount} 个</Text>

        <View style={styles.bottomButtons}>
          <TouchableOpacity>
            <Text style = {styles.bottomButtonPreviousStep}>上一步</Text>
          </TouchableOpacity>
          <TouchableOpacity style= {styles.nextStepButton} onPress={()=>navigation.navigate('StartChallenge1')}>
            <Text style = {styles.bottomButtonNextStep}>下一步 (1/3)</Text>
          </TouchableOpacity>
        </View>


      </View>
    </View>



  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  
    scrollViewContent: {
      paddingBottom: 100,
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
      fontSize: 18,
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
      right: 0,
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
    subjectContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 15,
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 20,
      padding: 5,
    },
    selectionIcon: {
      alignSelf: 'flex-start',
      marginBottom: -20,
      zIndex: 1,
  },
  iconContainer: {
      position: 'relative',
  },
  iconCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#d8dad9',
      justifyContent: 'center',
      alignItems: 'center',
  },
  circleSelected: {
      backgroundColor: '#fff',
  },

    resetButton:{
      alignSelf:'flex-end',
      marginRight: 10,
      marginBottom: 15,
    },
    resetButtonText:{
      color:'#73cfcf',
      fontWeight: 'bold',
      fontSize: 18,
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
      marginBottom: 20,
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
    bottomButtonContainer: {
      width: '100%',
      height:'15%',
      backgroundColor: '#48bcbc',
      alignItems: 'center',
    },

    confirmMessage: {
      marginTop: 10,
      color: 'white',
    },

    bottomButtons: {
      flexDirection: 'row',
      gap: 20,
      marginTop: 20,
      marginBottom: 15,
    },

    bottomButtonNextStep: {
      color: 'white',
      fontSize: 15,
      backgroundColor: '#f8c42c',
      borderRadius: 25,
      paddingHorizontal: 50,
      paddingVertical: 12,
    },

    bottomButtonPreviousStep: {
      fontSize: 15,
      color:'white',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,

    },
    

});

export default StartChallenge;