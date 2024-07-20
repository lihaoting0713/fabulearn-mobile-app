//StudyPackage.js
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
  ActivityIndicator 
} from "react-native";
import { Ionicons,Octicons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar'; 
import axios from 'axios';
import { SvgUri } from "react-native-svg";

function StudyPackage() {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentSubject, setCurrentSubject] = useState("Chinese"); 
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [originalTopics, setOriginalTopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [totals, setTotals] = useState({
    watchedVideos: 0,
    totalVideos: 0,
    completedExercises: 0,
    totalExercises: 0,
  });
  const [loading, setLoading] = useState(false);
  
  const subjectList = [
    { text: "中文", id: "subject1", icon: "https://jcblendedlearning.fabulearn.net/assets/chinese.48cf33b0.svg", subject: "Chinese" },
    { text: "英文", id: "subject2", icon: "https://jcblendedlearning.fabulearn.net/assets/english.0ba40afe.svg", subject: "English" },
    { text: "數學", id: "subject3", icon: "https://jcblendedlearning.fabulearn.net/assets/math.592e35ec.svg", subject: "Math" },
    { text: "科學", id: "subject4", icon: "https://jcblendedlearning.fabulearn.net/assets/science.11cdf6e6.svg", subject: "Science" },
    { text: "共通能力", id: "subject5", icon: "https://jcblendedlearning.fabulearn.net/assets/other.4dfe6be8.svg", subject: "Other" },
  ];

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const url = `https://schools.fabulearn.net/api/bliss/learning-packages`;
      console.log('Making request to:', url);
      const response = await axios.get(url);
      const data = response.data;

      if (data.success) {
        const items = Object.values(data.data).filter(item => item.subject && item.subject.toLowerCase() === currentSubject.toLowerCase());
        const uniqueTopics = [...new Map(items.map(item => [item.topic, item])).values()];
        setTopics(uniqueTopics);
        setOriginalTopics(uniqueTopics); 

        const totals = items.reduce(
          (acc, item) => {
              acc.watchedVideos += item.number_of_watched_videos;
              acc.totalVideos += item.total_number_of_videos;
              acc.completedExercises += item.number_of_completed_exercises;
              acc.totalExercises += item.total_number_of_exercises;
              return acc;
          },
          { watchedVideos: 0, totalVideos: 0, completedExercises: 0, totalExercises: 0 }
        );
          setTotals(totals);
      } else {
        console.error('Failed to fetch video data:', data);
      }
    } catch (error) {
        console.error('Error fetching video data:', error.message);
        if (error.response) {
          console.error('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [currentSubject]);

  const handleNavigation = (subject) => {
    setCurrentSubject(subject);
  }

  const filterAndSortTopics = (topics, searchText) => {
    let filteredTopics = topics;

    if (searchText) {
      filteredTopics = filteredTopics.filter(item => item.topic.toLowerCase().includes(searchText.toLowerCase()));
    }

    return filteredTopics;
  };

  const handleSearch = () => {
    const filteredTopics = filterAndSortTopics(originalTopics, searchText);
    setTopics(filteredTopics);
  };

  const handleSearchTextChange = useCallback((text) => {
    setSearchText(text);
    if (!text) {
      setTopics(originalTopics);
    }
  }, [originalTopics]);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
      <View style={styles.top}>
        {showSearchBar ? (
          <View style={styles.searchBarContainer}>
            <TouchableOpacity onPress={() => setShowSearchBar(false)}>
              <Octicons name="chevron-left" size={30} color="#00A3A3" marginRight={10} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor="#999999"
              value={searchText}
              onChangeText={handleSearchTextChange}
              onSubmitEditing={handleSearch}
            />
          </View>
        ) : (
          <>
            <Ionicons name="search" size={30} style={{ opacity: 0 }} />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>學習包</Text>
            </View>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() => setShowSearchBar(true)}
                style={styles.searchIcon}
              >
                <Ionicons name="search" size={30} color="#00A3A3" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setsearchfilterVisible(true)}>
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
                data={subjectList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.subjectItem}>
                    <TouchableOpacity onPress={() => handleNavigation(item.subject)}>
                      <View style={[styles.circle, currentSubject === item.subject && styles.selectedCircle]}>
                        <SvgUri width="100%" height="100%" uri={item.icon} />
                      </View>
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
       
      {loading ? (
        <View>
          <View style={styles.progressContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>已觀看影片</Text>
              <ActivityIndicator size="large" color="#00A3A3" style={styles.loadingIndicatorStatLabel} />
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>已完成練習</Text>
              <ActivityIndicator size="large" color="#00A3A3" style={styles.loadingIndicatorStatLabel} />
            </View>
            <Text style={styles.detailLink}>詳情</Text>
          </View>
          <ActivityIndicator size="large" color="#00A3A3" style={styles.loadingIndicator} />
        </View>
      ) : (
        <View>
          <View style={styles.progressContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>已觀看影片</Text>
              <Text style={styles.statValue}>{totals.watchedVideos}/{totals.totalVideos}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>已完成練習</Text>
              <Text style={styles.statValue}>{totals.completedExercises}/{totals.totalExercises}</Text>
            </View>
            <Text style={styles.detailLink}>詳情</Text>
          </View>
          <View>
            {topics.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.workContainer}
                onPress={() => navigation.navigate('Topics', { topic: item.topic })}
              >
                <View style={styles.workItem}>
                  <Image
                    style={styles.workIcon}
                    source={{ uri: item.thumbnail }}
                  />
                  <Text style={styles.workLabel}>
                    {item.topic}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      </ScrollView>
      <BottomNavBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
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
  selectedCircle: {
    borderColor: 'red', 
    borderWidth: 4,
  },
  subjectText: {
  },
  selectedText: {
    color: 'blue', 
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
    backgroundColor: "grey", 
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
    marginRight: 10, 
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgrey", 
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
  progressContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#47c3c3',
    padding: 20,
    borderRadius: 10,
    margin: 15,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  statValue: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  detailLink: {
    fontSize: 14,
    color: '#ffffff',
  },
  workContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffcec',
    padding: 20,
    borderRadius: 10,
    margin: 15,
  },
  workItem: {
    flexDirection:'row',
    alignItems: 'center',
  },
  workIcon: {
    width: 40,
    height: 40,
  },
  workLabel: {
    fontSize: 20,
    color: '#47c3c3',
    fontWeight:'bold',
    padding: 10,
    marginLeft: 10,
  },
  workContainerLast:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffcec',
    padding: 20,
    borderRadius: 10,
    height: '22%',
    margin: 15,
    marginBottom:200,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  loadingIndicatorStatLabel: {
    margin:5,
  }
});

export default StudyPackage;
