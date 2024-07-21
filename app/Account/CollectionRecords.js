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
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons ,Entypo,Octicons,AntDesign} from "@expo/vector-icons";
import React, { useState, useEffect, useMemo,useCallback,useRef } from "react";
import BottomNavBar from "../components/BottomNavBar"; // Import the BottomNavBar component
import { SvgUri } from "react-native-svg";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

function VideoRecords() {
  const navigation = useNavigation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); // State to control modal visibility
  const subjectlist = [
    { text: "中文", id: "subject1", icon: "https://jcblendedlearning.fabulearn.net/assets/chinese.48cf33b0.svg", subject: "chinese" },
    { text: "英文", id: "subject2", icon: "https://jcblendedlearning.fabulearn.net/assets/english.0ba40afe.svg",subject: "english"},
    { text: "數學", id: "subject3", icon: "https://jcblendedlearning.fabulearn.net/assets/math.592e35ec.svg", subject: "maths"},
    { text: "科學", id: "subject4", icon: "https://jcblendedlearning.fabulearn.net/assets/science.11cdf6e6.svg", subject: "science"},
    { text: "共通能力", id: "subject5", icon: "https://jcblendedlearning.fabulearn.net/assets/other.4dfe6be8.svg", subject: "other"},
  ];

  const choices = ['中文', 'maths', 'english', 'science', 'others'];

  const video = React.useRef(null);
  const [videolist, setVideolist] = useState([]);
  const [pagenum, setPagenum] = useState(5);
  const [isloading, setIsloading] = useState(true);
  const [isscreenloading, setIsscreenloading] = useState(true);
  const [searchsort,setsearchsort] = useState("name")
  const [searchsubject,setsearchsubject] = useState("chinese")
  const [searchdate,setsearchdate] = useState(null)
  const [searchlength,setsearchlength] = useState(null)
  const [noresult,setNoresult] = useState(false)
  const [searchorfilter,setSearchorfilter] = useState(false)
  const [searchtext,setSearchtext] = useState("")
  const [refreshing, setRefreshing] = useState(false);
  const [subjecticon, setSubjecticon] = useState("");
  const [subjectname, setSubjectname] = useState("");

  const pickerRef = useRef();

function open() {
  pickerRef.current.focus();
}

