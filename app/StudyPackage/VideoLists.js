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
    Platform,
    Dimensions,
    ActivityIndicator,
    Button,
  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import BottomNavBar from '../components/BottomNavBar';
import axios from 'axios'; 


const { width } = Dimensions.get('window');
const isSmallScreen = width < 370;
console.log('ScreenSize',width)

const VideoList = ({ route }) => {
  const { videoId } = route.params;
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); 
  const [videoListsItems,setVideoListsItems] = useState([]);
  const [packageDetails,setPackageDetails] = useState([]);
  const [searchdate,setsearchdate] = useState(null)
  const [searchsort,setsearchsort] = useState("name");
  const [searchsubject,setsearchsubject] = useState("")
  const [searcherfilter,setSearcherfilter] = useState(false);
  const [searchlength,setsearchlength] = useState(null)
  const [searchtext,setSearchtext] = useState("")
  const pickerRef = useRef();
  const [originalVideoListsItems, setOriginalVideoListsItems] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [filteredHashtagVideos, setFilteredHashtagVideos] = useState(videoId);
  const [filteredPage, setFilteredPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  const FetchVideoListsItems = async (videoId, page = 1) => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
  
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoId}/related`;
      console.log('Making request to:', url);
      const response = await axios.get(url);
      const data = response.data;
  
      if (data.success) {
        const packageDetails = data.data;
        const items = Object.values(data.data.videos_in_package);
        setOriginalVideoListsItems(items);
        console.log('VideoListItems', items);
        setVideoListsItems(items.slice(0, itemsPerPage * page));
        setPackageDetails(packageDetails);
        if (items.length > 0) {
          setsearchsubject(items[0].subject.toLowerCase());
        }
        if (items.length <= itemsPerPage * page) {
          setAllLoaded(true);
        } else {
          setAllLoaded(false);
        }
      } else {
        console.error('Failed to fetch video data:', data);
      }
    } catch (error) {
      console.error('Error fetching video data:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
    } finally {
      if (page === 1) {
        setIsLoading(false);
      }
      setIsLoadingMore(false);
    }
  };
  

  useEffect(() => {
    FetchVideoListsItems(videoId);
  }, [videoId]);


  const FetchFilteredVideos = async (hashtags, page = 1) => {
    if (page === 1) {
        setIsLoading(true);
    } else {
        setIsLoadingMore(true);
    }

    try {
        const url = `https://schools.fabulearn.net/api/bliss/videos/${videoId}/related`;
        console.log('Making request to:', url);
        const response = await axios.get(url);
        const data = response.data;

        if (data.success) {
            const items = Object.values(data.data.videos_in_package);
            const filtered = items.filter(video =>
                hashtags.every(hashtag => video.hashtag && video.hashtag.includes(hashtag))
            );
            setFilteredHashtagVideos(filtered);
            setVideoListsItems(filtered.slice(0, itemsPerPage * page));
            if (filtered.length <= itemsPerPage * page) {
                setAllLoaded(true);
            } else {
                setAllLoaded(false);
            }
        } else {
            console.error('Failed to fetch video data:', data);
        }
    } catch (error) {
        console.error('Error fetching video data:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
        }
    } finally {
        if (page === 1) {
            setIsLoading(false);
        }
        setIsLoadingMore(false);
    }
};

