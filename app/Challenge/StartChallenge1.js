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

const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;

const StartChallenge1 = () => {

  const navigation = useNavigation();
  //const { id } = route.params; // fetch the ID from previous page

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [selectedCount, setSelectedCount] = useState(0);

 

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

  const challengeData = [
    {
      id: 2501,
      name: '小明',
      challenge: '挑戰：10日數學自習',
      details: '限時：1日    10條H/日',
      dateStart: '12 / 12 / 2023',
      dateEnd: '12 / 12 / 2023',
      progress: 70 
    },
    {
      id: 2502,
      name: '小明',
      challenge: '挑戰：10日數學自習',
      details: '限時：1日 10條H/日',
      dateStart: '12 / 12 / 2023',
      dateEnd: '12 / 12 / 2023',
      progress: 50 
    },
    {
      id: 2503,
      name: '小明',
      challenge: '挑戰：10日數學自習',
      details: '限時：1日 10條H/日',
      dateStart: '12 / 12 / 2023',
      dateEnd: '12 / 12 / 2023',
      progress: 30 
    },
    {
      id: 2504,
      name: '小明',
      challenge: '挑戰：10日數學自習',
      details: '限時：1日 10條H/日',
      dateStart: '12 / 12 / 2023',
      dateEnd: '12 / 12 / 2023',
      progress: 90 
    }
  ];

  const item = challengeData.find(challenge => challenge.id === 2504); // fetch the id from previous page



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

          <View key={item.id} style={styles.aCCard}>
              <View style={styles.aCCardHeader}>

                  <View style={styles.aCCardTitle2}>      
                    <Text style={[styles.aCSubtitle, isSmallScreen && styles.aCSubtitleSmall]}>{item.challenge}</Text>
                    <Text style={[styles.aCDetails, isSmallScreen && styles.aCDetailsSmall]}>{item.details}</Text>
                  </View>
              
                <View style={styles.aCChancesContainer}>
                    <Text style={[styles.aCChancesText, isSmallScreen && styles.aCChancesTextSmall]}>機會</Text>
                    <View style={styles.aCHeartsContainer}>
                        <Image source={require('../pictures/Heart Full.png')} style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]} />
                        <Image source={require('../pictures/Heart Full.png')} style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]} />
                        <Image source={require('../pictures/Heart Empty.png')} style={[styles.aCHeartIcon, isSmallScreen && styles.aCHeartIconSmall]} />
                    </View>
                </View>
              </View>
           
          </View>
          
    
      <FlatList
        data={videolist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
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
          <TouchableOpacity style= {styles.nextStepButton} onPress={()=> navigation.navigate('StartChallenge2')}>
            <Text style = {styles.bottomButtonNextStep}>下一步 (2/3)</Text>
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
  aCCard: {
    backgroundColor: '#e8fdf9',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    width: width * 0.91,
    alignSelf:'center',
},

aCCardHeader: {
  flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,     
},


aCCardTitle1: {
    marginRight: 20,
    flexDirection: 'column',  // Keep column to stack vertically
    alignItems: 'center',  // Center horizontally
    width: '18%',       
},

aCProfileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginTop:10,
},

aCCardTitle2: {
   
    flexDirection: 'column',  // Keep column to stack vertically
    alignItems: 'flex-start',  // Center horizontall             
},

aCTitle: {
    fontSize: 16,
    fontWeight: 'bold',    
},
aCTitleSmall: {
    fontSize: 14,
    fontWeight: 'bold',
  },
aCSubtitle: {
    fontSize: 19,
    color: '#45bfbf',
    padding: 5,
    fontWeight: 'bold',
},   
aCSubtitleSmall: {
    fontSize: 17,
    color: '#45bfbf',
    padding: 5,
    fontWeight: 'bold',
},   
aCDetails: {
    fontSize: 12,
    color: '#777',
    padding: 5,
    fontWeight: 'bold',
},
aCDetailsSmall: {
    fontSize: 11,
    color: '#777',
    padding: 5,
    fontWeight: 'bold',
},
aCChancesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
},
aCChancesText: {
    fontSize: 13,
    color: '#555',
    marginRight: 5,
},
aCChancesTextSmall: {
    fontSize: 12,
    color: '#555',
    marginRight: 5,
},
aCHeartsContainer: {
    flexDirection: 'row',
    width: '19%',
},
aCHeartIcon: {
    width: 18,
    height: 16,
    marginLeft:2,
},   
aCHeartIconSmall: {
    width: 15,
    height: 13,
    marginLeft:2,
},  
aCCardActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: -40,
    marginTop: -5,
    marginBottom: 10,
},
aCRejectButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 35,
    marginRight:5,
    
},
aCDetailsButton: {
    backgroundColor: '#4DB6AC',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginLeft:5,
},

aCButtonText: {
    color: '#fff',
    fontSize: 14,
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

export default StartChallenge1;