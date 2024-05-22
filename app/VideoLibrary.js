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

function VideoLibrary({ navigation }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchfilterVisible, setsearchfilterVisible] = useState(false); // State to control modal visibility

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
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color="#00A3A3"
                    style={styles.moreIcon}
                  />
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

            </>
          }
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
              {/* Thumbnail */}
              <TouchableOpacity
                onPress={() => {navigation.navigate("Videos", item);}}
              >
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
});

export default VideoLibrary;
