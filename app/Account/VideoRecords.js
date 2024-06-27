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
} from "react-native";
import { Ionicons, MaterialCommunityIcons ,Octicons,Entypo} from "@expo/vector-icons";
import React, { useState, useEffect,useCallback } from "react";
import BottomNavBar from "../components/BottomNavBar"; // Import the BottomNavBar component
import { SvgUri } from "react-native-svg";

function VideoRecords({ navigation }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); // State to control modal visibility
  const [subjectlist, setSubjectlist] = useState([
    { text: "中文", id: "subject1", icon: "https://jcblendedlearning.fabulearn.net/assets/chinese.48cf33b0.svg", subject: "chinese" },
    { text: "英文", id: "subject2", icon: "https://jcblendedlearning.fabulearn.net/assets/english.0ba40afe.svg",subject: "english"},
    { text: "數學", id: "subject3", icon: "https://jcblendedlearning.fabulearn.net/assets/math.592e35ec.svg", subject: "math"},
    { text: "科學", id: "subject4", icon: "https://jcblendedlearning.fabulearn.net/assets/science.11cdf6e6.svg", subject: "science"},
    { text: "共通能力", id: "subject5", icon: "https://jcblendedlearning.fabulearn.net/assets/other.4dfe6be8.svg", subject: "other"},
  ]);

  const [videolist, setVideolist] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [pagenum, setPagenum] = useState(1);
  const [isloading, setIsloading] = useState(false);

  const getAPIdata = async () => {
    try {
      console.log(selectedSubject);
      const url = `https://schools.fabulearn.net/api/bliss/history-videos`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      setVideolist(data["data"]);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getAPIdata();
  }, [pagenum]);


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
    setPagenum(pagenum + 1);
    setIsloading(true);
  }
  const [searchtext,setSearchtext] = useState("")
  const handleSearchTextChange = useCallback((text) => {
    setSearchtext(text);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
          {showSearchBar ? 
                <View style={styles.searchBarContainer} >
                  <TouchableOpacity onPress={() => {
                    setShowSearchBar(false)
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
                    }}
                  />
                </View>
               : 
               null}
      <FlatList
        data={videolist}
        keyExtractor={(item) => item.id}
        onEndReached={loadmore}
        ListHeaderComponent={() => (
          <>
            <View style={styles.top}>
                <>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} />
                </TouchableOpacity>  
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    style={{ marginRight: 5, opacity: 0 }}
                  />

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
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color="#00A3A3"
                        style={styles.moreIcon}
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
            <TouchableOpacity onPress={() => {navigation.push("VideoStack",
              {
                screen: "PlayVideos",
                params: { VIDEOID:item.id,VIDEODATA:item}
              }
              )}}>
              <View style={styles.thumbnail}>
                <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: "100%", borderRadius: 25 }} />
                {item.is_new==true?
                <Entypo name="new" size={40} color="#00A3A3" style={{position:"absolute",right:0}}/>
                :null}
                {item.is_read==true?
                <Ionicons name="checkmark-done" size={40} color="#00A3A3" style={{position:"absolute",right:0,bottom:0}}/>
                :null}
              </View>
            </TouchableOpacity>
            <View style={styles.videotext}>
              <View style={styles.logoandtitle}>
                {/* Logo and Logo Title */}
                <View style={styles.logoContainer}>
                <View style={styles.circle}>
                    <SvgUri width="100%" height="100%" uri={getSubjectIcon(item.subject)} />
                </View>
                  <Text style={styles.logoTitle}>{getSubjectName(item.subject)}</Text>
                </View>

                <View>
                  {/* Video Title */}
                  <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                  {/* Terms */}
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
          </View>
        )}

        ListFooterComponent={() => {
          return(
            isloading?
            <View>
              <ActivityIndicator size="large"/>
            </View>
            :null
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
                  <Text>相關性</Text>
                  <Ionicons name="chevron-down-sharp" size={25} color={"grey"} />
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>科目</Text>
                <View style={styles.modalselect}>
                  <Text>英文</Text>
                  <Ionicons name="chevron-down-sharp" size={25} color={"grey"} />
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>上載日期</Text>
                <View style={styles.modalselect}>
                  <Text>不限時間</Text>
                  <Ionicons name="chevron-down-sharp" size={25} color={"grey"} />
                </View>
              </View>
              <View style={styles.modalItem}>
                <Text>片長</Text>
                <View style={styles.modalselect}>
                  <Text>不限</Text>
                  <Ionicons name="chevron-down-sharp" size={25} color={"grey"} />
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
    justifyContent: "center",
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
});

export default VideoRecords;
