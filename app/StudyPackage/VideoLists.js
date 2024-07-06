// VideoList.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    Keyboard,
    Platform
    
  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import BottomNavBar from '../components/BottomNavBar';
import axios from 'axios'; 

const VideoList = ({ route }) => {
  const { videoId } = route.params;
  const { topic } = route.params;
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [modalVisible, setModalVisible] = useState(false);
  const [videoListsItems,setVideoListsItems] = useState([]);
  const [packageDetails,setPackageDetails] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchdate,setsearchdate] = useState(null)
  const [searchsort,setsearchsort] = useState("name");
  const [searchsubject,setsearchsubject] = useState("")
  const [searcherfilter,setSearcherfilter] = useState(false);
  const [searchlength,setsearchlength] = useState(null)
  const [searchtext,setSearchtext] = useState("")
  const [newhashtags, setNewhashtags] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [openhashtagmodal, setOpenhashtagmodal] = useState(false);
  const pickerRef = useRef();
  const [originalVideoListsItems, setOriginalVideoListsItems] = useState([]);
  const {PREVIOUSHASHTAG} = route.params
  const [previoushashtag, setPrevioushashtag] = useState(PREVIOUSHASHTAG)
  const [previoushashtagbackbutton, setPrevioushashtagbackbutton] = useState(false)
  const [hashtags, setHashtags] = useState([]);
  const [isloading, setIsloading] = useState(false);



  const FetchVideoListsItems = async (videoId) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoId}/related`;
      console.log('Making request to:', url);
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        const packageDetails = data.data;
        const items = Object.values(data.data.videos_in_package);
        setOriginalVideoListsItems(items); 
        setVideoListsItems(items);
        setPackageDetails(packageDetails);
        if (items.length > 0) {
          setsearchsubject(items[0].subject.toLowerCase()); // Lock the subject to the first video's subject
        } 
      } else {
        console.error('Failed to fetch video data:', data);
      }
    } catch (error) {
      console.error('Error fetching video data:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    }
  };


  useEffect(() => {
    FetchVideoListsItems (videoId);
  }, [videoId]);


  const filterAndSortVideos = (videos, sort, searchdate, searchlength) => {
    let filteredVideos = videos;
  
    if (sort === 'title') {
      filteredVideos.sort((a, b) => a.title.localeCompare(b.title, 'zh'));
    } else if (sort === 'date') {
      filteredVideos.sort((a, b) => new Date(a.added_datetime) - new Date(b.added_datetime));
    }

    if (searchdate && searchdate !== 'none') { // Check if searchdate is not 'none'
      const currentDate = new Date();
      let compareDate = new Date();
      if (searchdate === "oneweek") {
        compareDate.setDate(currentDate.getDate() - 7);
      } else if (searchdate === "onemonth") {
        compareDate.setMonth(currentDate.getMonth() - 1);
      } else if (searchdate === "threemonths") {
        compareDate.setMonth(currentDate.getMonth() - 3);
      }
      filteredVideos = filteredVideos.filter(item => new Date(item.added_datetime) >= compareDate);
    }
  
    if (searchlength) {
      filteredVideos = filteredVideos.filter(item => {
        const [minutes, seconds] = item.duration.string.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;
  
        if (searchlength === "onetofive") {
          return totalSeconds >= 60 && totalSeconds <= 300;
        } else if (searchlength === "fivetoten") {
          return totalSeconds > 300 && totalSeconds <= 600;
        } else if (searchlength === "tenabove") {
          return totalSeconds > 600;
        }
        return true;
      });
    }
    return filteredVideos;
  };


  const handleFilter = (videoId, searchsort, searchdate, searchlength) => {
    const filteredData = filterAndSortVideos(originalVideoListsItems, searchsort, searchdate, searchlength);
    setVideoListsItems(filteredData);
  };


  const getsearchdata = async (videos, searchtext) => {
    let filteredVideos = videos;
    console.log(`searchtext: ${searchtext}`);
    if (searchtext) {
        filteredVideos = filteredVideos.filter(item => item.title === searchtext);
    }
    return filteredVideos;
  };


  const handleVideoPress = (video) => {
    // Navigate to the VideoPlayer screen
    navigation.navigate('VideoPlayer', {video});
  };


  const loadmore = () => {
    console.log("loadmore");
    setIsloading(true);
  }

  const handleSearch = async () => {
    const filteredVideos = await getsearchdata(originalVideoListsItems, searchtext);
    setVideoListsItems(filteredVideos);
};


const handleSearchTextChange = useCallback((text) => {
  setSearchtext(text);
}, []);

  const renderHeader = () => (
    <View>
      <View style={styles.lAHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={20} marginLeft={10}/>  
        </TouchableOpacity>
        {!showSearchBar && (
          <Text style={styles.lAHeaderText}>{packageDetails.title}</Text>
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
              placeholder="Search"
              placeholderTextColor="#aaa"
              value={searchtext}
              onChangeText={(text) => handleSearchTextChange(text)}
              onSubmitEditing={handleSearch}
            />
        </View>
      )}
    </View>
  );




  return (
    <View style={styles.container}>    
      <ScrollView contentContainerStyle={styles.paddingBottom} >
      <FlatList
        data={videoListsItems}
        keyExtractor={(item) => item.id}
        onEndReached={searcherfilter?null:loadmore}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>      
            <View style={styles.videotext}>
              <View style={styles.logoandtitle}>          
                <View style={styles.logoContainer}>             
                  <Image source={{ uri: item.logo }} style={styles.logo} />
                  <Text style={styles.logoTitle}>{item.logotitle}</Text>
                </View>
                <View style={styles.videoDetails}>  
                  <Text style={styles.videoTitle}>{item.title}</Text>     
                  <View style={styles.termsContainer}>
                    {item.hashtag.map((term, index) => (
                        <TouchableOpacity key={index} style={styles.term}>
                            <Text style={styles.termText}>{term}</Text>
                        </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleVideoPress(item)}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnailImage} />
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
                  <Picker
                    style={styles.picker}
                    ref={pickerRef}
                    selectedValue={searchsort}
                    onValueChange={(itemValue, itemIndex) =>
                      setsearchsort(itemValue)
                    }
                  >
                    <Picker.Item label="名稱" value="title"/>
                    <Picker.Item label="日期" value="date"/>                    
                  </Picker>
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>科目</Text>
                <View style={styles.modalselect}>
                  <Picker
                    style={styles.picker}
                    ref={pickerRef}
                    selectedValue={searchsubject}
                    enabled={false}  // Make the picker read-only
                  >
                    <Picker.Item label="中文" value="chinese"/>
                    <Picker.Item label="英文" value="english"/>
                    <Picker.Item label="數學" value="math"/>
                    <Picker.Item label="科學" value="science"/>
                    <Picker.Item label="共通能力" value="other"/>
                  </Picker>
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>上載日期</Text>
                <View style={styles.modalselect}>
                <Picker
                  style={styles.picker}
                    ref={pickerRef}
                    selectedValue={searchdate}
                    onValueChange={(itemValue, itemIndex) =>
                      setsearchdate(itemValue)
                    }
                  >
                    <Picker.Item label="不限時期" value= "none"/>
                    <Picker.Item label="最近一週" value="oneweek"/>
                    <Picker.Item label="最近一個月" value="onemonth"/>
                    <Picker.Item label="最近三個月" value="threemonth"/>

                  </Picker>
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>片長</Text>
                <View style={styles.modalselect}>
                <Picker
                  style={styles.picker}
                    ref={pickerRef}
                    selectedValue={searchlength}
                    onValueChange={(itemValue, itemIndex) =>
                      setsearchlength(itemValue)
                    }
                  >
                    <Picker.Item label="不限" value= "none"/>
                    <Picker.Item label="1至5分鐘" value="onetofive"/>
                    <Picker.Item label="5至10分鐘" value="fivetoten"/>
                    <Picker.Item label="10分鐘以上" value="tenabove"/>
                  </Picker>
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
                onPress={() => {
                  setsearchfilterVisible(false)
                  setSearchorfilter(true)
                  setHashtags([])
                  handleFilter(videoId, searchsort,  searchdate, searchlength);
                }}
              >
                <Text style={styles.modalButtonText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView> 
      <BottomNavBar />
    </View>
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
    marginBottom: 8,
    alignSelf: 'flex-start',
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
  videoDetails: {
   
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    
  },
  termsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    maxWidth: '90%', 
    marginVertical: 5,
    
  },
  term: {
    paddingHorizontal: 10,
  },
  termText: {
    color: '#00A3A3',
  },
  thumbnailImage: {
    width: 360,
    height: 200,
    backgroundColor: 'grey', // Placeholder for thumbnail
    borderRadius: 25,
    borderColor: '#D3D3D3',
    borderWidth: 3,
    alignSelf: 'center',
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
    picker: {
      marginLeft: -40,
      width: 150,
      marginTop: -15,
    },
});

export default VideoList;