useEffect(() => {
    FetchVideoListsItems(videoId);
}, [videoId]);

  

  const handleLoadMore = () => {
    if (!isLoadingMore) {
        if (isFiltering) {
            setFilteredPage((prevPage) => prevPage + 1);
        } else {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }
  };

  useEffect(() => {
      if (currentPage > 1) {
          FetchVideoListsItems(videoId, currentPage);
      }
  }, [currentPage]);

  useEffect(() => {
      if (filteredPage > 1) {
          FetchFilteredVideos(selectedHashtags, filteredPage);
      }
  }, [filteredPage]);
  
  
  const handleHashtagClick = (hashtag) => {
    if (!selectedHashtags.includes(hashtag)) {
        const updatedHashtags = [...selectedHashtags, hashtag];
        setSelectedHashtags(updatedHashtags);
        setIsFiltering(true);
        setFilteredPage(1);
        FetchFilteredVideos(updatedHashtags, 1);
    }
};

  const handleRemoveHashtag = (hashtag) => {
    const updatedHashtags = selectedHashtags.filter(tag => tag !== hashtag);
    setSelectedHashtags(updatedHashtags);
    if (updatedHashtags.length === 0) {
        setIsFiltering(false);
        setCurrentPage(1);
        FetchVideoListsItems(videoId, 1);
    } else {
        setFilteredPage(1);
        FetchFilteredVideos(updatedHashtags, 1);
    }
};
  
  const filterAndSortVideos = (videos, sort, searchdate, searchlength) => {
    let filteredVideos = videos;

    if (sort === 'title') {
      filteredVideos.sort((a, b) => a.title.localeCompare(b.title, 'zh'));
    } else if (sort === 'date') {
      filteredVideos.sort((a, b) => new Date(a.added_datetime) - new Date(b.added_datetime));
    }

    if (searchdate && searchdate !== 'none') { 
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
    setVideoListsItems(filteredData.slice(0, itemsPerPage));
  };  

  const getsearchdata = async (videos, searchtext) => {
    let filteredVideos = videos;
    console.log(`searchtext: ${searchtext}`);
    if (searchtext) {
        filteredVideos = filteredVideos.filter(item => item.title === searchtext);
    }
    return filteredVideos;
  };

  const handleVideoPress = (video, videoId) => {
    navigation.navigate('VideoPlayer', {video, videoId});
  };

  const handleSearch = async () => {
    const filteredVideos = await getsearchdata(originalVideoListsItems, searchtext);
    setVideoListsItems(filteredVideos.slice(0, itemsPerPage));
  };
  

  const handleSearchTextChange = useCallback((text) => {
    setSearchtext(text);  
  }, []);

  const Like = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/like`;
      const body = new FormData();
      body.append("course_id", videoid);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;"
        },
        body : body
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const unLike = async (videoid) => {
    try {
      const url = `https://schools.fabulearn.net/api/bliss/videos/${videoid}/unlike`;
      const body = new FormData();
      body.append("course_id", videoid);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': "multipart/form-data;"
        },
        body : body
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  };

  const clickLike = (videoid) => {
    console.log("clicked like button.");
    if (isLiked) {
      unLike(videoid);
      setLikeNum((prev) => (prev !== null ? prev - 1 : 0)); 
      setIsLiked(false);
    } else {
      Like(videoid);
      setLikeNum((prev) => (prev !== null ? prev + 1 : 1)); 
      setIsLiked(true);
    }
  };

  const [likeNum, setLikeNum] = useState(null); 
  const [isLiked, setIsLiked] = useState(false);
  const [noteNum, setnoteNum] = useState();

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
      {renderHeader()}
      {isLoading ? (
        <ActivityIndicator size="large" color="#00A3A3" style={styles.loadingIndicator} />
      ) : ( 
        <>
          <View style={styles.selectedHashtagsContainer}>
            <Text style={styles.hashtagTitle}>標籤:</Text>
            {selectedHashtags.map((hashtag, index) => (
              <View key={index} style={styles.selectedHashtag}>
                  <Text style={styles.selectedHashtagText}>#{hashtag}</Text>
                  <TouchableOpacity onPress={() => handleRemoveHashtag(hashtag)}>
                      <Text style={styles.removeHashtagText}>x</Text>
                  </TouchableOpacity>
              </View>
            ))}
          </View>

      <FlatList
        data={videoListsItems}
        keyExtractor={(item) => item.id}
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
                      <TouchableOpacity key={index} style={styles.term} onPress={() => handleHashtagClick(term)}>
                      <Text style={styles.termText}>{term}</Text>
                    </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleVideoPress(item, videoId)}>
              <Image source={{ uri: item.thumbnail }} style={[styles.thumbnailImage, isSmallScreen && styles.thumbnailImageSmall]} />
              <Text style={{position:"absolute",bottom:0,right:0,backgroundColor:"black",color:"white",padding:5,borderRadius:5}}>{item.duration.string}</Text>
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={() => clickLike(videoId)}>
                  <Text style={styles.buttonnumText}>{likeNum !== null ? likeNum : ''}</Text>
      
                  {isLiked ?<Ionicons name="heart" size={20} color="#00A3A3"/>:
                  <Ionicons name="heart-outline" size={20} color="#00A3A3"/>
                }
                  <Text style={styles.buttonText}> Like</Text>
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
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            allLoaded ? <Text style={styles.noMoreVideosText}>No more videos</Text> :
            isLoadingMore ? <ActivityIndicator size="large" color="#00A3A3" /> : null
          )}
          contentContainerStyle={styles.flatListContent}
      />
      </>      
    )}

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
                    enabled={false}  
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
                  setSearcherfilter(true)
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
  selectedHashtagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
  },
  hashtagTitle: {
    marginLeft: 20,
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A3A3',
  },
  selectedHashtag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
  selectedHashtagText: {
    marginRight: 5,
    fontSize: 14,
  },
  removeHashtagText: {
    color: 'red',
    fontWeight: 'bold',
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  hashtag: {
    margin: 5,
    padding: 5,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    color: 'black',
  },
  selectedHashtagButton: {
    backgroundColor: 'blue',
    color: 'white',
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
    backgroundColor: 'grey', 
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
    marginRight: 10, 
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgrey', 
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
    backgroundColor: 'grey', 
    borderRadius: 25,
    borderColor: '#D3D3D3',
    borderWidth: 3,
    alignSelf: 'center',
  },
  thumbnailImageSmall: {
    width: 330,
    height: 180,
    backgroundColor: 'grey', 
    borderRadius: 25,
    borderColor: '#D3D3D3',
    borderWidth: 3,
    alignSelf: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#e0f7fa',
    borderRadius: 15,
    padding: 7,
    marginHorizontal: 2,
    flexDirection: 'row'
  },
  buttonnumText: {
    color: "#00A3A3",
    fontSize: 14,
    marginRight: 5,
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
    paddingLeft: 120, 
    paddingTop: 13, 
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
    borderWidth: 0, 
    borderBottomWidth: 0, 
    borderRadius: 20, 
    borderColor: 'transparent', 
    paddingLeft: 20,
    paddingRight: 30, 
  },
  paddingBottom: {
    flex: 1,
    paddingBottom: 140,
    
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageText: {
    fontSize: 18,
    marginHorizontal: 10,
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 180,

  },
  noMoreVideosText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#00A3A3',
  },
});

export default VideoList;