function close() {
  pickerRef.current.blur();
}
  
  const getAPIdata = async () => {
    try {
      let url = `https://schools.fabulearn.net/api/resources/liked-list?&limit=${pagenum}`;
      const response = await fetch(url);
      const data = await response.json();
      setVideolist(data["data"]);
    } catch (error) {
      console.warn(error);
    }
  };

  const getsearchfilterdata = async (searchsort,searchsubject,searchdate,searchlength) => {
    try {
      console.log(`searchfilter: sort:${searchsort} subject:${searchsubject} date:${searchdate} length:${searchlength}`);
      let url = `https://schools.fabulearn.net/api/resources/liked-list?`;

      const response = await fetch(url);
      const data = await response.json();
      let filteredData = data["data"];
      
      if (searchdate) {
        const currentDate = new Date();
        let compareDate = new Date();
  
        if (searchdate === "oneweek") {
          compareDate.setDate(currentDate.getDate() - 7);
        } else if (searchdate === "onemonth") {
          compareDate.setMonth(currentDate.getMonth() - 1);
        } else if (searchdate === "threemonths") {
          compareDate.setMonth(currentDate.getMonth() - 3);
        }
  
        filteredData = filteredData.filter(item => new Date(item.added_datetime) >= compareDate);
      }
  
      if (searchlength) {
        filteredData = filteredData.filter(item => {
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

      if(searchsubject){
        filteredData = filteredData.filter(item => item.subject === searchsubject);
      }
      if(searchsort){
        if(searchsort=="name"){
          filteredData.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if(searchsort=="date"){
          filteredData.sort((a, b) => new Date(b.added_datetime) - new Date(a.added_datetime));
        }
      }
  
      setVideolist(filteredData);
      console.log(filteredData)
      if(filteredData.length==0){
        setNoresult(true)
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const getsearchdata = async (searchtext) => {
    try {
      console.log(`searchtext: ${searchtext}`)
      let url = `https://schools.fabulearn.net/api/resources/liked-list`;
      const response = await fetch(url);
      const data = await response.json();
      let searcheddata = data["data"];
      console.log(searcheddata)
      searcheddata = searcheddata.filter(item => item.info.name.toLowerCase().includes(searchtext.toLowerCase()));
      setVideolist(searcheddata);
      if(searcheddata.length==0){
        setNoresult(true)
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAPIdata();
  }, [pagenum]);

  const getsubjecticonapi = async (id) => {
    try {
      console.log(`id: ${id}`);
      let url = `https://schools.fabulearn.net/api/bliss/videos/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      let subject = data["data"].subject;
      const subjectItem = subjectlist.find((item) => item.subject.toLowerCase() == subject.toLowerCase());
      return subjectItem.icon;
    } catch (error) {
      console.warn(error);
    }
  };

  const getsubjectnameapi = async (id) => {
    try {
      console.log(`id: ${id}`);
      let url = `https://schools.fabulearn.net/api/bliss/videos/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      let subject = data["data"].subject;
      const subjectItem = subjectlist.find((item) => item.subject.toLowerCase() == subject.toLowerCase());
      console.log(subjectItem['text'])
      return subjectItem['text'];
    } catch (error) {
      console.warn(error);
    }
  };

  const getSubjectIcon = (subject) => {
    const subjectItem = subjectlist.find((item) => item.subject.toLowerCase() == subject.toLowerCase());
    return subjectItem.icon;
  };

  const getSubjectName = (subject) => {
    const subjectItem = subjectlist.find((item) => item.subject.toLowerCase() == subject.toLowerCase());
    return subjectItem.text;
  };

  const loadmore = () => {
    console.log("loadmore");
    setPagenum(pagenum + 5);
    setIsloading(true);
  }

  const handleSearchTextChange = useCallback((text) => {
    setSearchtext(text);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
                {showSearchBar ? 
                <View style={styles.searchBarContainer} >
                  <TouchableOpacity onPress={() => {
                    setShowSearchBar(false)
                    setSearchorfilter(false)
                  }}>
                    <Ionicons name="arrow-back" size={30} color="#00A3A3" />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="black"
                    value={searchtext}
                    onChangeText={(text) => handleSearchTextChange(text)}
                    onSubmitEditing={() => {
                      setSearchorfilter(true)
                      getsearchdata(searchtext)
                    }}
                  />
                </View>
               : 
               null}

      <FlatList
        data={videolist}
        keyExtractor={(item) => item.id}
        onEndReached={searchorfilter?null:loadmore}
        onRefresh={() => {
          setRefreshing(true);
          getAPIdata();
          setsearchsort("name")
          setsearchsubject("chinese")
          setsearchdate(null)
          setsearchlength(null)
          setNoresult(false)
          setSearchorfilter(false)
          setRefreshing(false);
        }}
        refreshing={refreshing}
        ListHeaderComponent={() => (
          <>
            <View style={styles.top}>
                <>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Octicons name="chevron-left" size={30} style={{marginLeft:20,color:"#00A3A3"}}/>  
                </TouchableOpacity>
                <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        opacity = {0}
                      />

                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>收藏紀錄</Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        setShowSearchBar(true)
                      }}
                      style={styles.searchIcon}
                    >
                      <Ionicons name="search" size={30} color="#00A3A3" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setsearchfilterVisible(true)}>
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color="#00A3A3"
                        style={styles.moreIcon}
                        opacity = {0}
                      />
                    </TouchableOpacity>
                  </View>
                </>
            </View>        
            
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
            {/* Thumbnail */}
            <TouchableOpacity onPress={() => { 
              navigation.push(
                "VideoStack",{
                screen:"PlayVideos",
                params:{VIDEOID:item.info.id,VIDEOPATH:item.main.html_path}
              })}}>
              <View style={styles.thumbnail}>
                <Image source={{ uri: item.main.thumbnail_path }} style={{ width: "100%", height: "100%", borderRadius: 25 }} />
              </View>
            </TouchableOpacity>
            <View style={styles.videotext}>
              <View style={styles.logoandtitle}>
                {/* Logo and Logo Title */}
                <View style={styles.logoContainer}>
                <View style={styles.circle}>

                <SvgUri width="100%" height="100%" />
                </View>
                  <Text style={styles.logoTitle}>{item.info.id}</Text>
                </View>

                <View>
                  {/* Video Title */}
                  <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode="tail">{item.info.name}</Text>
                  {/* Terms */}
                  <View style={styles.termsContainer}>
                    {item.info.description.split(" ").map((term, index) => (
                      <TouchableOpacity key={index} style={styles.term} onPress={()=>{
                      }}>
                        <Text style={styles.termText}>{term}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        
        )}
        ListFooterComponent={() => {
          return(
            <>
            {isloading&&noresult==false?
            <View>
              <ActivityIndicator size="large"/>
            </View>
            :null}
            
            {noresult?
            <Text style={{alignSelf:"center"}}>no result found</Text>
            :null}
            </>
          )
        }}
      />

      {/* Filter Modal */}
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
                    <Picker.Item label="名稱" value="name"/>
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
                    onValueChange={(itemValue, itemIndex) =>
                      setsearchsubject(itemValue)
                    }
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
                    <Picker.Item label="不限時期" value={null}/>
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
                    <Picker.Item label="不限" value={null}/>
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
                  getsearchfilterdata(searchsort,searchsubject,searchdate,searchlength)
                }}
              >
                <Text style={styles.modalButtonText}>確定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <BottomNavBar />
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
    width:
    "100%",
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
    width: "100%",
    position: "absolute",
    paddingTop: 20,
    paddingBottom: 10,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor : "white",
  },
  searchBar: {
    width: "85%",
    backgroundColor: "#DCDCDC",
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
    marginBottom: 8,
  },
  subjectText: {
    marginTop: 5,
    fontSize: 12,
    color: "white",
  },
  hashtagtitle: {
    fontSize:16,
    fontWeight:"bold",
    marginLeft:25,
    color: "#00A3A3"
  },
  hashtagcontainer: {
    flexDirection:"row",
    backgroundColor: "#a7cfcf",
    justifyContent:"center",
    alignItems:"center",
    marginTop:5,
    marginLeft:10,
    borderRadius: 10,
    padding:5,
  },
  hashtagmodalbackground:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  hashtagmodalbox:{
    width: 250,
    height: 200,
    backgroundColor: "#E7FFFD",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  hashtagmodalboxinnerbackground:{
    width: 220,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  hashtagmodalinput:{
    marginTop: 20,
    justifyContent: "center",
  },
  hashtagmodalbuttons:{
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
  hashtagmodalinputcontent:{
    marginTop: 5,
    width:200,
    flexDirection: "row",
    alignItems: "center",
  },
  videoItem: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10,
    padding: 10,
  },
  thumbnail: {
    marginHorizontal: 10,
    width: width/1.05,
    height: width*(9/16),
    backgroundColor: "grey", // Placeholder for thumbnail
    borderRadius: 25,
    borderColor: "#D3D3D3",
    borderWidth: 3,
    alignSelf : "center",
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
    width: 250,
  },
  termsContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
    width: "95%",
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
  picker: {
    marginLeft: -40,
    width: 150,
    marginTop: -15,
  },
});

export default VideoRecords;
