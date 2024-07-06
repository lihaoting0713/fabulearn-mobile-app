import React, { useState, useEffect, useRef,  useCallback  } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import BottomNavBar from '../components/BottomNavBar';

const Topics = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { topic } = route.params;
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [items, setItems] = useState([]);
  const [originalVideoListsItems, setOriginalVideoListsItems] = useState([]);
  const [searchdate,setsearchdate] = useState(null)
  const [searchsort,setsearchsort] = useState("name");
  const [searchsubject,setsearchsubject] = useState("")
  const [searchlength,setsearchlength] = useState(null)
  const [searchtext,setSearchtext] = useState("")
  const pickerRef = useRef();

  const fetchItems = async () => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/learning-packages`;
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        const topicItems = Object.values(data.data).filter(item => item.topic === topic);
        setOriginalVideoListsItems(topicItems); 
        setItems(topicItems);

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
    fetchItems();
  }, [topic]);



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


  const handleFilter = ( searchsort, searchdate, searchlength) => {
    const filteredData = filterAndSortVideos(originalVideoListsItems, searchsort, searchdate, searchlength);
    setItems(filteredData);
  };


  const getsearchdata = async (videos, searchtext) => {
    let filteredVideos = videos;
    console.log(`searchtext: ${searchtext}`);
    if (searchtext) {
        filteredVideos = filteredVideos.filter(item => item.title === searchtext);
    }
    return filteredVideos;
  };

  const handleSearch = async () => {
    const filteredVideos = await getsearchdata(originalVideoListsItems, searchtext);
    setItems(filteredVideos);
  };

  const handleSearchTextChange = useCallback((text) => {
    setSearchtext(text);
  }, []);

  

  return (

    <SafeAreaView style={styles.lAContainer}>
            <Ionicons name="search" size={30} style={{ opacity: 0 }} />
             
            <ScrollView style={styles.lAScrollViewContent}>
                <View style={styles.lAHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={30} color="#00A3A3"  marginRight={20} marginLeft={10}/>  
                </TouchableOpacity>
                    {!showSearchBar && (
                        <Text style={styles.lAHeaderText}>{topic}</Text>
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
                        value={searchtext}
                        onChangeText={(text) => handleSearchTextChange(text)}
                        onSubmitEditing={handleSearch}
                        />
                    </View>
                )}
                {items.map((item) => (
                <View key={item.id} style={styles.lACardsContainer}>
                    <View style={styles.IACardHeader}>
                        <Image
                            style={styles.IAIcon}
                            source={item.icon}
                        />
                        <Text style={styles.IACardText}>{item.title}</Text>
                    </View>
                    <TouchableOpacity style={styles.IAVideoCard} onPress={() => navigation.navigate('VideoList', { videoId: item.video_id })}>
                    <View style={styles.IAPlaceholder}>
                        <Image source={{ uri: item.thumbnail }} style={styles.thumbnailImage} />
                    </View>
                    </TouchableOpacity>
                    <View style={styles.IACardDetailsConTainer}>
                    <View style={styles.IACardDetails}>
                        <Text style={styles.IACardDetailsText}>已觀看影片</Text>
                        <Text style={styles.IACardDetailsStats}>{item.number_of_watched_videos}/{item.total_number_of_videos}</Text>
                    </View>
                    <View style={styles.IACardDetails}>
                        <Text style={styles.IACardDetailsText}>已完成練習</Text>
                        <Text style={styles.IACardDetailsStats}>{item.total_number_of_videos}/{item.total_number_of_exercises}</Text>
                    </View>
                    <View style={styles.IACardDetails}>
                        <Text style={styles.IACardDetailsText}>年級</Text>
                        <Text style={styles.IACardDetailsStats}>{item.grade}</Text>
                    </View>
                    </View>
                </View>
                ))}

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
            <BottomNavBar/>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
lAContainer: {
    flex: 1,
    backgroundColor:'white',
    marginTop: -30,
    
    },
    lAScrollViewContent: {
        paddingBottom: 140,
        
    },
  container: {
    
  },
  workContainer: {
    marginBottom: 20,
  },
  workItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workIcon: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  workLabel: {
    fontSize: 16,
    flex: 1,
  },
  workStats: {
    fontSize: 12,
    color: 'grey',
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
lACardsContainer:{ 
    alignSelf: 'center',
    backgroundColor: '#fffcec',
    width: '90%',
    height: 400,
    borderRadius: 15,
    marginBottom: 30,
},
IACardHeader:{
    flexDirection:'row',
    marginTop: 30,
    alignItems:'center',
    width: '80%'
    
},
IAIcon:{
    height:40,
    width:40,
},
IACardText:{
    fontSize: 20,
    marginLeft:20,
    marginRight: 20,
    fontWeight: 'bold',
    color: '#48bcbc',
    flexWrap: 'wrap',
},
IAVideoCard: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#e0e0e0',
    width: '80%',
    height: '45%',
    margin: 20,
    borderRadius: 10,
},
IAPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
},
thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
IAPlaceholderText: { 
    color: '#000',
    fontSize: 16,
},
IACardDetailsConTainer:{
    marginTop: 20,
    flexDirection:'row',
    marginHorizontal: 30,
    alignSelf:'center',
    gap:40,
},
IACardDetails:{
    flexDirection:'column',
    alignItems:'flex-start',
    
},
IACardDetailsText:{
    fontSize:13,
    color: '#48bcbc',
},
IACardDetailsStats:{
    fontSize:25,
    color: '#48bcbc',
    fontWeight:'bold',
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

export default Topics;
