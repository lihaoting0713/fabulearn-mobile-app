import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {Ionicons,Octicons,MaterialCommunityIcons,Entypo,} from "@expo/vector-icons";
import {BottomSheetModal,BottomSheetModalProvider,BottomSheetScrollView,} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView,TextInput,} from "react-native-gesture-handler";
import {Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider} from 'react-native-popup-menu';

function Videos({navigation,item}) {
  const [likeNum, setlikeNum] = useState(3);
  const [noteNum, setnoteNum] = useState(3);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "90%", "100%"], []);

  function handlePresentModalPress() {
    bottomSheetModalRef.current?.present();
  }

  const learnvideolist = [
    {
      title: "title 1",
      id: "video1",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
    {
      title: "title 2",
      id: "video2",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
    {
      title: "title 3",
      id: "video3",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
    {
      title: "title 4",
      id: "video4",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
  ];

  const recommendvideolist = [
    {
      title: "title 1",
      id: "video1",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
    {
      title: "title 2",
      id: "video2",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
    {
      title: "title 3",
      id: "video3",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
    {
      title: "title 4",
      id: "video4",
      thumbnail: "",
      term: ["#s1-term2", "#s1-term2", "#s1-term2"],
    },
  ];

  const featuredVideo = {
    title: "title",
    thumbnail: "",
    logotitle: "科目",
    term: ["#s1-term2", "#s1-term2", "#s1-term2"],
  };

  const VideoList = ({ title, data }) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.videoItem}>
              <TouchableOpacity >
              <View style={styles.thumbnail} />
              </TouchableOpacity>
              <View style={styles.videoDetails}>
                <View style={styles.videotop}>
                  <Image source={{ uri: item.thumbnail }} style={styles.logo} />
                  <Text style={styles.videoTitle}>{item.title}</Text>
                </View>
                <View style={styles.termsContainer}>
                  {item.term.map((term, index) => (
                    <Text key={index} style={styles.term}>
                      {term}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const notelist = [
    {
      time: "02:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "03:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "04:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "05:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "05:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "05:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "05:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "05:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
    {
      time: "05:00",
      text: "資禽灣氏下本與不如劵山不，到不價。",
      id: this.time,
    },
  ];

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.top}>

              <View style={styles.videoDetailsLarge}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Octicons name="chevron-left" size={40} color="#00A3A3" style={styles.backpage} marginRight={40}/>  
                </TouchableOpacity>
                <View style={{flexDirection:"row"}}>

                <View style={styles.logoandlogotitleLarge}>
                  <Image source={{ uri: "" }} style={styles.logoLarge} />
                  <Text style={styles.logotitleLarge}>
                    {featuredVideo.logotitle}
                  </Text>
                </View>
                <View style={styles.titleandtermLarge}>
                  <Text style={styles.videoTitleLarge}>
                    {featuredVideo.title}
                  </Text>
                  <View style={styles.termsContainerLarge}>
                    {featuredVideo.term.map((term, index) => (
                      <Text key={index} style={styles.termLarge}>
                        {term}
                      </Text>
                    ))}
                  </View>
                </View>
                    </View>
              </View>
              <View style={styles.thumbnailLarge} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonnumText}>{likeNum}</Text>
                <Ionicons name="heart-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handlePresentModalPress}
                >
                <Text style={styles.buttonnumText}>{noteNum}</Text>
                <Octicons name="pencil" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>筆記</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Ionicons name="star-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>推薦</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="briefcase-outline" size={24} color="#00A3A3" />
                <Text style={styles.buttonText}>推薦</Text>
              </TouchableOpacity>
            </View>
            </View>

            <View style={styles.allsection}>
              <VideoList title="學習包影片" data={learnvideolist} />
              <VideoList title="推薦影片" data={recommendvideolist} />
            </View>
          </ScrollView>
        </SafeAreaView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 20 }}
        >


          <View style={styles.noteRecords}>
          <BottomSheetScrollView style={{flex:1}}>

            <View style={styles.noteTop}>
              <Text style={styles.noteRecordsTitle}>筆記記錄</Text>
              <Ionicons
                name="close"
                size={30}
                color="#00A3A3"
                onPress={() => bottomSheetModalRef.current?.dismiss()}
                />
            </View>
              <View>
                <FlatList
                  data={notelist}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                      <MenuProvider >
                    <View style={styles.noteItem}>
                      <View style={styles.noteItemTop}>
                        <Text style={{ color: "grey", fontSize: 14 }}>
                          {item.time}
                        </Text>
                        <View style={styles.noteItemButton}>
                          <MaterialCommunityIcons
                            name="pencil"
                            size={24}
                            color="#00A3A3"
                            marginRight={10}
                            />

                          <Menu >
                            <MenuTrigger>
                              <Entypo
                                name="dots-three-vertical"
                                size={20}
                                color="#00A3A3"
                                />
                            </MenuTrigger>
                            <MenuOptions optionsContainerStyle={{width:60,height:80,alignItems:"center",justifyContent:"center"}}>
                              <MenuOption onSelect={() => console.log("Copy")}>
                                <Text>複製</Text>
                              </MenuOption>
                              <MenuOption onSelect={() => console.log("Delete")}>
                                <Text>剛除</Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        </View>
                      </View>
                      <Text>{item.text}</Text>
                    </View>
                  </MenuProvider>
                  )}
                  />
              </View>
              </BottomSheetScrollView>


            <View style={styles.noteInputContainer}>
              <View style={styles.noteInputInnerContainer}>
                <TextInput
                  style={styles.noteInput}
                  placeholder="筆記......"
                  placeholderTextColor={"#C8C8C8"}
                  />
                <Ionicons
                  name="return-down-back-sharp"
                  color={"#C8C8C8"}
                  onclick
                  size={25}
                  />
              </View>
            </View>
          </View>


        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    flex: 1,
    backgroundColor: "#E7FFFD",
    padding: 0,
  },
  top: {
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#E7FFFD",
  },
  titleContainer: {
    flex: 1,
    width: "100%",
  },
  allsection: {
    backgroundColor: "#f7f7e3",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
  videoItem: {
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "grey",
    width: "100%",
  },
  thumbnail: {
    width: 150,
    height: 100,
    backgroundColor: "grey", // Placeholder for thumbnail
    borderRadius: 10,
  },
  videoDetails: {
    marginLeft: 10,
    justifyContent: "center",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 35,
    width: "70%",
  },
  term: {
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 10,
    color: "#00A3A3",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgrey", // Placeholder for logo
  },
  videotop: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logoandlogotitleLarge: {
    alignItems: "center",
  },
  titleandtermLarge: {
    marginLeft: 10,
  },
  thumbnailLarge: {
    width: "100%",
    height: 200,
    backgroundColor: "grey", // Placeholder for thumbnail
    marginTop: 10,
    borderRadius: 10,
  },
  videoDetailsLarge: {
    marginTop: 10,
    flexDirection: "row",
    paddingVertical: 10,
  },
  logoLarge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgrey", // Placeholder for logo
  },
  logotitleLarge: {
    fontSize: 10,
  },
  videoTitleLarge: {
    fontSize: 16,
    fontWeight: "bold",
  },
  termTextLarge: {
    fontSize: 12,
    color: "#00A3A3",
  },
  termLarge: {
    marginRight: 10,
    borderRadius: 5,
    paddingVertical: 5,
    fontSize: 12,
    color: "#00A3A3",
  },
  termsContainerLarge: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d8f1f1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  buttonnumText: {
    color: "#00A3A3",
    fontSize: 14,
    marginRight: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: "#00A3A3",
    fontSize: 14,
  },
  noteRecords: {
    flex: 1,
  },
  noteRecordsTitle: {
    color: "#00A3A3",
    fontSize: 20,
    fontWeight: "bold",
  },
  noteTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  noteItem: {
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    marginHorizontal: 20,
    borderColor: "grey",
  },
  noteItemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  noteItemButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  noteInputContainer: {
    height: 100,
    backgroundColor: "#00A3A3",
    width: "100%",
    justifyContent: "center",
    padding: 20,
  },
  noteInputInnerContainer: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  noteInput: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 50,
    paddingHorizontal: 25,
    flex: 1,
  },
  menucontainer: {
    backgroundColor: "red",
    width: 100,
  }, 
});

export default Videos;
